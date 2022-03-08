export const uploadFile = async (file: File) => {
  console.log('TS')
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
