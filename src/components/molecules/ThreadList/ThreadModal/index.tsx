import React, { useLayoutEffect } from 'react';
import { Button, DatePicker, Form, Modal, message } from 'antd';
import styles from './styles.module.scss'
import Input, { TextArea } from '~/components/atoms/Input';
import { SUCCESS } from '~/utils/constant';
import { createThread } from '~/api/threads';

interface Props {
  visible?: boolean;
  setVisible: React.Dispatch<boolean>;
  thread?: any;
  refetch: () => void;
  setThread?: React.Dispatch<any>;
}

const ThreadModal = (props: Props) => {
  const [form] = Form.useForm();
  const {
    visible,
    setVisible,
    thread,
    refetch,
    setThread
  } = props;
  const rules = [{ required: true, message: '' }];


  const handleClose = () => {
    if (setVisible) {
      setVisible(false);
      if (!thread) {
        form.resetFields();
      }
      if (setThread) {
        setThread({})
      }
    }
  };

  useLayoutEffect(() => {
    if (thread) {
      form?.setFieldsValue({
        name: thread.name,
        description: thread.description,
        closureDate: thread.closureDate,
        finalClosureDate: thread.finalClosureDate,
        note: thread.note,
      });
    }
  }, [thread]);

  const handleSave = async (formValues: any) => {
    try {
      let res: any = null;
      res = await createThread(formValues)
      if (res.message === SUCCESS) {
        message.success(!thread ? 'Add thread success' : 'Update thread success')
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
      <h3>{thread ? 'Edit thread' : 'Add thread'}</h3>
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
          placeholder='Enter thread name'
        />
      </Form.Item>
      <Form.Item 
        label='Description' 
        name='description'
        rules={rules}
      >
        <Input
          maxLength={255}
          placeholder='Description'
        />
      </Form.Item>
      <Form.Item 
        label='Closure date' 
        name='closureDate'
        // rules={rules}
      >
        <DatePicker
        />
      </Form.Item>
      <Form.Item 
        label='Final closure date' 
        name='finalClosureDate'
        // rules={rules}
      >
        <DatePicker
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

export default ThreadModal