import React, { useEffect, useState } from 'react';
import history from '~/utils/history';
import { MenuProps } from 'antd';

const { Sider } = Layout;
import styles from './styles.module.scss';
import { Layout, Menu } from 'antd';
import { useLocation } from 'react-router-dom';

export default function SideNav(props: { menus: any[] }) {
  const { menus } = props;
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKey, setSelectedKey] = useState('1');
  const { pathname } = useLocation();

  const handleClick: MenuProps['onClick'] = ({ key, keyPath }) => {
    history.push(key);
  };
  const menusKey = menus.map((item: any) => item.key)
  useEffect(() => {
    menus.forEach((route) => {
      if (pathname.startsWith(route.url || '###')) {
        setSelectedKey(route.key);
      }
      if (route.children) {
        for (let i = 0; i < route.children.length; i += 1) {
          const childRoute = route.children[i];
          if (window.location.pathname.startsWith(childRoute.url || '###')) {
            setSelectedKey(childRoute.key);
            if (!collapsed) {
              setOpenKeys(['/ideas']);
            }
            break;
          }
        }
      }
      if (!(menusKey.includes(pathname))){
        setSelectedKey('')
      }
    });
  }, [pathname, collapsed, menus]);
  return (
    <Layout
      className={styles.sideNav}
      style={{
        minHeight: '94vh',
        flex: 'none',
        marginTop: '6vh'
      }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu 
          onClick={handleClick} 
          theme="dark" 
          selectedKeys={[selectedKey]}
          openKeys={openKeys}
          onOpenChange={(keys) => setOpenKeys(keys)}
          mode="inline" 
          items={menus} 
        />
      </Sider>
    </Layout>
  );
}
