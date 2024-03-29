import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Threads from '~/components/molecules/ThreadList'
import { ROUTES } from '~/routes';
import { useAppSelector } from '~/store';
import { UserRole } from '~/utils/constant';

const Thread = () => {
  const userData = useAppSelector((state) => state.userInfo.userData);
  const userRole = userData?.role;
  const navigate = useNavigate();
  
  return (
    <Threads/>
  )
}

export default Thread