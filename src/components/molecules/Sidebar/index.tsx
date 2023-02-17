import React, { useState } from 'react';
import history from '~/utils/history';
import type { MenuProps } from 'antd';

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
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
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
