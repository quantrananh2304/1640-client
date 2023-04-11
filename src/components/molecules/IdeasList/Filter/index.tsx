import React, { useCallback, useMemo, useState } from 'react';
import { Button, Dropdown, Form, Row } from 'antd';
import { Option } from '~/components/atoms/Select';
import { PARAMS_GET_ALL, SortIdeas, UserRole } from '~/utils/constant';
import { useCategories } from '~/hooks/useCategory';
import { useThread } from '~/hooks/useThread';
import { DownloadOutlined, ExportOutlined, MenuOutlined } from '@ant-design/icons';

import Svg from '~/components/atoms/Svg';
import loadable from '~/utils/loadable';
import iconPlus from '~/assets/images/iconPlus.svg';

import styles from './styles.module.scss';
import { useDepartment } from '~/hooks/useDepartment';
import { useAppSelector } from '~/store';
import { Authorization } from '~/wrapper/Authorization';

const Select = loadable(() => import('~/components/atoms/Select'));
const ModalIdeas = loadable(() => import('~/components/molecules/IdeasList/ModalIdeas'));

interface Props {
  afterSuccess?: () => void;
  onChange: (value: any) => void;
}

const Filter = (props: Props) => {
  const {afterSuccess, onChange} = props;

  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const userData = useAppSelector((state) => state.userInfo.userData);
  const userRole = userData?.role;
  
  const { data: categoryList , isLoading: loadingCategories, isFetching: fetchingCategories } = useCategories(PARAMS_GET_ALL);
  const categories = categoryList?.data?.categories;
  const {data: threadList, isLoading: loadingThread, isFetching: fetchingThread} = useThread(PARAMS_GET_ALL);
  const dataThread = threadList?.data?.threads;
  
  const {data: departmentList, isLoading: loadingDepartment, isFetching: fetchingDepartment} = useDepartment(PARAMS_GET_ALL);
  const dataDepartment = departmentList?.data?.departments;

  const sortOption = useMemo(() => Object.entries(SortIdeas)
  // render options sort by
  .map((item: any, index) => (
    { id: index, name: item[1], value: item[0] }
  )), []);

  const categoryOption = useMemo(() => 
  // render options category
  categories?.map((item: any) => (
    { id: item._id, name: item.name, }
  )), [categories]);

  const threadOption = useMemo(() => 
  // render options campaign
  dataThread?.map((item: any) => (
    { id: item._id, name: item.name, }
  )), [dataThread]);

  const departmentOption = useMemo(() => 
  // render options department
  dataDepartment?.map((item: any) => (
    { id: item._id, name: item.name, }
  )), [dataDepartment ])

  const showAddModal = () => {
    setIsModalVisible(true);
  };

  const handleValuesChange = useCallback((_: any, formValues: any) => {
    onChange(formValues);
  }, [onChange]);
  

  return (
    <>
      <div className={styles.container}>
        <div className={styles.contentWrapper}
        >
          <div className={styles.optionsWrapper}>
            <Form
              className={styles.optionsWrapperForm}
              form={form}
              onValuesChange={handleValuesChange}
              initialValues={{
                sort: sortOption[0].value
              }}
            >
              <div className={styles.filterWrapper}>
                <Form.Item name='sort' className={styles.formItem}>
                  <Select
                    className={styles.selectSort}
                    placeholder="Sort ideas"
                  >
                  {sortOption?.map((item: any) =>
                    <Option key={item.id} value={item.value}>{item.name}</Option>
                  )}
                  </Select>
                </Form.Item>
                <Form.Item name='thread' className={styles.formItem}>
                  <Select
                    className={styles.filterOption}
                    placeholder="Select Campaign"
                    mode='multiple'
                    loading={loadingThread || fetchingThread}
                  >
                  {threadOption?.map((item: any) =>
                    <Option key={item.id} value={item.id}>{item.name}</Option>
                  )}
                  </Select>
                </Form.Item>
                <Form.Item name='category' className={styles.formItem}>
                  <Select
                    className={styles.filterOption}
                    placeholder="Select category"
                    mode='multiple'
                    loading={loadingCategories || fetchingCategories}
                  >
                  {categoryOption?.map((item: any) =>
                    <Option key={item.id} value={item.id}>{item.name}</Option>
                  )}
                  </Select>
                </Form.Item>
                <Form.Item name='department' className={styles.formItem}>
                  <Select
                    className={styles.filterOption}
                    placeholder="Select department"
                    loading={loadingDepartment || fetchingDepartment}
                  >
                  {departmentOption?.map((item: any) =>
                    <Option key={item.id} value={item.id}>{item.name}</Option>
                  )}
                  </Select>
                </Form.Item>
              </div>
            </Form>
            <Authorization roles={[UserRole.Staff]}>
              <Button className={styles.btnAdd} style={{alignSelf: 'center'}} type="primary" onClick={showAddModal}>
                <Svg className={styles.iconPlus} src={iconPlus} alt="iconPlus" />
              </Button>
            </Authorization>
            <Authorization roles={[UserRole.QA_M]}>
              <Dropdown
                menu={
                  { 
                    items: [
                      {
                        label: 
                          <div>
                            <ExportOutlined/>
                            <span className='ml-2'>Export ideas</span>
                          </div>
                        ,
                        key: 'export',
                      },
                      {
                        label:
                          <div>
                            <DownloadOutlined/>
                            <span className='ml-2'>Download all files</span>
                          </div>
                        ,
                        key: 'download',
                      },
                    ] 
                  }
                } 
              >
                <MenuOutlined style={{alignSelf: 'center'}} />
              </Dropdown>
            </Authorization>
          </div>
        </div>
      </div>
      <ModalIdeas
        visible={isModalVisible}
        setVisible={setIsModalVisible}
        afterSuccess={afterSuccess}
      />
    </>
  );
};

export default Filter;
