

<template>
  <el-card class="detailsContainer">
    <!-- <el-row style="border-bottom: 1px solid #e6e6e6;margin-bottom: 20px;padding-bottom:10px;">
      <el-col :span="12">
        <a href="javascrip:;" style="color: #409EFF"><i class="el-icon-back" style="color: #409EFF;margin-right: 5px;c" />返 回</a> | <a href="javascript:;" @click="handleShow">{{ showTitle }}</a>
      </el-col>
      <el-col :span="12" style="text-align:right;">
          <el-button type="primary" size="mini" @click="saveOrUpdateEmail" v-if="!prohibit" >保存</el-button>
          <el-button type="primary" size="mini" @click="saveAndSend" v-if="!prohibit" >保存并发送</el-button>
      </el-col>
    </el-row> -->
    <!-- part1 -->
    <el-row :gutter="10">
      <el-col :span="24">
        <h5 class="dtl-title-line">基本信息</h5>
      </el-col>
    </el-row>
    <el-form
      ref="detailForm"
      :model="detailForm"
      label-width="110px"
      size="mini"
      :rules="rules">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="手机号" prop="mobileNum">
            <el-input v-model="detailForm.mobileNum"  :readonly="prohibit"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          &nbsp;
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="内容" prop="content">
            <el-input
              type="textarea"
              :autosize="{ minRows: 16}"
              placeholder="请输入内容"
              v-model="detailForm.content"
               :readonly="prohibit">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="btn_bottom">
      <el-col :span="12" style="text-align:right;">
        <el-button v-show="btnShow('10002090106020')" type="primary" size="mini" @click="saveOrUpdateNote" v-if="!prohibit" >保存</el-button>
        <el-button v-show="btnShow('10002090106010')" type="primary" size="mini" @click="saveAndSend" v-if="!prohibit" >保存并发送</el-button>
      </el-col>
    </el-row>
    <el-dialog :title="showTitle" :visible.sync="isShow" width="70%">
      <pop-tab />
    </el-dialog>
  </el-card>
</template>

<script>
import { saveOrUpdateNote, getNoet, saveAndSend } from "@/api/msgManage/mobileNote.js";

export default {
  data() {
    return {
      btns: this.$store.getters.btns['100020901060'],
      isShow: false,
      showTitle: '消息邮件-新增',
      prohibit: false,
      detailForm: {
        id:'',
        mobileNum:'',
        content:'',
      },
      rules: {
        mobileNum: [
          { required: true, message: "手机号不能为空" ,trigger: "blur" },
          { pattern: /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/, message: '格式不正确', trigger: ['blur', 'change'] }
        ],
        content: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ],
      },
    }

  },
  created() {
    let id=this.$route.query.id;
    if (id) {
      this.showTitle = "短信通知-编辑";
      this.getNoet(id);
    } else {
      this.showTitle = "短信通知-新增";
    }
    if(this.$route.query.readonly){
      this.rules={}
      this.prohibit=this.$route.query.readonly;
      this.showTitle='短信通知-查看详情';
    }
  },
  methods: {
    //data中这个不能少：btns: this.$store.getters.btns['100010'],
    btnShow(menuCode) {
      //根据用户所具有的菜单项控制
      var btns = this.btns;
      if (btns && btns.length > 0) {
        for (var i = 0; i < btns.length; i++) {
          if (menuCode === btns[i]) {
            return true;
          }
        }
      }
      return false;
    },
    btnDisplay(status) {
      //根据具体业务数据控制 
      if (status == "10") {
        return true;
      }
      return false;
    },
    getNoet(id) {
      getNoet(id).then(response => {
        this.detailForm = response.data;
      });
    },
    saveOrUpdateNote(){
      this.$refs["detailForm"].validate(valid => {
        if (valid) {
          //数据校验成功
          saveOrUpdateNote(this.detailForm).then(response => {
            if (response.data) {
              //保存成功
              this.$message({
                type: "success",
                message: "保存成功"
              });
              this.$router.push({
                path: "/message-manage/sms-notice",query: {}
              });
            } else {
              //保存失败
              this.$message({
                type: "success",
                error: "保存失败"
              });
            }
          });
        } else {
          //校验失败
          this.$message({
            message: "请正确录入页面数据",
            type: "warning"
          });
        }
      });
    },
    saveAndSend(){
      this.$refs["detailForm"].validate(valid => {
        if (valid) {
          //数据校验成功
          saveAndSend(this.detailForm).then(response => {
            if (response.data) {
              //保存成功
              this.$message({
                type: "success",
                message: "保存并发送成功"
              });
              this.$router.push({
                path: "/message-manage/sms-notice",query: {}
              });
            } else {
              //保存失败
              this.$message({
                type: "success",
                error: "保存并发送失败"
              });
            }
          });
        } else {
          //校验失败
          this.$message({
            message: "请正确录入页面数据",
            type: "warning"
          });
        }
      });
    },
    handleShow() {
      this.isShow = true
    }
  }
}
</script>

<style scoped>
@import '~@/styles/hxxd.scss';
</style>
