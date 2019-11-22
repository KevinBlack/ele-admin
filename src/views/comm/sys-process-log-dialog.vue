<template>
  <div class="detailsContainer">
    <el-table ref="multipleTable" :data="tableData" border style="width: 100%;" size="mini">
      <el-table-column prop="dataId" label="数据主键" align="center" width="80"></el-table-column>
      <el-table-column prop="dataCode" label="数据编号" align="center" width="300" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="statusFrom" label="状态从" align="center" width="100"></el-table-column>
      <el-table-column prop="statusTo" label="状态到" align="center" width="100"></el-table-column>
      <el-table-column prop="operator" label="操作人" align="center" width="120"></el-table-column>
      <el-table-column prop="operateTime" label="操作时间" align="center" width="180"></el-table-column>
      <el-table-column prop="statusField" label="状态字段" align="center" width="80"></el-table-column>
      <el-table-column prop="system" label="归属系统" align="center"></el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" icon="el-icon-check" size="mini" @click="handleClose('ok')">确定</el-button>
      <el-button type="primary" icon="el-icon-close" size="mini" @click="handleClose('close')">关闭</el-button>
    </div>
  </div>
</template>

<script>
// 引入相应的加载数据的程序
import { listProcessLog } from "@/api/system/comm/comm";

export default {
  name: "SysProcessLogDialog",
  props: {
    // 传入对象，使用时和使用data对象里面的参数一样
    isShow: {
      type: [Boolean],
      required: true
    },
    tableName: {
      type: [String],
      required: false,
      default: ""
    },
    dataId: {
      type: [Number],
      required: false,
      default: ""
    },
    dataCode: {
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
    getTableList() {
      if (this.tableName && (this.dataId || this.dataCode)) {
        listProcessLog(this.system, this.tableName, this.dataId, this.dataCode).then(
          response => {
            this.tableData = response.data;
            this.tableLoading = false;
          }
        );
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
