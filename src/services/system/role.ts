import { request } from '@umijs/max'

export function createRole(data: any) {
  return request('/api/role', {
    method: 'POST',
    data,
  })
}

export function queryRole() {
  return request('/api/role', {
    method: 'GET',
  })
}

export function updateRole(id: number, data: any) {
  return request(`/api/role/${id}`, {
    method: 'PATCH',
    data,
  })
}

export function deleteRole(id: number) {
  return request(`/api/role/${id}`, {
    method: 'DELETE',
  })
}
