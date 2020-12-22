const mongoose = require('mongoose')
const Card = require('./card')

const List = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200
    },
    cards: {
      type: [Card],
      default: []
    },
    createdBy: mongoose.Schema.Types.ObjectId
  },
  { timestamps: true }
)

module.exports = List
