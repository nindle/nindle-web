import { getLocal, removeLocal, setLocal } from '../storage'
import { EnumStorageKey } from '@/enums'

export function setAccessToken(token: string) {
  setLocal(EnumStorageKey.ACCESS_TOKEN, token)
}

export function getAccessToken() {
  return getLocal(EnumStorageKey.ACCESS_TOKEN)
}

export function removeAccessToken() {
  removeLocal(EnumStorageKey.ACCESS_TOKEN)
}

export function setRefreshToken(token: string) {
  setLocal(EnumStorageKey.REFRESH_TOKEN, token)
}

export function getRefreshToken() {
  return getLocal(EnumStorageKey.REFRESH_TOKEN)
}

export function removeRefreshToken() {
  removeLocal(EnumStorageKey.REFRESH_TOKEN)
}
