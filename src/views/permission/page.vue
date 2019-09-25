<template>
  <div class="app-container">
    <switch-roles @change="handleMenuCodesChange" />
  </div>
</template>

<script>
import SwitchMenuCodes from './components/SwitchMenuCodes'

export default {
  name: 'PagePermission',
  components: { SwitchMenuCodes },
  methods: {
    handleMenuCodesChange() {
      this.$router.push({ path: '/permission/index?' + +new Date() })
    }
  }
}
</script>
