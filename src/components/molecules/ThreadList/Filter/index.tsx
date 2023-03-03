import React, { useState } from 'react'
import { Button } from 'antd'

import Svg from '~/components/atoms/Svg'
import iconPlus from '~/assets/images/iconPlus.svg'

import styles from './styles.module.scss'
import CategoryModal from '../ThreadModal'

interface Props {
  refetch?: () => void;
}

const Filter = (props: Props) => {
  const {refetch} = props;
  const [ isModalVisible, setIsModalVisible ] = useState(false);

  return (
    <div className={styles.filterContainer}>
        {/* <div className={styles.titleHead}>Category</div> */}
        <div>
          <Button
            className={styles.btnAdd}
            type="primary"
            onClick={() => setIsModalVisible(true)}
          >
            <Svg className={styles.icon} src={iconPlus} />
            Add thread
          </Button>
        </div>
      <CategoryModal
        refetch={refetch}
        visible={isModalVisible}
        setVisible={setIsModalVisible}
      />
    </div>
  )
}

export default Filter