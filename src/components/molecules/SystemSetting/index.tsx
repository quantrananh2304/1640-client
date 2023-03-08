import React, { useState } from 'react'

import { useAccounts } from '~/hooks/useAccounts'
import { COMMON_PARAMS, PARAMS_FILTER } from '~/utils/constant'
import loadable from '~/utils/loadable'

const Filter = loadable(() => import('~/components/molecules/SystemSetting/Filter'));
const TableListsAccount = loadable(() => import('~/components/molecules/SystemSetting/Table'));


const SystemSetting = () => {
  const [params, setParams] = useState(COMMON_PARAMS)
  const { data, isFetching, isLoading, refetch } = useAccounts(params)

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