import { ErrorHandler } from 'express-async-router'

const errorHandler: ErrorHandler = (
  err,
  req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next
) => {
  if (!err.status) {
    res.status(500).send({ message: err.message })
  } else {
    res.status(err.status).send(err)
  }

  console.error(err)
}

export default errorHandler
