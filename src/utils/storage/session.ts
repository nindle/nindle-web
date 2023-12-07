import { decrypto, encrypto } from '../crypto'

export function setSession(key: string, value: unknown) {
  const json = encrypto(value)
  window.sessionStorage.setItem(key, json)
}

export function getSession<T>(key: string) {
  const json = window.sessionStorage.getItem(key)
  let data: T | null = null
  if (json) {
    try {
      data = decrypto(json)
    }
    catch {
      // 防止解析失败
    }
  }
  return data
}

export function removeSession(key: string) {
  window.sessionStorage.removeItem(key)
}

export function clearSession() {
  window.sessionStorage.clear()
}
