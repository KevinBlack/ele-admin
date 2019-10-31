<template>
  <el-card class="detailsContainer">
    <el-row>
      <!-- 系统通知录入 -->
      <el-row :gutter="10">
        <el-col :span="24">
          <h5 class="dtl-title-line bg-font-color">系统通知录入</h5>
        </el-col>
      </el-row>

      <el-form
        ref="ruleForm"
        :model="hxXdSysNoticeParam"
        label-width="135px"
        size="mini"
        :rules="rules"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="发布时间" prop="time">
              <el-date-picker v-model="hxXdSysNoticeParam.time" type="datetime" style="width: 100%;" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标题" prop="header">
              <el-input v-model="hxXdSysNoticeParam.header" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="通知内容" prop="content">
              <el-input v-model="hxXdSysNoticeParam.content" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 按钮区 -->
      <el-row :gutter="10">
        <el-col :span="22" style="text-align:right;margin-top:20px;">
          <el-button type="primary" size="mini" @click="save">保存</el-button>
          <el-button type="primary" size="mini" >发送</el-button>
        </el-col>
      </el-row>
    </el-row>
  </el-card>
</template>

<script>
import { sysNoticeSave,getSysNoticeById ,sysNoticeUpdate} from "@/api/hxxd/agent";
export default {
  data() {
    return {
      hxXdSysNoticeParam: {
        time: "",
        header: "",
        content: ""
      },
      rules: {
        time: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        header: [{ required: true, message: "不能为空" }],
        content: [
          { required: true, message: "不能为空", trigger: "change" }
        ]
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
      this.getSysNoticeById(id);
    }
  },
  methods: {
    //系统信息保存
    save() {
      // this.$refs["ruleForm"].validate(valid => {
      // if (valid) {
      //数据校验成功
      sysNoticeUpdate(this.hxXdSysNoticeParam).then(response => {
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
    //通知公告查询
    getSysNoticeById(id) {
      this.hxXdSysNoticeParam.id = id;
      getSysNoticeById(this.hxXdSysNoticeParam).then(response => {
        this.hxXdSysNoticeParam = response.data;
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
