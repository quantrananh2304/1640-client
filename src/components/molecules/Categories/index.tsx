import React, { useState } from 'react'
import CategoryTable from './TableCategory'
import { useCategories } from '~/hooks/useCategory'
import Filter from './Filter';

const Categories = () => {
  const [params, setParams] = useState({
    page: 1,
    limit: 5,
    sort: 'NAME_DESC'
  })
  const { data, isLoading, isFetching, refetch } = useCategories(params);
  return (
    <>
      <Filter refetch={refetch}/>
      <CategoryTable  
        categories={data?.data?.categories}
        refetch={refetch}  
        isLoading={isLoading}
        isFetching={isFetching}
        setParams={setParams}
      />
    </>
  )
}

export default Categories