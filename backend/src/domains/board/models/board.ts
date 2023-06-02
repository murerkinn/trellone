import { Document, model, Schema } from 'mongoose'
import autopopulate from 'mongoose-autopopulate'

export interface BoardRaw {
  name: string
  createdBy: Schema.Types.ObjectId
}

export interface BoardDocument extends BoardRaw, Document {
  columns: Schema.Types.ObjectId[]
}

const boardSchema = new Schema<BoardDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    columns: {
      type: [Schema.Types.ObjectId],
      ref: 'Column',
      default: [],
      autopopulate: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
)

boardSchema.plugin(autopopulate)

const Board = model<BoardDocument>('Board', boardSchema)

export default Board
