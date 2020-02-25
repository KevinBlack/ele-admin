import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

import SIdentify from './views/login/components/identify' // 图形验证码

import JsEncrypt from 'jsencrypt'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// }
/**
 * 配置全局的加密方法
 * @param obj 需要加密的字符串
 */
Vue.prototype.$encruption = function(obj) {
  const encrypt = new JsEncrypt()
  encrypt.setPublicKey(
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCUpyd0ukPyGXZg29OMqW6oeWgzZpd0AIxp5YIUOWLbeT0CKLFEoCaoDVT0LptsdrcZWlxiF37YLGb4vzi8ZkOP0KugQONlVQ9tpVPx7IMTHyqGeDlo/vM0UCUJ0mw8JeroR83JGzSFcGYTtylS7X3MjHswGVUbd0SfCyO+6p3RmQIDAQAB'
  )
  return encrypt.encrypt(obj)
}

Vue.use(SIdentify)

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
