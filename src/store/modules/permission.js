import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.mem to determine if the current user has permission
 * @param mecodes
 * @param route
 */
function hasPermission(menuCodes, route) {
  if (route.meta) {
    if (!route.meta.menuCodes) {
      return false
    }
    // return menuCodes.some(menuCode => route.meta.menuCodes.includes(menuCode))
    var success = menuCodes.some(menuCode => route.meta.menuCodes === menuCode)
    // if(success){
    //   console.log(route.path)
    // }
    return success
  } else {
    // console.log(route.path)
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param menuCodes
 */
export function filterAsyncRoutes(routes, menuCodes) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(menuCodes, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, menuCodes)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, menuCodes) {
    return new Promise(resolve => {
      var accessedRoutes = []
      if (menuCodes) {
        // 当时管理员时，显示所有菜单项
        if (menuCodes === 'ROLE_ADMIN') {
          accessedRoutes = asyncRoutes
        } else {
          // 当非管理员时，显示部分
          accessedRoutes = filterAsyncRoutes(asyncRoutes, menuCodes)
        }
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
