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
          <el-col :span="24">
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
          <el-col :span="24">
            <el-form-item label="其他原因" size="mini" prop="exitReason">
              <el-input v-model="mainForm.exitReason" size="mini" type="textarea" :rows="4" maxlength="500"></el-input>
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
            <el-button type="primary" size="mini" @click="submit">提交</el-button>
            <el-button type="primary" size="mini" @click="cancel">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入axios
import { memberApply } from "@/api/hxxd/member";
import { getToken } from "@/utils/auth";

export default {
  name: "MemberApply",
  data() {
    return {
      uploadHeaders: {
        "X-Token": getToken()
      },
      //表单对应下拉字典
      mainFormOptions: {
          exitType:[{'value':'1',label:'韧性'},{'value':'0',label:'就是想退会'}]
      },
      //表单el标签属性
      mainFormProps: {},
      //主表form
      mainForm: {
        //退会类型
        exitType: "",
        //退会原因
        exitReason: ""
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
    this.initFormOptions();
  },
  methods: {
    initFormOptions() {},
    submit() {
         //1：先校验表单数据
      this.$refs["mainForm"].validate(valid => {
        if (valid) {
          // 2：附件提交
          this.$refs.upload.submit();
        }
      });
    },
    cancel() {},
    beforeUpload(file) {
        console.log(file.type)
        // docx application/vnd.openxmlformats-officedocument.wordprocessingml.document
        // xlsx application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
        // zip application/x-zip-compressed
        var fileTypeList= ['image/jpeg', 'image/png' , 'application/msword','text/plain', 'application/pdf','application/x-zip-compressed','application/vnd.ms-excel','aplication/zip','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
        const legalFileType  = fileTypeList.indexOf(file.type)>0;
        const legalFileSize = file.size / 1024 / 1024 < 3;
        if (!legalFileType) {
          this.$message.error('上传附件格式不支持!');
        }
        if (!legalFileSize) {
          this.$message.error('上传附件大小不能超过 3MB!');
        }
        return legalFileType && legalFileSize;
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
