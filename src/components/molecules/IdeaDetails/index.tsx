import React, { useState } from 'react'
import { Avatar, Button, Card, Form, List, Spin, Statistic, message } from 'antd';
import { compareAsc, format } from 'date-fns';
import { DATE, SUCCESS } from '~/utils/constant';
import { MessageOutlined, EyeOutlined } from '@ant-design/icons';
import { DownloadOutlined } from '@ant-design/icons'
import { useDetailIdea } from '~/hooks/useIdeas';
import { TextArea } from '~/components/atoms/Input';
import { setComment } from '~/api/ideas';

import wordFile from '~/assets/images/file-word-solid.svg'
import pdfFile from '~/assets/images/file-pdf-solid.svg'
import Meta from 'antd/es/card/Meta';
import Svg from '~/components/atoms/Svg';
import styles from './styles.module.scss';
import loadable from '~/utils/loadable';


const Filter = loadable(() => import('~/components/molecules/IdeaDetails/Filter'));

interface Props {
  ideaId: any;
}

const IdeaDetails = (props: Props) => {
  const {ideaId} = props;
  const {data, isLoading, isFetching, refetch} = useDetailIdea({ideaId: ideaId})
  const dataIdea = data?.data;
  const [form] = Form.useForm();

  const [showComment, setShowComment] = useState(false)
  const handleShowComment = () => {
    setShowComment(!showComment)
    form.resetFields()
  }

  const handleKeyPress = (event: any) => {

    if (event.key === "Enter") {
      form.submit();
    }
  }
  
  const handleComment = async (formValues: any) => {
    const res = await setComment(ideaId, formValues);
    if (res.message === SUCCESS) {
      message.success('Comment success')
      refetch()
      form.resetFields()
    } else {
      message.error(res.message)
    }
  }
  return (
    <>
      <Spin spinning={isLoading || isFetching}>
        <Filter
          idea={dataIdea}
        />
        <div
          className={styles.container}
        >
          <div className={styles.contentWrapper}>
            <div className={styles.infoContainer}>
            <div>
              <Card
                className='mt-2'
                headStyle={{border: 'none'}}
                actions={[ 
                  <Statistic
                    value={dataIdea?.commentsCount}
                    valueStyle={{fontSize: '16px'}}
                    prefix={
                      <MessageOutlined 
                        onClick={() => handleShowComment()}
                      />
                    } 
                  />,
                ]}
                // extra={format(new Date(item.createdAt), DATE)}
                extra={
                  <div className={styles.extraGroup}>
                    <EyeOutlined /> {dataIdea?.viewCount}
                  </div>

                }
              >
                <Meta
                  avatar={<Avatar size={42} src={'https://joesch.moe/api/v1/random'}/>}
                  title={dataIdea?.title}
                  description={(
                    <>
                      <div className={styles.userIdea}>{dataIdea?.updatedBy?.firstName} {dataIdea?.updatedBy?.lastName} - {dataIdea ? format(new Date(dataIdea?.createdAt), DATE) : '-'}</div>
                      <div>{dataIdea?.description}</div>
                    </>
                  )}
                />
                {dataIdea?.content}
              </Card>
              
              { showComment &&
                  <div className={styles.commentContainer}>
                  {dataIdea?.comments?.map((comment: any) =>
                    <Meta
                      key={comment._id}
                      className={styles.comment}
                      avatar={<><Avatar src={'https://joesch.moe/api/v1/random'}/> <strong>{comment.createdBy?.firstName} {comment.createdBy?.lastName}</strong></>}
                      description={<p className={styles.commentContent}>{comment.content}</p>}
                    />
                    ) 
                  }
                  { (compareAsc(new Date(dataIdea?.thread?.finalClosureDate), new Date()) >= 0 ) ?
                    <div className={styles.commentArea}>
                    <Form
                      form={form}
                      layout='vertical'
                      onFinish={handleComment}
                      key={dataIdea._id}
                    >
                      <Form.Item
                        name='content'
                      >
                        <TextArea
                          className='mt-2'
                          placeholder='Enter your comment'
                          onKeyPress={(e: any) => handleKeyPress(e)}
                        />
                      </Form.Item>
                    </Form>
                    </div>
                    : null
                  }
                  </div>
              }
            </div> 
            </div>
          </div>
            <Card className={styles.listFile}>
            <Button className={styles.btnAdd}>
              <DownloadOutlined />
              Download file
            </Button>
            <List
              grid={{ gutter: 16, column: 4 }}
              dataSource={dataIdea?.documents}
              renderItem={((item: any) => (
                <List.Item>
                  <Card>
                    { ((item.name.split('.').pop()) === 'docx') ?
                      <div className='d-flex justify-content-center'>
                        <Svg style={{width: 36}} src={wordFile} alt={item.name}/>
                        <p>{item.name}</p>
                      </div>
                      :
                      <div>
                        <Svg style={{width: 36}} src={pdfFile} alt={item.name}/>
                        <p>{item.name}</p>
                      </div>
                    }
                  </Card>
                </List.Item>
              ))}
            />
            </Card>
        </div>
      </Spin>
    </>
  )
}

export default IdeaDetails