import React, { useState } from 'react'

import { useIdeas } from '~/hooks/useIdeas';
import { PARAMS_FILTER } from '~/utils/constant';
import loadable from '~/utils/loadable';

const IdeaList = loadable(() => import('~/components/molecules/IdeasList/List'));
const Filter = loadable(() => import('~/components/molecules/IdeasList/Filter'));

const IdeasList = () => {
  const [params, setParams] = useState({
    ...PARAMS_FILTER,
    sort: 'POPULARITY_DESC'
  })
  const { data, isLoading, isFetching, refetch } = useIdeas(params)

  const handleFilter = (value: any) => {
    setParams({
      ...PARAMS_FILTER,
      ...value
    })
  };

  return (
    <>
      <Filter
        onChange={handleFilter}
        afterSuccess={refetch}
      />
      <IdeaList 
        dataIdeas={data?.data?.ideas}
        isLoading={isLoading}
        isFetching={isFetching}
        refetch={refetch}
      />
    </>
  )
}

export default IdeasList