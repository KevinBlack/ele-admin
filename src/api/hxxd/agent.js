import request from '@/utils/request'

export function companySave(data) {
  return request({
    url: '/hxxd/hxXdCompanyInfo/save',
    method: 'post',
    data
  })
}

export function commonSave(data) {
  return request({
    url: '/hxxd/hxXdCompanyCommonInfo/save',
    method: 'post',
    data
  })
}

export function getCompanyInfoList(data) {
  return request({
    url: '/hxxd/hxXdCompanyInfo/list',
    method: 'post',
    data
  })
}
