import React, { useCallback, useMemo, useState } from 'react';
import { Button, Form } from 'antd';
import { DownloadOutlined } from '@ant-design/icons'
import Svg from '~/components/atoms/Svg';
import loadable from '~/utils/loadable';

import styles from './styles.module.scss';

const Select = loadable(() => import('~/components/atoms/Select'));
const ModalIdeas = loadable(() => import('~/components/molecules/IdeasList/ModalIdeas'));

interface Props {
  idea: any;
}
const Filter = (props: Props) => {

  return (
    <>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <h2>{props.idea?.title}</h2>
        </div>
      </div>
    </>
  );
};

export default Filter;
