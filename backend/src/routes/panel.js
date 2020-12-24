const express = require('express')
var router = express.Router()

const panelController = require('../controllers/panel')

router.post('/', panelController.createPanel)

router.get('/:panelId', panelController.getPanel)

module.exports = router
