import request from '@/utils/request'

export function getMenuTree() {
  return request({
    url: '/jqSysMenu/listTree',
    method: 'get'
  })
}

export function getMenuList(data) {
  return request({
    url: '/jqSysMenu/list',
    method: 'get',
    data
  })
}

export function getMenu(menuId) {
  return request({
    url: '/jqSysMenu/get',
    method: 'post',
    data: { menuId }
  })
}

export function addMenu(data) {
  return request({
    url: '/jqSysMenu/add',
    method: 'post',
    data
  })
}

export function updateMenu(data) {
  return request({
    url: `/jqSysMenu/modify`,
    method: 'post',
    data
  })
}

export function deleteMenu(menuId) {
  return request({
    url: `/jqSysMenu/delete`,
    method: 'post',
    data: { menuId }
  })
}

