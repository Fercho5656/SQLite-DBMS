const sqlite3 = require('sqlite3').verbose()

const databaseOperations = {}

databaseOperations.setDatabase = dbRoute => {
  const db = new sqlite3.Database(dbRoute, sqlite3.OPEN_READWRITE, err => {
    if (err) console.error(err)
    console.log('Connected to the database')
  })
  return db
}

module.exports = databaseOperations
