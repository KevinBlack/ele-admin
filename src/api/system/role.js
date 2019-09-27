import request from '@/utils/request'

export function getRoles() {
  return request({
    url: '/system/roles',
    method: 'get'
  })
}

export function getRoleList(data) {
  return request({
    url: '/sys/jqSysRole/list',
    method: 'post',
    data
  })
}

export function getMenuTree() {
  return request({
    url: '/sys/jqSysRole/getMenuTree',
    method: 'post'
  })
}

export function getRole(roleId) {
  return request({
    url: '/sys/jqSysRole/get',
    method: 'post',
    data: { roleId }
  })
}

export function saveRole(data) {
  return request({
    url: '/sys/jqSysRole/save',
    method: 'post',
    data
  })
}

export function deleteRole(roleIds) {
  return request({
    url: `/sys/jqSysRole/delete`,
    method: 'post',
    data: { roleIds }
  })
}

export function startRole(roleIds) {
  return request({
    url: `/sys/jqSysRole/start`,
    method: 'post',
    data: { roleIds }
  })
}

export function stopRole(roleIds) {
  return request({
    url: `/sys/jqSysRole/stop`,
    method: 'post',
    data: { roleIds }
  })
}

export function getSortNo() {
  return request({
    url: `/sys/jqSysRole/getSortNo`,
    method: 'post'
  })
}
