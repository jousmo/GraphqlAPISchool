'use strict'

module.exports = err => {
  console.error(err)
  throw new Error('The server had an unexpected error.')
}
