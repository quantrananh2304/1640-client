import React, { useLayoutEffect } from 'react';
import { Button, DatePicker, Form, Modal } from 'antd';
import styles from './styles.module.scss'
import Input, { TextArea } from '~/components/atoms/Input';

interface Props {
  visible?: boolean;
  setVisible: React.Dispatch<boolean>;
  category?: any;
  afterSuccess?: () => void;
  setCategory?: React.Dispatch<any>;
}

const CategoryModal = (props: Props) => {
  const [form] = Form.useForm();
  const {
    visible,
    setVisible,
    category,
    afterSuccess,
    setCategory
  } = props;

  const handleClose = () => {
    if (setVisible) {
      setVisible(false);
      if (!category) {
        form.resetFields();
      }
      if (setCategory) {
        setCategory({})
      }
    }
  };

  useLayoutEffect(() => {
    if (category) {
      form?.setFieldsValue({
          name: category.name,
          // date: new Date(category.date),
          note: category.note,
      });
    }
  }, [category]);

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
      <h3>{category?.id ? 'Edit category' : 'Add category'}</h3>
    </div>
    <Form
      form={form}
      layout='vertical'
      // onFinish={handleSave}
      // onValuesChange={() => checkIsEdit()}
      autoComplete="off"
      className={styles.formContainer}
    >
      <Form.Item label='Name' name='name'>
        <Input
          placeholder='Enter category name'
        />
      </Form.Item>
      <Form.Item label='Date' name='date'>
        <DatePicker/>
      </Form.Item>
      <Form.Item label='Note' name='note'>
        <TextArea
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

export default CategoryModal