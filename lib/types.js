'use strict'

// Resolvers para Nested Types
const connectDB = require('./db')
const errorHandler = require('./errorHandler')

module.exports = {
  Course: {
    async students ({ students }) {
      try {
        const db = await connectDB()
        const ids = students || []
        const studentsData = ids.length
          ? await db.collection('students').find({ _id: { $in: ids } }).toArray()
          : []

        return studentsData
      } catch (err) {
        errorHandler(err)
      }
    }
  }
}
