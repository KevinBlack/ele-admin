<template>
  <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :before-close="handleBeforeClose" width="60%">
    <!-- 附件上傳彈框 -->
    <el-form ref="newform">
      <el-form-item label="上传类型">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模板下载">
        <a href="#" @click="downloadFile">www.baidu.com</a>
      </el-form-item>
      <el-form-item label="附件选择" prop="expvmFiles">
        <el-upload
          class="upload-demo"
          action=""
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-change="handleChange"
          multiple
          :auto-upload="false"
          :file-list="fileList"
        >
          <el-button type="primary" size="small">选择</el-button>
        </el-upload>
      </el-form-item>
      <el-button type="primary" size="small" @click="submitUpload">确定</el-button>
      <el-button type="primary" size="small" @click="handleCancel">取消</el-button>
    </el-form>
  </el-dialog>
</template>

<script>
import { downloadFile, uploadFile } from "@/api/system/comm/comm";
import { getToken } from "@/utils/auth";

export default {
  name: "MoDialog",
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    showTitle: {
      type: String,
      default: '上传'
    }
  },
  data() {
    return {
      dialogTitle: this.showTitle,
      dialogVisible: this.visible,
      uploadForm: new FormData(),
      uploadHeaders: {
        "X-Token": getToken()
      },
      uploadData: {
        id: 22
      },
      fileList: [],
      options: [{
        value: '选项1',
        label: 'excel'
      }],
      value: ''
    };
  },
  methods: {
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
      let formData = new FormData()
      formData.append('filelist', this.fileList)
      uploadFile(formData).then(res => {
        this.$message.success('上传成功！')
        handleBeforeClose()
      }).catch(error => {
        console.log(error);
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleChange(file) {
      this.fileList.push(file.raw)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`)
    },
    handleBeforeClose() {
      this.$confirm('确认关闭？')
          .then(_ => {
            this.$emit('close', false)
            this.dialogVisible = false
          })
          .catch(_ => {})
    },
    handleCancel() {
      this.$emit('close', false)
      this.dialogVisible = false
    }
  }
}
</script>
<style scoped>
</style>
