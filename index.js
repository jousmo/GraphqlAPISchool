'use strict'

const { buildSchema } = require('graphql')
const express = require('express')
const graphqlHTTP = require('express-graphql')
const app = express()
const port = process.env.port || 3001

// Definiendo esquema
const schema = buildSchema(`
  type Query {
    "Retorna un saludo al mundo"
    hello: String
    "Retorna un gran saludo"
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

// Creando una API
app.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}))

app.listen(port, () => console.log(`Now browse to localhost:${port}/api`))
