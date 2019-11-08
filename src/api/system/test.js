import request from '@/utils/request'

export function getList() {
  return request({
    url: '/system/hx-test-datascope/list',
    method: 'post'
  })
}

export function get(id) {
  return request({
    url: '/system/hx-test-datascope/get',
    method: 'post',
    data: { id }
  })
}

export function save() {
  return request({
    url: '/system/hx-test-datascope/save',
    method: 'post'
  })
}

