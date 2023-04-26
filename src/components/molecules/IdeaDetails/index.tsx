import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Dropdown,
  Form,
  List,
  Spin,
  Statistic,
  Switch,
  message,
} from "antd";
import { compareAsc, format } from "date-fns";
import { DATE, SUCCESS } from "~/utils/constant";
import {
  MessageOutlined,
  EyeOutlined,
  EllipsisOutlined,
  CheckOutlined,
  CloseOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { useDetailIdea } from "~/hooks/useIdeas";
import { TextArea } from "~/components/atoms/Input";
import { deleteComment, setComment, viewIdea } from "~/api/ideas";

import Meta from "antd/es/card/Meta";
import userUnknown from "~/assets/images/user-secret-solid.svg";
import styles from "./styles.module.scss";
import loadable from "~/utils/loadable";
import ModalEditComment from "../IdeasList/ModalEditComment";
import { useAppSelector } from "~/store";
import FileCard from "./ListFileCard";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const Filter = loadable(
  () => import("~/components/molecules/IdeaDetails/Filter")
);

interface Props {
  ideaId: any;
}

const IdeaDetails = (props: Props) => {
  const { ideaId } = props;
  const userData = useAppSelector((state) => state.userInfo.userData);
  const { data, isLoading, isFetching, refetch } = useDetailIdea({
    ideaId: ideaId,
  });
  const dataIdea = data?.data;
  const [form] = Form.useForm();
  const [anonymousComment, setSnonymousComment] = useState(false);

  const [visibleModalEditComment, setVisibleModalEditComment] = useState(false);
  const [itemEditComment, setItemEditComment] = useState("");

  const [showComment, setShowComment] = useState(false);
  const handleShowComment = () => {
    setShowComment(!showComment);
    form.resetFields();
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      form.submit();
    }
  };

  const handleComment = async (formValues: any) => {
    const res = await setComment(ideaId, {
      ...formValues,
      isAnonymous: anonymousComment,
    });
    if (res.message === SUCCESS) {
      message.success("Comment success");
      refetch();
      form.resetFields();
    } else {
      message.error(res.message);
    }
  };

  useEffect(() => {
    if (ideaId) {
      viewIdea(ideaId)
    }
  }, [])

  const handleEditComment = (commentId: string) => {
    setItemEditComment(commentId);
    setVisibleModalEditComment(true);
  };

  const handleDeleteComment = async (commentId: string) => {
    const res = await deleteComment(ideaId, commentId);
    if (res.message === SUCCESS) {
      message.success("Delete comment succes");
      refetch();
    } else {
      message.error(res.message);
    }
  };

  const handleDownload = (name: string, url: string) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.send();
    xhr.onreadystatechange = async function () {
      if (xhr.readyState === 4) {
        const zip = new JSZip();
        zip.file(name, xhr.response);
        const content = await zip.generateAsync({ type: "blob" });

        saveAs(content, name.split(".")[0]);
      }
    };
  };

  return (
    <>
      <Spin spinning={isLoading || isFetching}>
        <Filter idea={dataIdea} />
        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            <div className={styles.infoContainer}>
              <div>
                <Card
                  className="mt-2"
                  headStyle={{ border: "none" }}
                  actions={[
                    <Statistic
                      value={dataIdea?.commentsCount}
                      valueStyle={{ fontSize: "16px" }}
                      prefix={
                        <MessageOutlined onClick={() => handleShowComment()} />
                      }
                    />,
                  ]}
                  // extra={format(new Date(item.createdAt), DATE)}
                  extra={
                    <div className={styles.extraGroup}>
                      <EyeOutlined /> {dataIdea?.viewCount}
                    </div>
                  }
                >
                  <Meta
                    avatar={
                      <Avatar
                        size={42}
                        src={
                          dataIdea?.isAnonymous
                            ? userUnknown
                            : "https://joesch.moe/api/v1/random"
                        }
                      />
                    }
                    title={dataIdea?.title}
                    description={
                      <>
                        <div className={styles.userIdea}>
                          {!dataIdea?.isAnonymous ? (
                            <div>
                              {dataIdea?.updatedBy?.firstName}{" "}
                              {dataIdea?.updatedBy?.lastName}-
                              {dataIdea
                                ? format(new Date(dataIdea?.createdAt), DATE)
                                : "-"}
                            </div>
                          ) : (
                            <div>
                              Unknown -
                              {dataIdea
                                ? format(new Date(dataIdea?.createdAt), DATE)
                                : "-"}
                            </div>
                          )}
                        </div>
                        <div>{dataIdea?.description}</div>
                      </>
                    }
                  />
                  {dataIdea?.content}
                </Card>

                {showComment && (
                  <div className={styles.commentContainer}>
                    {dataIdea?.comments?.map((comment: any) => (
                      <div className={styles.comment} key={comment._id}>
                        <Meta
                          key={comment._id}
                          avatar={
                            <>
                              <Avatar
                                src={
                                  comment.isAnonymous
                                    ? userUnknown
                                    : "https://joesch.moe/api/v1/random"
                                }
                              />
                              {comment.isAnonymous ? (
                                <strong className="ml-2">Unknown</strong>
                              ) : (
                                <strong className="ml-2">
                                  {comment.createdBy?.firstName}{" "}
                                  {comment.createdBy?.lastName}
                                </strong>
                              )}
                            </>
                          }
                          description={
                            <p className={styles.commentContent}>
                              {comment.content}
                            </p>
                          }
                        />
                        {comment.createdBy._id === userData?._id ? (
                          <Dropdown
                            menu={{
                              items: [
                                {
                                  label: (
                                    <div
                                      onClick={() =>
                                        handleEditComment(comment._id)
                                      }
                                    >
                                      Edit comment
                                    </div>
                                  ),
                                  key: "0",
                                },
                                {
                                  type: "divider",
                                },
                                {
                                  label: (
                                    <div
                                      onClick={() =>
                                        handleDeleteComment(comment._id)
                                      }
                                    >
                                      Delete comment
                                    </div>
                                  ),
                                  key: "2",
                                  danger: true,
                                },
                              ],
                            }}
                            trigger={["click"]}
                          >
                            <div className={styles.commentOption}>
                              <EllipsisOutlined />
                            </div>
                          </Dropdown>
                        ) : null}
                      </div>
                    ))}
                    {compareAsc(
                      new Date(dataIdea?.thread?.finalClosureDate),
                      new Date()
                    ) >= 0 ? (
                      <div className={styles.commentArea}>
                        <Form
                          form={form}
                          className={styles.formComment}
                          onFinish={handleComment}
                        >
                          <Form.Item name="content">
                            <TextArea
                              className={styles.textInput}
                              placeholder="Enter your comment"
                              onKeyPress={(e: any) => handleKeyPress(e)}
                            />
                          </Form.Item>
                        </Form>
                        <div className={styles.anonymousMode}>
                          <p style={{ margin: 0 }}>Amonymous</p>
                          <Switch
                            onChange={setSnonymousComment}
                            checkedChildren={<CheckOutlined />}
                            unCheckedChildren={<CloseOutlined />}
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>
          <Card className={styles.listFile}>
            <List
              grid={{
                gutter: 16,
                xs: 1,
                sm: 1,
                md: 2,
                lg: 2,
                xl: 2,
                xxl: 4,
              }}
              dataSource={dataIdea?.documents}
              renderItem={(item: any) => (
                <List.Item
                  style={{
                    alignItems: "center",
                  }}
                >
                  <FileCard
                    name={item.name}
                    handleDownload={() => handleDownload(item.name, item.url)}
                  />
                </List.Item>
              )}
            />
          </Card>
        </div>

        <ModalEditComment
          visible={visibleModalEditComment}
          setVisivle={setVisibleModalEditComment}
          ideaId={ideaId}
          commentId={itemEditComment}
          refetch={refetch}
        />
      </Spin>
    </>
  );
};

export default IdeaDetails;
