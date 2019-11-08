import request from '@/utils/request'

// 获取字典列表
export function getExceptionList(data) {
  return request({
    url: '/system/jqSysExeceptionLog/list',
    method: 'post',
    data
  })
}
// 删除字典
export function deleteException(ids) {
  return request({
    url: `/system/jqSysExeceptionLog/delete`,
    method: 'post',
    data: { ids }
  })
}

