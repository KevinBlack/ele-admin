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
export function getValidateCode(type) {
  return request({
    url: '/system/jqSysCommon/anonw/getValidateCode',
    method: 'post',
    data: { type }
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

/**
 * 一次获取多个字典
 * @param {*} dictTypes 字典key
 */
export function getDictDataLists(dictTypes) {
  return request({
    url: '/system/jqSysDict/anonw/getDictDataLists',
    method: 'post',
    data: { dictTypes }
  })
}

/**
 * 只获取一个字典。并根据key或者value进行过滤
 * @param {*} dictType 字典key
 */
export function getDictDataList(dictType, value, key, pageAble, pageNo, pageSize) {
  return request({
    url: '/system/jqSysDict/anonw/getDictDataList',
    method: 'post',
    data: { dictType, key, value, pageAble, pageNo, pageSize }
  })
}

/**
 * 查询流程日志
 * @param {*} system  所属系统
 * @param {*} dateId  数据id
 * @param {*} dateCode 数据编号
 */
export function listProcessLog(system, tableName, dateId, dateCode) {
  return request({
    url: '/system/jqSysProcessLog/list',
    method: 'post',
    data: { system, tableName, dateId, dateCode }
  })
}

// 文件下载
export function downloadFile(id, key) {
  return request({
    url: '/system/anonw/jqSysAttachment/fileDownload',
    method: 'post',
    data: { id, key },
    responseType: 'blob'
    // responseEncoding: 'utf8'
  })
}

// 文件删除
export function deleteFile(ids, key) {
  return request({
    url: '/system/anonw/jqSysAttachment/deleteFile',
    method: 'post',
    params: { ids, key }
  })
}

// 获取文件列表
export function listFile(ids, key) {
  return request({
    url: '/system/anonw/jqSysAttachment/listFile',
    method: 'post',
    params: { ids, key }
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
