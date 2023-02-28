import React, { useEffect } from 'react';
import Spin from '~/components/atoms/Spin';
import { getCookie } from '~/utils/cookie';
import { handleLogout } from '~/utils/helper';
import { useSearchParams } from 'react-router-dom';

import { ROUTES } from '~/routes';

function RefreshToken() {
  const [searchParams] = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';

  useEffect(() => {
    const token = getCookie('token');
    if (token !== 'none') {
      handleLogout(ROUTES.Login);
    }
  }, [callbackUrl]);
  return (
    <>
      <Spin />
    </>
  );
}

export default RefreshToken;
