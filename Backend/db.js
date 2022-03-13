const sqlite3 = require('sqlite3').verbose()

const databaseOperations = {}

databaseOperations.createDatabase = databaseName => {
  return new sqlite3.Database(
    `./public/${databaseName}.db`,
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    err => {
      if (err) console.error(err)
      console.log(`Database ${databaseName} created successfully!`)
    }
  )
}

databaseOperations.setDatabase = dbRoute => {
  const db = new sqlite3.Database(dbRoute, sqlite3.OPEN_READWRITE, err => {
    if (err) console.error(err)
    console.log('Connected to the database')
  })
  return db
}

databaseOperations.executeQuery = (database, query) => {
  return new Promise((resolve, reject) => {
    database.all(query, (err, rows) => {
      if (err) reject(err)
      resolve(rows)
    })
  })
}

module.exports = databaseOperations
