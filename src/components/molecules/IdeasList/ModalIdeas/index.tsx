import React, { useMemo, useState } from 'react';
import { Button, Checkbox, Form, Switch, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { ref, getDownloadURL, uploadBytesResumable, getMetadata } from "firebase/storage";
import { Option } from '~/components/atoms/Select';
import { PARAMS_GET_ALL, SUCCESS, termAndCondition } from '~/utils/constant';
import { setIdea } from '~/api/ideas';
import { useCategories } from '~/hooks/useCategory';
import { useThread } from '~/hooks/useThread';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

import storage from '~/utils/firebase';
import loadable from '~/utils/loadable';
import styles from './styles.module.scss'

const Select = loadable(() => import('~/components/atoms/Select'));
const Input = loadable(() => import('~/components/atoms/Input'));
const Modal = loadable(() => import('~/components/atoms/Modal'));

interface Props {
  visible?: boolean;
  setVisible: React.Dispatch<boolean>;
  userData?: any;
  afterSuccess?: () => void;
  campaign?: string;
}

const ModalIdeas = (props: Props) => {
  const [form] = Form.useForm();
  const {
    visible,
    setVisible,
    afterSuccess,
    campaign
  } = props;

  const rules = [{ required: true, message: '' }];
  const { data , isLoading: loadingCategories, isFetching: fetchingCategories } = useCategories(PARAMS_GET_ALL);
  const categories = data?.data?.categories;
  const [showModalTerms, setShowModalTerms] = useState(false)
  const [agreeTerm, setAgreeTerm] = useState(false)
  const {data: threadList, isLoading: loadingThread, isFetching: fetchingThread} = useThread(PARAMS_GET_ALL);
  const dataThread = threadList?.data?.threads;
  const [fileList, setFileList] = useState<any>([]);
  const [metadataList, setMetadataList] = useState<any>([]);
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

  const handleClose = () => {
    if (setVisible) {
      setVisible(false);
    }
  };

  const onCheckBoxChange = (e: CheckboxChangeEvent) => {
    setAgreeTerm(e.target.checked)
  };

  const handleSave = async (formValues: any) => {
    if (Object.keys(metadataList).length === 0) {
      return message.error('Please upload your document')
    }
    if (!agreeTerm) {
      return message.warning(`You haven't agreed to the terms and conditions yet`)
    }
    try {
      let res: any = null;
      const {document, isAnonymous, ...rest} = formValues;
      const fmData = {
        isAnonymous: isAnonymous ? isAnonymous : false,
        ...rest,
        documents: metadataList
      }
      res = await setIdea(fmData)
      if (res.message === SUCCESS) {
        message.success('Upload idea success')
        if (afterSuccess) {
          afterSuccess()
        }
        setVisible(false)
      } else {
        message.error(res.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const uploadFileToFirebase = async (file: any, onSuccess: any, onError: any, onProgress: any) => {
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress({ percent: progress.toFixed(2) });
      },
      (error) => {
        onError(error);
      },
      async () => {
        const snapshot = await uploadTask;
        const metadata = await getMetadata(storageRef);
        const result = {
          name: metadata.name,
          contentType: metadata.contentType,
          url: await getDownloadURL(snapshot.ref)
        };
        setMetadataList((prevState: any) => [...prevState, result]);
        onSuccess(result);
      }
    );
  };

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
      initialValues={{
        thread: campaign || null
      }}
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
      <div className={styles.uploadBtn}>
      <Upload
        multiple={true}
        customRequest={({ file, onSuccess, onError, onProgress }) => uploadFileToFirebase(file, onSuccess, onError, onProgress)}
        onChange={(info) => {
          const fileList = info.fileList.map(file => {
            if (file.status === 'done') {
              return {
                ...file,
                url: file.response.url
              }
            }
            return file;
          });
          setFileList(fileList);
        }}
      >
        <Button icon={<UploadOutlined />}>Upload Ideas</Button>
      </Upload>
      </div>
      <Form.Item
        label='Category'
        name='category'
        rules={rules}
      >
        <Select
          placeholder={'Select category'}
          loading={loadingCategories || fetchingCategories}
        >
          {categoryOption?.map((item: any) =>
            <Option key={item.id} value={item.id}>{item.name}</Option>
          )}
        </Select>
      </Form.Item>
      <Form.Item
        label='Campaign'
        name='thread'
        rules={rules}
      >
        <Select
          placeholder={'Select campaign'}
          loading={loadingThread || fetchingThread}
          disabled={Boolean(campaign)}
        >
          {threadOption?.map((item: any) =>
            <Option key={item.id} value={item.id}>{item.name}</Option>
          )}
        </Select>
      </Form.Item>

      <Form.Item
        name='isAnonymous'
        label='Anonymous'
        valuePropName='checked'
      >
        <Switch
        />
      </Form.Item>

      <div className={styles.checkbox}>
        <Checkbox
          onChange={onCheckBoxChange}
        >
          Agree terms and conditions
        </Checkbox>
        <a
          onClick={() => setShowModalTerms(true)}
        >
          Read here
        </a>
      </div>
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
    <Modal
      open={showModalTerms}
      centered
      footer={false}
      closable
      onCancel={() => setShowModalTerms(false)}
      className={styles.modalTerm}
    >
      <div>
        <p className='m-0'>{termAndCondition}</p>
      </div>
    </Modal>
    </Modal>
  )
}

export default ModalIdeas