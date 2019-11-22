import request from '@/utils/request'

export function selectIndustry(data) {
  return request({
    url: '/hxxd/hx-xd-industry-info-publish/anonw/selectIndustry',
    method: 'post',
    data
  })
}
export function deleteIndustryByIds(ids) {
  return request({
    url: '/hxxd/hx-xd-industry-info-publish/deleteIndustryByIds',
    method: 'post',
    data: {
      ids
    }
  })
}
export function addIndustryInfo(formData) {
  return request({
    url: '/hxxd/hx-xd-industry-info-publish/addIndustryInfo',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export function updateIndustryInfo(formData) {
  return request({
    url: '/hxxd/hx-xd-industry-info-publish/updateIndustryInfo',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export function industryInfoPublish(ids) {
  return request({
    url: '/hxxd/hx-xd-industry-info-publish/industryInfoPublish',
    method: 'post',
    data: {
      ids
    }
  })
}
export function cancleIndustryInfoPublish(ids) {
  return request({
    url: '/hxxd/hx-xd-industry-info-publish/cancleIndustryInfoPublish',
    method: 'post',
    data: {
      ids
    }
  })
}
export function selectIndustryById(id) {
  return request({
    url: '/hxxd/hx-xd-industry-info-publish/selectIndustryById',
    method: 'post',
    data: {
      id
    }
  })
}
