import React, { useState } from 'react'

import { useIdeas } from '~/hooks/useIdeas';
import loadable from '~/utils/loadable';


const IdeaList = loadable(() => import('~/components/molecules/IdeasList/List'));
const Filter = loadable(() => import('~/components/molecules/IdeasList/Filter'));

const IdeasList = () => {
  const [Params, setParams] = useState({
    page: 1,
    limit: 5,
    sort: 'POPULARITY_DESC'
  })
  const { data, isLoading, isFetching } = useIdeas(Params)
  return (
    <>
      <Filter/>
      <IdeaList 
        dataIdeas={data?.data?.ideas}
        isLoading={isLoading}
        isFetching={isFetching}
      />
    </>
  )
}

export default IdeasList