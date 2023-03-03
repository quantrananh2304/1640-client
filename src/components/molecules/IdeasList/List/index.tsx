import React, { useState } from 'react'
import { Avatar, Card, Divider, List, Statistic } from 'antd'
import { LikeOutlined,MessageOutlined, DislikeOutlined} from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';
import loadable from '~/utils/loadable';

import styles from './styles.module.scss'
import { format } from 'date-fns';
import { DATE } from '~/utils/constant';


const Spin = loadable(() => import('~/components/atoms/Spin'));
interface Prop {
  dataIdeas?: any;
  isLoading?: boolean;
  isFetching?: boolean;
}

const IdeaList = (props: Prop) => {
  const {dataIdeas, isFetching, isLoading} = props;
  const [showCommentMap, setShowCommentMap] = useState<any>({})
  const [isLoadingComment, setIsLoadingComment] = useState(false)

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
                  prefix={<LikeOutlined />}
                  valueStyle={{fontSize: '16px'}}
                />,
                <Statistic
                  value={item.dislikeCount}
                  prefix={<DislikeOutlined />}
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
                // <DislikeOutlined key="edit"/>,
                // <MessageOutlined
                //   onClick={() => handleShowComment(item.id)}
                //   key="ellipsis"
                // />,
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