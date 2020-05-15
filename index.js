'use strict'

const { graphql, buildSchema } = require('graphql')

// Definiendo esquema
const schema = buildSchema(`
  type Query {
    hello: String
    saludo: String
  }
`)

// Configurar los resolvers
const resolvers = {
  hello () {
    return 'Hola Mundo'
  },
  saludo () {
    return 'Hola a todos'
  }
}

// Ejecutar el query hello
graphql(schema, '{ hello }', resolvers).then((response) => {
  console.log(response)
})

graphql(schema, '{ saludo }', resolvers).then((response) => {
  console.log(response)
})
