const mongoose = require('mongoose')
const List = require('./list')

const Panel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200
    },
    lists: {
      type: [List],
      default: []
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Panel', Panel)
