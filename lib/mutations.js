'use strict'

// Configuración de los mutations
const connectDB = require('./db')
const { ObjectID } = require('mongodb')
const errorHandler = require('./errorHandler')

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
      errorHandler(err)
    }
  },

  async editCourse (root, args) {
    const { id, input } = args
    const editCourse = { ...input }

    try {
      const db = await connectDB()
      await db.collection('courses').updateOne({ _id: ObjectID(id) }, { $set: editCourse })
      const course = await db.collection('courses').findOne({ _id: ObjectID(id) })
      return course
    } catch (err) {
      errorHandler(err)
    }
  },

  async createStudent (root, args) {
    const { input } = args
    const newStudent = { ...input }

    try {
      const db = await connectDB()
      const course = await db.collection('students').insertOne(newStudent)
      newStudent._id = course.insertedId
      return newStudent
    } catch (err) {
      errorHandler(err)
    }
  },

  async editStudent (root, args) {
    const { id, input } = args
    const editStudent = { ...input }

    try {
      const db = await connectDB()
      await db.collection('students').updateOne({ _id: ObjectID(id) }, { $set: editStudent })
      const student = await db.collection('students').findOne({ _id: ObjectID(id) })
      return student
    } catch (err) {
      errorHandler(err)
    }
  },

  async addStudentCourse (root, args) {
    const { idCourse, idStudent } = args

    try {
      const db = await connectDB()
      const course = await db.collection('courses').findOne({ _id: ObjectID(idCourse) })
      const student = await db.collection('students').findOne({ _id: ObjectID(idStudent) })

      if (!course || !student) {
        throw new Error('Course or Student Not Found')
      } else {
        await db.collection('courses').updateOne({ _id: ObjectID(idCourse) }, {
          $addToSet: { students: ObjectID(idStudent) }
        })
        return course
      }
    } catch (err) {
      errorHandler(err)
    }
  }
}
