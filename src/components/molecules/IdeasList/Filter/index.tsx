import React, { useCallback, useMemo, useState } from 'react';
import { Button, Form, Upload, UploadProps, message } from 'antd';

import { Option } from '~/components/atoms/Select';

import Svg from '~/components/atoms/Svg';
import loadable from '~/utils/loadable';
import iconPlus from '~/assets/images/iconPlus.svg';
import { UploadOutlined } from '@ant-design/icons';
import storage from '~/utils/firebase';
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import styles from './styles.module.scss';
import { KEY_MESSAGE, SortIdeas } from '~/utils/constant';
import ModalIdeas from '../ModalIdeas';

const Select = loadable(() => import('~/components/atoms/Select'));

interface Props {
  afterSuccess?: () => void;
  onChange: (value: any) => void;
}

const Filter = (props: Props) => {
  const {afterSuccess, onChange} = props;

  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const sortOption = useMemo(() => Object.entries(SortIdeas)
  // render options sort by
  .map((item: any, index) => (
    { id: index, name: item[1], value: item[0] }
  )), []);
  
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
              form={form}
              onValuesChange={handleValuesChange}
            >
              <div className={styles.filterWrapper}>
                <Form.Item name='sort'>
                  <Select
                    className={styles.selectSort}
                    placeholder="Sort ideas"
                  >
                  {sortOption?.map((item: any) =>
                    <Option key={item.id} value={item.value}>{item.name}</Option>
                  )}
                  </Select>
                </Form.Item>
              </div>
            </Form>
            <Button className={styles.btnAdd} type="primary" onClick={showAddModal}>
              <Svg className={styles.iconPlus} src={iconPlus} alt="iconPlus" />
              Add new idea
            </Button>
          </div>
        </div>
      </div>
      <ModalIdeas
        visible={isModalVisible}
        setVisible={setIsModalVisible}
        // afterSuccess={}
      />
    </>
  );
};

export default Filter;
