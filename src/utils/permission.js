import store from '@/store'

/**
 * @param {Array} value
 * @returns {Boolean}
 * @example see @/views/permission/directive.vue
 */
export default function checkPermission(value) {
  if (value && value instanceof Array && value.length > 0) {
    const menuCodes = store.getters && store.getters.menuCodes
    const permissionMenuCodes = value

    const hasPermission = menuCodes.some(menuCode => {
      return permissionMenuCodes.includes(menuCode)
    })

    if (!hasPermission) {
      return false
    }
    return true
  } else {
    console.error(`need menuCodes! Like v-permission="['admin','editor']"`)
    return false
  }
}
