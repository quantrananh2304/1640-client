import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '~/routes';
import styles from './styles.module.scss';
import { getResetPasswordCode } from '~/api/resetPassword';
import { SUCCESS } from '~/utils/constant';
import Spin from '~/components/atoms/Spin';

const GetResetPassword = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const handleGetCode = async (formValues: any) => {
    try {
      setLoading(true)
      let res: any = null
      if (formValues){
        res = await getResetPasswordCode(formValues)
        if (res.message === SUCCESS) {
          message.success('The code has been sent to your email.')
          setTimeout(
            () => {
              setLoading(false)
              navigate(ROUTES.ResetPassword) 
            }
          ,1500)
        }
      }
    } catch (error: any) {
      message.error(error)
    }
  }

  return (
    <Spin spinning={loading}>
      <div className={styles.registerContainer}>
        <div className={styles.formContainer}>
        <h1>ResetPassword</h1>
          <Form
            form={form}
            autoComplete="off"
            layout='vertical'
            onFinish={handleGetCode}
          >
            <Form.Item 
              name='email'
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
            <Form.Item>
            <Button 
              className={styles.btnLogin}
              type="primary"
              htmlType="submit"
            >
              Get Code
            </Button>
            </Form.Item>
          </Form>
          <div className={styles.forgotPassword}>
            <p>Allready have code?</p> &nbsp; <Link to={ROUTES.ResetPassword}>Reset password here!</Link>
          </div>
        </div>
      </div>
    </Spin>
  )
}

export default GetResetPassword