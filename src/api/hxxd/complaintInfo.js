import request from '@/utils/request'

export function selectComplainInfoAndProcessing(data) {
  return request({
    url: '/hxxd/hxxd-complaint-info/selectComplainInfoAndProcessing',
    method: 'post',
    data
  })
}
export function saveComplainProcessing(data) {
  return request({
    url: '/hxxd/hxxd-complaint-info/saveComplainProcessing',
    method: 'post',
    data
  })
}
export function saveComplainInfo(data) {
  return request({
    url: '/hxxd/hxxd-complaint-info/saveComplainInfo',
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
export function saveSecurityIncident(data) {
  return request({
    url: '/hxxd/hxxd-security-incidents/saveSecurityIncident',
    method: 'post',
    data
  })
}
export function selectComplainInfoAndProcessingById(id) {
  return request({
    url: '/hxxd/hxxd-complaint-info/selectComplainInfoAndProcessingById',
    method: 'post',
    data: { id }
  })
}
export function sendCode(mobileNum) {
  return request({
    url: '/hxxd/hxxd-complaint-info/telSendCode',
    method: 'post',
    data: {
      mobileNum
    }
  })
}
