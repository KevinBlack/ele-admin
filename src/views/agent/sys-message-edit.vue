<template>
  <el-card class="detailsContainer">
    <el-row>
      <!-- 系统消息录入 -->
      <el-row :gutter="10">
        <el-col :span="24">
          <h5 class="dtl-title-line">消息录入</h5>
        </el-col>
      </el-row>

      <el-form
        ref="hxXdSysMessageParam"
        :model="hxXdSysMessageParam"
        label-width="135px"
        size="mini"
        :rules="rules1"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="日期" prop="time">
              <el-date-picker
                v-model="hxXdSysMessageParam.time"
                type="datetime"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width: 100%;"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="消息标题" prop="header">
              <el-input v-model="hxXdSysMessageParam.header" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发送人" prop="despatcher">
              <el-input v-model="hxXdSysMessageParam.despatcher" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="消息内容" prop="content">
              <el-input
                type="textarea"
                maxlength="30"
                :autosize="{ minRows: 6, maxRows: 8 }"
                show-word-limit
                v-model="hxXdSysMessageParam.content"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 按钮区 -->
      <el-row class="btn_bottom">
        <el-col :span="24">
          <el-button
            type="primary"
            size="mini"
            v-show="btnShow('10002090506010')"
            @click="save"
            >发送</el-button
          >
        </el-col>
      </el-row>
    </el-row>
  </el-card>
</template>

<script>
import { sysMessageSave } from "@/api/hxxd/agent";
export default {
  data() {
    return {
      btns: this.$store.getters.btns["100020905060"],
      hxXdSysMessageParam: {
        time: "",
        header: "",
        despatcher: "",
        content: ""
      },
      rules1: {
        time: [{ required: true, message: "不能为空", trigger: "blur" }],
        header: [{ required: true, message: "不能为空" }],
        despatcher: [
          { required: true, message: "不能为空", trigger: "change" }
        ],
        content: [{ required: true, message: "不能为空", trigger: "blur" }]
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
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          //数据校验成功
          this.$refs["hxXdSysMessageParam"].validate(valid => {
            if (!valid) {
              this.$message({
                type: "failure",
                message: "请按照要求填写相关内容 !"
              });
              return false;
            }
            sysMessageSave(this.hxXdSysMessageParam).then(response => {
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
          });
        } else {
          //校验失败
          this.$message({
            message: "请正确录入页面数据",
            type: "warning"
          });
        }
      });
    }
  }
};
</script>
<style>
@import "~@/styles/hxxd.scss";
</style>
