import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from '~/routes';

import { setLogin } from '~/api/login';
import { handleLogin } from '~/utils/helper';
import { getCookie } from '~/utils/cookie';
import loadable from '~/utils/loadable';

const Spin = loadable(() => import('~/components/atoms/Spin'));

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';

  const handleGetCookie = async (formValues: any) => {
    setLoading(true)
    if (form) {
      const fmData = {
        email: formValues.userName,
        password: formValues.password
      }
      const res = await setLogin(fmData)
      if (res) {
        const token = res?.data?.token
        handleLogin({
          accessToken: token
        })
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      navigate(callbackUrl);
      return;
    } 
  }, [navigate, callbackUrl]);
  
  return (
    <Spin spinning={loading}>
      <div className={styles.loginContainer}>
        <div className={styles.formContainer}>
        <h1>Login</h1>
          <Form
            form={form}
            autoComplete="off"
            layout='vertical'
            onFinish={handleGetCookie}
          >
            <Form.Item 
              name='userName'
              label='Username'
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input/>
            </Form.Item>
            <Form.Item 
              name='password'
              label='Password'
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password/>
            </Form.Item>
            <Form.Item>
            <Button 
              className={styles.btnLogin}
              type="primary"
              htmlType="submit"
            >
              Login
            </Button>
            </Form.Item>
          </Form>
          <div className={styles.forgotPassword}>
            <p>Forgot password?</p> &nbsp; <Link to={ROUTES.Register}>Reset password here!</Link>
          </div>
        </div>
      </div>
    </Spin> 
  )
}

export default Login