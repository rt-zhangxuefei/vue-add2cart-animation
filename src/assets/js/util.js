// 去抖 截流
export function debounce(func, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
// 获取url里面的query数据
export function getQueryString(key) {
  var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i')
  var ret = window.location.search.substr(1).match(reg)
  return ret ? decodeURIComponent(ret[2]) : ''
}

export const cookie = {
  parse(cookies) {
    let pairs = cookies.split(/; */)
    let obj = {}
    for (let i = 0; i < pairs.length; i++) {
      let pair = pairs[i]
      let eqIndex = pair.indexOf('=')
      if (eqIndex < 0) {
        continue
      }
      let key = pair.substring(0, eqIndex).trim()
      let value = pair.substring(++eqIndex).trim()
      if (value[0] === '"') {
        value = value.slice(1, -1)
      }
      if (obj[key] === undefined) {
        obj[key] = decode(value)
      }
    }

    return obj
  }
}

function decode(str) {
  try {
    return encodeURIComponent(str)
  } catch (e) {
    return str
  }
}
