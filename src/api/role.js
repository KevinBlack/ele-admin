import request from '@/utils/request'

export function getRoles() {
  return request({
    url: '/roles',
    method: 'get'
  })
}

export function getRoleList(data) {
  return request({
    url: '/jqSysRole/list',
    method: 'post',
    data
  })
}

export function getRole(roleId) {
  return request({
    url: '/jqSysRole/get',
    method: 'post',
    data: { roleId }
  })
}

export function addRole(data) {
  return request({
    url: '/jqSysRole/add',
    method: 'post',
    data
  })
}

export function updateRole(data) {
  return request({
    url: `/jqSysRole/modify`,
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
