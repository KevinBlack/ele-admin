<template>
  <div class="app-container">
    <el-row>
      <el-col>
        <!-- 查询面板 -->
        <el-card class="box-card" shadow="never">
          <!-- label-width='65px' -->
          <el-form ref="formQuery" :model="formQuery" :inline="true">
            <el-row>
              <el-col :md="8" :lg="6" :xl="6">
                <el-form-item label="公司编号" size="mini" prop="companyCode">
                  <el-input v-model="formQuery.companyCode" size="mini" />
                </el-form-item>
              </el-col>
              <el-col :md="8" :lg="6" :xl="6">
                <el-form-item label="公司名称" size="mini" prop="companyName">
                  <el-input v-model="formQuery.companyName" size="mini" />
                </el-form-item>
              </el-col>
              <el-col :md="8" :lg="6" :xl="6">
                <el-form-item label="状态" size="mini" prop="status">
                  <el-select v-model="formQuery.status" filterable placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in statusOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="8" :lg="6" :xl="6">
                <el-form-item size="mini">
                  <el-button type="primary" size="mini" @click="search">查询</el-button>
                  <el-button size="mini" @click="resetForm('formQuery')">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row>
              <el-col :span='24' style='text-align:center'>
                <el-form-item size='mini'>
                  <el-button type='primary' size='mini' @click='search'>查询</el-button>
                  <el-button size='mini' @click='resetForm('formQuery')'>重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>-->
          </el-form>
        </el-card>
        <!-- 表格区 -->
        <el-card class="box-card" shadow="never" :body-style="{ minHeight: '600px' }">
          <!-- 按钮区 -->
          <el-card
            shadow="never"
            style="padding:15px;border-radius:0px;"
            :body-style="{ padding: '0px' }"
          >
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd()">新建</el-button>
            <el-dropdown trigger="click" size="mini" @command="handleBatchCommand">
              <el-button type="primary" size="mini">
                批量操作
                <i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-delete" command="batchDelete">删除</el-dropdown-item>
                <el-dropdown-item icon="el-icon-close" command="batchStop">停用</el-dropdown-item>
                <el-dropdown-item icon="el-icon-check" command="batchStart">启用</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-card>
          <!-- 表格区 -->
          <el-table
            ref="companyTable"
            v-loading="tableLoading"
            :data="tableData"
            style="width:100%"
            :header-row-style="headRowStyle"
            :row-style="rowStyle"
            :header-cell-style="getCellStyle"
            border
            highlight-current-row
            @selection-change="selectionChange"
          >
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column prop="companyName" label="公司名称" width="200" align="center" />
            <el-table-column prop="companyCode" label="公司编码" width="200" align="center" />
            <el-table-column
              align="center"
              prop="status"
              width="150"
              :formatter="statusFmt"
              label="状态"
            />
            <el-table-column prop="treeSort" label="排序号" width="150" align="center" />
            <el-table-column prop="updateDate" label="更新时间" width="200" align="center" />
            <el-table-column prop="remarks" label="备注" align="left" :show-overflow-tooltip="true" />
            <el-table-column fixed="right" label="操作" width="200" align="center">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            :total="pageTotal"
            layout="total, sizes, prev, pager, next, jumper"
            :current-page.sync="formQuery.pageNo"
            :page-size.sync="formQuery.pageSize"
            :page-sizes="[15, 30, 50, 100]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getCompanyList,
  // getCompany,
  deleteCompany,
  stopCompany,
  startCompany
} from '@/api/company'

