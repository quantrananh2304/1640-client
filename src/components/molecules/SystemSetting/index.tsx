import React, { useState } from 'react'
import Filter from './Filter'
import TableListsAccount from './Table'
import { useAccounts } from '~/hooks/useAccounts'
import { COMMON_PARAMS } from '~/utils/constant'

const SystemSetting = () => {
  const [params, setParams] = useState(COMMON_PARAMS)
  const { data, isFetching, isLoading, refetch } = useAccounts(params)
  return (
    <>
      <Filter/>
      <TableListsAccount
        dataAccount={data?.data}
        isLoading={isLoading}
        isFetching={isFetching}
        setParams={setParams}
        refetch={refetch}
      />
    </>
  )
}

export default SystemSetting