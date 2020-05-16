'use strict'

// Configuración de los resolvers
const connectDB = require('./db')
const { ObjectID } = require('mongodb')

module.exports = {
  Query: {
    async getCourses () {
      let db = null
      let courses = null

      try {
        db = await connectDB()
        courses = await db.collection('courses').find().toArray()
      } catch (err) {
        console.error(err)
      }

      return courses
    },

    async getCourse (root, args) {
      const { id } = args

      let db = null
      let course = null

      try {
        db = await connectDB()
        course = await db.collection('courses').findOne({ _id: ObjectID(id) })
      } catch (err) {
        console.error(err)
      }

      return course
    }
  }
}
