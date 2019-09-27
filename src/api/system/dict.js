import request from '@/utils/request'

// 获取字典列表
export function getDictList(data) {
  return request({
    url: '/sys/jqSysDict/listDict',
    method: 'post',
    data
  })
}

// 获取字典项列表
export function getDictDataList(data) {
  return request({
    url: '/sys/jqSysDict/listDictData',
    method: 'post',
    data
  })
}
// 获取字典
export function getDict(id) {
  return request({
    url: '/sys/jqSysDict/getDict',
    method: 'post',
    data: { id }
  })
}
// 获取字典项
export function getDictData(id) {
  return request({
    url: '/sys/jqSysDict/getDictData',
    method: 'post',
    data: { id }
  })
}
// 保存字典
export function saveDict(data) {
  return request({
    url: '/sys/jqSysDict/saveDict',
    method: 'post',
    data
  })
}
// 保存字典项
export function saveDictData(data) {
  return request({
    url: '/sys/jqSysDict/saveDictData',
    method: 'post',
    data
  })
}
// 删除字典
export function deleteDict(ids) {
  return request({
    url: `/sys/jqSysDict/deleteDict`,
    method: 'post',
    data: { ids }
  })
}
// 删除字典
export function deleteDictData(ids) {
  return request({
    url: `/sys/jqSysDict/deleteDictData`,
    method: 'post',
    data: { ids }
  })
}
// 获取json对象
export function getDictJson(dictType) {
  return request({
    url: `/sys/jqSysDict/getDictJson`,
    method: 'post',
    data: { dictType }
  })
}
