import React from 'react';
import { Layout } from 'antd';

import history from '~/utils/history';
import loadable from '~/utils/loadable';

import styles from './styles.module.scss';

const DropdownComponent = loadable(() => import('~/components/atoms/DropdownComponent'));
const Svg = loadable(() => import('~/components/atoms/Svg'));
const { Header: LayoutHeader } = Layout;

export default function Header() {


  const logout = () => {
    //Code here
  };

  const handleClickLogo = () => {
    history.push('/');
  };

  const menu = [
    {
      key: '1',
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
          Title
        </div>
        <div className={styles.info}>
          {/* <Svg src={iconSearch} alt='icon search' className={styles.iconSearch} />
          <Svg src={iconDetail} alt='icon detail' className={styles.iconDetail} />
          <Svg src={iconNotification} alt='icon notification' className={styles.iconNotification} /> */}
          <DropdownComponent menu={menu}>
            <div className={styles.coverInfo}>
              <div className={styles.avatar}>
                {/* <Svg src={iconAvatar} alt='icon avatar' className={styles.iconAvatar} /> */}
              </div>
              <div className={styles.name}>{''}</div>
            </div>
          </DropdownComponent>
        </div>
      </LayoutHeader>
    </Layout>
  );
}
