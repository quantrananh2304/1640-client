import React from 'react'
import CategoryTable from './TableCategory'
import { useCategories } from '~/hooks/useCategory'
import Filter from './Filter';

const Categories = () => {
  const { data } = useCategories();
  return (
    <>
      <Filter/>
      <CategoryTable categories={data?.data}/>
    </>
  )
}

export default Categories