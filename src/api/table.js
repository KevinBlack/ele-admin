import request from '@/utils/request'

export function fetchList() {
  return request({
    url: '/table/list',
    method: 'get'
  })
}

export function fetchTable(id) {
  return request({
    url: '/table/detail',
    method: 'post',
    params: { id }
  })
}

export function createTable(data) {
  return request({
    url: '/table/create',
    method: 'post',
    data
  })
}

export function updaTetable(data) {
  return request({
    url: '/table/update',
    method: 'post',
    data
  })
}
