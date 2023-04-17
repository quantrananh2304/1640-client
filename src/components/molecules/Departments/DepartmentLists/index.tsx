import React, { useState } from "react";

import { Item } from "~/components/atoms/List";
import loadable from "~/utils/loadable";

import styles from "./styles.module.scss";

const Spin = loadable(() => import("~/components/atoms/Spin"));
const List = loadable(() => import("~/components/atoms/List"));
const Department = loadable(
  () => import("~/components/molecules/Departments/DepartmentLists/Items")
);

interface Props {
  departments?: any;
  refetch?: () => void;
  isLoading?: boolean;
  isFetching?: boolean;
  setParams?: (value: any) => void;
}
interface DataType {
  name: string;
  createdAt: Date;
  status: string;
}

const DepartmentList = (props: Props) => {
  const { departments, refetch, isLoading, isFetching, setParams } = props;

  return (
    <Spin spinning={isLoading || isFetching}>
      <List
        className={styles.listsDepartment}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 3,
          xxl: 4,
        }}
        dataSource={departments}
        renderItem={(item: any, i: number) => {
          const div = Math.floor(i / 3);
          return (
            <Item
              className={`${styles.item} ${
                div % 2 !== 0 ? styles.background : ""
              }`}
            >
              <Department item={item} refetch={refetch} />
            </Item>
          );
        }}
      />
    </Spin>
  );
};

export default DepartmentList;
