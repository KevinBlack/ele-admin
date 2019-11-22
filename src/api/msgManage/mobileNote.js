import request from '@/utils/request'

export function getSysNoteList(data) {
  return request({
    url: '/hxxd/hxXdSysSms/list',
    method: 'post',
    data
  })
}

export function delData(ids) {
  return request({
    url: '/hxxd/hxXdSysSms/delete',
    method: 'post',
    data: {
      ids
    }
  })
}

export function sendData(id) {
  return request({
    url: '/hxxd/hxXdSysSms/send',
    method: 'post',
    data: {
      id
    }
  })
}

export function saveOrUpdateNote(data) {
  return request({
    url: '/hxxd/hxXdSysSms/saveOrUpdate',
    method: 'post',
    data
  })
}

export function getNoet(id) {
  return request({
    url: '/hxxd/hxXdSysSms/getById',
    method: 'post',
    data: {
      id
    }
  })
}

export function saveAndSend(data) {
  return request({
    url: '/hxxd/hxXdSysSms/saveAndSend',
    method: 'post',
    data
  })
}
