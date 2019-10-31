/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * 从数组中获取id集合
 * @param {*} arr
 */
export function getIdsFromArr(arr) {
  if (!arr) {
    return ''
  }
  // eslint-disable-next-line no-array-constructor
  var idArr = new Array()
  Object.keys(arr).forEach(function(index) {
    if (arr[index]) {
      var id = arr[index].id
      if (id) {
        idArr.push(id)
      }
    }
  })
  return idArr.join(',')
}

/**
 * 根据表名获取虚拟id(当真实id存在时生成真实id)
 * @param {*} tableName
 * @param {*} id
 */
export function createVId(tableName, id) {
  if (id) {
    return id
  }
  tableName = tableName ? tableName + '-' : ''
  // 获取时间戳
  const timestamp = new Date().getTime()
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return tableName + (+(randomNum + timestamp)).toString()
}
/**
 * 字符串转一维数组
 * @param {*} str 字符串
 * @param {*} split 默认 ',' 分隔
 */
export function strToArr(str, split) {
  // eslint-disable-next-line no-array-constructor
  var arr = new Array()
  if (str) {
    split = split || ','
    var tempArr = str.split(split)
    if (tempArr && tempArr.length > 0) {
      return tempArr
    }
  }
  return arr
}
/**
 * 字符串转二维数组
 * @param {*} str 字符串
 * @param {*} firstSplit 第一个分隔符
 * @param {*} secondSplit  第二个分隔符
 */
export function strTo2Arr(str, firstSplit, secondSplit) {
  // eslint-disable-next-line no-array-constructor
  var arr = new Array()
  if (str) {
    firstSplit = firstSplit || ','
    secondSplit = secondSplit || '.'
    var firstArr = str.split(firstSplit)
    if (firstArr && firstArr.length > 0) {
      Object.keys(firstArr).forEach(function(key) {
        if (firstArr[key]) {
          // eslint-disable-next-line no-array-constructor
          var secondArr = firstArr[key].split(secondSplit)
          if (secondArr && secondArr.length > 0) {
            arr.push(strArrToIntArr(secondArr))
          }
        }
      })
    }
  }
  return arr
}
/**
 * 字符串数组转整数数组
 * @param {*} arr
 */
export function strArrToIntArr(arr) {
  // eslint-disable-next-line no-array-constructor
  var tempArr = new Array()
  // eslint-disable-next-line no-empty
  if (arr && arr.length > 0) {
    Object.keys(arr).forEach(function(key) {
      if (arr[key] && Number(arr[key]) > 0) {
        tempArr.push(Number(arr[key]))
      }
    })
  }
  return tempArr
}
/**
 * 二维数组转字符串
 * @param {*} arr 数组
 * @param {*} prefix 前缀
 * @param {*} firstSplit 第一个分隔符
 * @param {*} secondSplit 第二个分隔符
 */
export function arr2ToStr(arr, prefix, suffix, firstSplit, secondSplit) {
  var tempStr = ''
  prefix = prefix || ''
  suffix = suffix || ''
  firstSplit = firstSplit || ','
  secondSplit = secondSplit || '.'
  if (arr && arr.length > 0) {
    Object.keys(arr).forEach(function(key) {
      if (arr[key] && arr[key].length > 0) {
        console.log(arr[key])
        if (tempStr === '') {
          tempStr = prefix + arr[key].join(secondSplit) + suffix
        } else {
          tempStr = tempStr + firstSplit + prefix + arr[key].join(secondSplit) + suffix
        }
      }
    })
  }
  return tempStr
}
/**
 * 二位数组最后一个元素转字符串
 * @param {*} arr 数组
 * @param {*} split 分隔符
 */
export function arr2LastItemToStr(arr, split) {
  var tempStr = ''
  split = split || ','
  if (arr && arr.length > 0) {
    Object.keys(arr).forEach(function(key) {
      if (arr[key] && arr[key].length > 0) {
        var arr2 = arr[key]
        if (tempStr === '') {
          tempStr = arr[key][arr2.length - 1]
        } else {
          tempStr = tempStr + split + arr[key][arr2.length - 1]
        }
      }
    })
  }
  return tempStr
}
/**
 * data数组增加额外属性
 * @param {*} data
 * @param {*} hasChange 数据是否发生改变
 */
export function setRowsHasChange(rows, hasChange) {
  if (!rows || rows.length <= 0) {
    return rows
  }
  hasChange = hasChange || false
  for (let index = 0; index < rows.length; index++) {
    var element = rows[index]
    // 判断是否可以被修改
    element.hasChange = hasChange
  }
  return rows
}

/**
 * 设置单行数据是否被修改
 * @param {*} row
 * @param {*} hasChange 数据是否发生改变
 */
export function setRowHasChange(row, hasChange) {
  if (!row) {
    return row
  }
  row.hasChange = (hasChange || false)
  return row
}

/**
 * 过滤已经被修改的数据行
 * @param {*} data 数据数组
 */
export function getRowsHasChange(rows) {
  if (!rows || rows.length <= 0) {
    return rows
  }
  rows = rows.filter(item => {
    return item.hasChange
  })
  return rows
}

/**
 * data 数组设置是否可以编辑
 * @param {*} data
 * @param {*} editable editable
 */
export function setRowsEditable(rows, editable) {
  if (!rows || rows.length <= 0) {
    return rows
  }
  editable = editable || false
  for (let index = 0; index < rows.length; index++) {
    var element = rows[index]
    // 判断是否可以被修改
    element.editable = editable
  }
  return rows
}
/**
 * 过滤可以编辑的行的数据行
 * @param {*} data 数据数组
 */
export function getRowsEditable(rows, editable) {
  editable = editable || false
  if (!rows || rows.length <= 0) {
    return rows
  }
  rows = rows.filter(item => {
    return item.editable
  })
  return rows
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xDC00 && code <= 0xDFFF) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== 'object') {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === 'object') {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += ' ' + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}
