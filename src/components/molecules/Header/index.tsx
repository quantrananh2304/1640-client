import React, { useLayoutEffect, useState } from 'react';
import { Dropdown, Layout, MenuProps } from 'antd';
import { removeCookie } from '~/utils/cookie';
import { ROUTES } from '~/routes';

import history from '~/utils/history';
import loadable from '~/utils/loadable';
import iconSearch from '~/assets/images/iconSearch.svg';
import iconDetail from '~/assets/images/iconDetail.svg';
import iconNotification from '~/assets/images/iconNotification.svg';
import iconAvatar from '~/assets/images/iconAvatar.svg';
import logo from '~/assets/images/1640-logos_white.png';

import styles from './styles.module.scss';
import { RootState, useAppDispatch, useAppSelector } from '~/store';
import { setUserInfo } from '~/store/userInfo';
import { Authorization } from '~/wrapper/Authorization';
import { UserRole } from '~/utils/constant';

const Svg = loadable(() => import('~/components/atoms/Svg'));
const { Header: LayoutHeader } = Layout;

export default function Header() {
  const me = useAppSelector((state: RootState) => state.userInfo.userData);
  const dispatch = useAppDispatch();

  const logout = () => {
    removeCookie('token');
    dispatch(setUserInfo({}));
    history.push(ROUTES.Login);
  };

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
          <Svg src={iconSearch} alt='icon search' className={styles.iconSearch} />
          <Svg src={iconDetail} alt='icon detail' className={styles.iconDetail} />
          <Svg src={iconNotification} alt='icon notification' className={styles.iconNotification} />
          <Dropdown menu={{items}}>
            <div className={styles.coverInfo}>
              <div className={styles.avatar}>
                <Svg src={iconAvatar} alt='icon avatar' className={styles.iconAvatar} />
              </div>
              <div className={styles.name}>{me?.firstName} {me?.lastName}</div>
            </div>
          </Dropdown>
        </div>
      </LayoutHeader>
    </Layout>
  );
}
