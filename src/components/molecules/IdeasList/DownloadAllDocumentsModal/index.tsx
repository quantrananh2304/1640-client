import { Button, Form, Modal, Row } from "antd";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import loadable from "~/utils/loadable";
import { Option } from "~/components/atoms/Select";
import { isBefore } from "date-fns";
import { DownloadOutlined } from "@ant-design/icons";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { getIdeas } from "~/api/ideas";

const Select = loadable(() => import("~/components/atoms/Select"));

export default function DownloadAllDocumentModal({
  visible,
  threadOptions,
  setVisible,
}: {
  visible: boolean;
  threadOptions: Array<any>;
  setVisible: (visible: boolean) => void;
}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFinish = async (value: any) => {
    setLoading(() => true);
    const { thread } = value;
    const params: any = {
      sort: "DATE_CREATED_ASC",
      page: 1,
      limit: 999,
    };
    if (thread && thread.length) {
      params.thread = thread;
    } else {
      const threadParam = threadOptions
        .filter((threadOption) =>
          isBefore(new Date(threadOption.finalClosureDate), new Date())
        )
        .map((threadOption) => threadOption.id);

      params.thread = threadParam;
    }
    try {
      const res = await getIdeas(params);

      if (res && res.errorCode === 0 && !res.errors.length) {
        const { ideas } = res.data;

        if (ideas.length) {
          const fileUrls = ideas.reduce((prev: any, cur: any) => {
            const { documents } = cur;
            documents.forEach((item: any) => {
              prev.push({ name: item.name, url: item.url });
            });

            return prev;
          }, []);

          const zip = new JSZip();
          let count = 0;

          function downloadFile(
            { url, name }: { url: string; name: string },
            onSuccess: any
          ) {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.responseType = "blob";
            xhr.onreadystatechange = function () {
              if (xhr.readyState === 4) {
                if (onSuccess) {
                  onSuccess(xhr.response, name);
                }
              }
            };
            xhr.send();
          }

          async function onDownloadComplete(blobData: any, name: string) {
            if (count < fileUrls.length) {
              zip.file(name, blobData);
            }

            if (count < fileUrls.length - 1) {
              count += 1;
              downloadFile(fileUrls[count], onDownloadComplete);
            } else {
              const content = await zip.generateAsync({ type: "blob" });
              saveAs(
                content,
                ideas
                  .map((idea: any) => idea.thread.name)
                  .reduce((prev: any, cur: any) => {
                    if (!prev.includes(cur)) {
                      prev.push(cur);
                    }

                    return prev;
                  }, [])
                  .toString()
                  .replaceAll(",", "_")
                  .replaceAll(" ", "") + "-IdeasAttachment"
              );
            }
          }

          downloadFile(fileUrls[count], onDownloadComplete);
        } else {
          // make error no idea available toast
        }
      } else {
        // make error get idea toast
      }
    } catch (error) {
      // make error get idea toast
      console.log(error);
    }

    setLoading(() => false);
  };

  return (
    <Modal
      width={600}
      centered
      open={visible}
      footer={false}
      closable={false}
      className={styles.modalContainer}
    >
      <a
        href="https://firebasestorage.googleapis.com/v0/b/project-1300899936117119693.appspot.com/o/files%2F147144.png?alt=media&amp;token=e89724fb-5c06-406a-8f86-d217b0a6ec36"
        download="file"
      >
        Click here to download
      </a>
      <div>
        <h3>Download documents</h3>
      </div>

      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        className={styles.formContainer}
        onFinish={handleFinish}
      >
        <Form.Item name="thread">
          <Select
            className={styles.filterOption}
            placeholder="Select Campaign, select none to export all campaign idea"
            mode="multiple"
          >
            {threadOptions?.map((item: any) => (
              <Option
                key={item.id}
                value={item.id}
                disabled={isBefore(new Date(), new Date(item.finalClosureDate))}
              >
                {item.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Row
          style={{
            width: "100%",
            justifyContent: "space-between",
            marginTop: 30,
          }}
        >
          <Button
            style={{ width: "40%" }}
            danger
            onClick={() => setVisible(false)}
          >
            Cancel
          </Button>

          <Button style={{ width: "40%" }} htmlType="submit" loading={loading}>
            Download <DownloadOutlined />
          </Button>
        </Row>
      </Form>
    </Modal>
  );
}
