import { Card } from 'antd'
import { Droppable } from 'react-beautiful-dnd'

import { Card as CardType } from '../types'
import BoardCard from './board-card'

type BoardColumnProps = {
  title: string
  columnId: string
  cards: CardType[]
}

const BoardColumn = ({ columnId, title, cards }: BoardColumnProps) => {
  return (
    <Droppable droppableId={columnId}>
      {provided => (
        <Card
          ref={provided.innerRef}
          {...provided.droppableProps}
          title={title}
          bordered={false}
          className="board-column"
        >
          {cards.map((card, cardIndex) => (
            <BoardCard
              cardId={card._id}
              index={cardIndex}
              title={card.title}
              key={card._id}
            />
          ))}

          {provided.placeholder}
        </Card>
      )}
    </Droppable>
  )
}

export default BoardColumn
