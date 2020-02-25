<template>
  <el-card class="detailsContainer">
    <el-row>
      <!-- 留言消息录入 -->
      <el-row :gutter="10">
        <el-col :span="24">
          <h5 class="dtl-title-line">留言消息录入</h5>
        </el-col>
      </el-row>

      <el-form ref="hxXdSysLeaveWordParam" :model="hxXdSysLeaveWordParam" label-width="135px" size="mini" :rules="rules1" >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="消息标题" prop="header">
              <el-input v-model="hxXdSysLeaveWordParam.header" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="消息内容" prop="content">
              <el-input
                type="textarea"
                maxlength="30"
                :autosize="{ minRows: 6, maxRows: 8 }"
                show-word-limit
                v-model="hxXdSysLeaveWordParam.content"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="消息反馈" prop="content">
              <el-input
                type="textarea"
                maxlength="30"
                :autosize="{ minRows: 6, maxRows: 8 }"
                show-word-limit
                v-model="hxXdSysLeaveWordParam.feedback"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 按钮区 -->
      <el-row :gutter="10">
        <el-col :span="24" class="btn_bottom">
          <el-button type="primary" size="mini"  v-show="btnShow('10002090406010')"  @click="save">保存</el-button>
          <el-button type="primary" size="mini"  v-show="btnShow('10002090406010')" >发送</el-button>
        </el-col>
      </el-row>
    </el-row>
  </el-card>
</template>

<script>
import { sysLeaveWordSave } from "@/api/hxxd/agent";
export default {
  data() {
    return {
      btns: this.$store.getters.btns["100020904060"],
      hxXdSysLeaveWordParam: {
        header: "",
        feedback: "",
        content: ""
      },
      rules1: {
        header: [{ required: true, message: '不能为空', trigger: 'blur' }],
        feedback: [{ required: true, message: '不能为空', trigger: 'blur' }],
        content: [{ required: true, message: '不能为空', trigger: 'blur' }]
      }
    };
  },
  methods: {
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
    //系统信息保存
    save() {
      // this.$refs["ruleForm"].validate(valid => {
      // if (valid) {
      //数据校验成功
      sysLeaveWordSave(this.hxXdSysLeaveWordParam).then(response => {
        var msg = response.status == 200 ? "保存成功" : "保存失败";
        if (response.status == 200) {
          //保存成功
          this.$message({
            type: "success",
            message: msg
          });
        } else {
          //保存失败
          this.$message({
            type: "success",
            error: msg
          });
          console.log(response.message);
        }
      });
      // } else {
      //   //校验失败
      //   this.$message({
      //     message: "请正确录入页面数据",
      //     type: "warning"
      //   });
      // }
      // });
    }
  }
};
</script>
<style>
@import "~@/styles/hxxd.scss";
</style>
