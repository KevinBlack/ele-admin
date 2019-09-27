import request from '@/utils/request'

// 根据roleId 获取数据权限
export function getDataScope(roleId) {
  return request({
    url: '/sys/jqSysDataScope/get',
    method: 'post',
    data: { roleId }
  })
}

export function saveDataScope(data) {
  return request({
    url: '/sys/jqSysDataScope/save',
    method: 'post',
    data
  })
}

export function deleteDataScope(id) {
  return request({
    url: `/sys/jqSysDataScope/delete`,
    method: 'post',
    data: { id }
  })
}

