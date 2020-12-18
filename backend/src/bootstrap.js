const mongoose = require('mongoose')

const connectionString = process.env.MONGO_CONNECTION_STRING || 'mongodb://mongodb:27017/trellone'

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = { mongoose }