export default {
  props: {
    pageCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      treeData: [],
      treeDefaultProps: {
        children: 'childs',
        label: function(data, node) {
          return data.companyName
        }
      },
      pageTotal: 0,
      formQuery: {
        companyCode: '',
        companyName: '',
        status: '0',
        pageNo: 1,
        pageSize: 15,
        orderBy: '',
        isDelete: '0'
      },
      tableLoading: false,
      tableData: [],
      tableMultiSelection: [],
      statusOptions: [
        {
          value: '0',
          label: '正常'
        },
        {
          value: '2',
          label: '停用'
        }
      ]
    }
  },
  created() {
    this.getTableList()
  },
  mounted() {
    console.log(this.pageCode)
  },
  methods: {
    selectionChange(val) {
      this.tableMultiSelection = val
    },
    search() {
      this.getTableList()
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
      })
    },
    getTableList() {
      this.tableLoading = true
      getCompanyList(this.formQuery).then(response => {
        this.tableData = response.data
        this.pageTotal = response.page.total
        this.tableLoading = false
      })
    },
    handleSizeChange() {
      this.getTableList()
    },
    handleCurrentChange() {
      this.getTableList()
    },
    rowStyle(row, rowIndex) {
      return 'height:15pxfont-size: 13pxcolor: #333font-weight: normal '
    },
    headRowStyle(row, rowIndex) {
      return 'height:15px'
    },
    getCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background: #F2F2F2font-size: 13pxcolor: #333font-weight: normal'
      } else {
        return ''
      }
    },
    handleBatchCommand(command) {
      if (command === 'batchDelete') {
        this.batchDelete()
      } else if (command === 'batchStop') {
        this.batchStop()
      } else if (command === 'batchStart') {
        this.batchStart()
      }
    },
    batchStop() {
      if (!this.tableMultiSelection) {
        this.$message({
          type: 'info',
          message: '请选中要停用的数据!'
        })
        return
      }
      const selectRows = this.tableMultiSelection
      if (selectRows.length === 0) {
        this.$message({
          type: 'info',
          message: '请选中要停用的数据!'
        })
        return
      }
      this.$confirm('是否执行停用操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var companyIdArr = []
          Object.keys(selectRows).forEach(function(key) {
            if (selectRows[key].companyId) {
              companyIdArr.push(selectRows[key].companyId)
            }
          })
          if (companyIdArr && companyIdArr.length > 0) {
            var companyIds = companyIdArr.join()
            stopCompany(companyIds).then(response => {
              this.$message({
                type: 'success',
                message: '停用成功!'
              })
              this.getTableList()
            })
          }
        })
        .catch(() => {
          // 取消时执行此处
        })
    },
    batchStart() {
      if (!this.tableMultiSelection) {
        this.$message({
          type: 'info',
          message: '请选中要启用的数据!'
        })
        return
      }
      const selectRows = this.tableMultiSelection
      if (selectRows.length === 0) {
        this.$message({
          type: 'info',
          message: '请选中要启用的数据!'
        })
        return
      }
      this.$confirm('是否执行启用操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var companyIdArr = []
          Object.keys(selectRows).forEach(function(key) {
            console.log(selectRows[key].companyId)
            if (selectRows[key].companyId) {
              companyIdArr.push(selectRows[key].companyId)
            }
          })
          if (companyIdArr && companyIdArr.length > 0) {
            var companyIds = companyIdArr.join()
            startCompany(companyIds).then(response => {
              this.$message({
                type: 'success',
                message: '启用成功!'
              })
              this.getTableList()
            })
          }
        })
        .catch(() => {
          // 取消时执行此处
        })
    },
    batchDelete() {
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
          var companyIdArr = []
          Object.keys(selectRows).forEach(function(key) {
            if (selectRows[key].companyId) {
              companyIdArr.push(selectRows[key].companyId)
            }
          })
          if (companyIdArr && companyIdArr.length > 0) {
            var companyIds = companyIdArr.join()
            deleteCompany(companyIds).then(response => {
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
    handleAdd() {
      this.$router.push({ path: '/system/company-detail', query: {}})
    },
    handleEdit(row) {
      const companyId = row.companyId
      if (companyId) {
        this.$router.push({
          path: '/system/company-detail',
          query: { companyId: companyId }
        })
      }
    },
    statusFmt(row, column, cellValue, index) {
      const status = row.status.trim()
      if (status === '0') {
        return '正常'
      } else if (status === '1') {
        return '删除'
      } else if (status === '2') {
        return '停用'
      } else {
        return row.status
      }
    }
  }
}
</script>
<style>
.el-aside {
  /* background-color: #d3dce6 */
  color: #333;
  margin-top: 12px;
  width: 250px;
  min-height: 600px;
  margin-bottom: 0px;
  padding-right: 1px;
}

.el-main {
  padding-left: 1px;
  background-color: #e9eef3;
  color: #333;
  /* text-align: center */
  /* line-height: 0px */
  min-height: 600px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-table--medium th,
.el-table--medium td {
  padding: 0px 0;
}
</style>
