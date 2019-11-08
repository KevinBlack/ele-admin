<template>
<el-card class="detailsContainer">
  <!-- part1 -->
  <el-form ref="formQuery" :model="formQuery" label-width="100px">
    <el-row :gutter="20" class="area_bordes">
      <el-col :span="6">
        <el-form-item label="交易流水号" size="mini" prop="tradePipelineNum">
          <el-input v-model="formQuery.tradePipelineNum" size="mini"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="摘要" size="mini" prop="abstractContent">
          <el-input v-model="formQuery.abstractContent" size="mini"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="对方账号" size="mini" prop="oppositeAccount">
          <el-input v-model="formQuery.oppositeAccount" size="mini"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="对方账户名称" size="mini" prop="oppositeAccountName">
          <el-input v-model="formQuery.oppositeAccountName" size="mini"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="收款账户" size="mini" prop="paymentAccount">
          <el-select v-model="formQuery.paymentAccount" filterable placeholder="请选择" size="mini">
            <el-option
              v-for="item in accountOptions"
              :key="item.value"
              :label="item.label"
              style="width:100%"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="记录状态" size="mini" prop="status">
          <el-select v-model="formQuery.status" filterable placeholder="请选择" size="mini">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              style="width:100%"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
            <el-form-item label="交易日期" size="mini" prop="timeValue">
              <el-date-picker
                type="datetimerange"
                v-model="formQuery.timeValue"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width:100%"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
      </el-col>
      <el-col :span="24" style="text-align: center;margin: 15px 0 0">
        <el-form-item size="mini">
          <el-button type="primary" size="mini" @click="search">查询</el-button>
          <el-button size="mini" @click="resetForm('formQuery')">重置</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <!-- part2 -->
  <el-row class="area_bordes">
    <el-col :span="24">
      <el-form :inline="true" label-width="80px">
        <el-button type="primary" icon="el-icon-check" size="mini" @click="handleImport">收款导入</el-button>
        <el-button type="primary" icon="el-icon-delete" size="mini" @click="deleteFinancialData">删除</el-button>
      </el-form>
    </el-col>
  </el-row>
  <!-- part3 -->
  <el-table
    ref="multipleTable"
    :data="tableData"
    border
    tooltip-effect="dark"
    style="width: 100%;"
    :header-cell-style="getCellStyle"
    @selection-change="selectionChange"
    class="table-hxxd"
  >
    <el-table-column type="selection" width="55" align="center" />
    <el-table-column prop="tradeTime" label="交易日期" align="center" />
    <el-table-column prop="tradePipelineNum" label="交易流水号" align="center" :show-overflow-tooltip="true" />
    <el-table-column prop="tradeMoney" label="交易金额" align="center" />
    <el-table-column prop="abstractContent" label="摘要" align="center" :show-overflow-tooltip="true" />
    <el-table-column prop="oppositeAccount" label="对方账号" align="center" :show-overflow-tooltip="true" />
    <el-table-column prop="oppositeAccountName" label="对方账户名称" align="center" :show-overflow-tooltip="true" />
    <el-table-column prop="openingBank" label="对方开户行" align="center" :show-overflow-tooltip="true" />
    <el-table-column prop="paymentAccount" label="收款账户" align="center" :show-overflow-tooltip="true" />
    <el-table-column prop="status" :formatter="statusFmt" label="记录状态" align="center" />
  </el-table>
  <!-- part4 -->
  <el-dialog title="收款导入" :visible.sync="isShow">
    <h5 class="count-intruds">说明：请按照“导入说明”里面的步骤进行操作！</h5>
    <table class="count-import">
      <tr>
        <th>导入模板</th>
        <td><el-button type="text" @click="handleDownload">excel模板下载</el-button></td>
      </tr>
      <tr>
        <th>选择文件</th>
        <td>
          <el-upload
            class="upload-demo"
            ref="upload"
            action="/hxxd/hxXdSignContract/batchUpload"
            :before-remove="beforeRemove"
            :on-change="handleChange"
            :headers="uploadHeaders"
            multiple
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
          </el-upload>
        </td>
      </tr>
      <tr>
        <th>导入说明</th>
        <td>1、请先下载导入模板《民用机场专用》<br />2、按照模板中的要求填写相关数据<br />3、按照模板中的要求填写相关数据<br />4、按照模板中的要求填写相关数据</td>
      </tr>
      <tr>
        <th>到如进度</th>
        <td><ul class="result-submit" v-html="logMsg"></ul></td>
      </tr>
    </table>
    <div class="count-submit">
      <el-button type="primary" icon="el-icon-check" size="mini" @click="submitUpload">收款导入确认</el-button>
    </div>
  </el-dialog>
  <!-- part5 -->
  <el-row class="area_bordes">
      <el-col :span="24" style="text-align: right">
        <el-pagination
          :current-page.sync="pageNo"
          :page-size.sync="pageSize"
          :page-sizes="[15, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotal"
        />
      </el-col>
  </el-row>
