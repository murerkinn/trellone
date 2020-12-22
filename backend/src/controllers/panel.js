const Validator = require('async-validator').default

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
