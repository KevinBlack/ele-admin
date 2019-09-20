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
    `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAid8M7B+jQNnAo8lnNzxl8VUJ5wjMIhjwvA1v+NEup+UuOdbYzPYssnSIWEukazbiqdo6yk9HRuHa2vkjxuvLKzv92IAWCDxsyAOanunX+6U4map40cGMHhX/U3ybiOD4DEy7K+VauWVxYcrtuUIRauxYEB+TXoNaYYvsAsKH4E60uTGcVoOTO90HiJBW+pAlDLbZOU8p1J9SzZAFxD/a0/SFFGuLxAKse4LOOdKTHN9wvF+408jWE7QSvQ9HFr/RST+AAfwiyGD8WjG8LYduAZbMCjQ6LIx1rjjIzFWJTOrexHJj7qJLpyN/5i3cd0sUA21WOmlo4zkrB8OEMXKK/wIDAQAB`
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
