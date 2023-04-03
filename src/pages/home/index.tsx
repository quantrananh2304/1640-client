import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '~/hooks/useUser';
import { ROUTES } from '~/routes';
import { useAppSelector } from '~/store';
import { UserRole } from '~/utils/constant';
import { getCookie } from '~/utils/cookie';
import loadable from '~/utils/loadable';

const Spin = loadable(() => import('~/components/atoms/Spin'));

export default function Home() {
  const navigate = useNavigate();
  const token = getCookie('token');
  const { data: user, refetch, isLoading } = useUser(token);
  const userRole = user?.data?.role;

  useEffect(() => {
    if (!getCookie('token')) {
     navigate(ROUTES.Login) 
    } 
    if (userRole && ((userRole === UserRole.Admin) || (userRole === UserRole.QA_M))) {
      navigate(ROUTES.DashBoard);
    } 
    if (userRole && ((userRole === UserRole.Staff) || (userRole === UserRole.QA_C))) {
      navigate(ROUTES.Ideas);
    }
  }, [navigate, getCookie, userRole]);

  return (
    <div className='d-flex justify-content-center align-items-center w-100 h-100'>
      <Spin spinning />
    </div>
  );
}