import { request } from '@umijs/max'

export function createDepartment(data: any) {
  return request('/api/department', {
    method: 'POST',
    data,
  })
}

export function queryDepartmentList(params: any) {
  return request('/api/department', {
    method: 'GET',
    params,
  })
}

export function updateDepartment(id: number, data: any) {
  return request(`/api/department/${id}`, {
    method: 'PATCH',
    data,
  })
}

export function deleteDepartment(id: number) {
  return request(`/api/department/${id}`, {
    method: 'DELETE',
  })
}
