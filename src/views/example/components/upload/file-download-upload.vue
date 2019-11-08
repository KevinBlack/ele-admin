<template>
  <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :before-close="handleBeforeClose" width="60%" class="pop-upload-download">
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
          ref="upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-upload="handleUpload"
          multiple
          :auto-upload="false"
        >
          <el-button type="primary" size="small">选择</el-button>
        </el-upload>
      </el-form-item>
      <div class="result-submit" v-html="logMsg"></div>
      <div class="btn-group-submit">
        <el-button type="primary" size="small" @click="submitUpload">确定</el-button>
        <el-button type="primary" size="small" @click="handleCancel">取消</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import { downloadFile, uploadExcle, selectLog} from "@/api/system/comm/comm";
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
      logMsg: '',
      dialogTitle: this.showTitle,
      dialogVisible: this.visible,
      uploadHeaders: {
        "X-Token": getToken()
      },
      uploadData: {
        id: 22
      },
      options: [{
        value: '选项1',
        label: 'excel'
      }],
      value: '',
      formData: new FormData()
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
      this.$refs.upload.submit();
      this.formData.append('key','222')
      uploadExcle(this.formData).then(res => {

      }).catch(error => {
        console.log(error);
      })
      this.handleCheckLog()
    },
    //日志查询方法
    handleCheckLog() {
      const selectData = new FormData
      selectData.append('key', '222')
      setInterval(() => {
        selectLog(selectData).then(res => {
          const resData = res.data
          console.log(resData)
          for(var i in resData){
            if (resData[i].code === 'OWN_SUCCESS') {
              this.logMsg += `<li>${ resData[i].msg }</li>`
            } else if (resData[i].code === 'OWN_FAIL') {
              this.logMsg += `<li>${ resData[i].msg }</li>`
            } else if (resData[i].code === 'ALL_SUCCESS') {
              handleBeforeClose()
              clearInterval(this.handleCheckLog)
            } else if (resData[i].code === 'ALL_FAIL') {
              handleBeforeClose()
              clearInterval(this.handleCheckLog)
            }
          }
        }).catch(error => {
          console.log(error);
        })
      }, 2000)
    },
    //文件上传方法
    handleUpload(file) {
      this.formData.append('file', file)
      return false
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
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
<style lang="scss" scoped>
.pop-upload-download {
  .upload-demo {
    width: 50%;
  }
  .result-submit {
    width: 90%;
    height: 200px;
    margin: 0 auto 20px;
    border: 1px solid #e6e6e6;
    overflow-y: auto;
  }
  .btn-group-submit {
    text-align: right;
  }
}
</style>
