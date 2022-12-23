import { ChatGPTAPIBrowser } from 'chatgpt'

export const initialiseGpt = async (): Promise<ChatGPTAPIBrowser> => {
  const api = new ChatGPTAPIBrowser({
    email: process.env['GPT_EMAIL'] ?? '',
    password: process.env['GPT_PASSWORD'] ?? '',
    isGoogleLogin: true
  })
  await api.initSession()
  return api
}
