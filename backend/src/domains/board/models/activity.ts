import { Document, model, Schema } from 'mongoose'

export enum ACTIVITY_TYPE {
  ADD_LABEL = 'add-label',
  REMOVE_LABEL = 'remove-label',
  ASSIGN_MEMBER = 'assign-member',
  REMOVE_MEMBER = 'remove-member',
  MOVE_CARD = 'move-card',
}

export interface ActivityRaw {
  card: Schema.Types.ObjectId
  type: ACTIVITY_TYPE
  metadata: any
}

export interface ActivityDocument extends Document, ActivityRaw {}

const activitySchema = new Schema(
  {
    card: {
      type: Schema.Types.ObjectId,
      ref: 'Card',
      required: true,
    },
    type: {
      type: String,
      enum: ACTIVITY_TYPE,
      required: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
)

const Activity = model('Activity', activitySchema)

export default Activity
