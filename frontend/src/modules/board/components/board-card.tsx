import { Card, Typography } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Draggable } from 'react-beautiful-dnd'

type BoardCardProps = {
  cardId: string
  title: string
  index: number
}

const BoardCard = ({ cardId, title, index }: BoardCardProps) => {
  const { query } = useRouter()

  return (
    <Draggable draggableId={cardId} index={index}>
      {provided => (
        <Link
          href={{ query: { ...query, cardId } }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card bordered={false} className="board-card">
            <Typography.Text>{title}</Typography.Text>
          </Card>
        </Link>
      )}
    </Draggable>
  )
}

export default BoardCard
