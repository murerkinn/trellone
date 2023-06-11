import { NotFound } from 'http-errors'

import { UserDocument } from '../account/models/user'
import ACLManager from '../acl/manager'
import BoardManager from './manager'
import { BoardRaw } from './models/board'
import { CardRaw } from './models/card'
import { ColumnRaw } from './models/column'

const checkIsAllowedToUpdateBoard = async (
  boardId: string,
  actor: UserDocument
) => {
  const board = await BoardManager.getBoardById(boardId)

  if (!board) throw new NotFound('Board not found')

  await ACLManager.checkIsAllowed(
    actor._id,
    `resource:board:${boardId}`,
    'update'
  )

  return board
}

const createBoard = async (
  boardData: Omit<BoardRaw, 'createdBy'>,
  actor: UserDocument
) => {
  await ACLManager.checkIsAllowed(actor._id, 'resource:board', 'create')

  const board = await BoardManager.createBoard({
    ...boardData,
    createdBy: actor._id,
  })

  await ACLManager.generatePermissionsForBoard(actor._id, board._id)

  return board
}

const listBoardsOfUser = async (actor: UserDocument) => {
  const boards = await BoardManager.listBoardsOfUser(actor._id)

  return boards
}

const getBoard = async (boardId: string, actor: UserDocument) => {
  const board = await BoardManager.getBoardById(boardId)

  if (!board) {
    throw new NotFound('Board not found')
  }

  await ACLManager.checkIsAllowed(
    actor._id,
    `resource:board:${boardId}`,
    'read'
  )

  return board
}

const addColumn = async (
  boardId: string,
  columnData: ColumnRaw,
  actor: UserDocument
) => {
  await checkIsAllowedToUpdateBoard(boardId, actor)

  const updatedBoard = await BoardManager.addColumn(boardId, columnData)

  return updatedBoard
}

const addCard = async (
  boardId: string,
  columnId: string,
  cardData: CardRaw,
  actor: UserDocument
) => {
  const board = await checkIsAllowedToUpdateBoard(boardId, actor)

  await BoardManager.addCard(columnId, cardData)

  return board
}

const moveCard = async (
  boardId: string,
  columnFromId: string,
  columnToId: string,
  cardId: string,
  position: number,
  actor: UserDocument
) => {
  const board = await checkIsAllowedToUpdateBoard(boardId, actor)

  await BoardManager.moveCard(columnFromId, columnToId, cardId, position)

  return board
}

const archiveCard = async (
  boardId: string,
  columnId: string,
  cardId: string,
  actor: UserDocument
) => {
  const board = await checkIsAllowedToUpdateBoard(boardId, actor)

  await BoardManager.archiveCard(columnId, cardId)

  return board
}

const removeCard = async (
  boardId: string,
  columnId: string,
  cardId: string,
  actor: UserDocument
) => {
  const board = await checkIsAllowedToUpdateBoard(boardId, actor)

  await BoardManager.removeCard(columnId, cardId)

  return board
}

const getCard = async (
  boardId: string,
  cardId: string,
  actor: UserDocument
) => {
  await getBoard(boardId, actor)

  const card = await BoardManager.getCardById(cardId)

  return card
}

const BoardBridge = {
  createBoard,
  listBoardsOfUser,
  getBoard,
  addColumn,
  addCard,
  archiveCard,
  removeCard,
  moveCard,
  getCard,
}

export default BoardBridge
