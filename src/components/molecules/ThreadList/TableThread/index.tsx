import React, { useState } from 'react';
import type { ColumnsType, TableProps } from 'antd/es/table';
import iconEdit from '~/assets/images/iconEdit.svg';
import iconDelete from '~/assets/images/iconDelete.svg';
import iconWarning from '~/assets/images/warning.svg';

import styles from './styles.module.scss';
import Svg from '~/components/atoms/Svg';
import Spin from '~/components/atoms/Spin';
import Table from '~/components/atoms/Table';
import { format } from 'date-fns';
import { DATE, SUCCESS } from '~/utils/constant';
import { Tag, message } from 'antd';
import { inactiveCategory } from '~/api/categories';

interface Props {
  categories?: any;
  refetch?: () => void;
}
interface DataType {
  name: string;
  createdAt: Date;
  status: string;

}

const ThreadTable = (props: Props) => {
  const { categories, refetch } = props;
  const [ isModalVisible, setIsModalVisible ] = useState(false);
  const [ visibleModalInactive, setVisibleModalInactive ] = useState(false);
  const [ idInactive, setIdInactive ] = useState();
  const [ category, setCategory ] = useState({});
  
  const handleEdit = (record: any) => {
    setCategory(record)
    setIsModalVisible(true)
  }

  const modalConfirmDelete = (record: any) => {
    //Code here
  }

  const showModalInactive = (record: any) => {
    setVisibleModalInactive(true)
    setIdInactive(record)
  }

  const handleInactive = async () => {
    if (idInactive) {
      const res = await inactiveCategory(idInactive);
      if (res.message === SUCCESS) {
        message.success('Inactive Category success')
        // refetch();
      } else {
        message.error(res.message)
      }
    }
  }

  const onChange: TableProps<DataType>['onChange'] = (sorter) => {
    console.log('params', sorter);
  };

  const columns: ColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '15%',
      defaultSortOrder: 'descend',
      sorter: true
    },
    {
      title: 'Create date',
      dataIndex: 'createdAt',
      width: '15%',
      sorter: true,
      render: (date: any) => 
      <div>
        {date && format(new Date(date), DATE)}
      </div>
     
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '25%',
      render: (status: string, record: any) =>
      (status === 'ACTIVE') ?
        <Tag className='cursor-pointer' onClick={() => showModalInactive(record?._id)} color="blue">{status}</Tag> 
        :
        <Tag color="red">{status}</Tag> 
      
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
            scroll={{ y: '60vh' }}
            columns={columns}
            rowKey={(record: any) => record._id}
            dataSource={categories}
            onChange={onChange}
          />
        </Spin>
      </div>
    </>  
  )
}

export default ThreadTable