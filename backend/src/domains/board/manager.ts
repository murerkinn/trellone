import Board, { BoardRaw } from './models/board'
import Card, { CARD_STATUS, CardRaw } from './models/card'
import Column, { ColumnRaw } from './models/column'

const createBoard = async (boardData: BoardRaw) => {
  const board = await Board.create(boardData)

  return board
}

const getBoardById = async (boardId: string) => {
  const board = await Board.findOne({ _id: boardId })

  return board
}

const listBoardsOfUser = async (userId: string) => {
  const boards = await Board.find({ createdBy: userId })

  return boards
}

const addColumn = async (boardId: string, columnData: ColumnRaw) => {
  const column = await Column.create(columnData)

  const board = await Board.findOneAndUpdate(
    { _id: boardId },
    { $addToSet: { columns: column._id } },
    { new: true }
  )

  return board
}

const addCard = async (columnId: string, cardData: CardRaw) => {
  const card = await Card.create(cardData)

  await Column.findOneAndUpdate(
    { _id: columnId },
    { $addToSet: { cards: card._id } },
    { new: true }
  )

  return card
}

const moveCard = async (
  columnFromId: string,
  columnToId: string,
  cardId: string,
  position: number
) => {
  await Column.findOneAndUpdate(
    {
      _id: columnFromId,
    },
    {
      $pull: { cards: cardId },
    }
  )

  await Column.findOneAndUpdate(
    {
      _id: columnToId,
    },
    {
      $push: {
        cards: {
          $each: [cardId],
          $position: position,
        },
      },
    }
  )
}

const archiveCard = async (columnId: string, cardId: string) => {
  const card = await Card.findOneAndUpdate(
    { _id: cardId, status: CARD_STATUS.ACTIVE },
    { status: CARD_STATUS.ARCHIVED },
    { new: true }
  )

  return card
}

const unarchiveCard = async (columnId: string, cardId: string) => {
  const card = await Card.findOneAndUpdate(
    { _id: cardId, status: CARD_STATUS.ARCHIVED },
    { status: CARD_STATUS.ACTIVE },
    { new: true }
  )

  return card
}

const removeCard = async (columnId: string, cardId: string) => {
  await Card.findOneAndRemove({ _id: cardId })

  await Column.findOneAndUpdate(
    { _id: columnId },
    { $pull: { cards: cardId } },
    { new: true }
  )

  return true
}

const BoardManager = {
  createBoard,
  getBoardById,
  listBoardsOfUser,
  addColumn,
  addCard,
  archiveCard,
  unarchiveCard,
  removeCard,
  moveCard,
}

export default BoardManager
