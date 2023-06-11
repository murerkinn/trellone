import { Button } from 'antd'
import { DragDropContext } from 'react-beautiful-dnd'

import useBoardActions from '../hooks/use-board-actions'
import { Board } from '../types'
import BoardColumn from './board-column'

type BoardProps = {
  data: Board
  isLoading: boolean
}

const Board = ({ data, isLoading }: BoardProps) => {
  const { actions } = useBoardActions()

  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result

    await actions.moveCardToColumn({
      boardId: data._id,
      columnFromId: source.droppableId,
      columnToId: destination.droppableId,
      cardId: draggableId,
      position: destination.index,
    })
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="board">
      <div className="board-header">
        <div>
          <h3>Board name</h3>
        </div>

        <div>
          <Button>Share</Button>
        </div>
      </div>

      <div className="board-content">
        <DragDropContext onDragEnd={onDragEnd}>
          {data.columns.map(column => (
            <BoardColumn
              key={column._id}
              title={column.name}
              cards={column.cards}
              columnId={column._id}
            />
          ))}
        </DragDropContext>
      </div>
    </div>
  )
}

export default Board
