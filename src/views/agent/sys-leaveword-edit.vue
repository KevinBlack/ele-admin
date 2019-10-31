<template>
  <el-card class="detailsContainer">
    <el-row>
      <!-- 留言消息录入 -->
      <el-row :gutter="10">
        <el-col :span="24">
          <h5 class="dtl-title-line bg-font-color">留言消息录入</h5>
        </el-col>
      </el-row>

      <el-form
        ref="ruleForm"
        :model="hxXdSysMessageParam"
        label-width="135px"
        size="mini"
        :rules="rules1"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="消息标题" prop="header">
              <el-input v-model="hxXdSysLeaveWordParam.header" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="消息内容" prop="content">
              <el-input v-model="hxXdSysLeaveWordParam.content" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="消息反馈" prop="feedback">
              <el-input v-model="hxXdSysLeaveWordParam.feedback" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 按钮区 -->
      <el-row :gutter="10">
        <el-col :span="22" style="text-align:right;margin-top:20px;">
          <el-button type="primary" size="mini" @click="save">保存</el-button>
          <el-button type="primary" size="mini">发送</el-button>
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
      hxXdSysLeaveWordParam: {
        header: "",
        feedback: "",
        content: ""
      },
      rules1: {
        header: [{ required: true, message: "不能为空", trigger: "blur" }],
        feedback: [{ required: true, message: "不能为空" }],
        despatcher: [
          { required: true, message: "不能为空", trigger: "change" }
        ],
        content: [{ required: true, message: "不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    //系统信息保存
    save() {
      // this.$refs["ruleForm"].validate(valid => {
      // if (valid) {
      //数据校验成功
      sysLeaveWordSave(this.hxXdSysLeaveWordParam).then(response => {
        debugger;
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
.bg-font-color {
  color: #3665ca;
  font-weight: bold;
}

* {
  font-weight: normal;
}
.detailsContainer {
  margin: 0 10px;
}
.dtl-title-line {
  display: inline-block;
  border-left: 3px solid #409eff;
  padding-left: 5px;
}
.el-table__fixed-right::before {
  background-color: none;
}
</style>
