<template>
  <div class="app-wrapper">
    <header-reload />
    <div class="contont-main" v-bind:style="{height: Height+'px'}">
      <el-card class="detailsContainer">
        <el-col :span="24" class="onl-con-c" style="padding-top: 20px;">
          <h3>在线投诉</h3>
        </el-col>
        <el-form ref="detailForm" :model="detailForm" label-width="150px" :rules="rules1">
          <el-row :gutter="22">
            <el-col :span="22">
              <el-form-item label="投诉主题" size="mini" prop="complaintTheme">
                <el-input v-model="detailForm.complaintTheme" maxlength="20" placeholder="请输入投诉主题" show-word-limit size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item :key="Math.random()" label="投诉单位" size="mini" :readonly="true" prop="complaintName">
                <el-input v-model="detailForm.complaintName" filterable placeholder="请选择" :readonly="true" style="width:100%">
                  <el-button slot="append" icon="el-icon-search" @click="showSelect()" />
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="投诉人" size="mini" prop="complainant">
                <el-input v-model="detailForm.complainant" size="mini" placeholder="请输入投诉人" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="手机号" size="mini" prop="contractInformation">
                <el-input v-model.number="detailForm.contractInformation" size="mini" placeholder="请输入手机号" />
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="联系邮箱" size="mini" prop="contractEmail">
                <el-input v-model="detailForm.contractEmail" size="mini" placeholder="请输入联系邮箱" />
              </el-form-item>
            </el-col>
            <el-col :span="22">
              <el-form-item label="投诉内容" size="mini" prop="complaintsContents">
                <el-input type="textarea"  placeholder="请输入投诉内容" v-model="detailForm.complaintsContents" maxlength="100" show-word-limit size="mini" :rows="4"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="验证码" size="mini" prop="telCode">
                <el-row>
                  <el-col :span="16">
                    <el-input v-model.number="detailForm.telCode" size="mini" placeholder="请输入验证码" />
                  </el-col>
                  <el-col :span="8">
                    <el-button type="primary" size="mini" v-show="show" @click="getCode" class="getCode">发送验证码</el-button>
                    <el-button type="primary" size="mini" v-show="!show" disabled class="getCode">{{count}} s后重新发送</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <div class="btn_bottom">
                <el-button type="primary" icon="el-icon-check" size="mini" @click="saveComplainInfo">提 交</el-button>
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
    <footer-reload />
  </div>
</template>

<script>
import HeaderReload from '@/components/HeaderReload'
import FooterReload from '@/components/FooterReload'
import { saveComplainInfo, sendCode } from "@/api/hxxd/complaintInfo"
import CompanyQuery from "./company-query"
import { isvalidPhone } from '@/utils/validate';
//电话号码校验
var validPhone = (rule, value, callback) => {
  if (!value) {
    console.log(validPhone)
    callback(new Error('请输入电话号码'));
  } else if (!isvalidPhone(value)) {
    callback(new Error('请输入正确的手机号码'));
  } else {
    callback();
  }
}

export default {
  components: { CompanyQuery, FooterReload, HeaderReload },
  data() {
    return {
      Height: 0,
      detailForm: {
        complaintTheme: '',
        complainant: '',
        contractInformation: '',
        contractEmail: '',
        complaintsContents: '',
        complaintType: '',
        complaintName: '',
        telCode: ''
      },
      rules1: {
        complaintTheme: [{ required: true, message: '不能为空', trigger: 'blur' }],
        complaintName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        complainant: [{ required: true, message: '不能为空', trigger: 'blur' }],
        contractInformation: [{ required: true, validator: validPhone, trigger: "blur" }],
        contractEmail: [{ required: true, message: "不能为空", trigger: "blur" }, 
        { 
          type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] 
        }],
        complaintsContents: [{ required: true, message: '不能为空', trigger: 'blur' }],
        complaintType: [{ required: true, message: '不能为空', trigger: 'blur' }],
        telCode: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      memberForm: '',
      show: true,
      isShowSelect: false,
      count: '',
      timer: null,
    }
  },
  mounted() {
    this.Height = document.documentElement.clientHeight - 194;
　　//监听浏览器窗口变化　
    window.onresize = ()=> {this.Height = document.documentElement.clientHeight -194}
  },
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
      if(mobileNum === ''){
        this.$notify({
          title: '提示',
          message: '请输入手机号',
          type: 'error'
        })
        return
      }
      this.$refs['detailForm'].validate(valid => {
        if (!valid) {
          this.$message({
            type: 'failure',
            message: '请按照要求填写相关内容 !'
          })
          show=false;
          return false
        }
        })
      sendCode(mobileNum).then(res => {
        var msg = res.message;
        this.message(success==="请查看手机验证码!",msg)
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
          complaintType,
          complaintName,
          telCode
        } = this.detailForm
        saveComplainInfo({
          complaintTheme,
          complainant,
          contractInformation,
          contractEmail,
          complaintsContents,
          complaintType,
          complaintName,
          telCode
        }).then(response => {
          if (response.status === 200) {
            this.$message({
              message: '已成功投诉',
              type: 'success'
            })
            this.$router.push({
             path: "/newlogin",query: {}
            });
          } else {
            this.$message({
              message: response.message,
              type: 'error'
            })
          }
        })
      })
    }
  }
}

</script>
<style lang="scss" scoped>
  @import '~@/styles/register.scss';
  @import '~@/styles/hxxd.scss';

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
  .getCode {
    padding: 6px 16px !important;
    font-size: 12px;
  }


</style>
