import { celebrate, Joi, Segments } from 'celebrate'
import { AsyncRouter } from 'express-async-router'
import passport from 'passport'

import AccountManager from './manager'
import { ensureAuthentication, ensureOrphans } from './middleware'

const router = AsyncRouter()

router.get('/', async req => {
  return req.user
})

router.post(
  '/',
  ensureOrphans,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
    }),
  }),
  async req => {
    return AccountManager.createUser(req.body)
  }
)

router.post(
  '/session',
  ensureOrphans,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  passport.authenticate('local', { failWithError: true }),
  async req => {
    return req.user
  }
)

router.delete('/session', ensureAuthentication, async req => {
  return req.logout(() => {
    return { message: 'Logged out' }
  })
})

export default router
