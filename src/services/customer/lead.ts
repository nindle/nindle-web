import { request } from '@umijs/max'

export function createLead(data: any) {
  return request('/api/customer/lead', {
    method: 'POST',
    data,
  })
}

export function queryLead(params: any) {
  return request('/api/customer/lead', {
    method: 'GET',
    params,
  })
}

export function queryLeadDetail(id: number) {
  return request(`/api/customer/lead/${id}`, {
    method: 'GET',
  })
}

export function moveToInvalid(id: number) {
  return request(`/api/customer/lead/move-to-invalid/${id}`, {
    method: 'PATCH',
  })
}
