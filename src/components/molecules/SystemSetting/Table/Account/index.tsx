
import React, { useState } from 'react';

import loadable from '~/utils/loadable';
import Svg from '~/components/atoms/Svg';

import { Divider } from 'antd';
import { Status, UserStatus, userIcon } from '~/utils/constant';
import styles from './styles.module.scss';


interface Props {
  item: any;
  afterSuccess?: () => void;
}

function Account(props: Props) {
  const { item, afterSuccess } = props;
  const [visibleModal, setVisibleModal] = useState(false);

  const status: Status['value'] = item?.status;
  return (
    <>
      <div className={styles.memberContainer}>
        <div className={styles.info}>
          <div className={styles.name}>
            {item?.username ?? ''}
            <Svg
              className={styles.iconActive}
              src={userIcon[UserStatus[status] ?? -1]}
              alt="status"
            />
          </div>
        </div>
        <div
          className={styles.btnEdit}
          onClick={() => setVisibleModal(true)}
        >
          Edit
        </div>

      </div>
    </>
  );
}

export default Account;
