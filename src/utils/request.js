import axios from 'axios'
import qs from 'qs'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 建立一个axios链接
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000
})

// interceptors.request.use 设置拦截规则
service.interceptors.request.use(
  config => {
    // 当Content-Type 不存在时
    if (config.data && (!config.headers || config.headers['Content-Type'] != 'multipart/form-data')) {
      config.data = qs.stringify(config.data, { allowDots: true })
    }
    // if (config.data) {
    //   config.data = qs.stringify(config.data, {
    //     allowDots: true
    //   })
    // }
    if (store.getters.token) {
      // let each request carry token 必须要有token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // const res = response.data
    const res = response
    // 过滤文件流格式
    if (
      res.headers['content-type'] === 'application/octet-stream' ||
      res.headers['content-type'] === 'image/Jpeg' ||
      res.headers['content-type'] === 'multipart/form-data'
    ) {
      return Promise.resolve(res)
    }
    // if the custom code is not 200, it is judged as an error.
    if (res.status !== 200) {
      Message({
        message: res.message || '错误',
        type: 'error',
        duration: 10 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.status === 50008 || res.status === 50012 || res.status === 50014) {
        // to re-login
        MessageBox.confirm('您已被注销，您可以关闭本页或再次登录', '确认注销', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || '错误'))
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
