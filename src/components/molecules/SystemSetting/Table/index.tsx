import React from 'react';
import { Item } from '~/components/atoms/List';

import loadable from '~/utils/loadable';
import styles from './styles.module.scss';

const List = loadable(() => import('~/components/atoms/List'));
const Spin = loadable(() => import('~/components/atoms/Spin'));
const Account = loadable(() => import('./Account'));
interface Props {
  // data: any;
  isLoading?: boolean;
  isFetching?: boolean;
  afterSuccess?: () => void;
}

function TableListsAccount(props: Props) {
  const { isLoading, isFetching, afterSuccess} = props;

  return (
    // <Spin spinning={isFetching || isLoading} >
      <div className={styles.container}>
        <div className={styles.totalMember}>
          <div className={styles.title}>Account</div>
          {/* <strong>{data?.length}</strong> */}
        </div>
        <List
          className={styles.listsMember}
          grid={{ column: 3, gutter: 16 }}
          // dataSource={data}
          renderItem={(item: any, i: number) => {
            const div = Math.floor(i / 3);
            return (
              <Item className={`${styles.item} ${div % 2 !== 0 ? styles.background : ''}`}>
                <Account
                  item={item}
                  afterSuccess={afterSuccess}
                />
              </Item>
            );
          }}
        />
      </div>
    // </Spin>
  );
}

export default TableListsAccount;
