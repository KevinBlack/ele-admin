import request from '@/utils/request'

export function getMenuTree() {
  return request({
    url: '/system/jqSysMenu/getMenuTree',
    method: 'post'
  })
}

export function getMenuList(data) {
  return request({
    url: '/system/jqSysMenu/list',
    method: 'post',
    data
  })
}

export function getMenu(menuId) {
  return request({
    url: '/system/jqSysMenu/get',
    method: 'post',
    data: { menuId }
  })
}

export function saveMenu(data) {
  return request({
    url: '/system/jqSysMenu/save',
    method: 'post',
    data
  })
}

export function deleteMenu(menuId) {
  return request({
    url: `/system/jqSysMenu/delete`,
    method: 'post',
    data: { menuId }
  })
}

export function getSortNo(parentId) {
  return request({
    url: `/system/jqSysMenu/getSortNo`,
    method: 'post',
    data: { parentId }
  })
}

