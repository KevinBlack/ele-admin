<template>
  <el-card class="detailsContainer">
    <el-row>
      <!-- 系统通知录入 -->
      <el-row :gutter="10">
        <el-col :span="24">
          <h5 class="dtl-title-line">{{ title }}</h5>
        </el-col>
      </el-row>

      <el-form
        ref="hxXdSysNoticeParam"
        :model="hxXdSysNoticeParam"
        :disabled="disabled"
        label-width="135px"
        size="mini"
        :rules="rules"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="发布时间" prop="time">
              <el-date-picker
                v-model="hxXdSysNoticeParam.time"
                type="datetime"
                style="width: 100%;"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="标题" prop="header">
              <el-input v-model="hxXdSysNoticeParam.header" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="会员身份" prop="checkAll">
            <el-checkbox 
            :indeterminate="isIndeterminate" 
            v-model="checkAll"
            @change="handleCheckAllChange" 
            >全选</el-checkbox>
            <el-checkbox-group 
            v-model="checkIdentityMarks" 
            @change="handleCheckedCitiesChange">
              <el-checkbox
                v-for="identityMark in identityMarks"
                :label="identityMark"
                :key="identityMark" >{{ identityMark }}</el-checkbox>
            </el-checkbox-group>
             </el-form-item>
             <div style="margin: 15px 0;"></div>
          </el-col>
          <el-col :span="24">
            <el-form-item label="通知内容" prop="content">
              <el-input
                type="textarea"
                maxlength="30"
                :autosize="{ minRows: 6, maxRows: 8 }"
                show-word-limit
                v-model="hxXdSysNoticeParam.content"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 按钮区 -->
      <el-row v-if="isButton" :gutter="10">
        <el-col :span="24" class="btn_bottom">
          <el-button
            type="primary"
            size="mini"
            v-show="btnShow('10002090306010')"
            @click="save"
            >保存</el-button
          >
          <!-- <el-button
            type="primary"
            size="mini"
            v-show="btnShow('10002090306010')"
            >发送</el-button> -->
        </el-col>
      </el-row>
    </el-row>
  </el-card>
</template>

<script>
import {
  sysNoticeSave,
  getSysNoticeById,
  sysNoticeUpdate
} from "@/api/hxxd/agent";
const identityMarkOptions = ["副会长单位", "执委单位", "普通会员"];
export default {
  data() {
    return {
      checkIdentityMarks: [],
      checkAll: false,
      identityMarks: identityMarkOptions,
      isIndeterminate: true,
      btns: this.$store.getters.btns["100020903060"],
      title: "",
      disabled: true,
      isButton: true,
      hxXdSysNoticeParam: {
        time: "",
        header: "",
        content: "",
        identityMark: ""
      },
      rules: {
        time: [{ required: true, message: "不能为空", trigger: "blur" }],
        header: [{ required: true, message: "不能为空" }],
        content: [{ required: true, message: "不能为空", trigger: "change" }]
      }
    };
  },
  created() {
    //初始化页面时
    // 参数传递 router.push({ path: 'register', query: { plan: 'private' }})
    // 参数接受 let id = this.$route.query.jId;
    let id = this.$route.query.id;
    let type = this.$route.query.type;
    if (type === "update") {
      this.title = "系统通知详情修改";
      this.disabled = false;
    } else if (type === "show") {
      this.title = "系统通知详情查看";
      this.disabled = true;
      this.isButton = false;
    }
    if (id) {
      this.getSysNoticeById(id);
    }
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
    handleCheckAllChange(val) {
      this.checkIdentityMarks = val ? identityMarkOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.identityMarks.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.identityMarks.length;
    },
    //系统信息保存
    save() {
      // this.$refs["ruleForm"].validate(valid => {
      // if (valid) {
      //数据校验成功
        this.$refs['hxXdSysNoticeParam'].validate(valid => {
        if (!valid) {
          this.$message({
            type: 'failure',
            message: '请按照要求填写相关内容 !'
          })
          return false
        }
        if (this.checkIdentityMarks.length===0) {
        this.$message({
          type: "warning",
          message: "请选择会员身份"
        });
        return;
      }
      var tempIdentityMarks = ","
      for (var i = 0; i < this.checkIdentityMarks.length; i++) {
        tempIdentityMarks = tempIdentityMarks + this.checkIdentityMarks[i] + ",";
      }
      this.hxXdSysNoticeParam.identityMark = tempIdentityMarks;
      sysNoticeUpdate(this.hxXdSysNoticeParam).then(response => {
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
      })
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
@import "~@/styles/hxxd.scss";
</style>
