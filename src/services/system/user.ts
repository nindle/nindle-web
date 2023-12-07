import { request } from '@umijs/max'

export function createUser(data: any) {
  return request('/api/user', {
    method: 'POST',
    data,
  })
}

export function queryUser(params: any) {
  return request('/api/user', {
    method: 'GET',
    params,
  })
}

export function getUserProfile() {
  return request('/api/user/profile', {
    method: 'GET',
  })
}

export function updateUser(id: number, data: any) {
  return request(`/api/user/${id}`, {
    method: 'PATCH',
    data,
  })
}
