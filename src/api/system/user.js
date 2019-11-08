import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/system/u/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/system/u/user/info',
    method: 'post',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/system/u/user/logout',
    method: 'post'
  })
}
// 获取用户集合
export function getUserList(data) {
  return request({
    url: '/system/jqSysUser/list',
    method: 'post',
    data
  })
}
// 获取用户信息
export function getUser(userId) {
  return request({
    url: '/system/jqSysUser/get',
    method: 'post',
    data: { userId }
  })
}

// 保存用户
export function saveUser(data) {
  return request({
    url: `/system/jqSysUser/save`,
    method: 'post',
    data
  })
}

// 保存用户
export function registerSave(data) {
  return request({
    url: `/system/jqSysUser/anonw/registerSave`,
    method: 'post',
    data
  })
}
export function deleteUser(userIds) {
  return request({
    url: `/system/jqSysUser/delete`,
    method: 'post',
    data: { userIds }
  })
}

export function startUser(userIds) {
  return request({
    url: `/system/jqSysUser/start`,
    method: 'post',
    data: { userIds }
  })
}

export function stopUser(userIds) {
  return request({
    url: `/system/jqSysUser/stop`,
    method: 'post',
    data: { userIds }
  })
}
