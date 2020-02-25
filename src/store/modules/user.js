import { login, logout, getInfo } from '@/api/system/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  menuCodes: [],
  btns: {},
  roleType: '0'
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_MENUCODES: (state, menuCodes) => {
    state.menuCodes = menuCodes
  },
  SET_BTNS: (state, btns) => {
    state.btns = btns
  },
  SET_ROLETYPE: (state, roleType) => {
    state.roleType = roleType
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password, validateCode } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password, validateCode: validateCode }).then(response => {
        const { data } = response
        if (!data) {
          reject('登录失败，未查询到该用户')
        }
        if (!data.token) {
          reject('token不能为空')
        }
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        // console.log(data)
        if (!data) {
          reject('验证失败，请重新登录.')
        }

        const {
          menuCodes,
          btns,
          name,
          avatar,
          introduction,
          roleType
        } = data

        // roles must be a non-empty array
        if (!menuCodes || menuCodes.length <= 0) {
          reject('请联系管理员分配相应权限')
        }
        commit('SET_MENUCODES', menuCodes)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        commit('SET_BTNS', btns)
        commit('SET_ROLETYPE', roleType)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        console.log('logout', state.menuCodes)
        // 清空信息
        removeToken()
        commit('SET_TOKEN', '')
        commit('SET_MENUCODES', [])
        commit('SET_NAME', '')
        commit('SET_AVATAR', '')
        commit('SET_INTRODUCTION', '')
        commit('SET_BTNS', [])
        commit('SET_ROLETYPE', 0)
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken()
      commit('SET_TOKEN', '')
      commit('SET_MENUCODES', [])
      commit('SET_NAME', '')
      commit('SET_AVATAR', '')
      commit('SET_INTRODUCTION', '')
      commit('SET_BTNS', [])
      commit('SET_ROLETYPE', 0)
      // commit('SET_TOKEN', '')
      // commit('SET_MENUCODES', [])
      // removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeMenuCodes({ commit, dispatch }, menu) {
    return new Promise(async resolve => {
      const token = menu + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { menuCodes } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', menuCodes, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
