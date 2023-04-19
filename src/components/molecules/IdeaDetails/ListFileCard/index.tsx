import React from "react";
import { Card } from "antd";
import wordFile from "~/assets/images/file-word-solid.svg";
import pdfFile from "~/assets/images/file-pdf-solid.svg";
import file from "~/assets/images/file-solid.svg";
import Svg from "~/components/atoms/Svg";
import styles from "./styles.module.scss";
import { DownloadOutlined } from "@ant-design/icons";
interface Props {
  name: string;
  handleDownload: () => void;
}

const FileCard = (props: Props) => {
  const { name, handleDownload } = props;
  if (name.split(".").pop() === "docx") {
    return (
      <Card>
        <div
          className="d-flex justify-content-center"
          style={{ justifyContent: "space-between" }}
        >
          <Svg className={styles.fileIcon} src={wordFile} alt={name} />

          <p>{name}</p>

          <DownloadOutlined onClick={handleDownload} />
        </div>
      </Card>
    );
  } else if (name.split(".").pop() === "pdf") {
    return (
      <Card>
        <div
          className="d-flex justify-content-center"
          style={{ justifyContent: "space-between" }}
        >
          <Svg className={styles.fileIcon} src={pdfFile} alt={name} />

          <p>{name}</p>

          <DownloadOutlined onClick={handleDownload} />
        </div>
      </Card>
    );
  } else {
    return (
      <Card>
        <div
          className="d-flex justify-content-center"
          style={{ justifyContent: "space-between" }}
        >
          <Svg className={styles.fileIcon} src={file} alt={name} />

          <p>{name}</p>

          <DownloadOutlined onClick={handleDownload} />
        </div>
      </Card>
    );
  }
};

export default FileCard;
