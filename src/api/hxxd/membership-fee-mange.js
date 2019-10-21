import request from '@/utils/request'
/** 会费管理 请求控制器**/
/**
 * 获取会费登记列表信息
 * @param {*} data
 */
export function getDjInfoList(data) {
  return request({
    url: '/hxxd/hxxdadminHfInfo/list',
    method: 'post',
    data
  })
}
/**
 * 批量删除会费登记信息
 * @param {*} ids 需要操作数据id集合信息描述
 */
export function deleteMember(ids) {
  return request({
    url: '/hxxd/hxxdadminHfInfo/delete',
    method: 'post',
    data: { ids }
  })
}
/**
 * 更新审批状态
 * @param {*} ids 需要操作数据id集合信息描述
 * @param {*} state 需要更改的状态信息
 */
export function saveSp(ids, state) {
  return request({
    url: '/hxxd/hxxdadminHfInfo/saveSp',
    method: 'post',
    data: { ids, state }
  })
}

