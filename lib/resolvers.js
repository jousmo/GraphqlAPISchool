'use strict'

// Configuración de los resolvers
const queries = require('./queries')
const mutations = require('./mutations')

module.exports = {
  Query: queries,
  Mutation: mutations
}
