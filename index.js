'use strict'

const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const graphqlHTTP = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')

const app = express()
const port = process.env.port || 3001

// Definiendo esquema
const fileSchema = join(__dirname, 'lib', 'schema.graphql')
const typeDefs = readFileSync(fileSchema, 'utf-8')
const schema = makeExecutableSchema({ typeDefs, resolvers })

// Creando una API
app.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}))

app.listen(port, () => console.log(`Now browse to localhost:${port}/api`))
