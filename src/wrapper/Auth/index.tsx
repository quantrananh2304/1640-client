import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {  Layout, MenuProps, theme } from 'antd';
import { ROUTES } from '~/routes';
import { Content, Footer } from 'antd/es/layout/layout';

import {
  UnorderedListOutlined,
  TagsOutlined,
  DashboardOutlined,
  BookOutlined,
  FlagOutlined } from '@ant-design/icons'

import Sider from 'antd/es/layout/Sider';
import history from '~/utils/history';
import loadable from '~/utils/loadable';
import styles from './styles.module.scss';
import { useAppSelector } from '~/store';
import { UserRole } from '~/utils/constant';

const SideNav = loadable(() => import('~/components/molecules/Sidebar'));
const Header = loadable(() => import('~/components/molecules/Header'));


type MenuItem = Required<MenuProps>['items'][number];
interface Props {
  children?: React.ReactNode | React.ReactNode[];
}

function Auth(props: Props) {
  const { children = null } = props;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { pathname } = useLocation();
  const userData = useAppSelector((state) => state.userInfo.userData);
  const userRole = userData?.role;

  const convertPathName = pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2);

  const menuLeft: MenuItem[] = useMemo(() => [
    {
      key: ROUTES.Ideas,
      label: <Link to={ROUTES.Ideas}>Ideas</Link>,
      icon: <UnorderedListOutlined style={{fontSize: '18px'}}/>,
      url: ROUTES.Ideas,
      content: 'Ideas'
    },
    {
      key: ROUTES.Campaign,
      label: <Link to={ROUTES.Campaign}>Campaign</Link>,
      icon: <BookOutlined style={{fontSize: '18px'}}/>,
      url: ROUTES.Campaign,
    },
    (userRole && userRole === UserRole.QA_M) && {
      key: ROUTES.Category,
      label: <Link to={ROUTES.Category}>Category</Link>,
      icon: <TagsOutlined style={{fontSize: '18px'}}/>,
      url: ROUTES.Category,
      content: 'Category'
    },
    (userRole && userRole === UserRole.Admin) && {
      key: ROUTES.Department,
      label: <Link to={ROUTES.Department}>Department</Link>,
      icon: <FlagOutlined style={{fontSize: '18px'}}/>,
      url: ROUTES.Department,
      content: 'Department'
    },
    (userRole && (userRole === UserRole.Admin)) && {
      key: ROUTES.DashBoard,
      label: <Link to={ROUTES.DashBoard}>DashBoard</Link>,
      icon: <DashboardOutlined style={{fontSize: '18px'}}/>,
      url: ROUTES.DashBoard,
      content: 'DashBoard'
    },
  ], [userData]);

  return (
    <Layout className={styles.layoutContainer}>
      <div className="header">
        <Header/>
      </div>
      <Content className={styles.contentMain}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>{convertPathName}</Breadcrumb.Item>
        </Breadcrumb> */}
        <Layout className={styles.contentNav} style={{ padding: '24px 0', background: colorBgContainer }}>
          <Sider className={styles.contentSider} style={{ background: colorBgContainer }}>
            <SideNav menus={menuLeft}/>
          </Sider>
          <Content className={styles.contentList}>{children}</Content>
        </Layout>
      </Content>
      <Footer className={styles.footer} style={{ textAlign: 'center' }}>1640 ©2023 Created by Group 3</Footer>
    </Layout>
  );
}

export default Auth;
