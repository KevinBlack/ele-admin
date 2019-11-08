import request from '@/utils/request'

export function getRoles() {
  return request({
    url: '/system/roles',
    method: 'get'
  })
}

export function getRoleList(data) {
  return request({
    url: '/system/jqSysRole/list',
    method: 'post',
    data
  })
}

export function getMenuTree() {
  return request({
    url: '/system/jqSysRole/getMenuTree',
    method: 'post'
  })
}

export function getRole(roleId) {
  return request({
    url: '/system/jqSysRole/get',
    method: 'post',
    data: { roleId }
  })
}

export function saveRole(data) {
  return request({
    url: '/system/jqSysRole/save',
    method: 'post',
    data
  })
}

export function deleteRole(roleIds) {
  return request({
    url: `/system/jqSysRole/delete`,
    method: 'post',
    data: { roleIds }
  })
}

export function startRole(roleIds) {
  return request({
    url: `/system/jqSysRole/start`,
    method: 'post',
    data: { roleIds }
  })
}

export function stopRole(roleIds) {
  return request({
    url: `/system/jqSysRole/stop`,
    method: 'post',
    data: { roleIds }
  })
}

export function getSortNo() {
  return request({
    url: `/system/jqSysRole/getSortNo`,
    method: 'post'
  })
}
