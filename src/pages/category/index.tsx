import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Categories from '~/components/molecules/Categories'
import { ROUTES } from '~/routes';
import { useAppSelector } from '~/store';
import { UserRole } from '~/utils/constant';

const Category = () => {
  const userData = useAppSelector((state) => state.userInfo.userData);
  const userRole = userData?.role;
  const navigate = useNavigate();
  
  useEffect(() => {
    if (userRole && (userRole !== UserRole.QA_M)) {
      navigate(ROUTES.Unauthorized)
    }

  }, [userRole])
  return (
    <Categories></Categories>
  )
}

export default Category