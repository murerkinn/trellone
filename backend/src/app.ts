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

app.use(errors())
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} in ${ENV} mode`)
})