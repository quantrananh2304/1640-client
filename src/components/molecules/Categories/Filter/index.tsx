import React, { useState } from 'react'
import { Button } from 'antd'

import Svg from '~/components/atoms/Svg'
import iconPlus from '~/assets/images/iconPlus.svg'

import styles from './styles.module.scss'
import CategoryModal from '../CategoryModal'

const Filter = () => {
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
            Add category
          </Button>
        </div>
      <CategoryModal
        visible={isModalVisible}
        setVisible={setIsModalVisible}
      />
    </div>
  )
}

export default Filter