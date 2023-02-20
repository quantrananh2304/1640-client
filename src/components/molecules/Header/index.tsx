import React from 'react';
import { Dropdown, Layout, MenuProps } from 'antd';

import history from '~/utils/history';
import loadable from '~/utils/loadable';
import iconSearch from '~/assets/images/iconSearch.svg';
import iconDetail from '~/assets/images/iconDetail.svg';
import iconNotification from '~/assets/images/iconNotification.svg';
import iconAvatar from '~/assets/images/iconAvatar.svg';

import styles from './styles.module.scss';

const Svg = loadable(() => import('~/components/atoms/Svg'));
const { Header: LayoutHeader } = Layout;

export default function Header() {

  const logout = () => {
    //Code here
  };

  const handleClickLogo = () => {
    history.push('/');
  };

  const items: MenuProps['items'] = [
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
          <Svg src={iconSearch} alt='icon search' className={styles.iconSearch} />
          <Svg src={iconDetail} alt='icon detail' className={styles.iconDetail} />
          <Svg src={iconNotification} alt='icon notification' className={styles.iconNotification} />
          <Dropdown menu={{items}}>
            <div className={styles.coverInfo}>
              <div className={styles.avatar}>
                <Svg src={iconAvatar} alt='icon avatar' className={styles.iconAvatar} />
              </div>
              <div className={styles.name}>{'hieu.trantrung'}</div>
            </div>
          </Dropdown>
        </div>
      </LayoutHeader>
    </Layout>
  );
}
