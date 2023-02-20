import React, { useEffect, useMemo } from 'react';

import { Link, useLocation } from 'react-router-dom';

import { MenuProps } from 'antd';

import { ROUTES } from '~/routes';

import styles from './styles.module.scss';
import loadable from '~/utils/loadable';
import {UnorderedListOutlined, CustomerServiceOutlined} from '@ant-design/icons'
import { animated } from '@react-spring/web';
import { Footer } from 'antd/es/layout/layout';
import Header from '~/components/molecules/Header';

const SideNav = loadable(() => import('~/components/molecules/Sidebar'));


type MenuItem = Required<MenuProps>['items'][number];
interface Props {
  children?: React.ReactNode | React.ReactNode[];
}

function Auth(props: Props) {
  const { children = null } = props;

  const menuLeft: MenuItem[] = useMemo(() => [
    {
      key: ROUTES.Ideas,
      label: <Link to={ROUTES.Ideas}>Ideas</Link>,
      icon: <UnorderedListOutlined style={{fontSize: '18px'}}/>,
      url: ROUTES.Ideas,
    },
    {
      key: ROUTES.About,
      label: <Link to={ROUTES.About}>About</Link>,
      icon: <CustomerServiceOutlined style={{fontSize: '18px'}}/>,
      url: ROUTES.About,
    },
  ], []);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.mainWrapper}>
        <Header/>
        <div className={styles.coverContent}>
          <SideNav menus={menuLeft}/>
          <animated.div className={styles.pageContent} >
            {children}
          </animated.div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
