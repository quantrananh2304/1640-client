
import React, { useState } from 'react';

import loadable from '~/utils/loadable';
import Svg from '~/components/atoms/Svg';
import { CampaignStatus, DATE, campaignIcon } from '~/utils/constant';
import { format } from 'date-fns';

import styles from './styles.module.scss';

const ModalIdeas = loadable(() => import('~/components/molecules/IdeasList/ModalIdeas'));

interface Props {
  item: any;
  afterSuccess?: () => void;
}
interface Status {
  value: 'ACTIVE' | 'SOFT_EXPIRED' | 'EXPIRED'
}


function Thread(props: Props) {
  const { item, afterSuccess } = props;
  const [visibleModal, setVisibleModal] = useState(false);

  const status: Status['value'] = item?.status;
  return (
    <>
      <div className={styles.threadContainer}>
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
            <div className={styles.dateRange}>{format(new Date(item?.closureDate), DATE) ?? '-'}</div>
            <div className={styles.divider}> &nbsp; - &nbsp; </div>
            <div className={styles.dateRange}>{format(new Date(item?.finalClosureDate), DATE) ?? '-'}</div>
          </div>
        </div>
        {/* <div className={styles.role}>
          <div>{'abc'}</div>
          <strong>{item?.role ?? ''}</strong>
        </div> */}
        <div
          className={styles.btnEdit}
          onClick={() => setVisibleModal(true)}
        >
          Upload idea
        </div>
        <ModalIdeas
          visible={visibleModal}
          setVisible={setVisibleModal}
          campaign={item?._id}
        />
      </div>
    </>
  );
}

export default Thread;
