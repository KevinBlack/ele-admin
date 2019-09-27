<template>
<el-card style="margin: 0 10px;">
  <div class="app-container">
    <el-row>
      <el-col>
        <!-- 查询面板start -->
        <el-card class="box-card" shadow="never">
          <!-- label-width='65px' -->
          <el-form ref="formQuery" :model="formQuery" :inline="true">
            <el-row>
              <el-col :md="8" :lg="6" :xl="6">
                <el-form-item label="会员名称" size="mini" prop="memberName">
                  <el-input v-model="formQuery.memberName" size="mini" />
                </el-form-item>
              </el-col>
              <el-col :md="8" :lg="6" :xl="6">
                <el-form-item label="会员类别" size="mini" prop="memberType">
                  <el-input v-model="formQuery.memberType" size="mini" />
                </el-form-item>
              </el-col>
              <el-col :md="8" :lg="6" :xl="6">
                <el-form-item label="审批状态" size="mini" prop="spState">
                  <el-select v-model="formQuery.spState" filterable placeholder="请选择" size="mini">
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
          </el-form>
        </el-card>
        <!-- 查询面板end -->
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
              </el-dropdown-menu>
            </el-dropdown>
           </el-card>
          <!-- 按钮区end -->
          <!-- 表格区2 -->
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
            <el-table-column prop="id" label="ID" width="" align="center" v-if='show' />
            <el-table-column prop="memberId" label="会员ID" width="" align="center" />
            <el-table-column prop="memberName" label="会员名称" width="" align="center" />
            <el-table-column prop="memberType" label="会员类别" width="" align="center" />
            <el-table-column prop="memberGrade" label="会员等级" width="" align="center" />
            <el-table-column prop="paymentYear" label="缴费年度" width="" align="center" />
            <el-table-column prop="paymentDate" label="缴纳日期" align="left" :show-overflow-tooltip="true" />
            <el-table-column prop="contributionStandard" label="会费标准" align="left" :show-overflow-tooltip="true" />
            <el-table-column prop="discount" label="折扣" align="left" :show-overflow-tooltip="true" />
            <el-table-column prop="amountDue" label="应缴金额" align="left" :show-overflow-tooltip="true" />
            <el-table-column prop="paymentAmount" label="实缴金额" align="left" :show-overflow-tooltip="true" />
            <el-table-column prop="agent" label="经办人" align="left" :show-overflow-tooltip="true" />
            <el-table-column prop="remarks" label="备注" align="left" :show-overflow-tooltip="true" />
            <!-- <el-table-column
              align="center"
              prop="spState"
              width="150"
              :formatter="statusFmt"
              label="状态"
            /> -->
            <el-table-column fixed="right"   prop="spState"  label="状态" width="160"  align="center">
              <template scope="scope">
                  <span v-if="scope.row.spState==='GLY_SPTG'" style="color:green">同意</span>
                  <span v-else-if="scope.row.spState==='GLY_BH'"  style="color: red">驳回</span>
                  <span v-else-if="scope.row.spState==='GLY_WSP'"  style="color: blue">未审批</span>
                  <span v-else style="color: red">{{scope.row.spState}}</span>
                </template>
            </el-table-column>
          </el-table>
          <!-- 表格区2end -->
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
          <!-- 分页end -->
        </el-card>
         <!-- 表格区end -->
      </el-col>
    </el-row>
  </div>
</el-card>
</template>

<script>
import {
  getDjInfoList,
  deleteMember
} from '@/api/hxxd/membership-fee-mange'

export default {
  props: {
    pageCode: {
      type: String,
      default: ''
    }
  },
  // data 开始
  data() {
    return {
      show:false,
      treeData: [],
      treeDefaultProps: {
        children: 'childs',
        label: function(data, node) {
          return data.memberName
        }
      },
      pageTotal: 0,
      formQuery: {
              id:'',
        memberId:'',
        memberName:'',
        memberType:'',
        memberGrade:'',
        paymentYear:'',
        paymentDate:'',
        contributionStandard:'',
        discount:'',
        amountDue:'',
        paymentAmount:'',
        agent:'',
        remarks:'',
        spState:''
      },
      tableLoading: false,
      tableData: [],
      tableMultiSelection: [],
      statusOptions: [
         {
          value: 'GLY_WSP',
          label: '未审批'
        },
        {
          value: 'GLY_SPTG',
          label: '通过'
        },
        {
          value: 'GLY_BH',
          label: '驳回'
        }
      ]
    }
  },
  // data 结束
  created() {
    this.getTableList()
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
      getDjInfoList(this.formQuery).then(response => {
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
      } 
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
          var idArr = []
          Object.keys(selectRows).forEach(function(key) {
            if (selectRows[key].id) {
              idArr.push(selectRows[key].id)
            }
          })
          if (idArr && idArr.length > 0) {
            var ids = idArr.join()
            deleteMember(ids).then(response => {
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
      this.$router.push({ path: '/membership-fee-mange/add', query: {}})
    },
    // handleEdit(row) {
    //   const id = row.id
    //   if (id) {
    //     this.$router.push({
    //       path: '/sys/company-detail',
    //       query: { id: id }
    //     })
    //   }
    // },
    // statusFmt(row, column, cellValue, index) {
    //   const spState = row.spState.trim()
      
    //   if (spState === 'GLY_SPTG') {
    //     return '通过'
    //   } else if (spState === 'GLY_BH') {
    //     return '驳回'
    //   }  else {
    //     return row.spState
    //   }
    // }
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
