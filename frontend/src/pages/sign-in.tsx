import { Alert, Col, Row } from 'antd'
import { useRouter } from 'next/router'

import EmptyLayout from '@/layouts/empty'
import SignInForm from '@/modules/account/components/sign-in-form'

const SignInPage = () => {
  const { query } = useRouter()

  return (
    <>
      <main>
        <Row
          justify="center"
          align="middle"
          style={{
            height: '100vh',
          }}
        >
          <Col span={8}>
            {query.status === 'success' && (
              <Alert
                type="success"
                closable
                message="You've successfully signed up! Please enter the credentials below to sign-in."
              />
            )}
            <SignInForm />
          </Col>
        </Row>
      </main>
    </>
  )
}

SignInPage.Layout = EmptyLayout

export default SignInPage
