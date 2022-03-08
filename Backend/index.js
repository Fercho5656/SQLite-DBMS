const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

require('dotenv').config()

const app = express()

app.set('port', process.env.PORT || 3001)

app.use(cors())
app.use(
  fileUpload({
    createParentPath: true
  })
)

app.post('/upload', (req, res) => {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.')
  }
  console.log(req.files)

  const { file } = req.files

  const filePath = path.join(__dirname, 'public', file.name)

  file.mv(filePath, err => {
    if (err) {
      return res.status(500).send(err)
    }
    return res.send('File uploaded successfully!')
  })
})

app.get('/', (req, res) => {
  const dir = path.join(__dirname, 'public')
  const filesFound = []
  // read all files in the directory and push them to the array
  fs.readdir(dir, (err, files) => {
    if (err) console.error(err)
    files.forEach(file => filesFound.push(file))
    res.send(filesFound)
  })
})

app.listen(app.get('port'), () => {
  console.log(`Server is running on http://localhost:${app.get('port')}`)
})
