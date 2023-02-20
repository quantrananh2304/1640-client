import React from 'react'
import IdeaList from './List'
import Filter from './Filter';

const IdeasList = () => {
  const data = Array.from({ length: 23 }).map((_, i) => ({
    id: i,
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://joesch.moe/api/v1/random',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    comment: Array.from({ length: 4 }).map((_, i) => ({
        id: i,
        time: `${i}/01/2023`,
        content:
          'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        userName: `user ${i}`,
        userId: 1,
        userAvatar: 'https://joesch.moe/api/v1/random',
      }))
  }));
  return (
    <>
      <Filter/>
      <IdeaList data={data}/>
    </>
  )
}

export default IdeasList