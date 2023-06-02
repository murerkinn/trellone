import { Document, model, Schema } from 'mongoose'

export enum CARD_STATUS {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
}

export interface CardRaw {
  title: string
}

export interface CardDocument extends Document, CardRaw {
  description?: string
  status: CARD_STATUS
}

const cardSchema = new Schema<CardDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: CARD_STATUS,
      default: CARD_STATUS.ACTIVE,
    },
  },
  {
    timestamps: true,
  }
)

const Card = model<CardDocument>('Card', cardSchema)

export default Card
