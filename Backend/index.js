const databaseOperations = require('./db')

const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

require('dotenv').config()

const app = express()
let currentDatabase = ''

app.set('port', process.env.PORT || 3001)

app.use(cors())
app.use(express.json())
app.use(
  fileUpload({
    createParentPath: true
  })
)

// Upload database
app.post('/upload', (req, res) => {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.')
  }
  const { file } = req.files
  const filePath = path.join(__dirname, 'public', file.name)

  file.mv(filePath, err => {
    if (err) {
      return res.status(500).send(err)
    }
    currentDatabase = databaseOperations.setDatabase(filePath)
    return res.send('File uploaded successfully!')
  })
})

// Create Database
app.post('/create', (req, res) => {
  if (!req.body) return res.status(400).send('No body')
  const { dbName } = req.body
  if (!dbName) return res.status(400).send('No dbName')
  databaseOperations.createDatabase(dbName)
  return res.send('Database created successfully!')
})

// Get all saved databases
app.get('/databases', (req, res) => {
  const dir = path.join(__dirname, 'public')
  // read all files in the directory and push them to the array
  fs.readdir(dir, (err, files) => {
    if (err) console.error(err)
    res.json(files.filter(file => file.endsWith('.db')))
  })
})

app.get('/databases/:name', (req, res) => {
  const { name } = req.params
  const filePath = path.join(__dirname, 'public', name)
  if (!fs.existsSync(filePath)) {
    return res.status(400).send('No such database')
  }
  currentDatabase = databaseOperations.setDatabase(filePath)
  return res.send('Database selected successfully!')
})

app.delete('/databases/:name', (req, res) => {
  const { name } = req.params
  const filePath = path.join(__dirname, 'public', name)
  fs.unlink(filePath, err => {
    if (err) console.error(err)
    return res.send('Database deleted successfully!')
  })
})

// Send SQL query
app.post('/query', async (req, res) => {
  if (!currentDatabase) return res.status(400).send('No database found')
  console.log('query: ', req.body)
  const { query } = req.body
  const rows = await databaseOperations.executeQuery(currentDatabase, query)
  res.json(rows)
})

app.listen(app.get('port'), () => {
  console.log(`Server is running on http://localhost:${app.get('port')}`)
})
