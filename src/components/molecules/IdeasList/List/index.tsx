import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Card,
  Dropdown,
  Form,
  List,
  Popover,
  Statistic,
  Switch,
  message } from 'antd';
import {
  LikeOutlined,
  MessageOutlined,
  DislikeOutlined,
  CheckOutlined,
  MoreOutlined,
  CloseOutlined,
  EllipsisOutlined,
  LikeTwoTone,
  DislikeTwoTone} from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';
import loadable from '~/utils/loadable';
import avatar from '~/assets/images/iconAvatar.svg'
import { compareAsc, format } from 'date-fns';
import { DATE, SUCCESS } from '~/utils/constant';
import { deleteComment, setComment, updateAction } from '~/api/ideas';
import { useAppSelector } from '~/store';
import { TextArea } from '~/components/atoms/Input';
import { Link } from 'react-router-dom';
import userUnknown from '~/assets/images/user-secret-solid.svg'
import styles from './styles.module.scss'
import ModalIdeas from '../ModalIdeas';

const Spin = loadable(() => import('~/components/atoms/Spin'));
const ModalEditComment = loadable(() => import('~/components/molecules/IdeasList/ModalEditComment'));
interface Prop {
  dataIdeas?: any;
  isLoading?: boolean;
  isFetching?: boolean;
  refetch: () => void;
}

