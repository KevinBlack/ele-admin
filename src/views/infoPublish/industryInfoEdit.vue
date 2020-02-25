<template>
  <el-card class="detailsContainer">
    <!-- 系统消息录入 -->
    <el-row :gutter="10">
      <el-col :span="24">
        <h5 class="dtl-title-line">新增行业信息</h5>
      </el-col>
    </el-row>

    <el-form
      ref="ruleForm"
      :model="industryInfoParam"
      label-width="135px"
      size="mini"
      :rules="rules1"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="所属分组" prop="industryType">
            <el-select
              v-model="industryInfoParam.industryType"
              style="width: 100%;z-index: 10002 !important;"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="内容标题" prop="industryTitle">
            <el-input
              v-model="industryInfoParam.industryTitle"
              maxlength="50"
              placeholder="请输入内容标题"
              show-word-limit
              size="mini"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="内容描述" prop="industryContent">
            <el-input
              type="textarea"
              :rows="3"
              v-model="industryInfoParam.industryContent"
              maxlength="200"
              placeholder="请输入内容描述"
              show-word-limit
              size="mini"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="内容添加" prop="industryBody">
            <!-- <div ref="editor" :catchData="handlecatchData"></div> -->
            <rich-components :catchData="handlecatchData"></rich-components>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="附件上传" size="mini" prop>
            <el-upload
              class="upload-demo"
              ref="upload"
              action
              :on-preview="handlePreview"
              :before-upload="handleUpload"
              :headers="uploadHeaders"
              :multiple="true"
              :file-list="fileList"
              :auto-upload="false"
            >
              <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮区 -->
    <el-row class="btn_bottom">
      <el-col :span="24">
        <el-button type="primary" size="mini" @click="save">保 存</el-button>
        <el-button type="primary" size="mini" @click="resetForm('industryInfoParam')">重 置</el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { addIndustryInfo } from "@/api/hxxd/industryInfoPublish";
import { getToken } from "@/utils/auth";
// import E from 'wangeditor'
import RichComponents from "./rich-components";
export default {
  name: "IndustryInfoEdit",
  components: { RichComponents },
  data() {
    return {
      editorContent: "",
      formData: new FormData(),
      industryInfoParam: {
        industryType: "",
        industryTitle: "",
        industryContent: "",
        publishTime: "",
        industryBody: ""
      },
      fileList: [],
      uploadHeaders: {
        "X-Token": getToken()
      },
      options: [
        {
          value: "1",
          label: "站内新闻"
        },
        {
          value: "2",
          label: "公示信息"
        },
        {
          value: "3",
          label: "最新动态"
        }
      ],
      rules1: {
        industryTitle: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        industryContent: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        industryType: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        industryBody: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        createTime: [{ required: true, message: "不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 文件上传相关方法
    handleUpload(file) {
      this.formData.append("file", file);
      return false;
    },
    handlePreview(file) {
      console.log(file);
    },
    resetForm(formName) {
      for (const key in this.industryInfoParam) {
        this.industryInfoParam[key] = "";
      }
      this.editorContent = "";
    },
    handlecatchData: function(params) {
      this.editorContent = params;
      console.log(this.editorContent);
    },
    save() {
      // this.$refs["industryInfoParam"].validate(valid => {
      //   if (!valid) {
      //     this.$message({
      //       type: "failure",
      //       message: "请按照要求填写相关内容 !"
      //     });
      //     return false;
      //   }
        const paramTitle = this.industryInfoParam.industryTitle;
        const paramType = this.industryInfoParam.industryType;
        console.log(this.editorContent);
        if (paramTitle === "" || paramType === "") {
          this.$message({
            message: "请完善数据",
            type: "warning"
          });
        } else {
          // this.industryInfoParam.industryBody = this.editor.txt.html()
          this.industryInfoParam.industryBody = this.editorContent;
          const dataDetail = this.industryInfoParam;
          for (const key in dataDetail) {
            this.formData.append(key, dataDetail[key]);
          }
          this.$refs.upload.submit(); // 附件文件上传
          addIndustryInfo(this.formData).then(response => {
            var msg = response.status === 200 ? "保存成功" : "保存失败";
            if (response.status === 200) {
              this.$message({
                type: "success",
                message: msg
              });
              this.$router.push({ path: "/infoPublish/selectIndustryInfo",query: {} });
            } else {
              this.$message({
                type: "success",
                message: msg
              });
            }
          });
        }
      // });
    }
  }
};
</script>
<style>
@import "~@/styles/hxxd.scss";
.el-popper {
  z-index: 10002 !important;
}
</style>
