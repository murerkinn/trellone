import { Document, model, Schema } from 'mongoose'

import commentSchema, { CommentDocument } from './comment'
import labelSchema, { LabelDocument } from './label'

export enum CARD_STATUS {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
}

export interface CardRaw {
  title: string
  column: Schema.Types.ObjectId
}

export interface CardDocument extends Document, CardRaw {
  description?: string
  members: Schema.Types.ObjectId[]
  comments: CommentDocument[]
  labels: LabelDocument[]
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
    column: {
      type: Schema.Types.ObjectId,
      ref: 'Column',
      required: true,
    },
    comments: {
      type: [commentSchema],
      default: [],
    },
    labels: {
      type: [labelSchema],
      default: [],
    },
    members: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
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
