import React, { useMemo, useState } from 'react';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import iconEdit from '~/assets/images/iconEdit.svg';
import iconDelete from '~/assets/images/iconDelete.svg';
import iconWarning from '~/assets/images/warning.svg';

import {format} from 'date-fns'
import styles from './styles.module.scss';
import Svg from '~/components/atoms/Svg';
import Spin from '~/components/atoms/Spin';
import Table from '~/components/atoms/Table';
import { COMMON_PARAMS, DATE } from '~/utils/constant';
import AccountModal from '../ModalAccount';
import { Tag } from 'antd';
import { SorterResult } from 'antd/es/table/interface';

interface Props {
  dataAccount?: any;
  isLoading?: boolean;
  isFetching?: boolean;
  setParams?: (value: any) => void
}

const TableAccount = (props: Props) => {
  const { dataAccount, isFetching, isLoading, setParams } = props;
  const dataUser = dataAccount?.users;
  const [ isModalVisible, setIsModalVisible ] = useState(false);
  const [ visibleModalConfirm, setVisibleModalConfirm ] = useState(false);
  const [ userData, setUserData ] = useState({});
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 5,
    total: 7
  });

  // useMemo(() =>
  // setPagination({
  //   total: dataAccount?.total
  // }), [dataAccount]);
  
  const handleTableChange = (
    newPagination: TablePaginationConfig,
    sorter: SorterResult<any>
  ) => {
    setPagination(newPagination);

    const paramsfilters = {
      sort: 'NAME_ASC',
      oder: sorter.order,
      page: newPagination.current,
      limit: newPagination.pageSize
    }; 
    if (setParams) {
      setParams(paramsfilters)
    }
    console.log(newPagination)
    // dispatch(setFilterTable(paramsfilters));
  };
  const handleEdit = (record: any) => {
    setUserData(record)
    setIsModalVisible(true)
  }

  const modalConfirmDelete = (record: any) => {
    //Code here
  }


  const columns: ColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '20%',
      sorter: true,
      render: (_: string, record: any) => (
        <div className='d-flex'>
          <p>{record.firstName}</p>
            &nbsp;
          <p>{record.lastName}</p>
        </div>
      )
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      width: '15%',
      sorter: true,
      render: (createdAt: string) => (
        <div>
          {
            createdAt && format(new Date(createdAt), DATE)
          }
        </div>
      )
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: true,
      width: '20%',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      width: '20%',
      render: (_: string, record: any) => (
        <Tag color="blue">{record.department.name}</Tag>
      )
    },
    {
      title: 'Role',
      dataIndex: 'role',
      width: '10%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '10%',
    },
    {
      title: '',
      dataIndex: 'optional',
      width: '5%',
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
        <Spin spinning={isLoading || isFetching}>
          <Table
            className={styles.tableContainer}
            columns={columns}
            rowKey={(record: any) => record._id}
            dataSource={dataUser}
            size='small'
            pagination={pagination}
            onChange={handleTableChange}
          />
        </Spin>
      </div>
      <AccountModal
        visible={isModalVisible}
        setVisible={setIsModalVisible}
        userData={userData}
      />
    </>  
  )
}

export default TableAccount