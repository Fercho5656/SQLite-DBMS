export const uploadFile = async (file: File) => {
  const formData: FormData = new FormData()
  formData.append('file', file)
  try {
    const response = await fetch('http://localhost:3001/upload', {
      method: 'POST',
      headers: {},
      body: formData
    })
    const json = await response.json()
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
    const json = await response.json()
    console.log('json', typeof json)
    return json
  } catch (err) {
    console.error(err)
  }
}
