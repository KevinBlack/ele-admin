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
    url: '/system/u/user/anonw/logout',
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
/**
 * 通过邮箱号或者手机号修改密码
 * @param {*} mobileNum 手机号/或邮箱号
 * @param {*} passWord 需要修改的密码
 */
export function modifyPassWrod(mobileNum, passWord, key) {
  return request({
    url: `/system/jqSysUser/anonw/modifyPassWrod`,
    method: 'post',
    data: { mobileNum, passWord, key }
  })
}
/**
 * 校验手机用户是否存在
 * @param {*} mobileNum 手机号
 */
export function checkMobile(mobileNum) {
  return request({
    url: `/system/jqSysUser/anonw/checkMobile`,
    method: 'post',
    data: { mobileNum }
  })
}

/**
 * 校验手机用户是否存在，注册时用
 * @param {*} mobileNum 手机号
 */
export function registerCheckMobile(mobileNum) {
  return request({
    url: `/system/jqSysUser/anonw/registerCheckMobile`,
    method: 'post',
    data: { mobileNum }
  })
}
/*
 * 校验邮箱用户是否存在
 * @param {*} emailNum 手机号
 */
export function checkEmail(emailNum) {
  return request({
    url: `/system/jqSysUser/anonw/checkEmail`,
    method: 'post',
    data: { emailNum }
  })
}
