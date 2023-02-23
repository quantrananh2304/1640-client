import React from 'react'

import { useIdeas } from '~/hooks/useIdeas';
import loadable from '~/utils/loadable';


const IdeaList = loadable(() => import('~/components/molecules/IdeasList/List'));
const Filter = loadable(() => import('~/components/molecules/IdeasList/Filter'));

const IdeasList = () => {
  const { data } = useIdeas()
  return (
    <>
      {/* <Filter/> */}
      <IdeaList data={data?.data}/>
    </>
  )
}

export default IdeasList