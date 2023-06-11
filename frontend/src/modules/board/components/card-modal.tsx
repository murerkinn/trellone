import Icon from '@ant-design/icons'
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import { Button, Col, Divider, Modal, Row, Space, Typography } from 'antd'

import useCardModal from '../hooks/use-card-modal'

const CardModal = () => {
  const { card, isLoading, isModalOpen, actions } = useCardModal()

  if (!card) return null

  return (
    <Modal
      className="card-modal"
      title={
        <Space direction="vertical" size={4}>
          <Typography.Title level={4}>{card.title}</Typography.Title>
          <Typography.Text>in list {card.column.name}</Typography.Text>
        </Space>
      }
      open={isModalOpen}
      // onOk={handleOk}
      onCancel={actions.closeModal}
      footer={null}
    >
      <Row>
        <Col className="content-col"></Col>
        <Col className="actions-col">
          <div className="actions-wrapper">
            <Typography.Title level={5}>Suggested</Typography.Title>
            <Button block>Join</Button>
          </div>

          <div className="actions-wrapper">
            <Typography.Title level={5}>Add to card</Typography.Title>
            <Button block>Members</Button>
            <Button
              block
              icon={<Icon component={() => <LocalOfferOutlinedIcon />} />}
            >
              Labels
            </Button>
            <Button
              block
              icon={<Icon component={() => <LibraryAddCheckOutlinedIcon />} />}
            >
              Checklist
            </Button>
            <Button block>Dates</Button>
            <Button block>Attachment</Button>
            <Button block>Cover</Button>
          </div>

          <div className="actions-wrapper">
            <Typography.Title level={5}>Actions</Typography.Title>
            <Button block>Move</Button>
            <Button block>Copy</Button>
            <Divider />
            <Button block>Archive</Button>
            <Button block>Share</Button>
          </div>
        </Col>
      </Row>
    </Modal>
  )
}

export default CardModal
