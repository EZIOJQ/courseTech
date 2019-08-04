// src / config / index.js
'use strict'

const config = {
  port: 8080,
  secret: 'super-secret-key',
  databaseUrl: 'mongodb://localhost/courses',
  saltRounds: 10
}

module.exports = config
