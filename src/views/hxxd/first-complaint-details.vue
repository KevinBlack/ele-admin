<template>
  <div class="app-wrapper">
    <header-reload />
    <div class="contont-main" v-bind:style="{minHeight: Height+'px'}">
      <el-card class="detailsContainer">
        <!-- 系统消息录入 -->
        <el-row :gutter="10">
          <el-col :span="24">
            <h5 class="dtl-title-line">投诉内容详情</h5>
          </el-col>
        </el-row>
        <el-form ref="formQuery" style="margin: 25px;" :model="formQuery" label-width="100px" size="mini">
          <el-row :gutter="22">
            <el-col :span="22">
              <el-form-item label="投诉主题" size="mini" prop="complaintTheme">
                <el-input v-model="formQuery.complaintTheme" :readonly="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="投诉单位" size="mini" :readonly="true" prop="complaintName">
                <el-input v-model="formQuery.complaintName" :readonly="true" style="width:100%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="投诉日期" size="mini" :readonly="true" prop="complaintDate">
                <el-input v-model="formQuery.complaintDate" :readonly="true" style="width:100%"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="22">
              <el-form-item label="投诉内容" size="mini" prop="complaintsContents">
                <el-input
                  type="textarea"
                  v-model="formQuery.complaintsContents"
                  :readonly="true"
                  :rows="4"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="处理时间" size="mini" prop="processingTime">
                <el-input v-model="formQuery.processingTime" :readonly="true" size="mini" />
              </el-form-item>
            </el-col>
            <el-col :span="22">
              <el-form-item label="处理结果" size="mini" prop="processingResults">
                <el-input
                  type="textarea"
                  v-model="formQuery.processingResults"
                  :readonly="true"
                  :rows="4"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>
    <footer-reload />
  </div>
</template>

<script>
import HeaderReload from "@/components/HeaderReload";
import FooterReload from "@/components/FooterReload";
import { selectComplainInfoAndProcessingById } from "@/api/hxxd/complaintInfo";
import { downloadTemplate } from "@/api/hxxd/financialManage";
export default {
  name: "qwe",
  components: { FooterReload, HeaderReload },
  data() {
    return {
      formQuery: {
        complaintDate: "",
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
        auditReason: "",
        createPerson: "",
        createTime: ""
      },
      queryList: [],
      newsbody: "",
      Height: 0,
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
          value: "20",
          label: "待审核"
        },
        {
          value: "25",
          label: "驳回"
        },
        {
          value: "30",
          label: "审核通过"
        }
      ]
    };
  },
  created() {
    let id = this.$route.query.id;
    console.log("1aid==" + id);
    if (id) {
      this.getMessageById(id);
    }
  },
  mounted() {
    this.Height = document.documentElement.clientHeight - 194; //监听浏览器窗口变化
    window.onresize = () => {
      this.Height = document.documentElement.clientHeight - 194;
    };
  },
  methods: {
    getMessageById(id) {
      var id = id;
      selectComplainInfoAndProcessingById(id).then(response => {
        this.formQuery = response.data;
        if (response.data.examineStatus === "30") {
          this.formQuery.examineStatus = "审核通过";
        } else if (response.data.examineStatus === "15") {
          this.formQuery.examineStatus = "驳回";
        }
        if (this.formQuery.auditReason === null) {
          this.isShow = false;
        } else {
          this.isShow = true;
        }
        if (this.formQuery.handlePerson === null) {
          this.personShow = false;
        } else {
          this.personShow = true;
        }
      });
    },
     fileClick(fileCatalog, belongId, fileName) {
      downloadTemplate(belongId, fileCatalog).then(response => {
        console.log("fileCatalog==" + fileCatalog);
        var contentDisposition = response.headers["content-disposition"]; //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
        var patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
        var result = patt.exec(contentDisposition);
        var fileName = decodeURIComponent(result[1]).trim();
        const blob = new Blob([response.data]);
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          console.log(elink.href);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/register.scss";
@import "~@/styles/hxxd.scss";
</style>
