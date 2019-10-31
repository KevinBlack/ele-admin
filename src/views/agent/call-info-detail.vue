<template>
  <el-card class="detailsContainer">
    <el-row>
      <!-- 系统消息录入 -->
      <el-row :gutter="10">
        <el-col :span="24">
          <h5 class="dtl-title-line bg-font-color">催缴信息{{this.type}}</h5>
        </el-col>
      </el-row>

      <el-form
        ref="ruleForm"
        :disabled="disabled"
        :model="callInfoParam"
        label-width="135px"
        size="mini"
        :rules="rules"
      >
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
              <el-date-picker v-model="callInfoParam.sendTime" type="datetime" style="width: 100%;" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="消息正文" prop="content">
              <el-input v-model="callInfoParam.content" />
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
          <el-col :span="24">
            <el-form-item label="选择的会员" prop="member">
              <el-input
                v-model="callInfoParam.member"
                placeholder="请输入内容"
                class="input-with-select"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
       <!-- 弹框区 -->
      <el-dialog :visible.sync="dialog.isShow" :title="dialog.title">
        <Leaguer :isShow="dialog.isShow" @callBack="dialogCallBack" />
      </el-dialog>
      <!-- 按钮区 -->
      <el-row :gutter="10">
        <el-col :span="24" style="text-align:right;margin-top:20px;">
          <el-button type="primary" size="mini" @click="save">保存</el-button>
          <el-button type="primary" size="mini" @click="save">发送信息</el-button>
          <!-- <el-button type="primary" size="mini" @click="goback" v-if="this.type==this.show">返回查询列表</el-button> -->
        </el-col>
      </el-row>
    </el-row>
  </el-card>
</template>

<script>
import { getCallInfoById, callInfoSaveOrUpdate } from "@/api/hxxd/agent";
import Leaguer from "./leaguer";
export default {
  components: { Leaguer },
  data() {
    return {
      dialog: {
        isShow: false,
        title: "选择会员"
      },
      update: "update",
      show: "show",
      disabled: true,
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
        },
        {
          value: "2",
          label: "个别会员"
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
        repetRule: [{ required: true, message: "不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    //初始化页面时
    // 参数传递 router.push({ path: 'register', query: { plan: 'private' }})
    // 参数接受 let id = this.$route.query.jId;
    let id = this.$route.query.id;
    let type = this.$route.query.type;
    if (type == "update") {
      this.disabled = false;
    } else if (type == "show") {
      this.disabled = true;
    }
    debugger;
    if (id) {
      this.getCallInfoById(id);
    }
  },
  methods: {
     showBox() {
      this.dialog.isShow = true;
    },
    dialogCallBack(command, data) {
      this.dialog.isShow = false;
      if (command == "ok") {
        debugger;
        data.forEach(i => {
          this.callInfoParam.member =
            this.callInfoParam.member + i.name + "-" + i.code + ",";
        });
      }
    },
    goback() {
      this.$router.push({
        path: "/agent/call-info-manage",
        query: { flag: "1" }
      });
    },
    //系统信息保存
    save() {
      // this.$refs["ruleForm"].validate(valid => {
      // if (valid) {
      //数据校验成功
      callInfoSaveOrUpdate(this.callInfoParam).then(response => {
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
    },
    //系统消息查询
    getCallInfoById(id) {
      this.callInfoParam.id = id;
      getCallInfoById(this.callInfoParam).then(response => {
        this.callInfoParam = response.data;
      });
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
