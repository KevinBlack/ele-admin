<template>
  <div class="detailsContainer">
    <el-table ref="multipleTable" :data="tableData" border style="width: 100%;" size="mini">
      <el-table-column prop="fileName" label="文件名" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column
        prop="fileSize"
        label="文件大小"
        align="center"
        width="100"
        :formatter="fileSizeFmt"
      ></el-table-column>
      <el-table-column prop="createTime" label="上传时间" align="center" width="180"></el-table-column>
      <el-table-column label="下载" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="text" @click="downloadFile(scope.row.id)">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" icon="el-icon-check" size="mini" @click="handleClose('ok')">确定</el-button>
      <el-button type="primary" icon="el-icon-close" size="mini" @click="handleClose('close')">关闭</el-button>
    </div>
  </div>
</template>

<script>
// 引入相应的加载数据的程序
import {
  listFile,
  downloadFile,
  getValidateCode
} from "@/api/system/comm/comm";

export default {
  name: "SysFileUploadListDialog",
  props: {
    // 传入对象，使用时和使用data对象里面的参数一样
    isShow: {
      type: [Boolean],
      required: true
    },
    ids: {
      type: [String],
      required: false,
      default: ""
    }
  },
  created() {
    this.getTableList();
  },
  watch: {
    isShow: function(val, oldVal) {
      if (this.isShow) {
        this.getTableList();
      }
    }
  },
  data() {
    return {
      tableLoading: true,
      tableData: [],
      multipleSelection: []
    };
  },
  methods: {
    // 查询函数
    mainFormSearch() {
      this.getTableList();
    },
    //重新加载表格数据
    async getTableList() {
      if (this.ids) {
        var validateCode;
        await getValidateCode("").then(response => {
          if (response.data) {
            validateCode = response.data.validateCode;
          }
        });
        if (!validateCode) {
          this.$message({
            type: "error",
            message: "获取验证码失败!"
          });
          return;
        }
        validateCode = this.$encruption(validateCode);
        //加载文件
        await listFile(this.ids, validateCode).then(response => {
          if (response.data) {
            this.tableData = response.data;
            this.tableLoading = false;
          }
        });
      }
    },
    //分页改变触发
    handlePageSizeChange(val) {
      this.getTableList();
    },
    //页码改变触发
    handlePageNoChange(val) {
      this.getTableList();
    },
    handleClose(command) {
      //此处回调函数省略
      this.$emit("closeDalog");
    },
    fileSizeFmt(row, column, cellValue, index) {
      let fileSize = row.fileSize.trim();
      if (fileSize == 0) {
        return "0 B";
      }
      var k = 1024;
      var sizes = ["B", "K", "M", "G", "T"];
      var i = Math.floor(Math.log(fileSize) / Math.log(k));
      return (fileSize / Math.pow(k, i)).toPrecision(3) + "" + sizes[i];
    },
    async downloadFile(id) {
      //获取验证码
      var key;
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
          key = this.$encruption(validateCode);
        }
      });
      await downloadFile(id, key).then(response => {
        console.log(response.headers);
        var contentDisposition = response.headers["content-disposition"];
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

<style scoped>
* {
  font-weight: normal;
}
.detailsContainer {
  margin: 0 10px;
}
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
</style>
