import React, { useRef, useState } from 'react';
import { Button, Result } from 'antd';
import { handleLogout } from '~/utils/helper';
import { ROUTES } from '~/routes';
import { Link } from 'react-router-dom';
import { useAppSelector } from '~/store';

export default function Unauthorized() {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const [loading, setLoading] = useState(false);
  const userData = useAppSelector((state) => state.userInfo.userData);
  return (
    <Result
      status="403"
      title="Unauthorized"
      subTitle='You can not access this page!'
      extra={(
        <>
          {userData ?
            <Link to={ROUTES.Home}>
              <Button type="primary">Back to Home</Button>
            </Link>
            :
            <Button
              onClick={() => {
                setLoading(true);
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                }
                timeoutRef.current = setTimeout(() => {
                  handleLogout(ROUTES.Login);
                }, 600);
              }}
              type="primary"
              loading={loading}
            >
              Open login page
            </Button>}
        </>
      )}
    />
  );
}
