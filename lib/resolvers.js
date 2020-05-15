'use strict'

// Configuración de los resolvers
const courses = [
  {
    _id: 1,
    title: 'JavaScript Yeha',
    teache: 'Jousmo',
    description: 'Full Course JavaScript Yeha',
    topic: 'JS'
  },
  {
    _id: 2,
    title: 'React JS Yeha',
    teache: 'Jousmo',
    description: 'Full Course React JS Yeha',
    topic: 'React'
  }
]

module.exports = {
  getCourses () {
    return courses
  }
}
