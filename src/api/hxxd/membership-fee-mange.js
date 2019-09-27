import request from '@/utils/request'

export function getDjInfoList(data) {
  return request({
    url: '/hxxd/hxxdadminHfInfo/list',
    method: 'post',
    data
  })
}
export function deleteMember(ids) {
  return request({
    url: '/hxxd/hxxdadminHfInfo/delete',
    method: 'post',
    data: { ids }
  })
}
export function saveSp(ids, state) {
  return request({
    url: '/hxxd/hxxdadminHfInfo/saveSp',
    method: 'post',
    data: { ids, state }
  })
}
// export function saveSpBh(ids, state) {
//   return request({
//     url: `/hxxd/hxxdadminHfInfo/saveSpBh`,
//     method: 'post',
//     data: { ids, state }
//   })
// }
// export function getMemberPayInfoList(data) {
//   return request({
//     url: '/hxxd/hxxdadminHfInfo/getMemberPayInfoList',
//     method: 'post',
//     data
//   })
