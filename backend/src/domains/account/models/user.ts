import bcrypt from 'bcrypt'
import { Document, Model, model, Schema } from 'mongoose'

export interface UserRaw {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface UserDocument extends Omit<UserRaw, 'password'>, Document {
  hash: string

  validatePassword(password: string): Promise<boolean>
  updateHash(newPassword: string): Promise<UserDocument>
}

export interface UserModel extends Model<UserDocument> {
  calculateHash(password: string): Promise<string>
}

const userSchema = new Schema<UserDocument, UserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    hash: {
      type: String,
      select: false,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

userSchema.statics.calculateHash = async function (
  this: UserModel,
  password: string
) {
  return await bcrypt.hash(password, 10)
}

userSchema.methods.validatePassword = async function (
  this: UserDocument,
  password: string
) {
  return bcrypt.compare(password, this.hash)
}

userSchema.methods.updateHash = async function (
  this: UserDocument,
  newPassword: string
) {
  this.hash = await bcrypt.hash(newPassword, 10)

  return this.save()
}

userSchema.index({ email: 1 })
userSchema.index({ firstName: 'text' })
userSchema.index({ lastName: 'text' })

const User = model<UserDocument, UserModel>('User', userSchema)

export default User
