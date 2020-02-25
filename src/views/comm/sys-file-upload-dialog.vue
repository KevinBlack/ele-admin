<template>
  <div class="detailsContainer">
    <!-- 附件上传表单 -->
    <el-form label-width="80px" size="mini">
      <el-row :gutter="20" class="area_border">
        <el-col :span="24">
          <el-button style="margin:10px" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        </el-col>
        <el-col :span="24">
          <el-upload
            ref="upload"
            class="upload-demo"
            style="margin:10px"
            drag
            action="/zuul/system/anonw/jqSysAttachment/fileUpload"
            multiple
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-upload="handleBeforeUpload"
            :before-remove="beforeRemove"
            :on-exceed="handleExceed"
            :on-success="handleSuccess"
            :on-error="handleError"
            :file-list="fileList"
            :auto-upload="false"
            :headers="uploadHeaders"
            :data="data"
            :limit="limit"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div
              class="el-upload__tip"
              slot="tip"
            >只能上传.bmp,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx,.pdf,.zip,.rar,.7z，且不超过10M</div>
          </el-upload>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" icon="el-icon-check" size="mini" @click="handleClose('ok')">确定</el-button>
      <el-button type="primary" icon="el-icon-close" size="mini" @click="handleClose('close')">关闭</el-button>
    </div>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
import { elementInArray } from "@/utils/index.js";
import { deleteFile, listFile, getValidateCode } from "@/api/system/comm/comm";

export default {
  name: "SysFileUploadDialog",
  props: {
    // 传入对象，使用时和使用data对象里面的参数一样
    isShow: {
      type: [Boolean],
      required: true
    },
    limit: {
      type: [Number],
      required: false,
      default: 5
    }
  },
  created() {
    this.initForm();
  },
  watch: {
    isShow: function(val, oldVal) {
      if (this.isShow) {
        this.initForm();
      }
    }
  },
  data() {
    return {
      uploadHeaders: {
        "X-Token": getToken()
      },
      //文件列表
      fileList: [],
      key: "",
      data: {}
    };
  },
  methods: {
    //重新加载表格数据
    async initForm() {
      this.fileList = new Array();
    },
    submitUpload() {
      getValidateCode("file").then(response => {
        if (response.data) {
          var validateCode = response.data.validateCode;
          if (!validateCode) {
            this.$message({
              type: "error",
              message: "获取验证码失败!"
            });
            return;
          }
          this.key = this.$encruption(validateCode);
          this.data.key = this.key;
          this.$refs.upload.submit();
        }
      });
    },
    async handleClose(command) {
      //获取id集合
      var idArr = new Array();
      var fileList = this.fileList;
      if (!fileList || fileList.length == 0) {
        if (command === "ok") {
          this.$message({
            type: "info",
            message: "请上传文件!"
          });
          return;
        }
      }
      Object.keys(fileList).forEach(function(key) {
        if (fileList[key].uid) {
          idArr.push(fileList[key].uid);
        }
      });
      var ids = idArr.join(",");
      var fileVoList = new Array();
      if (command === "ok") {
        await getValidateCode("").then(response => {
          if (response.data) {
            var validateCode = response.data.validateCode;
            if (!validateCode) {
              this.$message({
                type: "error",
                message: "获取验证码失败!"
              });
              return;
            }
            this.key = this.$encruption(validateCode);
            this.data.key = this.key;
          }
        });
        //加载文件
        await listFile(ids, this.key).then(response => {
          if (response.data) {
            console.log("response.data", response.data);
            fileVoList = fileVoList.concat(response.data);
          }
        });
      } else {
        if (ids && ids.length > 0) {
          await getValidateCode("").then(response => {
            if (response.data) {
              var validateCode = response.data.validateCode;
              if (!validateCode) {
                this.$message({
                  type: "error",
                  message: "获取验证码失败!"
                });
                return;
              }
              this.key = this.$encruption(validateCode);
              this.data.key = this.key;
            }
          });

          //删除文件
          await deleteFile(ids, this.key).then(response => {
            //删除成功删除失败此处不做处理
            fileVoList = new Array();
          });
        }
      }
      console.log(fileVoList);
      //此处回调函数省略
      this.$emit("closeDalog", command, fileVoList);
    },
    //文件删除时触发
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    //文件预览时触发
    handlePreview(file) {},
    //文件超出限制时
    handleExceed(files, fileList) {
      this.$message.info(
        `当前限制选择 ${this.limit} 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    //上传之前获取验证码
    async handleBeforeUpload(file) {
      // var fileTypeList = [
      //   "image/jpeg",
      //   "image/png",
      //   "application/msword",
      //   "text/plain",
      //   "application/pdf",
      //   "application/x-zip-compressed",
      //   "application/vnd.ms-excel",
      //   "aplication/zip",
      //   "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      //   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      // ];
      // const legalFileType = fileTypeList.indexOf(file.type) > 0;
      // const legalFileSize = file.size / 1024 / 1024 < 3;
      // if (!legalFileType) {
      //   this.$message.error("上传附件格式不支持!");
      // }
      // if (!legalFileSize) {
      //   this.$message.error("上传附件大小不能超过 3MB!");
      // }
    },
    //文件移除前触发
    async beforeRemove(file, fileList) {
      var result = true;
      if (file != null && file.uid) {
        getValidateCode("").then(response => {
          if (response.data) {
            var validateCode = response.data.validateCode;
            if (!validateCode) {
              this.$message({
                type: "error",
                message: "获取验证码失败!"
              });
              return;
            }
            this.key = this.$encruption(validateCode);
            this.data.key = this.key;
            // 删除操作
            deleteFile(file.uid, this.key).then(response => {
              var success = response.data.success;
              if (!success) {
                result = false;
                this.$message({
                  type: "error",
                  message: "删除文件失败!"
                });
              }
            });
          }
        });
      }
      return result;
    },
    //文件上传成功
    async handleSuccess(response, file, fileList) {
      if (response.data) {
        var id = response.data.id;
        if (id) {
          //设置文件的uid
          file.uid = id;
        }
        this.fileList = fileList;
      }
    },
    //文件上传失败
    handleError(err, file, fileList) {}
  }
};
</script>

<style lang="scss" scoped>
* {
  font-weight: normal;
}
.detailsContainer {
  margin: 0 10px;

  .dtl-title-line {
    display: inline-block;
    border-left: 5px solid #409eff;
    padding-left: 5px;
  }
  .el-table__fixed-right::before {
    background-color: none;
  }
  .dtl-info-line {
    height: 40px;
    line-height: 40px;
    margin: 10px auto;
    border-radius: 3px;
    font-size: 12px;
    box-sizing: border-box;
    padding-left: 10px;
    color: #000;
    background-color: #dcecfd;
  }
  .el-table > th {
    background-color: #eee !important;
  }
  .area_border,
  .area_bordes {
    box-sizing: border-box;
    border: 1px solid #e6e6e6;
    margin-left: 0 !important;
    margin-right: 0 !important;
    padding: 10px 0 0 0;
    margin-bottom: 20px;
    overflow: hidden;
  }
  .area_bordes {
    padding: 10px;
    margin-top: 15px;
  }
  /* 标题下线和 保存取消上部线 样式 */
  .dialog-footer {
    border-top: 1px solid #e6e6e6;
    margin-top: 30px;
    padding-top: 10px;
    text-align: right;
  }
  .el-upload-dragger {
    background-color: #fff;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 500px !important;
    height: 180px;
    text-align: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
}
</style>
