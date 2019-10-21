import request from '@/utils/request'

// 新增记录
export function addDemo(data) {
  return request({
    url: `/sys/jqSysDemoMain/add`,
    method: 'post',
    data
  })
}
// 删除记录
export function deleteByTableName(tableName, ids) {
  return request({
    url: `/sys/jqSysDemoMain/delete`,
    method: 'post',
    data: { tableName, ids }
  })
}
// 修改记录
export function modifyDemo(data) {
  return request({
    url: `/sys/jqSysDemoMain/modify`,
    method: 'post',
    data
  })
}
// 查询单条记录
export function getByTableName(tableName, id) {
  return request({
    url: '/sys/jqSysDemoMain/get',
    method: 'post',
    data: { tableName, id }
  })
}
// 根据主表查询字表数据
export function listByMId(tableName, mId, pageNo, pageSize) {
  return request({
    url: '/sys/jqSysDemoMain/listByMId',
    method: 'post',
    data: { tableName, mId, pageNo, pageSize }
  })
}
// 查询主表集合
export function list(data) {
  return request({
    url: '/sys/jqSysDemoMain/list',
    method: 'post',
    data
  })
}
// 主表审核
export function check(id, checkStatus, checkReason) {
  return request({
    url: '/sys/jqSysDemoMain/check',
    method: 'post',
    data: { id, checkStatus, checkReason }
  })
}
