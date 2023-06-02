import { celebrate, Joi, Segments } from 'celebrate'
import { AsyncRouter } from 'express-async-router'

import { RequestWithUser } from '../account/auth-strategies/local-strategy'
import { ensureAuthentication } from '../account/middleware'
import BoardBridge from './bridge'

const router = AsyncRouter()

router.use(ensureAuthentication)

router.get('/', async (req: RequestWithUser) => {
  return BoardBridge.listBoardsOfUser(req.user._id)
})

router.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }),
  async (req: RequestWithUser) => {
    return BoardBridge.createBoard(req.body, req.user)
  }
)

router.get('/:id', async (req: RequestWithUser) => {
  return BoardBridge.getBoard(req.params.id, req.user)
})

router.post(
  '/:boardId/columns',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }),
  async (req: RequestWithUser) => {
    return BoardBridge.addColumn(req.params.boardId, req.body, req.user)
  }
)

router.patch(
  '/:boardId/columns/:columnId/cards',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      cardId: Joi.string().required(),
      columnFromId: Joi.string().required(),
      position: Joi.number().required(),
    }),
  }),
  async (req: RequestWithUser) => {
    return BoardBridge.moveCard(
      req.params.boardId,
      req.body.columnFromId,
      req.params.columnId,
      req.body.cardId,
      req.body.position,
      req.user
    )
  }
)

router.post(
  '/:boardId/columns/:columnId/cards',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
    }),
  }),
  async (req: RequestWithUser) => {
    return BoardBridge.addCard(
      req.params.boardId,
      req.params.columnId,
      req.body,
      req.user
    )
  }
)

router.delete(
  '/:boardId/columns/:columnId/cards/:cardId',
  async (req: RequestWithUser) => {
    return BoardBridge.removeCard(
      req.params.boardId,
      req.params.columnId,
      req.params.cardId,
      req.user
    )
  }
)

export default router
