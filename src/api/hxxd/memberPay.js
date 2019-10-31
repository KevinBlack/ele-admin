import request from '@/utils/request'
/** 会员缴费管理 请求控制器**/
/**
 * 获取会员缴费记录信息列表信息HxxdadminHfInfo
 * @param {*} data
 */
export function getMemberPayInfoList(id) {
  return request({
    url: '/hxxd/memberPay/getMemberPayInfoList',
    method: 'post',
    data: { id }
  })
}
export function getAdminHfInfo(id) {
  return request({
    url: '/hxxd/hxxdadminHfInfo/getAdminHfInfo',
    method: 'post',
    data: { id }
  })
}
/**
 * 会员缴费记录信息删除
 * @param {*} ids
 */
export function deleteMemberPay(ids) {
  return request({
    url: '/hxxd/memberPay/deleteMemberPay',
    method: 'post',
    data: { ids }
  })
}
