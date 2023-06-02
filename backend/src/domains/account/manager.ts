import { NotFound } from 'http-errors'
import _ from 'lodash'

import acl from '../acl'
import User, { UserDocument, UserRaw } from './models/user'

const createUser = async (userData: UserRaw) => {
  const user = await User.create({
    ..._.omit(userData, 'password'),
    hash: await User.calculateHash(userData.password),
  })

  await acl.addUserRoles(user._id.toString(), 'role:user')

  return user
}

const authenticate = async (email: string, password: string) => {
  email = email.toLowerCase()

  const user = await User.findOne({ email }).select('+hash')

  if (!user) {
    console.error(`Email ${email} tried authenticating but it's not found.`)

    throw new NotFound(`Invalid credentials!`)
  }

  if (!(await user.validatePassword(password))) {
    console.info(
      `Email ${email} tried authenticating with a password that doesn't match.`
    )

    throw new NotFound(`Invalid credentials!`)
  }

  return user
}

const serializeUser = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (user: any, done: any) => {
    done(null, user._id)
  }
}

const deserializeUser = () => {
  return (id: string, done: (err: null, user?: UserDocument) => void) => {
    return User.findOne({ _id: id })
      .then(user => {
        done(null, user || undefined)
      })
      .catch(() => {
        done(null)
      })
  }
}

const AccountManager = {
  createUser,
  serializeUser,
  deserializeUser,
  authenticate,
}

export default AccountManager
