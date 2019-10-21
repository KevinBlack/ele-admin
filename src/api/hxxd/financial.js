import request from '@/utils/request'
/** 会员缴费管理 请求控制器**/
/**
 * 获取会员缴费记录信息列表信息
 * @param {*} data
 */
export function getFinancialInfoList(data) {
  return request({
    url: '/hxxd/financial/list',
    method: 'post',
    data
  })
}
/**
 * 保存选择中
 * @param {*} ids 需要操作数据id集合信息描述
 * @param {*} state 需要更改的状态信息
 */
export function saveCheck(ids) {
  return request({
    url: '/hxxd/financial/saveCheck',
    method: 'post',
    data: { ids }
  })
}

