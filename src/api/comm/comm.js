import request from '@/utils/request'

// 根据获取汉字首字母大写缩写
export function toPinYinUppercase(chineseCharacter) {
  return request({
    url: '/anonw/toPinYinUppercase',
    method: 'post',
    params: { chineseCharacter }
  })
}

// 根据获取汉字首字母大写缩写
export function getValidateCode() {
  return request({
    url: '/anonw/getValidateCode',
    method: 'post'
  })
}

