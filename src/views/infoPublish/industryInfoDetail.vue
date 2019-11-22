<template>
  <div>
    <el-card class="box-card" style="margin: 0 10px;">
      <!-- part1 -->
      <el-row :gutter="10">
        <el-col :span="24">
          <h5 class="dtl-title-line">查看行业信息</h5>
        </el-col>
      </el-row>
      <el-form ref="detailForm" :model="detailForm" label-width="150px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属分组" prop="industryType">
              <el-input v-model="detailForm.industryType" style="width: 100%;" :readonly="true" placeholder="请选择" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="内容标题" prop="industryTitle">
              <el-input v-model="detailForm.industryTitle" :readonly="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="内容描述" prop="industryContent">
              <el-input v-model="detailForm.industryContent" :readonly="true" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发布时间" prop="publishTime">
              <el-input v-model="detailForm.publishTime" :readonly="true" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="内容">
              <el-input type="textarea" :disabled="true" class="indst_info_cont" :readonly="true" v-html="detailForm.industryBody"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="附件">
              <el-button :key="index" v-for="(item, index) in detailForm.fileList" type="text" @click="fileClick(item.fileCatalog,item.belongId,item.fileName)">{{ item.fileName }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { selectIndustry, updateIndustryInfo } from '@/api/hxxd/industryInfoPublish'
import { downloadTemplate } from '@/api/hxxd/financialManage'
export default {
  name: 'IndustryInfoDetail',
  data() {
    return {
      title: '更新行业信息发布',
      editorContent: '',
      detailForm: {
        id: '',
        industryTitle: '',
        industryContent: '',
        industryType: '',
        publishStatus: '',
        industryBody: '',
        publishTime: '',
        fileList: []
      },
      cascaderOpts: [],
      statusOptions: [{
          value: 1,
          label: "消代分会"
        },
        {
          value: 2,
          label: "航食分会"
        }
      ]
    };
  },
  created() {
    let id = this.$route.query.id
    this.title = '修改行业信息发布'
    this.getMenuInfo(id)
  },
  methods: {
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
    getMenuInfo(id) {
      this.detailForm.id = id
      selectIndustry(this.detailForm).then(response => {
        this.detailForm.industryContent = response.data[0].industryContent
        this.detailForm.industryType = response.data[0].industryType
        this.detailForm.industryBody = response.data[0].contentBody
        this.detailForm.industryTitle = response.data[0].industryTitle
        this.detailForm.publishTime = response.data[0].publishTime
        this.detailForm.fileList = response.data[0].fileList
      })
    },
    saveMenu() {
      // const {
      //   id,
      //   industryContent,
      //   industryType
      // } = this.detailForm
      updateIndustryInfo(this.detailForm).then(response => {
        var msg = response.status === 200 ? '保存成功' : '保存失败'
        if (response.status === 200) {
          this.$message({
            type: 'success',
            message: msg
          })
        } else {
          this.$message({
            type: 'success',
            error: msg
          })
        }
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
  @import '~@/styles/hxxd.scss';
  .indst_info_cont {
    border: 1px solid #e6e6e6;
    border-radius: 5px;
    padding: 0 10px;
  }
</style>
