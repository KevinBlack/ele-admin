import request from '@/utils/request'

// 根据获取汉字首字母大写缩写
export function toPinYinUppercase(chineseCharacter) {
  return request({
    url: '/sys/anonw/toPinYinUppercase',
    method: 'post',
    params: { chineseCharacter }
  })
}

// 根据获取汉字首字母大写缩写
export function getValidateCode() {
  return request({
    url: '/sys/anonw/getValidateCode',
    method: 'post'
  })
}

// 附件下載
export function downloadFile(data) {
  return request({
    url: '/sys/jqSysFile/fileDownload',
    method: 'post',
    data,
    responseType: 'blob'
    // responseEncoding: 'utf8'
  })
}

