import React, { useState } from 'react';
import styles from './styles.module.scss';
import { Avatar, Button, Divider } from 'antd';

import avatar from '~/assets/images/astronout.png';
import iconEdit from '~/assets/images/iconEdit.svg';
import Svg from '~/components/atoms/Svg';
import { useUser } from '~/hooks/useUser';
import { format } from 'date-fns';
import { DATE, Status, UserStatus, userIcon } from '~/utils/constant';
import ProfileModal from './ModalEditProfile';
import Spin from '~/components/atoms/Spin';

const ViewProfile = () => {
  const { data, isLoading, isFetching, refetch } = useUser()
  const userData = data?.data;
  const [ isModalVisible, setIsModalVisible ] = useState(false);
  const status: Status['value'] = userData?.status;
  
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
            <Avatar
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
              icon={<Svg src={avatar}></Svg>}
            />
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