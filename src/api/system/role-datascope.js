import request from '@/utils/request'

// 根据roleId 获取数据权限
export function getDataScope(roleId) {
  return request({
    url: '/system/jqSysDataScope/get',
    method: 'post',
    data: { roleId }
  })
}

export function saveDataScope(data) {
  return request({
    url: '/system/jqSysDataScope/save',
    method: 'post',
    data
  })
}

export function deleteDataScope(id) {
  return request({
    url: `/system/jqSysDataScope/delete`,
    method: 'post',
    data: { id }
  })
}

