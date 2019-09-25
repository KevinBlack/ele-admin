<template>
  <el-card class="tsfDlg">
    <div class="app-container">
      <el-form :inline="true" label-width="80px">
        <el-input v-model="input3" placeholder="请输入内容" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="showBox" />
        </el-input>
      </el-form>
      <el-dialog :visible.sync="isShow">
        <modality :fdmsg="input3" :fdshow="isShow" @closeDalog="closeBox" />
      </el-dialog>

    </div>
  </el-card>
</template>

<script>
import Modality from './modality'

export default {
  name: 'MoDialog',
  components: { Modality },
  data() {
    return {
      input3: '',
      isShow: false
    }
  },
  methods: {
    showBox() {
      this.isShow = true
    },
    closeBox(chiledArr, fdshow) {
      if (chiledArr.length <= 0) {
        this.$notify({
          title: '提示',
          message: '请选择数据',
          type: 'warning',
          duration: 2000
        })
      } else {
        for (let i = 0; i < chiledArr.length; i++) {
          this.input3 += chiledArr[i]
        }
      }
      this.isShow = fdshow
    }
  }
}
</script>
<style scoped>
.tsfDlg{
  margin: 0 10px;
}
</style>
