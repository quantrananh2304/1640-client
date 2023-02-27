import React, { useState } from 'react';
import { Avatar, Button, Divider, Upload, message } from 'antd';
import { useUser } from '~/hooks/useUser';
import { format } from 'date-fns';
import { DATE, SUCCESS, Status, UserStatus, userIcon } from '~/utils/constant';
import {
  UserOutlined
} from '@ant-design/icons'
import { RcFile } from 'antd/es/upload';
import { setAvatar } from '~/api/user';

import iconEdit from '~/assets/images/iconEdit.svg';
import Svg from '~/components/atoms/Svg';
import loadable from '~/utils/loadable';
import styles from './styles.module.scss';

const ProfileModal = loadable(() => import('~/components/molecules/ViewProfile/ModalEditProfile'));
const Spin = loadable(() => import('~/components/atoms/Spin'));

const ViewProfile = () => {
  const { data, isLoading, isFetching, refetch } = useUser()
  const userData = data?.data;
  const [ isModalVisible, setIsModalVisible ] = useState(false);
  const status: Status['value'] = userData?.status;

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
  const handleImageUpload = async (file: any) => {
    try {
      if (!(file?.file instanceof Blob)) {
        throw new Error('Invalid file type');
      }
      const reader = new FileReader();
      reader.readAsDataURL(file.file);
      reader.onload = async () => {
        const base64String = reader.result;
        const response = await setAvatar(userData?._id, { img: base64String });
        if (response.message === SUCCESS) {
          refetch()
        }
      };
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className={styles.mainContainer}>
        <Spin spinning={isLoading || isFetching}>
        <div className={styles.profile}>
          <div className={styles.editInfo}>
            <Button
              onClick={() => setIsModalVisible(true)}
            >
              <Svg src={iconEdit}/>
            </Button>
          </div>
          <div className={styles.avatarContainer}>
            <Upload
              name="avatar"
              listType="picture-circle"
              className="avatar-uploader"
              showUploadList={false}
              accept="image/*"
              beforeUpload={beforeUpload}
              customRequest={(file: any ) => handleImageUpload(file)}
            >
              {userData?.avatar ? (
                <Avatar 
                  size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                  src={userData?.avatar}
                  
                />
              ) : (
                <Avatar 
                  size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                  icon={<UserOutlined />}
                />
              )}
            </Upload>
            <div className='mt-2 text-center'>
              {userData?.firstName} &nbsp; {userData?.lastName}
            </div>
          </div>
          <Divider/>
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
                <span> {userData?.dob && format(new Date(userData.dob), DATE)} </span>
              </div>
              <div className={styles.infoItem}>
                <strong>Address:</strong>
                &nbsp;
                <span> {userData?.address || '-'} </span>
              </div>
              <div className={styles.infoItem}>
                <strong>Status:</strong>
                &nbsp;
                <span> 
                  {userData?.status}
                  <Svg
                    className='ml-2'
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
  )
}

export default ViewProfile