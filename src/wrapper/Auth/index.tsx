import React, { useEffect, useMemo } from 'react';

import { Link, useLocation } from 'react-router-dom';

import { MenuProps, theme } from 'antd';

import { ROUTES } from '~/routes';

import styles from './styles.module.scss';
import loadable from '~/utils/loadable';
import { animated } from '@react-spring/web';
import { Footer, Header } from 'antd/es/layout/layout';

const SideNav = loadable(() => import('~/components/molecules/Sidebar'));


type MenuItem = Required<MenuProps>['items'][number];
interface Props {
  children?: React.ReactNode | React.ReactNode[];
}

function Auth(props: Props) {
  const { children = null } = props;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuLeft: MenuItem[] = useMemo(() => [
    {
      key: ROUTES.Home,
      label: 'Home',
      url: ROUTES.Home,
    },
    {
      key: ROUTES.About,
      label: <Link to={ROUTES.About}>About</Link>,
      url: ROUTES.About,
    }
    ,
  ], []);


  return (
    <div className={styles.pageWrapper}>
      <div className={styles.mainWrapper}>
        {/* <Header style={{ padding: 0, background: 'green' }} /> */}
        <div className={styles.coverContent}>
          <SideNav menus={menuLeft} />
          <animated.div className={styles.pageContent} >
            {children}
          </animated.div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
