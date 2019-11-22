import request from '@/utils/request'

// 获取字典列表
export function getDictList(data) {
  return request({
    url: '/system/jqSysDict/listDict',
    method: 'post',
    data
  })
}

// 获取字典项列表
export function listDictData(data) {
  return request({
    url: '/system/jqSysDict/listDictData',
    method: 'post',
    data
  })
}
// 获取字典
export function getDict(id) {
  return request({
    url: '/system/jqSysDict/getDict',
    method: 'post',
    data: { id }
  })
}
// 获取字典项
export function getDictData(id) {
  return request({
    url: '/system/jqSysDict/getDictData',
    method: 'post',
    data: { id }
  })
}
// 保存字典
export function saveDict(data) {
  return request({
    url: '/system/jqSysDict/saveDict',
    method: 'post',
    data
  })
}
// 保存字典项
export function saveDictData(data) {
  return request({
    url: '/system/jqSysDict/saveDictData',
    method: 'post',
    data
  })
}
// 删除字典
export function deleteDict(ids) {
  return request({
    url: `/system/jqSysDict/deleteDict`,
    method: 'post',
    data: { ids }
  })
}
// 删除字典
export function deleteDictData(ids) {
  return request({
    url: `/system/jqSysDict/deleteDictData`,
    method: 'post',
    data: { ids }
  })
}

