const queries = {
  showTables: "SELECT * FROM sqlite_master where type='table';"
}

export const uploadFile = async (file: File) => {
  const formData: FormData = new FormData()
  formData.append('file', file)
  try {
    const response = await fetch('http://localhost:3001/upload', {
      method: 'POST',
      headers: {},
      body: formData
    })
    return await response.json()
  } catch (err) {
    console.error(err)
  }
}

export const createDatabase = async (dbName: string) => {
  try {
    const response = await fetch('http://localhost:3001/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ dbName })
    })
    const json = await response.json()
    console.log(json)
    return json
  } catch (err) {
    console.error(err)
  }
}

export const sendQuery = async (query: string) => {
  try {
    const response = await fetch('http://localhost:3001/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    })
    return await response.json()
  } catch (err) {
    console.error(err)
  }
}
