<template>
<div class="app-wrapper">
  <header-reload />
  <div class="contont-main">
    <el-card class="detailsContainer">
      <el-col :span="24" class="rstpswd-c" style="padding-top: 20px;">
        <h3>重置密码</h3>
      </el-col>
      <el-form label-width="150px">
        <el-row>
          <el-col :span="6">&nbsp;</el-col>
          <el-col :span="12">
            <el-row>
              <el-col>
                <el-form-item label="新密码" size="mini">
                  <el-input size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="确认新密码" size="mini">
                  <el-input size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col>
                <div style="text-align: center;">
                  <el-button type="primary" style="padding: 10px 20px;margin-top: 20px;" @click="handleSbmit">提交</el-button>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="6">&nbsp;</el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
  <footer-reload />
</div>
</template>

<script>
import HeaderReload from '@/components/HeaderReload'
import FooterReload from '@/components/FooterReload'

export default {
  name: 'CheckPwd',
  components: { FooterReload, HeaderReload },
  data() {
    return {

    }
  },
  created() {
  },
  methods: {
    handleSbmit() {
      this.$router.push('/successPage')
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~@/styles/register.scss';
  @import '~@/styles/hxxd.scss';

  .contont-main {
    .rstpswd-c {
      text-align: center;
      margin-bottom: 100px;
      h3 {
        border-bottom: 1px solid #bfbfc0;
        font-size: 30px;
        height: 60px;
        line-height: 10px;
      }
    }
  }

</style>
