import React, { useState } from 'react';

import { Item } from '~/components/atoms/List';
import loadable from '~/utils/loadable';

import styles from './styles.module.scss';

const Spin = loadable(() => import('~/components/atoms/Spin'));
const List = loadable(() => import('~/components/atoms/List'));
const Thread = loadable(() => import('~/components/molecules/ThreadList/TableThread/Thread'));

interface Props {
  threads?: any;
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

const ThreadTable = (props: Props) => {
  const { threads, refetch, isLoading, isFetching, setParams } = props;
  
  return (
    <Spin spinning={isLoading || isFetching}>
      <List
        className={styles.listsThread}
        grid={
          {
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 4,
          }
        }
        dataSource={threads}
        renderItem={(item: any, i: number) => {
          const div = Math.floor(i / 3);
          return (
            <Item className={`${styles.item} ${div % 2 !== 0 ? styles.background : ''}`}>
              <Thread
                item={item}
              />
            </Item>
          );
        }}
      /> 
    </Spin>
  )
}

export default ThreadTable