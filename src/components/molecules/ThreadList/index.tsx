import React, { useState } from 'react'
import Filter from './Filter'
import ThreadTable from './TableThread'
import { COMMON_PARAMS } from '~/utils/constant'
import { useThread } from '~/hooks/useThread'

const Threads = () => {
  const [params, setParams] = useState({
    page: 1,
    limit: 5,
    sort: 'NAME_DESC'
  })
  const {data, isFetching, isLoading, refetch} = useThread(params)
  const dataThread = data?.data.threads;
  return (
    <>
      <Filter
        refetch={refetch}
      />
      <ThreadTable
        setParams={setParams}
        threads={dataThread}
        refetch={refetch}
        isFetching={isFetching}
        isLoading={isLoading}
      />
    </>
  )
}

export default Threads