</el-card>
</template>
<script>
import { selectFinancialManageByParam, uploadTemplate, downloadTemplate, deleteFinancialData} from '@/api/hxxd/financialManage'
import { parseTime } from '@/utils/index.js';
import { getToken } from '@/utils/auth';
export default {
  data() {
    return {
      isShow: false,
      treeData: [],
      logMsg: '',
      downloadURL: '',
      treeDefaultProps: {
        children: 'childs',
        label: function(data, node) {
          return data.complainant
        }
      },
      downloadQuery: {
        fileCatalog: 'test_file',
        belongId: 1
      },
      formQuery: {
        tradePipelineNum: '',
        tradeMoney: '',
        abstractContent: '',
        oppositeAccount: '',
        oppositeAccountName: '',
        openingBank: '',
        paymentAccount: '',
        status: '',
        pageNo: 1,
        pageSize: 15,
        tradeStartTime: '',
        tradeEndTime: '',
        timeValue: []
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
        'X-Token': getToken()
      },
      statusOptions: [
        {
          value: '0',
          label: '未确认'
        },
        {
          value: '1',
          label: '已确认'
        }
      ],
      accountOptions: [
        {
          value: '0118014210001347',
          label: '0118014210001347'
        },
        {
          value: '0115014210001671',
          label: '0115014210001671'
        }
      ]
    }
  },
  created() {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
    this.formQuery.timeValue = [parseTime(start), parseTime(end)]
    this.formQuery.tradeStartTime = this.formQuery.timeValue[0]
    this.formQuery.tradeEndTime = this.formQuery.timeValue[1]
    this.getTableList()
  },
  methods: {
    getCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background: #F2F2F2;font-size: 13px;color: #333;font-weight: normal'
      } else {
        return ''
      }
    },
    selectionChange(val) {
      this.tableMultiSelection = val
    },
    getTableList() {
      this.tableLoading = true
      selectFinancialManageByParam().then(response => {
        this.tableData = response.data
        this.pageTotal = response.page.total
        this.tableLoading = false
      })
    },
    handleImport() {
      this.isShow = true
    },
    handleDownload() {
      downloadTemplate(this.downloadQuery).then(res => this.downloads(res.data))
    },
    downloads(data) {
      if(!data){
        return
      }
      let url = window.URL.createObjectURL(new Blob([data]))
      let link = document.createElement('a')
      link.style.display ='none'
      link.href = url
      link.setAttribute('download', `excel模板.xlsx`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    },
    // 文件上传相关方法
    handleChange(file) {
      this.fileList.push(file.raw)
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`)
    },
    submitUpload() {
      let formData = new FormData()
      formData.append('filelist', this.fileList)
      uploadTemplate(formData).then(res => {
        this.$message.success('上传成功！')
        this.isShow = false
      }).catch(error => {

      });
    },
    // 文件上传相关方法end
    statusFmt(row, column, cellValue, index) {
      const status = row.status
      if (status === '0') {
        return '未确认'
      } else if (status === '1') {
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
    search() {
      this.getTableList()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/hxxd.scss';
.count-import, .count-intruds, .count-submit {
  width: 98%;
  margin: 10px auto;
}
.count-intruds {
  font-size: 14px;
  font-weight: bold;
  color: #f56c6c;
}
.count-import {
  border-collapse: collapse;
  border: 1px solid #e9e9eb;
  font-size: 12px;
  tr th {
    background-color: #909399;
    color: #fff;
    border-bottom: 1px solid #e9e9eb;
    border-right: 1px solid #e9e9eb;
  }
  tr td {
    padding-left: 1em;
    line-height: 30px;
    border-bottom: 1px solid #e9e9eb;
    border-right: 1px solid #e9e9eb;
  }
  tr th:nth-last-child(1), tr td:nth-last-child(1) {
    border-right: none;
  }
}
.count-submit {
  text-align: center;
}
.result-submit {
  width: 100%;
  height: 200px;
  margin: auto;
  overflow-y: auto;
  li {
    font-size: 12px;
  }
}
</style>
