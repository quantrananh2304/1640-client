import React, { useState } from 'react'
import { Avatar, Card, List } from 'antd'
import { LikeOutlined,MessageOutlined, DislikeOutlined} from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';
import loadable from '~/utils/loadable';

import styles from './styles.module.scss'


const Spin = loadable(() => import('~/components/atoms/Spin'));
interface Prop {
  data?: any
}

const IdeaList = (props: Prop) => {
  const [showCommentMap, setShowCommentMap] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleShowComment = (itemId: string) => {
    setShowCommentMap({
      ...showCommentMap,
      [itemId]: !showCommentMap[itemId]
    })
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }
  return (
    <List
      className={styles.listContainer}
      itemLayout="vertical"
      size="small"
      style={{ maxHeight: '600px', overflowY: 'scroll' }}
      dataSource={props?.data}
      renderItem={(item: any) => (
        <div key={item.id}>
          <Card
            actions={[
              <LikeOutlined key="setting" />,
              <DislikeOutlined key="edit"/>,
              <MessageOutlined
                onClick={() => handleShowComment(item.id)}
                key="ellipsis"
              />,
            ]}
            extra={item.time}
          >
            <Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </Card>
          
          { showCommentMap[item.id] &&
            <Spin spinning={isLoading}>
            {item?.comment?.map((comment: any, index: number) =>
              <Meta
                key={index}
                className={styles.comment}
                avatar={<><Avatar src={comment.userAvatar}/> {comment.userName}</>}
                description={comment.content}
              />
              ) 
            }
            </Spin>
          }
        </div>
      )}
    />
  )
}

export default IdeaList