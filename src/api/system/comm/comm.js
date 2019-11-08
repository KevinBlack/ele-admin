import request from '@/utils/request'

// 根据获取汉字首字母大写缩写
export function toPinYinUppercase(chineseCharacter) {
  return request({
    url: '/system/jqSysCommon/anonw/toPinYinUppercase',
    method: 'post',
    params: { chineseCharacter }
  })
}

// 获取验证码
export function getValidateCode() {
  return request({
    url: '/system/jqSysCommon/anonw/getValidateCode',
    method: 'post'
  })
}

/**
 *  获取地区tree
 */
export function getAreaTree() {
  return request({
    url: '/system/jqSysArea/anonw/listArea',
    method: 'post'
  })
}
/**
 * 根据地区id获取子地区
 * @param {*} areaId 当为0时，获取的时全国的省份和直辖市
 */
// 根据地区id获取子地区
export function getSubAreaById(areaId) {
  return request({
    url: '/system/jqSysArea/anonw/listSubArea',
    method: 'post',
    data: { areaId }
  })
}

// 附件下載
export function downloadFile(data) {
  return request({
    url: '/system/jqSysFile/fileDownload',
    method: 'post',
    data,
    responseType: 'blob'
    // responseEncoding: 'utf8'
  })
}

// 上传
export function uploadFile(formData) {
  return request({
    url: '/hxxd/hxXdSysFile/fileUpload',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export function fileDownload(data) {
  return request({
    url: '/hxxd/hxXdSysFile/fileDownload',
    method: 'post',
    data
  })
}

// 上传解析excel
export function uploadExcle(formData) {
  return request({
    url: '/hxxd/hxXdSysFile/uploadExcle',
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
    url: '/hxxd/hxXdSysFile/selectLog',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

