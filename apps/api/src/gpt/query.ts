// @ts-expect-error
import type { ChatGPTAPIBrowser } from 'chatgpt'

export const initialiseGpt = async (): Promise<ChatGPTAPIBrowser> => {
  const { ChatGPTAPIBrowser } = await import('chatgpt')

  const api = new ChatGPTAPIBrowser({
    email: process.env['GPT_EMAIL'] ?? '',
    password: process.env['GPT_PASSWORD'] ?? '',
    isGoogleLogin: true,
    minimize: true
  })
  await api.initSession()
  return api
}
