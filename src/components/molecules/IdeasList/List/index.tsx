import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Avatar, Button, Card, Form, List, Statistic, message } from 'antd'
import {
  LikeOutlined,
  MessageOutlined,
  DislikeOutlined,
  LikeTwoTone,
  DislikeTwoTone} from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';
import loadable from '~/utils/loadable';

import styles from './styles.module.scss'
import { format } from 'date-fns';
import { DATE, SUCCESS } from '~/utils/constant';
import { setComment, updateAction } from '~/api/ideas';
import { useAppSelector } from '~/store';
import { TextArea } from '~/components/atoms/Input';

const Spin = loadable(() => import('~/components/atoms/Spin'));
interface Prop {
  dataIdeas?: any;
  isLoading?: boolean;
  isFetching?: boolean;
  refetch: () => void;
}

const IdeaList = (props: Prop) => {
  const {dataIdeas, isFetching, isLoading, refetch} = props;
  const userData = useAppSelector((state) => state.userInfo.userData);
  const [showCommentMap, setShowCommentMap] = useState<any>({})
  const [ideaId, setIdeaId] = useState('')
  const [isLoadingComment, setIsLoadingComment] = useState(false)
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<any>([]);

  useEffect(() => {
    if (dataIdeas){
      setDataSource(dataIdeas)
    }
  }, [dataIdeas])
  
  const handleShowComment = (itemId: string) => {
    setShowCommentMap({
      // ...showCommentMap,
      [itemId]: !showCommentMap[itemId]
    })
    form.resetFields()
    setIsLoadingComment(true)

    setTimeout(() => {
      setIsLoadingComment(false)
    }, 1000)
  }

  const handleLike_Dislike = async (itemId: string, action: string) => {
    const postIndex = dataSource.findIndex((item: any) => item._id === itemId);
    if (postIndex === -1) return;
    const post = dataSource[postIndex];
    let newLike = post.likeCount;
    let newDislike = post.dislikeCount;
    const userLiked = post.like?.find((item: any) => item.user._id === userData?._id)
    const userDisliked = post.dislike?.find((item: any) => item.user._id === userData?._id)
    if (action === 'like') {
      if (!userLiked && !userDisliked) {
        newLike += 1;
      }
      else if (userLiked) {
        newLike -=1;
      } else if (!userLiked && userDisliked) {
        newLike += 1;
        newDislike -=1;
      } 
    }else {
      if (!userLiked && !userDisliked) {
        newDislike += 1;
      }
      else if (userDisliked) {
        newDislike -=1;
      } else if (userLiked && !userDisliked) {
        newLike -= 1;
        newDislike +=1;
      }
    }
    const updatedPost = {
      ...post,
      likeCount: newLike,
      dislikeCount: newDislike,
    };
    const newDataSourse = [...dataSource];
    newDataSourse[postIndex] = updatedPost;
    setDataSource(newDataSourse);
    const res = await updateAction(itemId, action)
    if (res.message === SUCCESS) {
      const updatedData = [...dataSource];
      updatedData[postIndex] = res?.data;
      setDataSource(updatedData)
    }
  };
  
  console.log(dataSource)
  // // console.log(dataSource)
  // const handleLike_Dislike = async (itemId: string, action: string) => {
  //   const res = await updateAction(itemId, action)
  //   if (res.message === SUCCESS) {
  //     refetch()
  //   }
  // }

  const handleKeyPress = (event: any, ideaId: string) => {
    setIdeaId(ideaId)
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
    <Spin spinning={isLoading || isFetching}>
      <List
        className={styles.listContainer}
        itemLayout="vertical"
        size="small"
        style={{ maxHeight: '60vh', overflowY: 'scroll' }}
        dataSource={dataSource}
        renderItem={(item: any) => (
          <div key={item._id}>
            <Card
              className='mt-2'
              headStyle={{border: 'none'}}
              actions={[
                <Statistic 
                  value={item?.likeCount}
                  prefix={
                    item.like?.find((e: any) => e.user?._id === userData?._id) ?
                    <LikeTwoTone
                      onClick={() => handleLike_Dislike(item._id, 'like')}
                    />
                    :
                    <LikeOutlined
                      onClick={() => handleLike_Dislike(item._id, 'like')}
                    />
                  }
                  valueStyle={{fontSize: '16px'}}
                />,
                <Statistic
                  value={item.dislikeCount}
                  prefix={
                    item.dislike?.find((e: any) => e.user?._id === userData?._id) ?
                    <DislikeTwoTone
                      onClick={() => handleLike_Dislike(item._id, 'dislike')}
                    />
                    :
                    <DislikeOutlined 
                      onClick={() => handleLike_Dislike(item._id, 'dislike')}
                    />
                  }
                  valueStyle={{fontSize: '16px'}}
                />,
                <Statistic
                  value={item.commentsCount}
                  valueStyle={{fontSize: '16px'}}
                  prefix={
                    <MessageOutlined 
                      onClick={() => handleShowComment(item._id)}
                    />
                  } 
                />,
              ]}
              extra={format(new Date(item.createdAt), DATE)}
            >
              <Meta
                avatar={<Avatar size={42} src={'https://joesch.moe/api/v1/random'}/>}
                title={<a href={item.href}>{item.title}</a>}
                description={(
                  <>
                    <div className={styles.userIdea}>{item.updatedBy?.firstName} {item.updatedBy?.lastName}</div>
                    <div>{item.description}</div>
                  </>
                )}
              />
              {item.content}
            </Card>
            
            { showCommentMap[item._id] &&
              <Spin spinning={isLoadingComment}>
                <div className={styles.commentContainer}>
                {item?.comments?.map((comment: any) =>
                  <Meta
                    key={comment._id}
                    className={styles.comment}
                    avatar={<><Avatar src={'https://joesch.moe/api/v1/random'}/> <strong>{comment.createdBy?.firstName} {comment.createdBy?.lastName}</strong></>}
                    description={<p className={styles.commentContent}>{comment.content}</p>}
                  />
                  ) 
                }
                <div className={styles.commentArea}>
                <Form
                  form={form}
                  layout='vertical'
                  onFinish={handleComment}
                  key={item._id}
                >
                  <Form.Item
                    name='content'
                  >
                    <TextArea
                      className='mt-2'
                      placeholder='Enter your comment'
                      onKeyPress={(e: any) => handleKeyPress(e, item._id)}
                    />
                  </Form.Item>
                </Form>
                </div>
                </div>
              </Spin>
            }
          </div>
        )}
      />
    </Spin>
  )
}

export default IdeaList