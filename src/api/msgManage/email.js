import request from '@/utils/request'

export function getSysEmailList(data) {
  return request({
    url: '/hxxd/hxXdSysEmail/list',
    method: 'post',
    data
  })
}

export function saveOrUpdateEmail(data) {
  return request({
    url: '/hxxd/hxXdSysEmail/saveOrUpdateEmail',
    method: 'post',
    data
  })
}

export function getEmail(id) {
  return request({
    url: '/hxxd/hxXdSysEmail/getEmail',
    method: 'post',
    data: { id }
  })
}

export function delData(ids) {
  return request({
    url: '/hxxd/hxXdSysEmail/delete',
    method: 'post',
    data: { ids }
  })
}

export function sendData(id) {
  return request({
    url: '/hxxd/hxXdSysEmail/send',
    method: 'post',
    data: { id }
  })
}
