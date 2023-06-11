import { API } from '@/lib/api'

import { BoardData } from './types'

const getBoard = async (boardId: string) => {
  const { data } = await API.get(`/boards/${boardId}`)

  return data
}

const createBoard = async (boardData: BoardData) => {
  const { data } = await API.post('/boards', boardData)

  return data
}

const addColumnToBoard = async (boardId: string, columnData: any) => {
  const { data } = await API.post(`/boards/${boardId}/columns`, columnData)

  return data
}

const addCardToColumn = async (
  boardId: string,
  columnId: string,
  cardData: any
) => {
  const { data } = await API.post(
    `/boards/${boardId}/columns/${columnId}/cards`,
    cardData
  )

  return data
}

const moveCardToColumn = async (
  boardId: string,
  columnFromId: string,
  columnToId: string,
  cardId: string,
  position: number
) => {
  const { data } = await API.post(
    `/boards/${boardId}/columns/${columnToId}/cards`,
    {
      columnFromId,
      cardId,
      position,
    }
  )

  return data
}

const getCard = async (boardId: string, cardId: string) => {
  const { data } = await API.get(`/boards/${boardId}/cards/${cardId}`)

  return data
}

const BoardService = {
  getBoard,
  createBoard,
  addColumnToBoard,
  addCardToColumn,
  moveCardToColumn,
  getCard,
}

export default BoardService
