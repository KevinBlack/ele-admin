<template>
  <div>
    <el-card class="box-card" style="margin: 0 10px;">
      <!-- part1 -->
      <el-row :gutter="10">
        <el-col :span="24">
          <h5 class="dtl-title-line">行业信息修改</h5>
        </el-col>
      </el-row>
      <el-form ref="detailForm" :model="detailForm" :rules="rules1" label-width="150px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属分组" prop="industryType">
              <el-select v-model="detailForm.industryType" style="width: 100%;" placeholder="请选择">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="内容标题" prop="industryTitle">
              <el-input v-model="detailForm.industryTitle" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="内容描述" prop="industryContent">
              <el-input v-model="detailForm.industryContent" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="内容添加" prop="industryBody">
              <rich-components :catchData="handlecatchData" :checkId="checkId"></rich-components>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="附件">
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
              <el-button :key="index" v-for="(item, index) in detailForm.fileList" type="text" @click="fileClick(item.fileCatalog,item.belongId,item.fileName)">{{ item.fileName }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col :span="24" class="btn_bottom">
          <div style="text-align: center;">
            <el-button type="primary" size="mini" @click="saveMenu">保存</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { selectIndustry, updateIndustryInfo } from '@/api/hxxd/industryInfoPublish'
import { downloadTemplate } from '@/api/hxxd/financialManage'
import RichComponents from './rich-components'
import { getToken } from "@/utils/auth";
export default {
  name: 'UpdateIndustryInfo',
  components: { RichComponents },
  data() {
    return {
      title: '更新行业信息发布',
      editorContent: '',
      content: '',
      checkId: '',
      detailForm: {
        id: '',
        industryContent: '',
        industryType: '',
        publishStatus: '',
        industryBody: '',
        modifyTime: '',
        industryTitle: '',
        fileList: []
      },
       fileList: [],
      uploadHeaders: {
        "X-Token": getToken()
      },
      formData: new FormData(),
      cascaderOpts: [],
      statusOptions: [{
          value: 1,
          label: "站内新闻"
        },
        {
          value: 2,
          label: "公示信息"
        },
        {
          value: 3,
          label: "最新动态"
        }
      ],
      rules1: {
        industryTitle: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        createTime: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    let id = this.$route.query.id
    this.checkId = this.$route.query.id
    this.title = "修改行业信息发布"
    this.getMenuInfo(id)
  },
  methods: {
    getMenuInfo(id) {
      this.detailForm.id = id
      selectIndustry(this.detailForm).then(response => {
        this.detailForm.industryContent = response.data[0].industryContent
        this.detailForm.industryType = response.data[0].industryType
        this.detailForm.industryTitle = response.data[0].industryTitle
        this.detailForm.fileList = response.data[0].fileList
        this.content = response.data[0].contentBody
        // console.log(this.content)
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
    // 文件上传相关方法
    handleUpload(file) {
      this.formData.append("file", file);
      return false;
    },
    handlePreview(file) {
    },
    handlecatchData:function (params) {
      this.editorContent = params
    },
    saveMenu() {
      // const {
      //   id,
      //   industryContent,
      //   industryTitle,
      //   industryType
      // } = this.detailForm
          // this.industryInfoParam.industryBody = this.editor.txt.html()
          this.detailForm.industryBody = this.editorContent;
          const dataDetail = this.detailForm;
          for (const key in dataDetail) {
            this.formData.append(key, dataDetail[key]);
          }
          this.$refs.upload.submit(); // 附件文件上传
      updateIndustryInfo(this.formData).then(response => {
        // this.$router.push({
        //   path: '/infoPublish/selectIndustryInfo',
        //   query: {}
        // })
        var msg = response.status === 200 ? '保存成功' : '保存失败'
        if (response.status === 200) {
          this.$message({
            type: 'success',
            message: msg
          })
          this.$router.push({ path: "/infoPublish/selectIndustryInfo",query: {} });
          this.getMenuInfo(this.checkId)
        } else {
          this.$message({
            type: 'success',
            error: msg
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
  @import '~@/styles/hxxd.scss';
</style>
