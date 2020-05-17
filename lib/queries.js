'use strict'

// Configuración de los queries
const connectDB = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

module.exports = {
  async getCourses () {
    try {
      const db = await connectDB()
      const courses = await db.collection('courses').find().toArray()
      return courses
    } catch (err) {
      errorHandler(err)
    }
  },

  async getCourse (root, args) {
    const { id } = args

    try {
      const db = await connectDB()
      const course = await db.collection('courses').findOne({ _id: ObjectID(id) })
      return course
    } catch (err) {
      errorHandler(err)
    }
  },

  async getPersons () {
    try {
      const db = await connectDB()
      const students = await db.collection('students').find().toArray()
      return students
    } catch (err) {
      errorHandler(err)
    }
  },

  async getPerson (root, args) {
    const { id } = args

    try {
      const db = await connectDB()
      const student = await db.collection('students').findOne({ _id: ObjectID(id) })
      return student
    } catch (err) {
      errorHandler(err)
    }
  },

  async searchItems (root, args) {
    const { keyword } = args

    try {
      const db = await connectDB()
      const courses = await db.collection('courses').find({ $text: { $search: keyword } }).toArray()
      const persons = await db.collection('students').find({ $text: { $search: keyword } }).toArray()
      const items = [...courses, ...persons]
      return items
    } catch (err) {
      errorHandler(err)
    }
  }
}
