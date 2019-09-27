import request from '@/utils/request'

export function getOfficeTree() {
  return request({
    url: '/sys/jqSysOffice/listTree',
    method: 'post'
  })
}

export function getOfficeList(data) {
  return request({
    url: '/sys/jqSysOffice/list',
    method: 'post',
    data
  })
}

export function getOffice(officeId) {
  return request({
    url: '/sys/jqSysOffice/get',
    method: 'post',
    data: { officeId }
  })
}

export function saveOffice(data) {
  return request({
    url: `/sys/jqSysOffice/save`,
    method: 'post',
    data
  })
}

export function deleteOffice(officeIds) {
  return request({
    url: `/sys/jqSysOffice/delete`,
    method: 'post',
    data: { officeIds }
  })
}

export function startOffice(officeIds) {
  return request({
    url: `/sys/jqSysOffice/start`,
    method: 'post',
    data: { officeIds }
  })
}

export function stopOffice(officeIds) {
  return request({
    url: `/sys/jqSysOffice/stop`,
    method: 'post',
    data: { officeIds }
  })
}

export function getSortNo(parentId) {
  return request({
    url: `/sys/jqSysOffice/getSortNo`,
    method: 'post',
    data: { parentId }
  })
}

