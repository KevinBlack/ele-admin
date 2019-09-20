import request from '@/utils/request'

export function getCompanyList(data) {
  return request({
    url: '/jqSysCompany/list',
    method: 'post',
    data
  })
}

export function getCompany(companyId) {
  return request({
    url: '/jqSysCompany/get',
    method: 'post',
    data: { companyId }
  })
}

export function saveCompany(data) {
  return request({
    url: '/jqSysCompany/save',
    method: 'post',
    data
  })
}

export function deleteCompany(companyIds) {
  return request({
    url: `/jqSysCompany/delete`,
    method: 'post',
    data: { companyIds }
  })
}

export function startCompany(companyIds) {
  return request({
    url: `/jqSysCompany/start`,
    method: 'post',
    data: { companyIds }
  })
}

export function stopCompany(companyIds) {
  return request({
    url: `/jqSysCompany/stop`,
    method: 'post',
    data: { companyIds }
  })
}
