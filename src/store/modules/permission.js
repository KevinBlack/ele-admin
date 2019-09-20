import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param mecodes
 * @param route
 */
function hasPermission(menuCodes, route) {
  if (route.meta && route.meta.menuCodes) {
    return menuCodes.some(role => route.meta.menuCodes.includes(role))
  } else {
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
      let accessedRoutes
      if (menuCodes.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, menuCodes)
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
