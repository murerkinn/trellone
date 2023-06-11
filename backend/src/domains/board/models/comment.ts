import { Document, Schema } from 'mongoose'

export interface CommentRaw {
  content: string
  author: Schema.Types.ObjectId
}

export interface CommentDocument extends Document, CommentRaw {}

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default commentSchema
