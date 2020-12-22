const mongoose = require('mongoose')

const Card = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200
    },
    description: {
      type: String,
      minlength: 3,
    },
    voters: {
      type: ['ObjectId'],
      default: [],
    },
    createdBy: mongoose.Schema.Types.ObjectId
  },
  { timestamps: true }
)

module.exports = Card
