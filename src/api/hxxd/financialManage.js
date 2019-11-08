import request from '@/utils/request'

export function downloadTemplate(data) {
  return request({
    url: '/hxxd/hxXdSysFile/fileDownload',
    method: 'post',
    data
  })
}
export function uploadTemplate(formData) {
  return request({
    url: '/hxxd//hx-xd-financial-manage/importFile',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export function selectFinancialManageByParam(data) {
  return request({
    url: '/hxxd/hx-xd-financial-manage/selectFinancialManageByParam',
    method: 'post',
    data
  })
}
export function deleteFinancialData(ids) {
  return request({
    url: '/hxxd/hx-xd-financial-manage/deleteFinancialData',
    method: 'post',
    params: { ids }
  })
}

