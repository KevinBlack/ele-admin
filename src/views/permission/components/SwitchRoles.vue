<template>
  <div>
    <div style="margin-bottom:15px;">
      Your menuCodes: {{ menuCodes }}
    </div>
    Switch menuCodes:
    <el-radio-group v-model="switchMenuCodes">
      <el-radio-button label="editor" />
      <el-radio-button label="admin" />
    </el-radio-group>
  </div>
</template>

<script>
export default {
  computed: {
    menuCodes() {
      return this.$store.getters.menuCodes
    },
    switchMenuCodes: {
      get() {
        return this.menuCodes[0]
      },
      set(val) {
        this.$store.dispatch('user/changeMenuCodes', val).then(() => {
          this.$emit('change')
        })
      }
    }
  }
}
</script>
