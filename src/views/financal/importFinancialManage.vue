<template>
    <!-- part1 -->
 <el-card class="tsfDlg">
    <div class="app-container">
      <div class="filter-container">
        <el-form :inline="true" label-width="80px">
            <el-upload
            class="upload-demo"
            ref="upload"
            action="/hxxd/hx-xd-financial-manage/importFile"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
            :headers="uploadHeaders"
            :data="uploadData"
            :multiple="true"
          >
          <el-button slot="trigger" icon="el-icon-upload" size="small" type="primary">收款文件选取</el-button>
          <el-button style="margin-left: 10px;" size="small" type="primary" icon="el-icon-check" @click="submitUpload">收款导入确认</el-button>
          <el-button type="primary" icon="el-icon-delete" size="mini" @click="deleteFinancialData">删除</el-button>
          <el-button type="primary" icon="el-icon-s-custom" size="mini" @click="receiptConfirm">收款确认</el-button>
          <el-button type="primary" icon="el-icon-download" size="mini" @click="downloadTemplate">模板下载</el-button>
          </el-upload>
        </el-form>
      </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      tooltip-effect="dark"
      style="width: 100%;"
      :header-cell-style="{
            'background-color': '#fafafa'
        }"
      @selection-change="selectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        prop="tradeTime"
        label="交易日期"
        width="55"
      />
      <el-table-column
        prop="tradePipelineNum"
        label="交易流水号"
      />
      <el-table-column
        prop="tradeMoney"
        label="交易金额"
      />
      <el-table-column
        prop="abstractContent"
        label="摘要"
      />
      <el-table-column
        prop="oppositeAccount"
        label="对方账号"
      />
      <el-table-column
        prop="oppositeAccountName"
        label="对方账户名称"
      />
      <el-table-column
        prop="openingBank"
        label="对方开户行"
      />
      <el-table-column
        prop="paymentAccount"
        label="收款账户"
      />
      <el-table-column
        prop="status"
        :formatter="statusFmt"
        label="记录状态"
      />
      
    </el-table>
    </div>
    <!-- 表格区2end -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="this.pageNo"
              :page-size.sync="this.pageSize"
              :page-sizes="[15, 30, 50, 100]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageTotal"
            ></el-pagination>
  </el-card>
</template>
<script>
import { selectFinancialManageByParam,importFile,downloadTemplate,financialDataConfirm,deleteFinancialData} from "@/api/hxxd/financialManage";
import { parseTime } from "@/utils/index.js";
import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
      show: false,
      treeData: [],
      treeDefaultProps: {
        children: "childs",
        label: function(data, node) {
          return data.complainant;
        }
      },
      pageNo: 1,
      pageSize: 15,
      pageTotal: 0,
      tableLoading: false,
      tableData: [],
      tableMultiSelection: [],
      //文件上传
      fileList: [],
      uploadHeaders: {
        "X-Token": getToken()
      }
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    selectionChange(val) {
      this.tableMultiSelection = val
    },
      getTableList() {
      this.tableLoading = true;
      selectFinancialManageByParam().then(response => {
        this.tableData = response.data;
        this.pageTotal = response.page.total;
        this.tableLoading = false;
      });
    },
    //文件上传相关方法
    submitUpload() {
      this.$refs.upload.submit();
    },
    statusFmt(row, column, cellValue, index) {
      const status = row.status
      if (status === 0) {
        return '未确认'
      } else if (status === 1) {
        return '已确认'
      } else {
        return row.status
      }
    },
     deleteFinancialData() {
      if (!this.tableMultiSelection) {
        this.$message({
          type: 'info',
          message: '请选中要删除的数据!'
        })
        return
      }
      const selectRows = this.tableMultiSelection
      if (selectRows.length === 0) {
        this.$message({
          type: 'info',
          message: '请选中要删除的数据!'
        })
        return
      }
      this.$confirm('是否执行删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var ids = []
          Object.keys(selectRows).forEach(function(key) {
            if (selectRows[key].id) {
              ids.push(selectRows[key].id)
            }
          })
          if (ids && ids.length > 0) {
            var financialIds = ids.join()
            deleteFinancialData(financialIds).then(response => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getTableList()
            })
          }
        })
        .catch(() => {
          // 取消时执行此处
        })
    },
    downloadTemplate(){
      downloadTemplate().then(response => {})
      },
     receiptConfirm() {
      if (!this.tableMultiSelection) {
        this.$message({
          type: 'info',
          message: '请选中要进行确认的数据!'
        })
        return
      }
      const selectRows = this.tableMultiSelection
      if (selectRows.length === 0) {
        this.$message({
          type: 'info',
          message: '请选中要进行确认的数据!'
        })
        return
      }
      this.$confirm('是否执行确认操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var ids = []
          Object.keys(selectRows).forEach(function(key) {
           if (selectRows[key].id) {
              ids.push(selectRows[key].id)
            }
          })
          if (ids && ids.length > 0) {
            var financialIds = ids.join()
            financialDataConfirm(financialIds).then(response => {
              console.log(response)
              this.$message({
                type: 'success',
                message: response.message
              })
              this.getTableList()
            })
          }
        })
        .catch(() => {
          // 取消时执行此处
        })
    }
  }
}
</script>

<style scoped>
*{
  font-weight: normal;
}
.detailsContainer {
  margin: 0 10px;
}
.dtl-title-line {
  display: inline-block;
  border-left: 5px solid #409EFF;
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
.tsfDlg{
  margin: 0 10px;
}
.el-table__body tr > th:nth-last-child(1) {
    border-right: none;
}
</style>
