import request from '@/utils/request'

export function downloadTemplate(belongId, fileCatalog) {
  return request({
    url: '/hxxd/hxXdSysFile/fileDownload',
    method: 'get',
    params: {
      belongId,
      fileCatalog
    },
    responseType: 'blob'
  })
}
export function uploadTemplate(formData) {
  return request({
    url: '/hxxd/hx-xd-financial-manage/importFile',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 查询excel日志
export function selectLog(formData) {
  return request({
    url: '/hxxd/hx-xd-financial-manage/selectLog',
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
    params: {
      ids
    }
  })
}

export function selectReference(tradePipelineNum) {
  return request({
    url: '/hxxd/hx-xd-financial-manage/selectReference',
    method: 'post',
    params: {
      tradePipelineNum
    }
  })
}

export function getAdminHfInfoById(id) {
  return request({
    url: '/hxxd/hxxdadminHfInfo/getAdminHfInfoById',
    method: 'post',
    params: {
      id
    }
  })
}
