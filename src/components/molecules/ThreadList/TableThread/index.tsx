import React, { useState } from 'react';
import type { ColumnsType, TablePaginationConfig, TableProps } from 'antd/es/table';
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
  threads?: any;
  refetch?: () => void;
  isLoading?: boolean;
  isFetching?: boolean;
}
interface DataType {
  name: string;
  createdAt: Date;
  status: string;
}

const ThreadTable = (props: Props) => {
  const { threads, refetch, isLoading, isFetching } = props;
  const [ isModalVisible, setIsModalVisible ] = useState(false);
  const [ visibleModalInactive, setVisibleModalInactive ] = useState(false);
  const [ idInactive, setIdInactive ] = useState();
  const [ thread, setThread ] = useState({});
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    total: 10
  });
  
  const handleEdit = (record: any) => {
    setThread(record)
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
      width: '10%',
      render: (status: string, record: any) =>
      (status === 'ACTIVE') ?
        <Tag className='cursor-pointer' onClick={() => showModalInactive(record?._id)} color="blue">{status}</Tag> 
        :
        <Tag color="red">{status}</Tag> 
      
    },
    {
      title: 'Closure date',
      dataIndex: 'closureDate',
      width: '15%',
      render: (closureDate: any) => 
      <div>
        {closureDate && format(new Date(closureDate), DATE)}
      </div>
    },
    {
      title: 'Final closure date',
      dataIndex: 'finalClosureDate',
      width: '15%',
      render: (finalClosureDate: any) => 
      <div>
        {finalClosureDate && format(new Date(finalClosureDate), DATE)}
      </div>
    },
    {
      title: 'Note',
      dataIndex: 'note',
      width: '10%',
    },
    {
      title: '',
      dataIndex: 'optional',
      width: '10%',
      render: (_: any, record: any) => (
        <>
          <div className={styles.groupSave}>
            <a onClick={() => handleEdit(record)}>
              <Svg src={iconEdit} alt="icon Edit" />
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
        <Spin spinning={isLoading || isFetching}>
          <Table
            className={styles.tableContainer}
            pagination={pagination}
            columns={columns}
            rowKey={(record: any) => record._id}
            dataSource={threads}
            onChange={onChange}
          />
        </Spin>
      </div>
    </>  
  )
}

export default ThreadTable