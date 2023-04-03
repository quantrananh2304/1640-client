import React, { useLayoutEffect } from 'react';
import { Button, DatePicker, Form, Modal, message } from 'antd';
import styles from './styles.module.scss'
import Input, { TextArea } from '~/components/atoms/Input';
import { SUCCESS } from '~/utils/constant';
import { createDepartment } from '~/api/department';

interface Props {
  visible?: boolean;
  setVisible: React.Dispatch<boolean>;
  department?: any;
  refetch: () => void;
  setdepartment?: React.Dispatch<any>;
}

const DepartmentModal = (props: Props) => {
  const [form] = Form.useForm();
  const {
    visible,
    setVisible,
    department,
    refetch,
    setdepartment
  } = props;
  const rules = [{ required: true, message: '' }];


  const handleClose = () => {
    if (setVisible) {
      setVisible(false);
      if (!department) {
        form.resetFields();
      }
      if (setdepartment) {
        setdepartment({})
      }
    }
  };

  useLayoutEffect(() => {
    if (department) {
      form?.setFieldsValue({
        name: department.name,
        note: department.note,
      });
    }
  }, [department]);

  const handleSave = async (formValues: any) => {
    try {
      let res: any = null;
      res = await createDepartment(formValues)
      if (res.message === SUCCESS) {
        message.success(!department ? 'Add department success' : 'Update department success')
        setVisible(false);
        refetch()
      } else {
        message.error(res.message)
      }
    } catch (error) {
      console.log(error)
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
      <h3>{department ? 'Edit department' : 'Add department'}</h3>
    </div>
    <Form
      form={form}
      layout='vertical'
      onFinish={handleSave}
      // onValuesChange={() => checkIsEdit()}
      autoComplete="off"
      className={styles.formContainer}
    >
      <Form.Item 
        label='Name' 
        name='name'
        rules={rules}
      >
        <Input
          maxLength={50}
          placeholder='Name'
        />
      </Form.Item>
      <Form.Item 
        label='Note' 
        name='note'
        rules={rules}
      >
        <Input
          maxLength={255}
          placeholder='Note'
        />
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

export default DepartmentModal