
import React, { useState } from 'react';

import loadable from '~/utils/loadable';
import Svg from '~/components/atoms/Svg';
import { CampaignStatus, DATE, campaignIcon } from '~/utils/constant';
import { format } from 'date-fns';

import styles from './styles.module.scss';

interface Props {
  item: any;
  afterSuccess?: () => void;
}
interface Status {
  value: 'ACTIVE' | 'SOFT_EXPIRED' | 'EXPIRED'
}


function Department(props: Props) {
  const { item, afterSuccess } = props;
  const [visibleModal, setVisibleModal] = useState(false);

  const status: Status['value'] = item?.status;
  return (
    <>
      <div className={styles.departmentContainer}>
        <div className={styles.info}>
          <div className={styles.name}>
            {item?.name ?? ''}
            <Svg
              className={styles.iconActive}
              src={campaignIcon[CampaignStatus[status] ?? -1]}
              alt="status"
            />
          </div>
          <div className={styles.content}>
            {item?.description}
          </div>
          <div className={styles.infoGroup} >
            <div className={styles.dateRange}>{format(new Date(item?.createdAt), DATE) ?? '-'}</div>
          </div>
        </div>
        <div
          className={styles.btnEdit}
          onClick={() => setVisibleModal(true)}
        >
          Inactive
        </div>
      </div>
    </>
  );
}

export default Department;
