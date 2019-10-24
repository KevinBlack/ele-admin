<template>
<el-card>
  <el-form ref="newform">
    <el-form-item>
      <el-upload
        class="upload-demo"
        ref="upload"
        action="/sys/jqSysFile/fileUpload"
        :before-upload="fileList"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :headers="multipart/form-data"
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
import { uploadFile } from "@/api/system/comm/comm";
export default {
  data() {
    return {
      fileList: [],
      uploadForm: new FormData()
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    beforeupload() {
      this.uploadForm.append('file', file)
      // return false
    },
    submitUpload() {
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      uploadFile(this.fileList, config).then(res => {
        this.$message.success('上传成功！')
      }).catch(error => {
        console.log(error);
      });
      // this.$refs.upload.submit()
    }
  }
}
</script>

<style>

</style>
