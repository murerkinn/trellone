import { Document, model, Schema } from 'mongoose'
import autopopulate from 'mongoose-autopopulate'

export interface ColumnRaw {
  name: string
}

export interface ColumnDocument extends Document, ColumnRaw {
  cards: Schema.Types.ObjectId[]
}

const columnSchema = new Schema<ColumnDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    cards: {
      type: [Schema.Types.ObjectId],
      ref: 'Card',
      default: [],
      autopopulate: true,
    },
  },
  { timestamps: true }
)

columnSchema.plugin(autopopulate)

const Column = model<ColumnDocument>('Column', columnSchema)

export default Column
