import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import routes, { ROUTES } from '~/routes';
import Blank from '~/layouts';
import { getCookie } from '~/utils/cookie';
import NotFound from '~/pages/404';
import { useAppDispatch,  } from '~/store';
import { useUser } from '~/hooks/useUser';
import { setUserInfo } from '~/store/userInfo';
import Spin from '~/components/atoms/Spin';

function Wrapper() {
  const token = getCookie('token');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: user, refetch, isLoading } = useUser(token);

  useEffect(() => {
    if (!token) {
      navigate(ROUTES.Login)
    }
  }, [token, dispatch])
  
  useEffect(() => {
    if (user){
      dispatch(setUserInfo(user?.data))
    }
  }, [user, token])
  
  return (
    <Routes>
      {routes.map((route, index) => {
        const Layout = route.layout ?? React.Fragment;
        if (route.isAuth) {
          return (
            <Route
                key={index}
                path={route.path}
                element={
                  (
                    <React.Fragment>
                      <Blank>
                        <Layout>
                          <route.component />
                        </Layout>
                      </Blank>
                    </React.Fragment>
                  )}
              />
          );
        }
        return (
          <Route
            key={index}
            path={route.path}
            element={(
              <React.Fragment>
                <Blank>
                  <Layout>
                    <route.component />
                  </Layout>
                </Blank>
              </React.Fragment>
            )}
          />
        );
      })}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Wrapper;
