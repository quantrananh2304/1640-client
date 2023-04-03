import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Badge, Dropdown, Layout, MenuProps } from 'antd';
import { getCookie, removeCookie } from '~/utils/cookie';
import { ROUTES } from '~/routes';

import history from '~/utils/history';
import loadable from '~/utils/loadable';
import iconNotification from '~/assets/images/iconNotification.svg';
import iconAvatar from '~/assets/images/iconAvatar.svg';
import logo from '~/assets/images/1640-logos_white.png';

import { useAppDispatch } from '~/store';
import { setUserInfo } from '~/store/userInfo';
import { Authorization } from '~/wrapper/Authorization';
import { PARAMS_GET_ALL, UserRole } from '~/utils/constant';
import styles from './styles.module.scss';
import { useNotification } from '~/hooks/useNotifications';
import { Link } from 'react-router-dom';
import { readNotification } from '~/api/notification';

const Svg = loadable(() => import('~/components/atoms/Svg'));
const { Header: LayoutHeader } = Layout;

export default function Header() {
  const userName = getCookie('userName')
  const dispatch = useAppDispatch();
  const {data, refetch} = useNotification({
    page: 1,
    limit: 30
  })
  const [user, setUser] = useState('')

  const handleReadNotification = (notificationId: string) => {
    readNotification(notificationId)
    refetch();
  }

  const notifications: MenuProps['items'] = useMemo(() => 
  data?.data?.notifications?.map((item: any) => (
    {
      key: item._id,
      read: item.read,
      label: (
        <div 
          className={item.read ? styles.notificationReaded : styles.notificationUnread} 
          onClick={() => handleReadNotification(item._id)}
        >
          {(<Link to={`/ideas/lists/${item.idea._id}`}>{item.content}</Link>)}
        </div>
      )}
  )), [data]);
  
  const logout = () => {
    removeCookie('token');
    removeCookie('userName');
    dispatch(setUserInfo({}));
    history.push(ROUTES.Login);
  };

  useEffect(() => {
    if (userName) {
      setUser(userName)
    }
  }, [userName])
  

  const handleClickLogo = () => {
    history.push('/');
  };

  const showProfile = () => {
    history.push(ROUTES.Profile);
  }

  const handleSetting = () => {
    history.push(ROUTES.Setting);
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div onClick={showProfile}>Profile</div>
      ),
    },
    {
      key: '2',
      label: (
        <Authorization roles={[UserRole.Admin]}>
          <div onClick={handleSetting}>Setting</div>
        </Authorization>
      ),
    },
    {
      key: '3',
      label: (
        <div onClick={logout}>Logout</div>
      ),
    }
  ];


  return (
    <Layout className={styles.header}>
      <LayoutHeader className={styles.coverHeader}>
        <div
          onClick={handleClickLogo}
          className={`${styles.title} cursor-pointer`}
          tabIndex={0}
        >
          <Svg className={styles.logo} src={logo}/>
          <h3>UniCollective</h3>
        </div>
        <div className={styles.info}>
          <Dropdown  menu={{items: notifications}}>
            <Badge 
              count={
                notifications?.filter((item: any) => item?.read !== true)?.length
              } 
              size='small'
            >
            <Svg 
              src={iconNotification} 
              alt='icon notification' 
              className={styles.iconNotification} 
            />
            </Badge>
          </Dropdown> 
          <Dropdown menu={{items}}>
            <div className={styles.coverInfo}>
              <div className={styles.avatar}>
                <Svg src={iconAvatar} alt='icon avatar' className={styles.iconAvatar} />
              </div>
              <div className={styles.name}>{user}</div>
            </div>
          </Dropdown>
        </div>
      </LayoutHeader>
    </Layout>
  );
}
