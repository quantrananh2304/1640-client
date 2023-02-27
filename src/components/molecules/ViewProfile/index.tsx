import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { Avatar, Button, Divider, Upload, message } from "antd";

import avatar from "~/assets/images/astronout.png";
import iconEdit from "~/assets/images/iconEdit.svg";
import Svg from "~/components/atoms/Svg";
import { useUser } from "~/hooks/useUser";
import { format } from "date-fns";
import { DATE, Status, UserStatus, userIcon } from "~/utils/constant";
import ProfileModal from "./ModalEditProfile";
import Spin from "~/components/atoms/Spin";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/es/upload";

const beforeUpload = (file: RcFile): boolean => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const ViewProfile = () => {
  const { data, isLoading, isFetching, refetch } = useUser();
  const userData = data?.data;
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const status: Status["value"] = userData?.status;
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<any>(avatar);

  useEffect(() => {
    setImageUrl(() => {
      if (!userData || !userData.avatar) {
        return avatar;
      }

      return userData.avatar;
    });
  }, [userData]);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChangeAvatar = (info: any) => {
    const file = info.target.files[0];

    const reader = new FileReader();

    const url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      console.log("url", reader);
      const { result } = reader;
      setImageUrl(result);
    };
  };

  return (
    <div>
      <div className={styles.mainContainer}>
        <Spin spinning={isLoading || isFetching}>
          <div className={styles.profile}>
            <div className={styles.editInfo}>
              <Button onClick={() => setIsModalVisible(true)}>
                <Svg src={iconEdit} />
              </Button>
            </div>
            <div className={styles.avatarContainer}>
              {/* <Avatar
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                icon={
                  <Svg
                    src={userData.avatar !== "" ? userData.avatar : avatar}
                  ></Svg>
                }
              /> */}

              <input type="file" onChange={handleChangeAvatar} />

              <img src={imageUrl} />

              {/* <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChangeAvatar}
                ref={ref}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload> */}

              <div className="mt-2 text-center">
                {userData?.firstName} &nbsp; {userData?.lastName}
              </div>
            </div>
            <Divider />
            <div className={styles.info}>
              <div className={styles.infoLeft}>
                <div className={styles.infoItem}>
                  <strong>Role:</strong>
                  &nbsp;
                  <span> {userData?.role} </span>
                </div>
                <div className={styles.infoItem}>
                  <strong>Phone:</strong>
                  &nbsp;
                  <span> {userData?.phoneNumber} </span>
                </div>
                <div className={styles.infoItem}>
                  <strong>Email:</strong>
                  &nbsp;
                  <span> {userData?.email} </span>
                </div>
                <div className={styles.infoItem}>
                  <strong>Gender:</strong>
                  &nbsp;
                  <span> {userData?.gender} </span>
                </div>
              </div>
              <div className={styles.infoRight}>
                <div className={styles.infoItem}>
                  <strong>Birthday:</strong>
                  &nbsp;
                  <span>
                    {" "}
                    {userData?.dob && format(new Date(userData.dob), DATE)}{" "}
                  </span>
                </div>
                <div className={styles.infoItem}>
                  <strong>Address:</strong>
                  &nbsp;
                  <span> {userData?.address || "-"} </span>
                </div>
                <div className={styles.infoItem}>
                  <strong>Status:</strong>
                  &nbsp;
                  <span>
                    {userData?.status}
                    <Svg
                      className="ml-2"
                      src={userIcon[UserStatus[status] ?? -1]}
                      alt="status"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Spin>
      </div>
      <ProfileModal
        visible={isModalVisible}
        userData={userData}
        setVisible={setIsModalVisible}
        afterSuccess={refetch}
      />
    </div>
  );
};

export default ViewProfile;
