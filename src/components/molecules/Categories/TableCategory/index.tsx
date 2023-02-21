import React, { useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import iconEdit from '~/assets/images/iconEdit.svg';
import iconDelete from '~/assets/images/iconDelete.svg';
import iconWarning from '~/assets/images/warning.svg';

import styles from './styles.module.scss';
import Svg from '~/components/atoms/Svg';
import CategoryModal from '../CategoryModal';
import Spin from '~/components/atoms/Spin';
import Table from '~/components/atoms/Table';

interface Props {
  categories?: any;
}

const CategoryTable = (props: Props) => {
  const { categories } = props;
  const [ isModalVisible, setIsModalVisible ] = useState(false);
  const [ visibleModalConfirm, setVisibleModalConfirm ] = useState(false);
  const [ category, setCategory ] = useState({});

  
  const handleEdit = (record: any) => {
    setCategory(record)
    setIsModalVisible(true)
  }

  const modalConfirmDelete = (record: any) => {
    //Code here
  }


  const columns: ColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '15%',
      
    },
    {
      title: 'Date',
      dataIndex: 'date',
      width: '15%',
     
    },
    {
      title: 'Note',
      dataIndex: 'note',
      width: '25%',
 
    },
    {
      title: '',
      dataIndex: 'optional',
      width: '4%',
      render: (_: any, record: any) => (
        <>
          <div className={styles.groupSave}>
            <a onClick={() => handleEdit(record)}>
              <Svg src={iconEdit} alt="icon Edit" />
            </a>
            <a onClick={() => modalConfirmDelete(record)}>
              <Svg src={iconDelete} alt="icon Delete" />
            </a>
          </div>
        </>
      )
    },
  ];

  return (
    <>
      <div
        className={styles.container}
        >
        <Spin spinning={false}>
          <Table
            className={styles.tableContainer}
            scroll={{ y: '70vh' }}
            columns={columns}
            rowKey={(record: any) => record.id}
            dataSource={categories}
            pagination={false}
          />
        </Spin>
      </div>
      <CategoryModal
        visible={isModalVisible}
        setVisible={setIsModalVisible}
        // afterSuccess={afterSuccess}
        category={category}
        setCategory={setCategory}
      />
      {/* <ModalConfirm
        visible={visibleModalConfirm}
        okText={t('common.yes')}
        cancelText={t('common.no')}
        centered
        onCancel={onCloseModalConfirmDelete}
        onOk={handleDelete}
      >
        <div className={styles.headerConfirmDelete}>
          <Svg className={styles.iconWarning} src={iconWarning} alt="icon warning" />
          <span className={styles.title}>{t('customer.titleConfirmDeleteCustomer')}</span>
        </div>
      </ModalConfirm> */}
    </>  
  )
}

export default CategoryTable