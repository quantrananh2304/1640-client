import React, { useState } from 'react'

import {UserRole } from '~/utils/constant'
import { Authorization } from '~/wrapper/Authorization'
import loadable from '~/utils/loadable'
import { useDepartment } from '~/hooks/useDepartment'

const DepartmentList = loadable(() => import('~/components/molecules/Departments/DepartmentLists'));
const Filter = loadable(() => import('~/components/molecules/Departments/Filter'));


const Departments = () => {
  const [params, setParams] = useState({
    page: 1,
    limit: 999,
    sort: 'NAME_DESC'
  })
  const {data, isFetching, isLoading, refetch} = useDepartment(params)
  const dataDepartment = data?.data.departments;
  return (
    <>
      <Authorization roles={[UserRole.Admin]}>
        <Filter
          refetch={refetch}
        />
      </Authorization>
      <DepartmentList
        setParams={setParams}
        departments={dataDepartment}
        refetch={refetch}
        isFetching={isFetching}
        isLoading={isLoading}
      />
    </>
  )
}

export default Departments