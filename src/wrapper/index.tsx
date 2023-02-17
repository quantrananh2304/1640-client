import React from 'react';
import { Routes, Route } from 'react-router-dom';

import routes from '~/routes';
import Blank from '~/layouts';

function Wrapper() {
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
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default Wrapper;
