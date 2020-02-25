<template>

   <el-card class="detailsContainer">
    <!-- part1-->
    <el-row :gutter="10">
        <el-col :span="24">
          <h5 class="dtl-title-line">投诉内容</h5>
        </el-col>
      </el-row>
      <el-form ref="dataQuery" label-width="100px"  size="mini" >
        <el-row :gutter="22">
           <el-col :span="22">
              <el-form-item label="投诉主题" size="mini" prop="complaintTheme">
                <el-input v-model="dataQuery.complaintTheme" :readonly="true" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="投诉单位" size="mini" :readonly="true" prop="complaintName">
                <el-input v-model="dataQuery.complaintName" :readonly="true" style="width:100%">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="投诉人" size="mini" prop="complainant">
                <el-input v-model="dataQuery.complainant" :readonly="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="手机号" size="mini" prop="contractInformation">
                <el-input v-model.number="dataQuery.contractInformation" :readonly="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="联系邮箱" size="mini" prop="contractEmail">
                <el-input v-model.number="dataQuery.contractEmail" :readonly="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="22">
              <el-form-item label="投诉内容" size="mini" prop="complaintsContents">
                <el-input type="textarea"  v-model="dataQuery.complaintsContents" :readonly="true"  :rows="4"></el-input>
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
       <el-form ref="dataQuery" :model="dataQuery" label-width="100px" size="mini" >
        <el-row :gutter="22">
            <el-col :span="11">
              <el-form-item label="处理人" size="mini" prop="handlePerson">
                <el-input v-model="dataQuery.handlePerson" :readonly="true" style="width:100%">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="处理时间" size="mini" prop="processingTime">
                <el-input v-model="dataQuery.processingTime" :readonly="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="手机号" size="mini" prop="contactTel">
                <el-input v-model.number="dataQuery.contactTel" :readonly="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="联系邮箱" size="mini" prop="contactMail">
                <el-input v-model.number="dataQuery.contactMail" :readonly="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="22">
              <el-form-item label="处理结果" size="mini" prop="processingResults">
                <el-input type="textarea"  v-model="dataQuery.processingResults" :readonly="true"  :rows="4"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="附件">
              <el-button :key="index" v-for="(item, index) in dataQuery.fileList" type="text" @click="fileClick(item.fileCatalog,item.belongId,item.fileName)">{{ item.fileName }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 系统消息录入 -->
    <el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <h5 class="dtl-title-line">投诉复审</h5>
        </el-col>
      </el-row>
      <el-form ref="formQuery" :model="formQuery" label-width="100px"  size="mini"  :rules="rules">
        <el-row :gutter="20">
          <el-col :span="4">&nbsp;</el-col>
          <el-col :span="16">
            <el-row>
              <el-col>
                <el-form-item label="审核状态" prop="examineStatus">
                  <el-select v-model="formQuery.examineStatus" filterable placeholder="请选择" size="mini" style="width:100%">
                    <el-option
                      v-for="item in statusOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="审核描述" prop="auditReason">
                  <el-input type="textarea" :rows="4" v-model="formQuery.auditReason" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4">&nbsp;</el-col>
          <el-col class="btn_bottom">
              <el-button type="primary" icon="el-icon-check" @click="saveComplainExamine">提 交</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
  </el-card>
</template>

<script>
import { examine ,selectComplainInfoAndProcessingById} from "@/api/hxxd/complaintInfo";
import { downloadTemplate } from '@/api/hxxd/financialManage'
export default {
  data() {
    return {
      formQuery: {
        id: "",
        examineStatus: "",
        auditReason: ""
      },
      dataQuery: {
        complaintTheme: "",
        complaintsContents: "",
        complainant: "",
        contractInformation: "",
        contractEmail: "",
        status: "",
        processingResults: "",
        handlePerson: "",
        processingTime: "",
        contactTel: "",
        contactMail: "",
        fileList: []
      },
      rules: {
        examineStatus: [{ required: true, message: '审核状态不能为空', trigger: 'blur' }],
        auditReason: [{ required: true, message: '审核描述不能为空', trigger: 'blur' }]
      },
       statusOptions: [
        {
          value: '30',
          label: "审核通过"
        },
        {
          value: '15',
          label: "驳回"
        }
      ]
    }
  },
  created(){
    this.formQuery.id = this.$route.query.id
     let id = this.$route.query.id
    this.formQuery.id = id
    if (id) {
      this.getMessageById(id)
    }
  },
  methods: {
    //系统消息查询
    getMessageById(id) {
      var id = id;
      selectComplainInfoAndProcessingById(id).then(response => {
        this.dataQuery = response.data
      })
    },
    fileClick(fileCatalog, belongId,fileName){
    downloadTemplate(belongId,fileCatalog).then(response => {
        console.log("fileCatalog=="+fileCatalog)
        var contentDisposition = response.headers["content-disposition"]; //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
        var patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*")
        var result = patt.exec(contentDisposition)
        var fileName = decodeURIComponent(result[1]).trim()
        const blob = new Blob([response.data])
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a")
          elink.download = fileName
          elink.style.display = "none"
          elink.href = URL.createObjectURL(blob)
          console.log(elink.href)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName)
        }
      })
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
      })
    },
    saveComplainExamine(){
      this.$refs['formQuery'].validate(valid => {
        if (!valid) {
          this.$message({
            type: 'failure',
            message: '请按照要求填写相关内容 !'
          })
          return false
        }
      examine(this.formQuery).then(response => {
        if(response.status === 200){
            this.$message({
              type: 'success',
              message: "复审成功"
             });
             this.$router.push({
             path: "/complaint-manage/complaint-query",query: {}
            });
        }else {
            this.$message({
              type: 'failure',
              message: "复审失败"
             });
        }
   
      })
       })
    }
  }
};
</script>
<style>
@import '~@/styles/hxxd.scss';
</style>
