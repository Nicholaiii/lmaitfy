const url = '/api/gpt'

type GPTResponse = {
  message: string
}

export async function queryGPT (query: string): Promise<GPTResponse> {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  })
  return response.json()
}
