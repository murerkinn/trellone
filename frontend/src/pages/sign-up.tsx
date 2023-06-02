import { Col, Row } from 'antd'

import EmptyLayout from '@/layouts/empty'
import SignUpForm from '@/modules/account/components/sign-up-form'

const SignUpPage = () => {
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
            <SignUpForm />
          </Col>
        </Row>
      </main>
    </>
  )
}

SignUpPage.Layout = EmptyLayout

export default SignUpPage
