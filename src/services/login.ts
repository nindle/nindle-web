import { request } from '@umijs/max'

export function login(data: any) {
  return request('/task/list', {
    method: 'GET'
  })
}

export function refresh(data: any) {
  return request('/api/refresh', {
    method: 'POST',
    data
  })
}
