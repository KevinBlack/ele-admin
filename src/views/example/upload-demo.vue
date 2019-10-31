<template>
<el-card>
  <el-form ref="uploadForm">
    <el-form-item>
      <el-upload
        class="upload-demo"
        action=""
        :before-upload="beforeupload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :on-change="handleChange"
        multiple
        :auto-upload="false"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
    <el-form-item style="text-align:center">
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
    </el-form-item>
  </el-form>
</el-card>
</template>

<script>
import { uploadFile } from "@/api/system/comm/comm"
import qs from 'qs'

export default {
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    handleRemove(file, fileList) {
      // console.log(file, fileList)
    },
    handlePreview(file) {
      // console.log(file)
    },
    handleChange(file) {
      this.fileList.push(file.raw)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`)
    },
    beforeupload(file) {
    },
    submitUpload() {
      let formData = new FormData()
      formData.append('filelist', this.fileList)
      // console.log(this.fileList)
      uploadFile(formData).then(res => {
        this.$message.success('上传成功！')
      }).catch(error => {
        console.log(error);
      });
    }
  }
}
</script>

<style>

</style>
