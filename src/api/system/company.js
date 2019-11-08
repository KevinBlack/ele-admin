import request from '@/utils/request'

export function getCompanyList(data) {
  return request({
    url: '/system/jqSysCompany/list',
    method: 'post',
    data
  })
}

export function getCompany(companyId) {
  return request({
    url: '/system/jqSysCompany/get',
    method: 'post',
    data: { companyId }
  })
}

export function saveCompany(data) {
  return request({
    url: '/system/jqSysCompany/save',
    method: 'post',
    data
  })
}

export function deleteCompany(companyIds) {
  return request({
    url: `/system/jqSysCompany/delete`,
    method: 'post',
    data: { companyIds }
  })
}

export function startCompany(companyIds) {
  return request({
    url: `/system/jqSysCompany/start`,
    method: 'post',
    data: { companyIds }
  })
}

export function stopCompany(companyIds) {
  return request({
    url: `/system/jqSysCompany/stop`,
    method: 'post',
    data: { companyIds }
  })
}

export function getSortNo() {
  return request({
    url: `/system/jqSysCompany/getSortNo`,
    method: 'post'
  })
}

