import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Dropdown, Layout } from 'antd'

import { LayoutProps } from './types'

const items: any = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: '0',
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
]

const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Layout>
        <Layout.Header style={{ backgroundColor: '#1D2125' }}>
          <Dropdown menu={{ items }} trigger={['click']}>
            <Button shape="circle" type="link">
              <Avatar size={36} icon={<UserOutlined />} />
            </Button>
          </Dropdown>
        </Layout.Header>
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </>
  )
}

export default DefaultLayout
