'use strict'

// Configuración de los mutations
const connectDB = require('./db')

module.exports = {
  async createCourse (root, args) {
    const { input } = args

    const newCourse = {
      teacher: '',
      topic: '',
      ...input
    }

    try {
      const db = await connectDB()
      const course = await db.collection('courses').insertOne(newCourse)
      newCourse._id = course.insertedId
      return newCourse
    } catch (err) {
      return console.error(err)
    }
  }
}
