import { Strategy as LocalStrategy } from 'passport-local'

import AccountManager from '../manager'
import { UserDocument } from '../models/user'

export interface RequestWithUser extends Express.Request {
  user: UserDocument
  body: any
  query: any
  params: any
}

const localStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (
    email: string,
    password: string,
    done: (err: any, user?: UserDocument) => void
  ) => {
    try {
      const user = await AccountManager.authenticate(email, password)
      done(null, user)
    } catch (err) {
      done(err)
    }
  }
)

export default localStrategy