const IdeaList = (props: Prop) => {
  const {dataIdeas, isFetching, isLoading, refetch} = props;
  const userData = useAppSelector((state) => state.userInfo.userData);
  const [showCommentMap, setShowCommentMap] = useState<any>({});
  const [ideaId, setIdeaId] = useState('');
  const [isLoadingComment, setIsLoadingComment] = useState(false);
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState<any>([]);
  const [anonymousComment, setSnonymousComment] = useState(false);
  const [visibleModalEditComment, setVisibleModalEditComment] = useState(false);
  const [visibleModalEditIdea, setVisibleModalEditIdea] = useState(false);
  const [itemEditComment, setItemEditComment] = useState<any>({});
  const [itemEditIdea, setItemEditIdea] = useState<any>({});

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
    let updatedLike = post.like ? [...post.like] : [];
    let updatedDislike = post.dislike ? [...post.dislike] : [];

    const userLiked = updatedLike.find(
      (item: any) => item.user?._id === userData?._id
    );
    const userDisliked = updatedDislike.find(
      (item: any) => item.user?._id === userData?._id
    );

    if (action === "like") {
      if (!userLiked && !userDisliked) {
        newLike += 1;
        updatedLike.push({ user: { _id: userData?._id } });
      } else if (userLiked) {
        newLike -= 1;
        const userIndex = updatedLike.findIndex(
          (item: any) => item.user?._id === userData?._id
        );
        updatedLike.splice(userIndex, 1);
      } else if (!userLiked && userDisliked) {
        newLike += 1;
        newDislike -= 1;
        const userIndex = updatedDislike.findIndex(
          (item: any) => item.user?._id === userData?._id
        );
        updatedDislike.splice(userIndex, 1);
        updatedLike.push({ user: { _id: userData?._id } });
      }
    } else {
      if (!userLiked && !userDisliked) {
        newDislike += 1;
        updatedDislike.push({ user: { _id: userData?._id } });
      } else if (userDisliked) {
        newDislike -= 1;
        const userIndex = updatedDislike.findIndex(
          (item: any) => item.user?._id === userData?._id
        );
        updatedDislike.splice(userIndex, 1);
      } else if (userLiked && !userDisliked) {
        newLike -= 1;
        newDislike += 1;
        const userIndex = updatedLike.findIndex(
          (item: any) => item.user?._id === userData?._id
        );
        updatedLike.splice(userIndex, 1);
        updatedDislike.push({ user: { _id: userData?._id } });
      }
    }

    const updatedPost = {
      ...post,
      likeCount: newLike,
      dislikeCount: newDislike,
      like: updatedLike.length > 0 ? updatedLike : undefined,
      dislike: updatedDislike.length > 0 ? updatedDislike : undefined,
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

  const handleKeyPress = (event: any, ideaId: string) => {
    setIdeaId(ideaId)
    if (event.key === "Enter") {
      form.submit();
    }
  }

  const handleComment = async (formValues: any) => {
    const commentValue = {
      ...formValues,
      isAnonymous: anonymousComment
    }
    const res = await setComment(ideaId, commentValue);
    if (res.message === SUCCESS) {
      message.success('Comment success')
      refetch()
      form.resetFields()
    } else {
      message.error(res.message)
    }
  }

  const handleEditComment = (ideaId: string, commentId: string) => {
    setItemEditComment({
      ideaId,
      commentId
    })
    setVisibleModalEditComment(true)
  }

  const handleDeleteComment = async (ideaId: string, commentId: string) => {
    const res = await deleteComment(ideaId, commentId);
    if (res.message === SUCCESS) {
      message.success('Delete comment succes')
      refetch();
    } else {
      message.error(res.message)
    }
  }

  const handleShowModalEditIdea = (idea: any) => {
    setItemEditIdea(idea)
    setVisibleModalEditIdea(true)
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
                    <Popover
                      trigger={'hover'}
                      content={(
                        item.like?.map((userLike: any) => 
                          <div key={userLike._id}>
                            {userLike.user.firstName} {userLike.user.lastName}
                          </div>
                        )
                      )}
                    >
                      <LikeTwoTone
                        onClick={() => handleLike_Dislike(item._id, 'like')}
                      />
                    </Popover>
                    :
                    <Popover
                      trigger={'hover'}
                      content={(
                        item.like?.map((userLike: any) => 
                          <div key={userLike._id}>
                            {userLike.user.firstName} {userLike.user.lastName}
                          </div>
                        )
                      )}
                    >
                      <LikeOutlined
                        onClick={() => handleLike_Dislike(item._id, 'like')}
                      />
                    </Popover>
                  }
                  valueStyle={{fontSize: '16px'}}
                />,
                <Statistic
                  value={item.dislikeCount}
                  prefix={
                    item.dislike?.find((e: any) => e.user?._id === userData?._id) ?
                    <Popover
                      trigger={'hover'}
                      content={(
                        item.dislike?.map((userDislike: any) => 
                          <div key={userDislike._id}>
                            {userDislike.user.firstName} {userDislike.user.lastName}
                          </div>
                        )
                      )}
                    >
                      <DislikeTwoTone
                        onClick={() => handleLike_Dislike(item._id, 'dislike')}
                      />
                    </Popover>
                    :
                    <Popover
                      trigger={'hover'}
                      content={(
                        item.dislike?.map((userDislike: any) => 
                          <div key={userDislike._id}>
                            {userDislike.user.firstName} {userDislike.user.lastName}
                          </div>
                        )
                      )}
                    >
                      <DislikeOutlined 
                        onClick={() => handleLike_Dislike(item._id, 'dislike')}
                      />
                    </Popover>
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
              extra={
                <div className='d-flex'>
                  <div className='mr-2'>
                    {format(new Date(item.createdAt), DATE)}
                  </div>
                  { (item.updatedBy?._id === userData?._id) ?
                    <Dropdown
                      className={styles.dropDown}
                      menu={
                        { 
                          items: [
                            {
                              label: <div onClick={() => handleShowModalEditIdea(item)}>Edit idea</div>,
                              key: '0',
                            },
                          ]  
                        }
                      } 
                      trigger={['click']}
                    >
                      <MoreOutlined style={{fontSize: 16}} />
                    </Dropdown>
                    : null
                  }
                </div>
              }
            >
              <Meta
                avatar={<Avatar size={42} src={ item.isAnonymous ? userUnknown : item.updatedBy.avatar}/>}
                title={
                  // <a href={item.href}>{item.title}</a>
                  <Link
                    to={`/ideas/lists/${item._id}`}
                  >
                    {item.title}
                  </Link>
                }
                description={(
                  <>
                    { !item.isAnonymous ?
                      <div className={styles.userIdea}>
                        {item.updatedBy?.firstName} {item.updatedBy?.lastName}
                      </div>
                      :
                      <div className={styles.userIdea}>
                        Unknown
                      </div>
                    }
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
                  <div 
                    key={comment._id}
                    className={styles.comment}
                  >
                    <Meta
                      key={comment._id}
                      avatar={
                        <>
                          <Avatar src={ comment.isAnonymous ? userUnknown : 'https://i.pravatar.cc'}/> 
                          { (comment.isAnonymous) ?
                            <strong className='ml-2'>Unknown</strong>
                            :
                            <strong className='ml-2'>
                              {comment.createdBy?.firstName} {comment.createdBy?.lastName}
                            </strong>
                          }
                        </>
                      }
                      description={<p className={styles.commentContent}>{comment.content}</p>}
                    />
                    { (comment.createdBy._id === userData?._id) ?
                      <Dropdown 
                        menu={
                          { 
                            items: [
                              {
                                label: <div onClick={() => handleEditComment(item._id, comment._id)}>Edit comment</div>,
                                key: '0',
                              },
                              {
                                type: 'divider',
                              },
                              {
                                label: <div onClick={() => handleDeleteComment(item._id, comment._id)}>Delete comment</div>,
                                key: '2',
                                danger: true,
                              },
                            ] 
                          }
                        } 
                        trigger={['click']}
                      >
                        <div
                          className={styles.commentOption}
                        >
                          <EllipsisOutlined/>
                        </div>
                      </Dropdown>
                      : null
                    }
                  </div>
                  ) 
                }
                { (compareAsc(new Date(item?.thread?.finalClosureDate), new Date()) >= 0 ) ?
                  <div className={styles.commentArea}>
                    <Form
                      form={form}
                      className={styles.formComment}
                      onFinish={handleComment}
                    >
                      <Form.Item
                        name='content'
                      >
                        <TextArea
                          className={styles.textInput}
                          placeholder={`What's in your mind?`}
                          onKeyPress={(e: any) => handleKeyPress(e, item._id)}
                        />
                      </Form.Item>
                    </Form>
                    <div
                      className={styles.anonymousMode}
                    >
                      <p style={{margin: 0}}>Amonymous</p>
                      <Switch
                        onChange={setSnonymousComment}
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                      />
                    </div>
                  </div>
                  : null
                }
                <ModalEditComment
                  visible={visibleModalEditComment}
                  setVisivle={setVisibleModalEditComment}
                  ideaId={itemEditComment?.ideaId}
                  commentId={itemEditComment?.commentId}
                  refetch={refetch}
                />  
                </div>
              </Spin>
            }
          </div>
        )}
      />
      <ModalIdeas
        visible={visibleModalEditIdea}
        setVisible={setVisibleModalEditIdea}
        idea={itemEditIdea}
        afterSuccess={refetch}
      />
    </Spin>
  )
}

export default IdeaList