import React, { useEffect } from 'react'
import { Route, useNavigate } from 'react-router-dom';
import Departments from '~/components/molecules/Departments'
import { ROUTES } from '~/routes';
import { useAppSelector } from '~/store';
import { UserRole } from '~/utils/constant';

const Department = () => {
  const userData = useAppSelector((state) => state.userInfo.userData);
  const userRole = userData?.role;
  const navigate = useNavigate();
  
  useEffect(() => {
    if (userRole && (userRole !== UserRole.Admin)) {
      navigate(ROUTES.Unauthorized)
    }

  }, [userRole])
  
  return (
    <Departments/>
  )
}

export default Department