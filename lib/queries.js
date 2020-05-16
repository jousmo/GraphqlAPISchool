'use strict'

// Configuración de los queries
const connectDB = require('./db')
const { ObjectID } = require('mongodb')

module.exports = {
  async getCourses () {
    try {
      const db = await connectDB()
      const courses = await db.collection('courses').find().toArray()
      return courses
    } catch (err) {
      return console.error(err)
    }
  },

  async getCourse (root, args) {
    const { id } = args

    try {
      const db = await connectDB()
      const course = await db.collection('courses').findOne({ _id: ObjectID(id) })
      return course
    } catch (err) {
      return console.error(err)
    }
  }
}
