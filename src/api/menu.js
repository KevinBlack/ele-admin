import request from '@/utils/request'

export function getMenuTree() {
  return request({
    url: '/jqSysMenu/getMenuTree',
    method: 'post'
  })
}

export function getMenuList(data) {
  return request({
    url: '/jqSysMenu/list',
    method: 'post',
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

export function saveMenu(data) {
  return request({
    url: '/jqSysMenu/save',
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

export function getSortNo(parentId) {
  return request({
    url: `/jqSysMenu/getSortNo`,
    method: 'post',
    data: { parentId }
  })
}

