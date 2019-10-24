<template>
  <el-card class="tsfDlg">
    <div class="app-container">
      <!-- 附件上傳彈框 -->
      <el-form ref="newform" :model="newform" :rules="rules">
        <el-form-item prop="expName" label="">
          <el-input v-model="newform.expName" placeholder="" style="width:75%">
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="expvmFiles">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="/sys/jqSysFile/fileUpload"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-change="uploadFileChange"
            :file-list="fileList"
            :auto-upload="false"
            :headers="uploadHeaders"
            :data="uploadData"
            :multiple="true"
            drag
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="downloadFile">文件下載按鈕</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>

<script>
import { downloadFile, uploadFile } from "@/api/system/comm/comm";
import { getToken } from "@/utils/auth";

export default {
  name: "MoDialog",
  data() {
    return {
      rules: {},
      uploadForm: new FormData(),
      uploadHeaders: {
        "X-Token": getToken()
      },
      uploadData: {
        id: 22
      },
      newform: {
        expName: ''
      },
      fileList: []
    };
  },
  methods: {
    uploadFileChange(file) {
      console.log(file)
      this.uploadForm.append('file', file)
      return false
    },
    // uploadFileChange(file, fileList) {
    //   var _this = this;
    //   if (file.raw) {
    //     let reader = new FileReader();
    //     reader.onload = function(e) {
    //       _this.contentHtml = e.target.result;
    //     };
    //     reader.readAsText(file.raw, "gb2312");
    //   }
    //   console.log(file, fileList);
    // },
    downloadFile() {
      downloadFile({ id: 1 }).then(response => {
        console.log(response.headers)
        var contentDisposition = response.headers["content-disposition"]; //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
        var patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*")
        var result = patt.exec(contentDisposition)
        console.log(contentDisposition)
        var fileName=decodeURIComponent(result[1]).trim()
        // var fileName="20190906~航协系统项目开发蓝图.xlsx"
        console.log(fileName);
        const blob = new Blob([response.data])
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a")
          elink.download = fileName
          elink.style.display = "none"
          elink.href = URL.createObjectURL(blob)
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
    submitUpload() {
      this.$refs['newform'].validate((valid) => {
        if (valid) {
          this.uploadForm.append('expName', this.newform.expName)
          console.log(this.uploadForm)
          uploadFile(this.uploadForm).then(res => {
            if (res.code === 404) {
              this.$message.error(res.error)
            } else if (res.code === 200) {
              this.$message.success('上传成功！')
            }
          })
          this.$refs.upload.submit()
          this.newform.expName = ''
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    }
  }
}
</script>
<style scoped>
</style>
