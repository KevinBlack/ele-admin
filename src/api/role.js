import request from '@/utils/request'

export function getRoles() {
  return request({
    url: '/roles',
    method: 'get'
  })
}

export function getRoleList(data) {
  return request({
    url: '/article/list',
    method: 'post',
    params: data
  })
}

export function getMenuTree() {
  return request({
    url: '/jqSysRole/getMenuTree',
    method: 'post'
  })
}

export function getRole(roleId) {
  return request({
    url: '/jqSysRole/get',
    method: 'post',
    data: { roleId }
  })
}

export function saveRole(data) {
  return request({
    url: '/jqSysRole/save',
    method: 'post',
    data
  })
}

export function deleteRole(roleIds) {
  return request({
    url: `/jqSysRole/delete`,
    method: 'post',
    data: { roleIds }
  })
}

export function startRole(roleIds) {
  return request({
    url: `/jqSysRole/start`,
    method: 'post',
    data: { roleIds }
  })
}

export function stopRole(roleIds) {
  return request({
    url: `/jqSysRole/stop`,
    method: 'post',
    data: { roleIds }
  })
}

export function getSortNo() {
  return request({
    url: `/jqSysRole/getSortNo`,
    method: 'post'
  })
}
