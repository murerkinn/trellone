import { useMutation } from '@tanstack/react-query'
import { Button, Col, Form, Input, Row } from 'antd'
import { useRouter } from 'next/router'

import AccountService from '../account-service'
import { UserData } from '../types'

const SignUpForm = () => {
  const router = useRouter()

  const { mutate } = useMutation(
    ['sign-up'],
    (payload: UserData) => AccountService.signUp(payload),
    {
      onSuccess: () => {
        router.push('/sign-in?status=success')
      },
      onError: error => {
        console.error(error)
      },
    }
  )

  return (
    <Form layout="vertical" requiredMark={false} onFinish={mutate}>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item
            label="First name"
            name="firstName"
            rules={[
              {
                required: true,
                message: 'Please input your first name',
              },
            ]}
          >
            <Input placeholder="John" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Last name"
            name="lastName"
            rules={[
              {
                required: true,
                message: 'Please input your last name',
              },
            ]}
          >
            <Input placeholder="Doe" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: 'Please input your email address',
          },
          {
            type: 'email',
            message: 'Please enter a validate email address',
          },
        ]}
      >
        <Input placeholder="john@doe.com" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password',
          },
        ]}
      >
        <Input.Password placeholder="********" />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit" type="primary" block>
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  )
}

export default SignUpForm
