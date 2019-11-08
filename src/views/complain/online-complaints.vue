<template>
  <div class="app-wrapper">
    <header class="header-throwsf">
      <div class="header-position">
        <img class="logo" src="../../assets/img/logo.png">
        <div class="head_group">
          <img src='../../assets/img/menology_n.png'>
          <div class="head_group_day">
            <span>2019年9月26日</span>
            <span class="head_group_week">星期四&nbsp;&nbsp;&nbsp;&nbsp;14:44</span>
          </div>
        </div>
      </div>
    </header>
    <div class="contont-main">
      <el-card style="min-height: 520px;">
        <el-col :span="24" class="onl-con-c" style="padding-top: 20px;">
          <h3>在线投诉</h3>
        </el-col>
        <el-form ref="detailForm" :model="detailForm" label-width="150px" :rules="formRule">
          <el-row :gutter="22">
            <el-col :span="22">
              <el-form-item label="投诉主题" size="mini" prop="complaintTheme">
                <el-input v-model="detailForm.complaintTheme" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="投诉单位" size="mini" prop="complaintName">
                <el-input v-model="detailForm.complaintName" filterable placeholder="请选择" style="width:100%">
                  <el-button slot="append" icon="el-icon-search" @click="showSelect()" />
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="投诉人" size="mini" prop="complainant">
                <el-input v-model="detailForm.complainant" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="手机号" size="mini" prop="contractInformation">
                <el-input v-model.number="detailForm.contractInformation" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="联系邮箱" size="mini" prop="contractEmail">
                <el-input v-model.number="detailForm.contractEmail" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="22">
              <el-form-item label="投诉内容" size="mini" prop="complaintsContents">
                <el-input type="textarea" v-model="detailForm.complaintsContents" size="mini" :rows="4"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="验证码" size="mini" prop="contractInformation">
                <el-input v-model.number="detailForm.contractInformation" size="mini" style="width: 50%;"></el-input>
                <el-button type="primary" size="mini" v-show="show" @click="getCode" class="count">发送验证码</el-button>
                <el-button type="primary" size="mini" v-show="!show" disabled class="count">{{count}} s后重新发送</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="22">
              <div style="text-align: right;">
                <el-button type="primary" icon="el-icon-check" size="mini" @click="saveComplainInfo">保存</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-dialog title="选择投诉单位" :visible.sync="isShowSelect">
        <company-query
          :fdmsg="memberForm"
          :fdshow3="isShowSelect"
          @closeDalogPay="closeSelect"
        />
      </el-dialog>
    </div>
    <footer class="footer-throwsf">
      <a href="javascrip:;">联系我们</a> | <a href="javascrip:;">声明</a>&nbsp;&nbsp;&nbsp;&nbsp;中国航空运输协会版权所有 | 京ICP备12001608号
      | 京公网安备11010502034600号
    </footer>
  </div>
</template>

<script>
import { saveComplainInfo, sendCode } from "@/api/hxxd/complaintInfo"
import CompanyQuery from "./company-query"

export default {
  components: { CompanyQuery },
  data() {
    return {
      detailForm: {
        complaintTheme: '',
        complainant: '',
        contractInformation: '',
        contractEmail: '',
        complaintsContents: '',
        complaintType: '',
        complaintName: ''
      },
      formRule: {
        complaintTheme: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        complainant: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        contractInformation: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        contractEmail: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        complaintsContents: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }],
        complaintType: [{
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }]
      },
      memberForm: '',
      show: true,
      isShowSelect: false,
      count: '',
      timer: null,
    }
  },
  created() {},
  methods: {
    showSelect() {
      this.isShowSelect = true
    },
    closeSelect(chiledArr, fdshow) {
      if (chiledArr.length <= 0) {
        this.$notify({
          title: '提示',
          message: '请选择数据',
          type: 'warning',
          duration: 2000
        })
      } else {
        this.detailForm.complaintName = chiledArr.value
        this.detailForm.complaintType = chiledArr.key
      }
      this.isShowSelect = fdshow
    },
    getCode() {
      const mobileNum = this.detailForm.contractInformation
      sendCode(mobileNum).then(res => {
        console.log('成功')
      })
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    saveComplainInfo() {
      this.$refs['detailForm'].validate(valid => {
        if (!valid) {
          this.$message({
            type: 'failure',
            message: '请按照要求填写相关内容 !'
          })
          return false
        }
        const {
          complaintTheme,
          complainant,
          contractInformation,
          contractEmail,
          complaintsContents,
          complaintType
        } = this.detailForm
        saveComplainInfo({
          complaintTheme,
          complainant,
          contractInformation,
          contractEmail,
          complaintsContents,
          complaintType
        }).then(response => {
          if (response.status === 200) {
            this.$message({
              message: '投诉成功',
              // path: '/hxxd/complaintInfo'
            })
          } else {
            this.$message({
              message: response.message,
              path: '/hxxd/complaintInfo'
            })
          }
        })
      })
    }
  }
}

</script>
<style lang="scss" scoped>
  @import '../../styles/register.scss';

  .onl-con-c {
    text-align: center;
    margin-bottom: 50px;

    h3 {
      border-bottom: 1px solid #bfbfc0;
      font-size: 30px;
      height: 60px;
      line-height: 10px;
    }
  }

  .count {
    width: 100px;
    position: absolute;
    left: 200px;
    text-align: center;
    font-size: 14px;
    padding: 6px 0 !important;
  }

</style>
