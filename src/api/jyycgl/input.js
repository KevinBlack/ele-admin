import request from '@/utils/request'

export function getAbnormalOperationList(data) {
  return request({
    url: '/hxxd/hxXdAbnormalOperation/list',
    method: 'post',
    data
  })
}

export function saveAbnormalOperation(data) {
  return request({
    url: '/hxxd/hxXdAbnormalOperation/save',
    method: 'post',
    data
  })
}

export function getAbnormal(abnormalId) {
  return request({
    url: '/hxxd/hxXdAbnormalOperation/getAbnormal',
    method: 'post',
    data: { abnormalId }
  })
}

export function deleteAbnormal(abnormalIds) {
  return request({
    url: '/hxxd/hxXdAbnormalOperation/deleteAbnormal',
    method: 'post',
    data: { abnormalIds }
  })
}

export function moveData(data) {
  return request({
    url: '/hxxd/hxXdAbnormalOperation/moveData',
    method: 'post',
    data
  })
}

export function pubData(data) {
  return request({
    url: '/hxxd/hxXdAbnormalOperation/pubData',
    method: 'post',
    data
  })
}
