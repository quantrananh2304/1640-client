import React from 'react'
import { Form, message } from 'antd';
import { updateComment } from '~/api/ideas';
import { TextArea } from '~/components/atoms/Input';
import Modal from '~/components/atoms/Modal'
import { SUCCESS } from '~/utils/constant';

interface Props {
  commentId: string;
  ideaId: string;
  visible: boolean,
  setVisivle: (value: boolean) => void;
  refetch: () => void;
}

const ModalEditComment = (props: Props) => {
  const {visible, setVisivle, refetch, commentId, ideaId} = props;
  const [form] = Form.useForm();
  const rules = [{ required: true, message: '' }];

  const handleEnter = () => {
    if (form && commentId && commentId) {
      form.submit()
    }
  }

  const handleEditComment = async (formValues: any) => {
    const res = await updateComment(ideaId, commentId, formValues)
    if (res.message === SUCCESS) {
      message.success('Update comment success')
      refetch();
      setVisivle(false);
      form.resetFields();
    } else {
      message.error(res.message)
    }
  }
  return (
    <Modal
      open={visible}
      onCancel={() => setVisivle(false)}
      centered
      maskClosable
      footer={false}
    >
      <div>
        <h3>Edit comment</h3>
        <Form
          form={form}
          autoComplete='off'
          onFinish={handleEditComment}
        >
          <Form.Item
            rules={rules}
            name='content'
          >
            <TextArea
              onPressEnter={handleEnter}
              placeholder={`What's in your mind?`}
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}

export default ModalEditComment