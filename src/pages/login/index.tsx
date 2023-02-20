import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from '~/routes';

import { getToken } from '~/api/login';
import { handleLogin } from '~/utils/helper';
import { getCookie } from '~/utils/cookie';
import Spin from '~/components/atoms/Spin';

const Login = () => {
  const [form] = Form.useForm();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';

  const handleGetCookie = async (formValues: any) => {
    setLoading(true)
    const res = await getToken()
    const token = res?.data?.token
    setTimeout(() => {
      handleLogin({
        accessToken: token
      })
      setLoading(false);
    }, 2000)
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
            <Form.Item 
              className={styles.checkBox} 
              name="remember" 
              valuePropName="checked"
            >
              <Checkbox
                onChange={(e) => setChecked(e.target.checked)}
              >Remember me</Checkbox>
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
          <div className={styles.createAccount}>
            <p>Don't have account?</p> &nbsp; <Link to={ROUTES.Register}>Create new account</Link>
          </div>
        </div>
      </div>
    </Spin> 
  )
}

export default Login