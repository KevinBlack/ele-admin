import request from '@/utils/request'

export function importFile(data) {
  return request({
    url: '/hxxd/hx-xd-financial-manage/importFile',
    method: 'post',
    data
  })
}
export function downloadTemplate(data) {
  return request({
    url: '/hxxd/hx-xd-financial-manage/downloadTemplate',
    method: 'post',
    data
  })
}
export function selectFinancialManageByParam(data) {
  return request({
    url: '/hxxd/hx-xd-financial-manage/selectFinancialManageByParam',
    method: 'post',
    data
  })
}
export function financialDataConfirm(ids) {
  return request({
    url: '/hxxd/hx-xd-financial-manage/financialDataConfirm',
    method: 'post',
    params: {ids}
  })
}
export function deleteFinancialData(ids) {
  return request({
    url: '/hxxd/hx-xd-financial-manage/deleteFinancialData',
    method: 'post',
    params: {ids}
  })
}