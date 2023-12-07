import { request } from '@umijs/max'

export function createPermission(data: any) {
  return request('/api/permission', {
    method: 'POST',
    data,
  })
}

export function queryPermissionTree() {
  return request('/api/permission', {
    method: 'GET',
  })
}

export function updatePermission(id: number, data: any) {
  return request(`/api/permission/${id}`, {
    method: 'PATCH',
    data,
  })
}

export function deletePermission(id: number) {
  return request(`/api/permission/${id}`, {
    method: 'DELETE',
  })
}
