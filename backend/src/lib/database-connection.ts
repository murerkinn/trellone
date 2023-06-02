import mongoose from 'mongoose'

mongoose.set('debug', false)

export const mongoURI = process.env.MONGO_URI || 'mongodb://localhost'

export const connectDB = async (connectionString = mongoURI) => {
  try {
    await mongoose.connect(connectionString)

    console.log('Database connection established.')
  } catch (error) {
    console.error(`Could not establish connection to ${connectionString}`)
  }
}
