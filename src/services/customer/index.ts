import { request } from '@umijs/max'

export function createCustomer(data: any) {
  return request('/api/customer', {
    method: 'POST',
    data,
  })
}

export function queryCustomer(params: any) {
  return request('/api/customer', {
    method: 'GET',
    params,
  })
}

export function queryCustomerDetail(id: number) {
  return request(`/api/customer/${id}`, {
    method: 'GET',
  })
}

export function updateCustomer(id: number, data: any) {
  return request(`/api/customer/${id}`, {
    method: 'PATCH',
    data,
  })
}

export function updateFollower(id: number) {
  return request(`/api/customer/follower/${id}`, {
    method: 'PATCH',
  })
}

export function moveToPublic(id: number) {
  return request(`/api/customer/move-to-public/${id}`, {
    method: 'PATCH',
  })
}

export function deleteCustomer(id: number) {
  return request(`/api/customer/${id}`, {
    method: 'DELETE',
  })
}

export function createFollowRecord(data: any) {
  return request('/api/customer/follow-record', {
    method: 'POST',
    data,
  })
}
