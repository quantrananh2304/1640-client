import React from 'react'
import Filter from './Filter'
import ThreadTable from './TableThread'
import { COMMON_PARAMS } from '~/utils/constant'
import { useThread } from '~/hooks/useThread'

const Threads = () => {
  const {data, isFetching, isLoading, refetch} = useThread(COMMON_PARAMS)
  const dataThread = data?.data.threads;
  return (
    <>
      <Filter
        refetch={refetch}
      />
      <ThreadTable
        threads={dataThread}
        refetch={refetch}
        isFetching={isFetching}
        isLoading={isLoading}
      />
    </>
  )
}

export default Threads