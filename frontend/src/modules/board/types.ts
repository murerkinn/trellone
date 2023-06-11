export type Board = {
  _id: string
  name: string
  columns: Column[]
  createdBy: string
  createdAt: string
  updatedAt: string
}

export type BoardData = {
  name: string
}

export type Column = {
  _id: string
  name: string
  cards: Card[]
  createdAt: string
  updatedAt: string
}

export type Card = {
  _id: string
  title: string
  description: string
  status: CARD_STATUS
  createdAt: string
  updatedAt: string
}

export type CardWithColumn = Card & {
  column: Column
}

export enum CARD_STATUS {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
}

export type MoveCardToColumnRequest = {
  boardId: string
  columnFromId: string
  columnToId: string
  cardId: string
  position: number
}
