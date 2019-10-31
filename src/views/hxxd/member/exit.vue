<template>
  <div>
    <el-card class="detailsContainer">
      <el-row>
        <el-col class="title">
          <span>会员退会申请</span>
        </el-col>
      </el-row>
      <el-form
        ref="mainForm"
        :model="mainForm"
        label-width="110px"
        size="mini"
        :rules="mainFormRules"
      >
        <!-- 第一块分组 -->
        <el-row :gutter="10">
          <el-col :span="24">
            <h5 class="dtl-title-line">退会信息</h5>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="退会原因" size="mini" prop="exitType">
              <el-select
                v-model="mainForm.exitType"
                placeholder="请选择"
                size="mini"
                style="width:100%"
              >
                <el-option
                  v-for="item in mainFormOptions.exitType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="状态" size="mini" prop="status">
              <el-select v-model="mainForm.status" size="mini" style="width:100%" :disabled="true">
                <el-option
                  v-for="item in mainFormOptions.status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="其他原因" size="mini" prop="exitReason">
              <el-input
                v-model="mainForm.exitReason"
                size="mini"
                type="textarea"
                :rows="4"
                maxlength="500"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="24">
            <h5 class="dtl-title-line">附件</h5>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <!-- 写好一个col其他的知己复制粘贴 -->
          <el-col :span="24">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="/hxxd/hxXdMember/exitApply"
              :file-list="attachmentList"
              :auto-upload="false"
              :headers="uploadHeaders"
              :before-upload="beforeUpload"
              :data="mainForm"
              :multiple="true"
              :limit="5"
              drag
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">文件最多上传5个附件,每个大小不超过3M</div>
            </el-upload>
          </el-col>
        </el-row>

        <el-row style="border-bottom: 1px solid #e6e6e6;margin-bottom: 20px;padding-bottom:10px;">
          <el-col :span="24" style="text-align:right;">
            <el-button type="primary" size="mini" @click="save" v-if="btnDisplay('10')">保存</el-button>
            <el-button type="primary" size="mini" @click="submit" v-if="btnDisplay('10')">提交</el-button>
            <el-button type="primary" size="mini" @click="cancel" v-if="btnDisplay('10')">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入axios
import {
  memberExitApply,
  submitMemberExit,
  getMemberExit,
  getMemberExitByType
} from "@/api/hxxd/memberExit";

import { getToken } from "@/utils/auth";

export default {
  name: "MemberExit",
  data() {
    return {
      uploadHeaders: {
        "X-Token": getToken()
      },
      //表单对应下拉字典
      mainFormOptions: {
        exitType: [
          { value: "1", label: "韧性" },
          { value: "0", label: "就是想退会" }
        ],
        status: [
          { value: "10", label: "未提交" },
          { value: "15", label: "审核驳回" },
          { value: "20", label: "待审核" },
          { value: "30", label: "审核通过" }
        ]
      },
      //表单el标签属性
      mainFormProps: {},
      //主表form
      mainForm: {
        //退会类型
        exitType: "",
        //退会原因
        exitReason: "",
        status: "10"
      },
      //附件
      attachmentList: [],
      mainFormRules: {
        exitType: [
          { required: true, message: "请选择退会类型", trigger: "blur" }
        ],
        exitReason: [
          { required: true, message: "请输入退会原因", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    // 初始化查询表单
    this.initForm();
  },
  methods: {
    initForm() {
      getMemberExitByType().then(response => {
        Object.assign(this.mainForm, response.data);
        //判断数据是否为空
        var id = this.mainForm.id;
        if (!id) {
          this.mainForm.status='10'
        } else {
          getMemberExit(id).then(response => {
            Object.assign(this.mainForm, response.data);
          });
        }
      });
    },
    save() {
      this.$refs["mainForm"].validate(valid => {
        if (valid) {
          //做数据拷贝，防止影响双向绑定的数据
          var mainData = JSON.parse(JSON.stringify(this.mainForm));
          memberExitApply(mainData).then(response => {
            this.mainForm.id = response.data.id;
            var msg = this.mainForm.id ? "保存成功" : "保存失败";
            this.$message({
              type: "success",
              message: msg
            });
          });
        }
      });
    },
    submit() {
      this.$confirm("是否执行提交操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var id = this.mainForm.id;
          //校验
          if (!id) {
            this.$message({
              type: "success",
              message: "请先保存数据"
            });
            return;
          }
          //提交
          submitMemberExit(id).then(response => {
            this.mainForm.status = response.data.status;
            var msg = this.mainForm.status == "20" ? "提交成功" : "提交失败";
            this.$message({
              type: "success",
              message: msg
            });
          });
        })
        .catch(() => {
          // 取消时执行此处
        });
    },
    cancel() {
      this.$nextTick(() => {
        this.$refs["mainForm"].resetFields();
      });
    },
    beforeUpload(file) {
      console.log(file.type);
      // docx application/vnd.openxmlformats-officedocument.wordprocessingml.document
      // xlsx application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
      // zip application/x-zip-compressed
      var fileTypeList = [
        "image/jpeg",
        "image/png",
        "application/msword",
        "text/plain",
        "application/pdf",
        "application/x-zip-compressed",
        "application/vnd.ms-excel",
        "aplication/zip",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ];
      const legalFileType = fileTypeList.indexOf(file.type) > 0;
      const legalFileSize = file.size / 1024 / 1024 < 3;
      if (!legalFileType) {
        this.$message.error("上传附件格式不支持!");
      }
      if (!legalFileSize) {
        this.$message.error("上传附件大小不能超过 3MB!");
      }
      return legalFileType && legalFileSize;
    },
    btnDisplay(status) {
      //根据具体业务数据控制
      if (this.mainForm.status == status) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style scoped>
* {
  font-weight: normal;
}
.dtl-title-line {
  display: inline-block;
  border-left: 3px solid #409eff;
  padding-left: 5px;
}
.title {
  color: #409eff;
  border-bottom: 1px solid #409eff;
  padding-bottom: 10px;
  font-size: 20px;
  text-align: center;
}
/* 标题下线和 保存取消上部线 样式 */
.dialog-footer {
  border-top: 1px solid #e6e6e6;
  margin-top: 30px;
  padding-top: 10px;
  text-align: right;
}
</style>
