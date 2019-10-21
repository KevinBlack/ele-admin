<template>
  <div class="detailsContainer">
    <table>
      <tr>
        <td>审核状态：</td>
        <td>
          <el-select class="ipt_w" v-model="value" clearable placeholder="请选择">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td>审核原因：</td>
        <td>
          <el-input
            type="textarea"
            :rows="8"
            class="ipt_w"
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
        </td>
      </tr>
    </table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="handCansole">取 消</el-button>
      <el-button type="primary" @click="handleSave">保 存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options1: [{
        value: '审核通过',
        label: '审核通过'
      }, {
        value: '审核不通过',
        label: '审核不通过'
      }],
      value: '',
      textarea: '',
      popHide: false
    }
  },
  methods: {
    handCansole() {
      this.$emit('popFn', this.popHide)
    },
    handleSave() {
      this.$emit('popFn', this.popHide, this.value, this.textarea)
    }
  }
}
</script>

<style scoped>
*{
  font-weight: normal;
}
.detailsContainer {
  margin: 0;
}
table {
  width: 90%;
}
table tr {
  height: 40px;
  line-height: 40px;
}
table tr td:nth-child(1) {
  text-align: right;
}
table tr td:nth-child(2) {
  text-align: left;
}
.ipt_w {
  width: 90%;
}
.dialog-footer {
  border-top: 1px solid #e6e6e6;
  margin-top: 30px;
  padding-top: 10px;
  text-align: right;
}
</style>
