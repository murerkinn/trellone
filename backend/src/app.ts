/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()

import { connectDB } from './lib/database-connection'

connectDB()

import { errors } from 'celebrate'
import compression from 'compression'
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import helmet from 'helmet'
import { MongoClient } from 'mongodb'
import mongoose from 'mongoose'
import passport from 'passport'

import localStrategy from './domains/account/auth-strategies/local-strategy'
import AccountManager from './domains/account/manager'
import User from './domains/account/models/user'
import BoardBridge from './domains/board/bridge'
import BoardManager from './domains/board/manager'
import errorHandler from './lib/error-handler'

const PORT = process.env.PORT || 4000
const ENV = process.env.NODE_ENV || 'development'

const app = express()

app.set('trust proxy', 1)

app.use(
  cors({
    origin: true,
    credentials: Boolean(process.env.HTTP_CORS_CREDENTIALS),
  })
)

app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const clientPromise = mongoose.connection
  .asPromise()
  .then(connection => connection.getClient()) as Promise<MongoClient>

app.use(
  session({
    store: MongoStore.create({
      stringify: false,
      clientPromise,
    }),
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET || 'thisisasupersecuresecretsecret',
    resave: false,
    cookie: {
      domain: process.env.COOKIE_DOMAIN,
      maxAge: 14 * 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : true,
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
    },
  })
)

passport.use(localStrategy)
passport.serializeUser(AccountManager.serializeUser())
passport.deserializeUser(AccountManager.deserializeUser())

app.use(passport.initialize())
app.use(passport.session())

app.use('/account', require('./domains/account/router').default)
app.use('/boards', require('./domains/board/router').default)

app.post('/mock', async (req, res) => {
  const user = await User.findOne({ email: 'asd@asd.com' })

  if (!user) {
    res.status(404).send('User not found')
    return
  }

  let board: any = await BoardBridge.createBoard(
    {
      name: 'Test board',
    },
    user
  )

  if (!board) {
    res.status(500).send('Board not created')
    return
  }

  await BoardManager.addColumn(board._id, {
    name: 'Backlog',
  })

  await BoardManager.addColumn(board._id, {
    name: 'To Do',
  })

  await BoardManager.addColumn(board._id, {
    name: 'In Progress',
  })

  await BoardManager.addColumn(board._id, {
    name: 'In Review',
  })

  await BoardManager.addColumn(board._id, {
    name: 'Done',
  })

  board = (await BoardManager.getBoardById(board._id)) as any

  for (const column of board.columns) {
    for (const i of [1, 2, 3, 4, 5]) {
      await BoardManager.addCard(column._id, {
        title: `Column ${column.name} Card ${i}`,
        column: column._id,
      })
    }
  }

  res.json({ message: 'ok' })
})

app.use(errors())
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} in ${ENV} mode`)
})
