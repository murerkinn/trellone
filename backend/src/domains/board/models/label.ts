import { Document, Schema } from 'mongoose'

export interface LabelRaw {
  name: string
  color: string
}

export interface LabelDocument extends Document, LabelRaw {}

const labelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
})

export default labelSchema
