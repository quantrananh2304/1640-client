import React from 'react';
import styles from './styles.module.scss';
import { Button, Form, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from '~/routes';

const Register = () => {
  const [form] = Form.useForm();

  const handleRegister = () => {
    //Code here
    console.log('Registed in')
  }

  const hanldeCheckConfirmPassword = () => {
    if (form) {
      const password = form.getFieldValue('password');
      const confirmPassword = form.getFieldValue('confirmPassword')
      if (password === confirmPassword) {
        handleRegister()
      } else {
        message.error('Your password and confirmation password do not match!')
      }
    }
  }

  return (
    <div className={styles.registerContainer}>
      <div className={styles.formContainer}>
      <h1>Register</h1>
        <Form
          form={form}
          autoComplete="off"
          layout='vertical'
          onFinish={hanldeCheckConfirmPassword}
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
            name='confirmPassword'
            label='Confirm password'

            rules={[{ required: true, message: 'Please input your confirm password!' }]}
          >
            <Input.Password/>
          </Form.Item>
          <Form.Item>
          <Button 
            className={styles.btnLogin}
            type="primary"
            htmlType="submit"
          >
            Register
          </Button>
          </Form.Item>
        </Form>
        <div className={styles.createAccount}>
          <p>Allready have account?</p> &nbsp; <Link to={ROUTES.Login}>Login now</Link>
        </div>
      </div>
    </div>
  )
}

export default Register