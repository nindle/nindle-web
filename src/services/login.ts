import { request } from '@umijs/max'

export function login(data: any) {
  return request('/api/login', {
    method: 'POST',
    data,
  })
}

export function refresh(data: any) {
  return request('/api/refresh', {
    method: 'POST',
    data,
  })
}
