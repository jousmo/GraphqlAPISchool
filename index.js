'use strict'

require('dotenv').config()
const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const graphqlHTTP = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const cors = require('cors')
const resolvers = require('./lib/resolvers')

const app = express()
const port = process.env.port || 3001
const isDev = process.env.NODE_ENV !== 'production'

// Definiendo esquema
const fileSchema = join(__dirname, 'lib', 'schema.graphql')
const typeDefs = readFileSync(fileSchema, 'utf-8')
const schema = makeExecutableSchema({ typeDefs, resolvers })

// Definiendo Middlewares
app.use(cors())

// Creando una API
app.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: isDev
}))

app.listen(port, () => {
  isDev ? console.log(`Now browse to localhost:${port}/api`) : console.log('Server Running...')
})
