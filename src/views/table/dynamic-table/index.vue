<template>
  <div class="app-container">
    <div class="totalTitle" style="margin:0 0 5px 20px;">
      表格一
    </div>
    <fixed-thead />

    <div class="totalTitle" style="margin:30px 0 5px 20px">
      表格二
    </div>
    <unfixed-thead />
    <div slot="footer" style="margin:60px 0 0 20px;;">
      <el-button type="primary" icon="el-icon-check">
        保存
      </el-button>
      <el-button icon="el-icon-close">
        关闭
      </el-button>
    </div>
  </div>
</template>

<script>
import FixedThead from './components/FixedThead'
import UnfixedThead from './components/UnfixedThead'

export default {
  name: 'DynamicTable',
  components: { FixedThead, UnfixedThead }
}
</script>
<style scoped>
.totalTitle{
  color: #409EFF;
  border-bottom: 1px solid #409EFF;
  padding-bottom: 10px;
  width: 97%;
}
</style>
