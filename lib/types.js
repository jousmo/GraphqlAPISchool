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
  },

  Person: {
    __resolveType (person, context, info) {
      if (person.phone) {
        return 'Monitor'
      }

      return 'Student'
    }
  },

  GlobalSearch: {
    __resolveType (item, context, info) {
      if (item.title) {
        return 'Course'
      } else if (item.phone) {
        return 'Monitor'
      }
      return 'Student'
    }
  }
}
