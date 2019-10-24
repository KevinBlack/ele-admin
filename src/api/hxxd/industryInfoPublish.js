import request from '@/utils/request'

export function selectIndustry(data) {
  return request({
    url: '/hxxd/hx-xd-industry-info-publish/selectIndustry',
    method: 'post',
    data
  })
}
export function deleteIndustryByIds(ids) {
  return request({
    url: '/hxxd/hx-xd-industry-info-publish/deleteIndustryByIds',
    method: 'post',
    data: {ids}
  })
}
export function addIndustryInfo(data) {
  return request({
    url: '/hxxd/hx-xd-industry-info-publish/addIndustryInfo',
    method: 'post',
    data
  })
}
export function updateIndustryInfo(data) {
  return request({
    url: '/hxxd/hx-xd-industry-info-publish/updateIndustryInfo',
    method: 'post',
    data
  })
}
export function industryInfoPublish(ids) {
  return request({
    url: '/hxxd/hx-xd-industry-info-publish/industryInfoPublish',
    method: 'post',
    data: {ids}
  })
}
export function cancleIndustryInfoPublish(ids) {
  return request({
    url: '/hxxd/hx-xd-industry-info-publish/cancleIndustryInfoPublish',
    method: 'post',
    data: {ids}
  })
}