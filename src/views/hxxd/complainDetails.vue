<template>

   <el-card class="detailsContainer">
    <el-row>
      <!-- 系统消息录入 -->
      <el-row :gutter="10">
        <el-col :span="24">
          <h5 class="dtl-title-line">投诉内容详情</h5>
        </el-col>
      </el-row>
      <el-form ref="formQuery" :model="formQuery" label-width="100px" size="mini" >
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
      <el-row :gutter="10">
        <el-col :span="24">
          <h5 class="dtl-title-line">投诉处理详情</h5>
        </el-col>
      </el-row>
      <el-form v-if="personShow" ref="formQuery" :model="formQuery" label-width="100px" size="mini" >
        <el-row :gutter="22">
            <el-col :span="11">
              <el-form-item label="处理人" size="mini" prop="handlePerson">
                <el-input v-model="formQuery.handlePerson" :readonly="true" style="width:100%">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="处理时间" size="mini" prop="processingTime">
                <el-input v-model="formQuery.processingTime" :readonly="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="手机号" size="mini" prop="contactTel">
                <el-input v-model.number="formQuery.contactTel" :readonly="true" size="mini"/>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="联系邮箱" size="mini" prop="contactMail">
                <el-input v-model.number="formQuery.contactMail" :readonly="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="22">
              <el-form-item label="处理结果" size="mini" prop="processingResults">
                <el-input type="textarea"  v-model="formQuery.processingResults" :readonly="true"  :rows="4"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="附件">
              <el-button :key="index" v-for="(item, index) in formQuery.fileList" type="text" @click="fileClick(item.fileCatalog,item.belongId,item.fileName)">{{ item.fileName }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row :gutter="10">
        <el-col :span="24">
          <h5 class="dtl-title-line">复审详情</h5>
        </el-col>
      </el-row>
      <el-form v-if="isShow" ref="formQuery" :model="formQuery" label-width="100px" size="mini" >
        <el-row :gutter="20">
            <el-col :span="4">&nbsp;</el-col>
          <el-col :span="16">
            <el-row>
              <el-col>
                <el-form-item label="审核状态" prop="examineStatus">
                  <el-input  v-model="formQuery.examineStatus" :readonly="true" style="width:100%"/>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="审核描述" prop="complaintsContents">
                  <el-input type="textarea" :rows="4" v-model="formQuery.auditReason" :readonly="true" />
                </el-form-item>
              </el-col>
        </el-row>
        </el-col>
        </el-row>
      </el-form>
    </el-row>
  </el-card>
</template>

<script>
import { selectComplainInfoAndProcessingById } from "@/api/hxxd/complaintInfo";
import { downloadTemplate } from '@/api/hxxd/financialManage'
export default {
  data() {
    return {
      formQuery: {
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
        fileList: [],
        examineStatus: "",
        auditReason: ""
      },
      isShow: true,
      personShow: true,
      // downloadQuery: {
      //   fileCatalog: '',
      //   belongId: ''
      // },
       statusOptions: [
        {
          value: 0,
          label: "未处理"
        },
        {
          value: 1,
          label: "已处理"
        }
      ],
       examineStatus: [
        {
          value: '20',
          label: "待审核"
        },
        {
          value: '25',
          label: "驳回"
        },
        {
          value: '30',
          label: "审核通过"
        }
      ]
    }
  },
  created(){
    let id = this.$route.query.id
    if (id) {
      this.getMessageById(id)
    }
  },
  methods: {
    //系统消息查询
    getMessageById(id) {
      var id = id;
      selectComplainInfoAndProcessingById(id).then(response => {
        this.formQuery = response.data
        if(response.data.examineStatus === "30"){
          this.formQuery.examineStatus= "审核通过"
        } else if(response.data.examineStatus === "15"){
          this.formQuery.examineStatus= "驳回"
        }
        if (this.formQuery.auditReason === null) {
          this.isShow = false
        } else {
          this.isShow = true
        }
        if (this.formQuery.handlePerson  === null) {
          this.personShow = false
        } else {
          this.personShow = true
        }
      })
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
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
  }
};
</script>
<style>
@import '~@/styles/hxxd.scss';
</style>
