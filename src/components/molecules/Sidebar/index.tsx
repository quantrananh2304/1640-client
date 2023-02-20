import React, { useState } from 'react';
import history from '~/utils/history';
import { MenuProps, theme } from 'antd';

const { Sider } = Layout;
import styles from './styles.module.scss';
import { Layout, Menu } from 'antd';

export default function SideNav(props: { menus: any[] }) {
  const { menus } = props;
  const [collapsed, setCollapsed] = useState(false);

  const handleClick: MenuProps['onClick'] = ({ key, keyPath }) => {
    history.push(key);
  };

  return (
    <Layout
      className={styles.sideNav}
      style={{
        minHeight: '100vh',
        flex: 'none',
        paddingTop: '48px'
      }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu 
          onClick={handleClick} 
          theme="dark" 
          defaultSelectedKeys={['1']} 
          mode="inline" 
          items={menus} 
        />
      </Sider>
    </Layout>
  );
}
