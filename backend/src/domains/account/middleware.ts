import { RequestHandler } from 'express-async-router'

export const ensureAuthentication: RequestHandler = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).send()
  }

  next()
}

export const ensureOrphans: RequestHandler = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.status(403).send()
  }

  next()
}
