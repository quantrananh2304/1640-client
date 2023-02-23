import React, { useLayoutEffect, useMemo } from 'react';
import { Button, Form, Modal, message } from 'antd';
import loadable from '~/utils/loadable';

import styles from './styles.module.scss'
import { DATE, Gender } from '~/utils/constant';
import { Option } from '~/components/atoms/Select';
import { updateUserInfo } from '~/api/user';
import {format} from 'date-fns'

const Input = loadable(() => import('~/components/atoms/Input'));
const InputNumber = loadable(() => import('~/components/atoms/InputNumber'));
const Select = loadable(() => import('~/components/atoms/Select'));
const DatePicker = loadable(() => import('~/components/atoms/DatePicker'));


interface Props {
  visible?: boolean;
  setVisible: React.Dispatch<boolean>;
  userData?: any;
  afterSuccess?: () => void;
}

const ProfileModal = (props: Props) => {
  const [form] = Form.useForm();
  const {
    visible,
    setVisible,
    userData,
    afterSuccess,
  } = props;

  const genderOption = useMemo(() => Object.entries(Gender)
  // render options gender
  .map((item: any, index) => (
    { id: index, name: item[1], value: item[0] }
  )), []);

  const handleClose = () => {
    if (setVisible) {
      setVisible(false);
      form.resetFields()
    }
  };

  const handleSave = async (formValues: any) => {
    try {
      let res: any = null;
      const { dob, ...rest} = formValues
      const fmData = {
        ...rest,
        dob: format(new Date(formValues?.dob), DATE)
      }
      res = await updateUserInfo( userData?._id, fmData);
      if (res?.data) {
        message.success('User information updated successfully')
        if (afterSuccess){
          afterSuccess()
        }
        handleClose()
      }
    } catch (error: any) {
      message.error(error?.message)
    }
  }

  return (
    <Modal
      width={460}
      centered
      open={visible}
      footer={false}
      closable={false}
      className={styles.modalContainer}
    >
    <div>
      <h3>Edit infomation</h3>
    </div>
    <Form
      form={form}
      layout='vertical'
      onFinish={handleSave}
      autoComplete="off"
      className={styles.formContainer}
      initialValues={ userData &&
        { 
          firstName: userData.firstName,
          lastName: userData.lastName,
          dob: new Date(userData.dob),
          phoneNumber: userData.phoneNumber,
          address: userData.address,
          gender: userData.gender,
        }
      }
    >
      <Form.Item label='First Name' name='firstName'>
        <Input
          maxLength={50}
          placeholder='Enter first name'
        />
      </Form.Item>
      <Form.Item label='Last Name' name='lastName'>
        <Input
          maxLength={50}
          placeholder='Enter last name'
        />
      </Form.Item>
      <Form.Item label='Birth day' name='dob'>
        <DatePicker/>
      </Form.Item>
      <Form.Item label='Phone' name='phoneNumber'>
        <InputNumber/>
      </Form.Item>
      <Form.Item label='Address' name='address'>
        <Input
          maxLength={255}
          placeholder='Enter address'
        />
      </Form.Item>
      <Form.Item label='Gender' name='gender'>
        <Select
          placeholder='Select gender'
        >
          {genderOption?.map((item: any) =>
            <Option key={item.id} value={item.value}>{item.name}</Option>
          )}
        </Select>
      </Form.Item>
      <div className={styles.btnGroup}>
        <Button
          className={styles.btnClose}
          onClick={handleClose}
        >
          Close
        </Button>
        <Button
          type={'primary'}
          htmlType='submit'
        >
          Save
        </Button>                
      </div>
    </Form>
    </Modal>
  )
}

export default ProfileModal