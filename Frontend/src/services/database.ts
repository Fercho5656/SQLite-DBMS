export enum Queries {
  getTables = "SELECT * FROM sqlite_master where type='table';",
  getViews = "SELECT * FROM sqlite_master where type='view';",
  describeTable = 'PRAGMA table_info(%s);'
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

export const backupDatabase = async (database: string) => {
  try {
    const response = await fetch(
      `http://localhost:3001/databases/${database}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'backup' })
      }
    )
    const data = await response.json()
    const { status } = response
    return { data, status }
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

export const getDatabases = async () => {
  try {
    const response = await fetch('http://localhost:3001/databases')
    const json = await response.json()
    console.log(json)
    return json
  } catch (err) {
    console.error(err)
  }
}

export const deleteDatabase = async (db: String) => {
  try {
    const response = await fetch(`http://localhost:3001/databases/${db}`, {
      method: 'DELETE'
    })
    const json = await response.json()
    return json
  } catch (err) {
    console.error(err)
  }
}

export const selectDatabase = async (db: String) => {
  try {
    await fetch(`http://localhost:3001/databases/${db}`)
    const tablesJson = await sendQuery(Queries.getTables)
    return tablesJson
  } catch (err) {
    console.error(err)
  }
}
