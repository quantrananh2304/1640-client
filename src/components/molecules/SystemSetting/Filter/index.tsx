import React, { useState } from 'react';
import { Button, Form } from 'antd';

import { Option } from '~/components/atoms/Select';

import Svg from '~/components/atoms/Svg';
import loadable from '~/utils/loadable';
import iconPlus from '~/assets/images/iconPlus.svg';

import styles from './styles.module.scss';
import AccountModal from '../ModalAccount';


const Select = loadable(() => import('~/components/atoms/Select'));

interface Props {
  afterSuccess?: () => void;
}

const Filter = (props: Props) => {
  const {afterSuccess} = props;

  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showAddModal = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <div className={styles.memberHead}>
        <div className={styles.contentWrapper}
        >
          <div className={styles.optionsWrapper}>
            <Form
              form={form}
              // onValuesChange={handleValuesChange}
            >
              <div className={styles.filterWrapper}>
                <Form.Item name='lineId'>
                  <Select
                    className={styles.selectProject}
                  >
                
                  </Select>
                </Form.Item>
                <Form.Item name='status'>
                  <Select
                    className={styles.selectStatus}
                  >
                  </Select>
                </Form.Item>
              </div>
            </Form>
              <Button className={styles.btnAdd} type="primary" onClick={showAddModal}>
                <Svg className={styles.iconPlus} src={iconPlus} alt="iconPlus" />
                Add new account
              </Button>
          </div>
        </div>
      </div>
      <AccountModal
        visible={isModalVisible}
        setVisible={setIsModalVisible}
      />
    </>
  );
};

export default Filter;
