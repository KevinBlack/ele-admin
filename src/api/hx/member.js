import request from '@/utils/request'
/** 航协会员管理 **/

/**
 * 航协会员查询（单条）
 * @param {*} id
 */
export function getHxMember(id) {
  return request({
    url: '/hxxd/hxMember/get',
    method: 'post',
    data: { id }
  })
}

/**
 * 航协会员查询（多条）
 * @param {*} id
 */
export function getMemberList(data) {
  return request({
    url: '/hxxd/hxMember/list',
    method: 'post',
    data
  })
}

/**
 * 航协会员统计
 * @param {*} year 年份
 */
export function getStatistics(year) {
  return request({
    url: '/hxxd/hxMember/statistics',
    method: 'post',
    data: { year }
  })
}

/**
 * 批量导出
 * formQuery
 */
export function memberExport(ids) {
  return request({
    url: '/hxxd/hxMember/memberExport',
    method: 'get',
    responseType: 'blob',
    params: {ids}
  })
}

/**
 * 会员恢复
 * formQuery
 */
export function memberRecovery(ids) {
  return request({
    url: '/hxxd/hxMember/memberRecovery',
    method: 'post',
    params : {ids}
  })
}
