import React from 'react';
import { Dropdown, Menu } from 'antd';

interface IMenu {
  key: string,
  label: string | React.ReactNode | React.ReactNode[],
}

type IMenus = IMenu[];

type Props = {
  menu?: IMenus;
  children?: React.ReactNode | React.ReactNode[];
  trigger?: Array<any>;
}

function DropdownComponent(props: Props) {
  const menu = (
    <Menu
      items={props.menu}
    />
  );
  return (
    <Dropdown 
      trigger={props.trigger}
      overlay={menu}>
      <div>
        {props.children}
      </div>
    </Dropdown>
  );
}

export default DropdownComponent;
