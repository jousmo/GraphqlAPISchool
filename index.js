'use strict'

const { buildSchema } = require('graphql')
const express = require('express')
const graphqlHTTP = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')

const app = express()
const port = process.env.port || 3001

// Definiendo esquema
const fileSchema = join(__dirname, 'lib', 'schema.graphql')
const schema = buildSchema(readFileSync(fileSchema, 'utf-8'))

// Creando una API
app.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}))

app.listen(port, () => console.log(`Now browse to localhost:${port}/api`))
