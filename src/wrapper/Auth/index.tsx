import React, { useEffect, useMemo, useState } from 'react';

import { Link, useLocation } from 'react-router-dom';

import { Breadcrumb, Layout, Menu, MenuProps, theme } from 'antd';

import { ROUTES } from '~/routes';

import styles from './styles.module.scss';
import {
  UnorderedListOutlined,
  TagsOutlined,
  DashboardOutlined } from '@ant-design/icons'
import { Content, Footer } from 'antd/es/layout/layout';
import Header from '~/components/molecules/Header';
import Sider from 'antd/es/layout/Sider';
import history from '~/utils/history';
import SideNav from '~/components/molecules/Sidebar';


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
  const convertPathName = pathname.slice(1).charAt(0).toUpperCase() + pathname.slice(2);

  const menuLeft: MenuItem[] = useMemo(() => [
    {
      key: ROUTES.Ideas,
      label: <Link to={ROUTES.Ideas}>Ideas</Link>,
      icon: <UnorderedListOutlined style={{fontSize: '18px'}}/>,
      url: ROUTES.Ideas,
      content: 'Ideas'
    },
    // {
    //   key: ROUTES.About,
    //   label: <Link to={ROUTES.About}>About</Link>,
    //   icon: <CustomerServiceOutlined style={{fontSize: '18px'}}/>,
    //   url: ROUTES.About,
    // },
    {
      key: ROUTES.Category,
      label: <Link to={ROUTES.Category}>Category</Link>,
      icon: <TagsOutlined style={{fontSize: '18px'}}/>,
      url: ROUTES.Category,
      content: 'Category'
    },
    {
      key: ROUTES.DashBoard,
      label: <Link to={ROUTES.DashBoard}>DashBoard</Link>,
      icon: <DashboardOutlined style={{fontSize: '18px'}}/>,
      url: ROUTES.DashBoard,
      content: 'DashBoard'
    },
  ], []);

  return (
    <Layout className={styles.layoutContainer}>
      <div className="header">
        <Header/>
      </div>
      <Content style={{ padding: '0 50px'}}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>{convertPathName}</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
            <SideNav menus={menuLeft}/>
          </Sider>
          <Content style={{ padding: '0 24px', height: '75vh' }}>{children}</Content>
        </Layout>
      </Content>
      <Footer className={styles.footer} style={{ textAlign: 'center', zIndex: 0 }}>1640 ©2023 Created by Group 3</Footer>
    </Layout>
  );
}

export default Auth;
