import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button, Form, Input } from 'antd'
import { useRouter } from 'next/router'

import AccountService from '../account-service'
import { Credentials } from '../types'

const SignInForm = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutate } = useMutation(
    ['sign-in'],
    (payload: Credentials) => AccountService.signIn(payload),
    {
      onSuccess: () => {
        router.push('/dashboard')

        queryClient.invalidateQueries(['me'])
      },
      onError: error => {
        console.error(error)
      },
    }
  )

  return (
    <Form layout="vertical" requiredMark={false} onFinish={mutate}>
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
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Sign In
        </Button>
      </Form.Item>
    </Form>
  )
}

export default SignInForm
