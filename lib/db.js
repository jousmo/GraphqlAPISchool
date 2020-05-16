'use strict'

const { MongoClient } = require('mongo')

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT
} = process.env

const mongoUrl = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
let connection = null

async function connectDB () {
  if (connection) return connection

  try {
    const client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true })
    connection = client.db(DB_NAME)
    console.log('Connect db', mongoUrl)
  } catch (err) {
    console.error('Could not connect do db', mongoUrl, err)
    process.exit(1)
  }

  return connection
}

module.exports = connectDB
