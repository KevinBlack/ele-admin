<template>
  <el-card class="detailsContainer">
      <!-- 系统消息录入 -->
      <el-row :gutter="10">
        <el-col :span="24">
          <h5 class="dtl-title-line">投诉内容</h5>
        </el-col>
      </el-row>
      <el-form ref="formQuery" label-width="100px"  size="mini" >
        <el-row :gutter="22">
           <el-col :span="22">
              <el-form-item label="投诉主题" size="mini" prop="complaintTheme">
                <el-input v-model="formQuery.complaintTheme" :readonly="true" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="投诉单位" size="mini" :readonly="true" prop="complaintName">
                <el-input v-model="formQuery.complaintName" :readonly="true" style="width:100%">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="投诉人" size="mini" prop="complainant">
                <el-input v-model="formQuery.complainant" :readonly="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="手机号" size="mini" prop="contractInformation">
                <el-input v-model.number="formQuery.contractInformation" :readonly="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="联系邮箱" size="mini" prop="contractEmail">
                <el-input v-model.number="formQuery.contractEmail" :readonly="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="22">
              <el-form-item label="投诉内容" size="mini" prop="complaintsContents">
                <el-input type="textarea"  v-model="formQuery.complaintsContents" :readonly="true"  :rows="4"></el-input>
              </el-form-item>
            </el-col>
        </el-row>
      </el-form>
      <!-- part2 -->
      <el-row :gutter="10">
        <el-col :span="24">
            <h5 class="dtl-title-line">投诉处理信息</h5>
        </el-col>
      </el-row>
      <el-form ref="detailForm" :model="detailForm" label-width="100px" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="处理人" size="mini" prop="handlePerson">
              <el-input v-model="detailForm.handlePerson" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="处理时间"  size="mini" prop="processingTime">
              <el-date-picker
                v-model="detailForm.processingTime"
                type="date"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期"
                style="width:100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系邮箱" size="mini" prop="contactMail">
              <el-input v-model="detailForm.contactMail" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" size="mini" prop="contactTel">
              <el-input v-model.number="detailForm.contactTel" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="投诉分类" size="mini" prop="complaintClassification">
              <el-select v-model="detailForm.complaintClassification" filterable placeholder="请选择" style="width: 100%;" size="mini">
                  <el-option
                    v-for="item in businessOptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                  />
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="处理内容" size="mini" prop="processingResults">
              <el-input
                type="textarea"
                v-model="detailForm.processingResults"
                size="mini"
                :rows="4"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="附件上传" size="mini" prop="">
              <el-upload
                class="upload-demo"
                ref="upload"
                action=""
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

        <el-row>
          <el-col :span="24" class="btn_bottom">
            <el-button type="primary" size="mini" @click="saveComplainProcessing">保存</el-button>
            <el-button type="primary" size="mini" @click="resetForm('detailForm')">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
  </el-card>
</template>

<script>
import { saveComplainProcessing ,selectComplainInfoById} from "@/api/hxxd/complaintInfo"
import { parseTime } from "@/utils/index.js"
import { parse } from "path"
import { getToken } from '@/utils/auth';
import { isvalidPhone } from '@/utils/validate';
import { getDictDataLists, getDictDataList } from "@/api/system/comm/comm";
//电话号码校验
var validPhone = (rule, value, callback) => {
  if (!value) {
    console.log(validPhone)
    callback(new Error('请输入电话号码'));
  } else if (!isvalidPhone(value)) {
    callback(new Error('请输入正确的手机号码'));
  } else {
    callback();
  }
}

export default {
  data() {
    return {
      detailForm: {
        handlePerson: '',
        processingTime: '',
        contactMail: '',
        contactTel: '',
        processingResults: '',
        remarks: '',
        complaintId: '',
        complaintClassification: ""
      },
      businessOptions: [],
      formQuery: {
        complaintTheme: "",
        complaintsContents: "",
        complainant: "",
        contractInformation: "",
        contractEmail: ""
      },
      formData: new FormData(),
      rules: {
        handlePerson: [{ required: true, message: '处理人不能为空', trigger: 'blur' }],
        contactMail: [{ required: true, message: '不能为空', trigger: 'blur' },{ type: 'email', message: '请输入正确的邮箱', trigger: ['blur', 'change'] }],
        contactTel: [{ required: true, validator: validPhone, trigger: "blur" }],
        processingResults: [{ required: true, message: '处理结果不能为空', trigger: 'blur' }],
        processingTime: [{ required: true, message: '处理时间不能为空', trigger: 'blur' }],
        complaintClassification: [{ required: true, message: '投诉分类不能为空', trigger: 'blur' }],
      },
      fileList: [],
      uploadHeaders: {
        'X-Token': getToken()
      },
    }
  },
  created() {
    // 参数传递 router.push({ path: 'register', query: { plan: 'private' }})
    // 参数接受 let id = this.$route.query.jId
    let id = this.$route.query.id
    this.detailForm.complaintId = id
    if (id) {
      this.getMessageById(id)
    }
    //加载字典
    this.beforeLoading();
  },
  methods: {
    beforeLoading() {
      getDictDataLists("97001017").then(response => {
        this.businessOptions = response.data.jq97001017;
      });
    },
    //系统消息查询
    getMessageById(id) {
      var id = id;
      selectComplainInfoById(id).then(response => {
        this.formQuery = response.data[0]
      })
    },
    // 文件上传相关方法
    handleUpload(file) {
      if(file!=''){
        this.formData.append('file', file)
      }
      return false
    },
    handlePreview(file) {
      console.log(file);
    },
    // 文件上传相关方法end
    saveComplainProcessing() {
       this.$refs['detailForm'].validate(valid => {
        if (!valid) {
          this.$message({
            type: 'failure',
            message: '请按照要求填写相关内容 !'
          })
          return false
        }
      const dataDetail = this.detailForm
      for (const key in dataDetail) {
        this.formData.append(key, dataDetail[key])
      }
      // this.formData.append('entity',this.detailForm)

      this.$refs.upload.submit(); // 附件文件上传
      saveComplainProcessing(this.formData).then(response => {
        if(response.status == 200){
        this.$message({
          type: 'success',
          message: '处理成功'
        })
        this.$router.push({
             path: "/complaint-manage/complaint-query",query: {}
            });
        }
        // this.detailForm.complaintId = response.data.id
      })
      })
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../~@/styles/hxxd.scss';
</style>
