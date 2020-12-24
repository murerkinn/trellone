const Validator = require('async-validator').default
const socketServer = require('../socket-connection')

const Panel = require('../models/panel')

exports.createPanel = async (req, res, next) => {
  const descriptor = {
    title: [
      { required: true, message: 'Panel title is required.\n' },
      { min: 3, message: 'Panel title should have a minimum length of 3 characters.\n' },
      { max: 200, message: 'Panel title should have a maximum length of 200 characters.\n' }
    ]
  }

  const validator = new Validator(descriptor)

  const panelRequest = {
    title: req.body.title
  }

  try {
    await validator.validate(panelRequest)
  } catch ({ errors }) {
    return next({ message: errors.map(e => e.message).join('') })
  }

  let panel = new Panel(panelRequest)

  try {
    panel.save()

    req.user.panels.push(panel)
    await req.user.save()

    res.status(200).send(panel)
  } catch (e) {
    return next(e)
  }
}

exports.getPanel = async (req, res, next) => {
  let panel

  try {
    panel = await Panel.findById(req.params.panelId)

    res.status(200).send(panel)
  } catch (e) {
    return next(new Error('Panel not found'))
  }
}

exports.createList = async (req, res, next) => {
  let panel

  const list = {
    title: req.body.title,
    createdBy: req.session.userId
  }

  try {
    panel = await Panel.findById(req.params.panelId)

    panel.lists.push(list)
    panel.save()

    socketServer().to(req.params.panelId).emit('panel updated')

    res.sendStatus(200)
  } catch (e) {
    return next(e)
  }
}
