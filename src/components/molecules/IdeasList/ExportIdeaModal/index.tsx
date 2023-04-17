import Modal from "antd/es/modal/Modal";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Button, Form, Row } from "antd";
import loadable from "~/utils/loadable";
import { Option } from "~/components/atoms/Select";
import { format, isBefore } from "date-fns";
import { DownloadOutlined } from "@ant-design/icons";
import { getIdeas } from "~/api/ideas";
import { exportToCSV, getExcelData } from "~/utils/exportExcel";

const Select = loadable(() => import("~/components/atoms/Select"));

export default function ExportIdeaModal({
  visible,
  threadOptions,
  setVisible,
}: {
  visible: boolean;
  threadOptions: any;
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
        .filter((threadOption: any) =>
          isBefore(new Date(threadOption.finalClosureDate), new Date())
        )
        .map((threadOption: any) => threadOption.id);

      params.thread = threadParam;
    }

    try {
      const res = await getIdeas(params);

      if (res && res.errorCode === 0 && !res.errors.length) {
        const { ideas } = res.data;

        if (ideas.length) {
          const csvData = getExcelData(
            {
              columns: [
                { headerName: "Title", field: "title" },
                { headerName: "Campaign", field: "thread" },
                { headerName: "Department", field: "department" },
                { headerName: "Category", field: "category" },
                { headerName: "Description", field: "description" },
                { headerName: "Comment count", field: "commentsCount" },
                { headerName: "Dislike count", field: "dislikeCount" },
                { headerName: "Like count", field: "likeCount" },
                { headerName: "View count", field: "viewCount" },
                { headerName: "Documents", field: "documents" },
                { headerName: "Anonymous", field: "isAnonymous" },
                { headerName: "Submitted by", field: "updatedBy" },
                { headerName: "Date created", field: "createdAt" },
              ],
              ignoreFields: [],
            },
            ideas.map((idea: any) => {
              return {
                ...idea,
                category: idea.category.name,
                department: idea.department.name,
                thread: idea.thread.name,
                documents: idea.documents
                  .map((document: any) => document.url)
                  .toString(),
                updatedBy: idea.isAnonymous
                  ? ""
                  : idea.updatedBy.firstName + " " + idea.updatedBy.lastName,
                createdAt: format(new Date(idea.createdAt), "yyyy-MMM-dd"),
              };
            })
          );

          exportToCSV(
            csvData,
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
              .replaceAll(" ", "") + "-Ideas",
            true
          );
        } else {
          // make error no idea available toast
        }
      } else {
        // make error get idea toast
      }
    } catch (error) {
      // make error toast
    }

    setLoading(() => false);
  };

  console.log(threadOptions);

  return (
    <Modal
      width={600}
      centered
      open={visible}
      footer={false}
      closable={false}
      className={styles.modalContainer}
    >
      <div>
        <h3>Export Idea</h3>
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
            Export <DownloadOutlined />
          </Button>
        </Row>
      </Form>
    </Modal>
  );
}
