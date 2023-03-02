import { Button, Form, Upload, message } from 'antd';
import React, { useMemo, useState } from 'react'
import Modal from '~/components/atoms/Modal'
import { UploadOutlined } from '@ant-design/icons';
import { ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { Option } from '~/components/atoms/Select';
import styles from './styles.module.scss'
import Input from '~/components/atoms/Input';
import Select from '~/components/atoms/Select';
import { Category, KEY_MESSAGE } from '~/utils/constant';
import storage from '~/utils/firebase';
import { setIdea } from '~/api/ideas';


interface Props {
  visible?: boolean;
  setVisible: React.Dispatch<boolean>;
  userData?: any;
  afterSuccess?: () => void;
}

const ModalIdeas = (props: Props) => {
  const [form] = Form.useForm();
  const {
    visible,
    setVisible,
    userData,
    afterSuccess,
  } = props;

  const [metaData, setMetaData] = useState({});
  const rules = [{ required: true, message: '' }];

  const categoryOption = useMemo(() => Object.values(Category)
  // render options gender
  .map((item: any, index) => (
    { id: index, name: item, }
  )), []);

  const handleClose = () => {
    if (setVisible) {
      setVisible(false);
    }
  };

  const uploadFileToFirebase = async (doc: any) => {
    const file = doc?.file;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    let metadata: any;
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // const progress = Math.round(
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        //   );      
        const { metadata: uploadMetadata } = snapshot;
        // metadata.contentType
        // metadata.name
        if (uploadMetadata) {
          metadata = {
            name: uploadMetadata.name,
            contentType: uploadMetadata.contentType
          }
        }
      },
      (error: any) => {
        message.error({
          content: error,
          key: KEY_MESSAGE
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          const result = {
            ...metadata,
            url: downloadUrl
          };
          setMetaData(result);
        });
      }  
    );
  }

  const handleSave = async (formValues: any) => {
    try {
      let res: any = null;
      const {document, ...rest} = formValues;
      const fmData = {
        ...rest,
        documents: [metaData]
      }
      // res = await setIdea(fmData)
      console.log (res)
    } catch (error) {
      
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
      <h3>Upload Idea</h3>
    </div>
    <Form
      form={form}
      layout='vertical'
      onFinish={handleSave}
      autoComplete="off"
      className={styles.formContainer}
    >
      <Form.Item 
        label='Title'
        name='title'
        rules={rules}
      >
        <Input
          maxLength={50}
          placeholder='Title'
        />
      </Form.Item>
      <Form.Item 
        label='Description'
        name='description'
        rules={rules}
      >
        <Input
          maxLength={50}
          placeholder='Description'
        />
      </Form.Item>
      <Form.Item
        label='Document'
        name='document'
        rules={rules}
      >
        <Upload
          onChange={(info) => info.file.status = 'done'}
          customRequest={(file: any ) => uploadFileToFirebase(file)}
        >
          <Button icon={<UploadOutlined />}>Upload Ideas</Button>
        </Upload>
      </Form.Item>
      <Form.Item
        label='Categoty'
        name='category'
        rules={rules}
      >
        <Select
          mode='multiple'
        >
          {categoryOption?.map((item: any) =>
            <Option key={item.id} value={item.id}>{item.name}</Option>
          )}
        </Select>
      </Form.Item>
      <Form.Item
        label='Thread'
        name='thread'
        // rules={rules}
      >
        <Select></Select>
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

export default ModalIdeas