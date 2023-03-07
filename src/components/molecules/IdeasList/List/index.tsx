import React, { useLayoutEffect, useState } from 'react'
import { Avatar, Card, List, Statistic } from 'antd'
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
import { updateAction } from '~/api/ideas';
import { useAppSelector } from '~/store';


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
  const [isLoadingComment, setIsLoadingComment] = useState(false)
  const [userLike, setUserLike] = useState()
  const [userDislike, setUserDislike] = useState()

  // useLayoutEffect(() => {
  //   if (userData && dataIdeas){
  //     const userL = dataIdeas.like?.find((item: any) => console.log(item.user?._id === userData._id))
  //     const userDL = dataIdeas.dislike?.find((item: any) => console.log(item.user?._id === userData._id))
  //     console.log(userL, user)
  //   }

  // }, [userData, dataIdeas])
  const handleShowComment = (itemId: string) => {
    setShowCommentMap({
      ...showCommentMap,
      [itemId]: !showCommentMap[itemId]
    })
    setIsLoadingComment(true)

    setTimeout(() => {
      setIsLoadingComment(false)
    }, 2000)
  }

  const handleLike_Dislike = async (itemId: string, action: string) => {
    const res = await updateAction(itemId, action)
    if (res.message === SUCCESS) {
      refetch()
    }
  }
  return (
    <Spin spinning={isLoading || isFetching}>
      <List
        className={styles.listContainer}
        itemLayout="vertical"
        size="small"
        style={{ maxHeight: '60vh', overflowY: 'scroll' }}
        dataSource={dataIdeas}
        renderItem={(item: any) => (
          <div key={item._id}>
            <Card
              className='mt-2'
              actions={[
                <Statistic 
                  value={item?.likeCount} 
                  prefix={
                    item.like?.find((e: any) => e.user?._id === userData?._id) ?
                    <LikeTwoTone
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
                    <DislikeTwoTone/>
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
                avatar={<Avatar src={'https://joesch.moe/api/v1/random'} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
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
                    avatar={<><Avatar src={'https://joesch.moe/api/v1/random'}/> {comment.createdBy?.firstName} {comment.createdBy?.lastName}</>}
                    description={comment.content}
                  />
                  ) 
                }
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