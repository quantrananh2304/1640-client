import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from '~/routes';
import { setActive, setLogin } from '~/api/login';
import { handleLogin } from '~/utils/helper';
import { getCookie, setCookie } from '~/utils/cookie';
import { SUCCESS } from '~/utils/constant';

import loadable from '~/utils/loadable';
import Svg from '~/components/atoms/Svg';
import iconWarning from '~/assets/images/warning.svg'
import styles from './styles.module.scss';

const Spin = loadable(() => import('~/components/atoms/Spin'));
const Modal = loadable(() => import('~/components/atoms/Modal'));

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [visibleModalWarning, setVisibleModalWarning] = useState(false);
  const [activeCode, setActiveCode] = useState('')
  const [emailNotActive, setEmailNotActive] = useState('')
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';


  const handlModalActive = (email: any) => {
    if (email) {
      setEmailNotActive(email)
      setVisibleModalWarning(true)
    }
  }

  const handleGetCookie = async (formValues: any) => {
    setLoading(true)
    try {
      if (form) {
        const fmData = {
          email: formValues.userName,
          password: formValues.password
        }
        const res = await setLogin(fmData)
        if (res) {
          if (res.message === 'Account is not activated'){
            handlModalActive(fmData.email)
          }
          if (res.message === SUCCESS) {
            const token = res?.data?.token
            handleLogin({
              accessToken: token,
              userName: `${res.data.firstName} ${res.data.lastName}`
            })
            setLoading(false)
          }
          else {
            message.error(res.message)
            setLoading(false)
          }
        }
      }
    } catch (error: any) {
      message.error(error)
    }
  }

  const handleActiveAccount = async () => {
    const res = await setActive(activeCode, {email: emailNotActive})
    if (res.message === SUCCESS){
      message.success('Active account success')
      setVisibleModalWarning(false)
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
    <>
      <Spin spinning={loading}>
        <div className={styles.loginContainer}>
          <div className={styles.formContainer}>
          <h1>Login</h1>
            <Form
              form={form}
              layout='vertical'
              onFinish={handleGetCookie}
            >
              <Form.Item 
                name='userName'
                label='Email'
                rules={[
                  { required: true, message: 'Please input your email!' },
                  {
                    required: true,
                    type: "email",
                    message: "The input is not valid E-mail!",
                  }, 
                ]}
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
              <p>Forgot password?</p> &nbsp; <Link to={ROUTES.ResetPasswordCode}>Get reset password code here!</Link>
            </div>
          </div>
        </div>
      </Spin> 
      <Modal
        open={visibleModalWarning}
        centered
        onCancel={() => setVisibleModalWarning(false)}
        onOk={handleActiveAccount}
      >
      <div className={styles.headerConfirm}>
          <Svg className={styles.iconWarning} src={iconWarning} alt="icon warning" />
          <span className={styles.title}>Account is not activated</span>
      </div>
      <div className={styles.warningContent}>
        Check code in your email and active here
      </div>
      <Input
        placeholder='Active code'
        onChange={(e: any) => setActiveCode(e.target.value)}
      />
      </Modal>
    </>
  )
}

export default Login