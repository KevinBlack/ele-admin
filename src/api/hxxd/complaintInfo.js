import request from '@/utils/request'

export function selectComplainInfoById(id) {
  return request({
    url: '/hxxd/hxxd-complaint-info/selectComplainInfoAndProcessing',
    method: 'post',
    params: {id}
  })
}
export function selectComplainInfoAndProcessing(data) {
  return request({
    url: '/hxxd/hxxd-complaint-info/selectComplainInfoAndProcessing',
    method: 'post',
    data
  })
}
export function saveComplainProcessing(formData) {
  return request({
    url: '/hxxd/hxxd-complaint-info/saveComplainProcessing',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export function saveComplainInfo(data) {
  return request({
    url: '/hxxd/hxxd-complaint-info/anonw/saveComplainInfo',
    method: 'post',
    data
  })
}
export function selectSecurityIncident(data) {
  return request({
    url: '/hxxd/hxxd-security-incidents/selectSecurityIncident',
    method: 'post',
    data
  })
}
export function publishSecurityIncident(ids) {
  return request({
    url: '/hxxd/hxxd-security-incidents/publishSecurityIncident',
    method: 'post',
    params :{ids}
  })
}
export function cancalPublishSecurityIncident(ids) {
  return request({
    url: '/hxxd/hxxd-security-incidents/cancalPublishSecurityIncident',
    method: 'post',
    params :{ids}
  })
}
export function saveSecurityIncident(data) {
  return request({
    url: '/hxxd/hxxd-security-incidents/saveSecurityIncident',
    method: 'post',
    data
  })
}
export function updateSecurityIncident(data) {
  return request({
    url: '/hxxd/hxxd-security-incidents/updateSecurityIncident',
    method: 'post',
    data
  })
}
export function deleteSecurityIncident(ids) {
  return request({
    url: '/hxxd/hxxd-security-incidents/deleteSecurityIncident',
    method: 'post',
    data: {
      ids
    }
  })
}
export function selectSecurityIncidentById(id) {
  return request({
    url: '/hxxd/hxxd-security-incidents/selectSecurityIncidentById',
    method: 'post',
    data: {
      id
    }
  })
}
export function selectComplainInfoAndProcessingById(id) {
  return request({
    url: '/hxxd/hxxd-complaint-info/anonw/selectComplainInfoAndProcessingById',
    method: 'post',
    data: {
      id
    }
  })
}
export function sendCode(mobileNum) {
  return request({
    url: '/hxxd/hxxd-complaint-info/anonw/telSendCode',
    method: 'post',
    data: {
      mobileNum
    }
  })
}
export function examine(data) {
  return request({
    url: '/hxxd/hxxd-complaint-info/examine',
    method: 'post',
    data
  })
}
