import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    const menuCodes = store.getters && store.getters.menuCodes

    if (value && value instanceof Array && value.length > 0) {
      const permissionMenuCodes = value

      const hasPermission = menuCodes.some(role => {
        return permissionMenuCodes.includes(role)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need menuCodes! Like v-permission="['1000','20000']"`)
    }
  }
}
