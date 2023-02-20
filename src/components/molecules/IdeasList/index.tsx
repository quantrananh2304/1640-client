import React from 'react'
import IdeaList from './List'
import Filter from './Filter';
import { useIdeas } from '~/hooks/useIdeas';

const IdeasList = () => {
  const { data } = useIdeas()
  return (
    <>
      <Filter/>
      <IdeaList data={data?.data}/>
    </>
  )
}

export default IdeasList