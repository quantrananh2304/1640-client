import React, { useState } from 'react'
import styles from './styles.module.scss'
import { Button, Checkbox, Form, Input } from 'antd'
import { Link } from 'react-router-dom';
import { ROUTES } from '~/routes';

const Login = () => {
  const [form] = Form.useForm();
  const [checked, setChecked] = useState(false);

  const handleLogin = () => {
    //Code here
    console.log('Logged in')
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formContainer}>
      <h1>Login</h1>
        <Form
          form={form}
          autoComplete="off"
          layout='vertical'
          onFinish={handleLogin}
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
  )
}

export default Login