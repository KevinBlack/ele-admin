<template>
  <el-card class="detailsContainer">
    <el-row>
      <!-- 催缴消息录入 -->
      <el-row :gutter="10">
        <el-col :span="24">
          <h5 class="dtl-title-line">消息录入</h5>
        </el-col>
      </el-row>

      <el-form ref="ruleForm" :model="callInfoParam" label-width="135px" size="mini" :rules="rules">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="消息类型" prop="messageType">
              <el-select v-model="callInfoParam.messageType" style="width: 100%;" placeholder="请选择">
                <el-option
                  v-for="item in messageOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="消息日期" prop="sendTime">
              <el-date-picker v-model="callInfoParam.sendTime" type="datetime" style="width: 100%;" format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发送范围" prop="sendScope">
              <el-select
                v-model="callInfoParam.sendScope"
                style="width: 100%;"
                placeholder="请选择"
                @change="showBox"
              >
                <el-option
                  v-for="item in sendScopeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
              <!-- 弹框区 -->
            <el-dialog :visible.sync="dialog.isShow" :title="dialog.title">
              <leaguer 
              :fdmsg="callInfoParam.sendScope" 
              :isShow="dialog.isShow" 
              @callBack="dialogCallBack" />
            </el-dialog>
          </el-col>
          <el-col :span="12">
            <el-form-item label="重复规则" prop="repetRule">
              <el-input v-model="callInfoParam.repetRule" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最大重复次数" prop="max">
              <el-input v-model="callInfoParam.max" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="选择的会员" prop="member">
              <el-input
                v-model="callInfoParam.member"
                placeholder="请输入内容"
                class="input-with-select"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="消息正文" prop="content">
              <el-input type="textarea" v-model="callInfoParam.content" maxlength="200" show-word-limit :rows="4"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    
      <!-- 按钮区 -->
      <el-row :gutter="10">
        <el-col :span="24" class="btn_bottom" style="text-align: center;">
          <el-button type="primary" size="mini"  v-show="btnShow('100021009010')" @click="save">保 存</el-button>
          <!-- <el-button type="primary" size="mini" v-show="btnShow('100021009020')" >发送信息</el-button> -->
        </el-col>
      </el-row>
    </el-row>
  </el-card>
</template>

<script>
import { callInfoSaveOrUpdate } from "@/api/hxxd/agent";
import Leaguer from "./leaguer";

export default {
  name: "CallInfo",
  components: { Leaguer },
  data() {
    return {
      //获取有权限的按钮
      btns: this.$store.getters.btns['1000210090'],
      dialog: {
        isShow: false,
        title: "选择会员"
      },
      callInfoParam: {
        messageType: "",
        sendTime: "",
        content: "",
        sendScope: "",
        repetRule: "",
        max: "",
        member: ""
      },
      sendScopeOptions: [
        {
          value: "0",
          label: "全部"
        },
        {
          value: "1",
          label: "欠费"
        }
      ],
      messageOptions: [
        {
          value: "0",
          label: "短信"
        },
        {
          value: "1",
          label: "邮件"
        },
        {
          value: "2",
          label: "系统消息"
        }
      ],
      rules: {
        messageType: [{ required: true, message: "不能为空", trigger: "blur" }],
        sendTime: [{ required: true, message: "不能为空" }],
        content: [{ required: true, message: "不能为空", trigger: "change" }],
        repetRule: [{ required: true, message: "不能为空", trigger: "blur" }],
        max: [{ required: true, pattern: /^[1-9]+[0-9]*$/, message: "请输入数字", trigger: "blur" }]
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
    showBox() {
      this.dialog.isShow = true;
    },
    dialogCallBack(command, data) {
      this.dialog.isShow = false;
      if (command == "ok") {
        data.forEach(i => {
          this.callInfoParam.member =
            this.callInfoParam.member + i.name + "-" + i.code + ",";
        });
      }
    },
    //系统信息保存
    save() {
      this.$refs["ruleForm"].validate(valid => {
      if (valid) {
      //数据校验成功
      callInfoSaveOrUpdate(this.callInfoParam).then(response => {
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
.tsfDlg {
  margin: 0 10px;
}
.sl-dialog {
  width: 70% !important;
}
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
