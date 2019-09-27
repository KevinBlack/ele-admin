import request from '@/utils/request'

export function getCompanyList(data) {
  return request({
    url: '/sys/jqSysCompany/list',
    method: 'post',
    data
  })
}

export function getCompany(companyId) {
  return request({
    url: '/sys/jqSysCompany/get',
    method: 'post',
    data: { companyId }
  })
}

export function saveCompany(data) {
  return request({
    url: '/sys/jqSysCompany/save',
    method: 'post',
    data
  })
}

export function deleteCompany(companyIds) {
  return request({
    url: `/sys/jqSysCompany/delete`,
    method: 'post',
    data: { companyIds }
  })
}

export function startCompany(companyIds) {
  return request({
    url: `/sys/jqSysCompany/start`,
    method: 'post',
    data: { companyIds }
  })
}

export function stopCompany(companyIds) {
  return request({
    url: `/sys/jqSysCompany/stop`,
    method: 'post',
    data: { companyIds }
  })
}

export function getSortNo() {
  return request({
    url: `/sys/jqSysCompany/getSortNo`,
    method: 'post'
  })
}

