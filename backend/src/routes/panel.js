const express = require('express')
var router = express.Router()

const panelController = require('../controllers/panel')

router.post('/', panelController.createPanel)

router.get('/:panelId', panelController.getPanel)

router.post('/:panelId/lists', panelController.createList)

router.post('/:panelId/lists/:listId/card', panelController.createCard)

router.put('/:panelId/lists/:listId/card/:cardId', panelController.updateCard)

router.post('/:panelId/lists/:listId/cards', panelController.updateCardsOfList)

router.post('/:panelId/update-cards', panelController.updateCardsBetweenLists)

module.exports = router
