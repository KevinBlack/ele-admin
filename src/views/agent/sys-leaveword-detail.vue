<template>
  <el-card class="detailsContainer">
    <el-row>
      <!-- 留言消息录入 -->
      <el-row :gutter="10">
        <el-col :span="24">
          <h5 class="dtl-title-line">{{ title }}</h5>
        </el-col>
      </el-row>

      <el-form
        ref="ruleForm"
        :disabled="disabled"
        :model="hxXdSysLeaveWordParam"
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
      <el-row :gutter="10" v-if="isButton">
        <el-col :span="24" class="btn_bottom">
          <el-button type="primary" size="mini" @click="save">保存</el-button>
          <el-button type="primary" size="mini" >发送</el-button>
        </el-col>
      </el-row>
    </el-row>
  </el-card>
</template>

<script>
import { sysLeaveWordSave , getSysLeaveWordById , sysLeaveWordUpdate } from "@/api/hxxd/agent";
export default {
  data() {
    return {
      disabled: true,
      title: '',
      isButton: true,
      hxXdSysLeaveWordParam: {
        header: "",
        feedback: "",
        content: ""
      },
      rules1: {
        header: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        feedback: [{ required: true, message: "不能为空" }],
        despatcher: [
          { required: true, message: "不能为空", trigger: "change" }
        ],
        content: [
          { required: true, message: "不能为空", trigger: "blur" }
        ]
      }
    };
  },
   created() {
    //初始化页面时
    // 参数传递 router.push({ path: 'register', query: { plan: 'private' }})
    // 参数接受 let id = this.$route.query.jId;
    let id = this.$route.query.id
    let type = this.$route.query.type
    if (type == "update") {
      this.title = '留言消息详情修改'
      this.disabled = false
    } else if (type == "show") {
      this.title = '留言消息详情查看'
      this.disabled = true
      this.isButton = false
    }
    if (id) {
      this.getSysLeaveWordById(id)
    }
  },
  methods: {
    //系统信息保存
    save() {
      // this.$refs["ruleForm"].validate(valid => {
      // if (valid) {
      //数据校验成功
      sysLeaveWordUpdate(this.hxXdSysLeaveWordParam).then(response => {
        var msg = response.status == 200 ? "保存成功" : "保存失败"
        if (response.status == 200) {
          //保存成功
          this.$message({
            type: "success",
            message: msg
          })
        } else {
          //保存失败
          this.$message({
            type: "success",
            error: msg
          })
          console.log(response.message)
        }
      })
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
    getSysLeaveWordById(id) {
      this.hxXdSysLeaveWordParam.id = id
      getSysLeaveWordById(this.hxXdSysLeaveWordParam).then(response => {
        this.hxXdSysLeaveWordParam = response.data
      })
    }
  }
}
</script>
<style>
@import '../../styles/hxxd.scss';
</style>
