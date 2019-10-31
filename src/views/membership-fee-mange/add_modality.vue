<template>
  <div class="detailsContainer">
    <!-- part1 -->
    
    <el-card class="box-card" shadow="never">
          <!-- label-width='65px' -->
          <el-form ref="formQuery" :model="formQuery" :inline="true">
            <el-row>
              <el-col :span="20">
                <el-form-item label="交易流水号" size="mini" prop="saleNum">
                  <el-input v-model="formQuery.saleNum" size="mini" />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item size="mini">
                  <el-button type="primary" size="mini" @click="search">查询</el-button>
                  <el-button size="mini" @click="resetForm('formQuery')">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
    <!--  tooltip-effect="dark" -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      tooltip-effect="dark"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
      :header-row-style="headRowStyle"
      :row-style="rowStyle"
      :header-cell-style="getCellStyle"
    >
      <el-table-column type="selection" width="55"  align="center" />
      <el-table-column prop="id" label="ID" width="" align="center" v-if='show' />
      <el-table-column prop="saleDate" label="交易时间" width="" align="center" />
      <el-table-column prop="saleNum" label="交易流水号" width="" align="center" />
      <el-table-column prop="creditAmount" label="贷方发生额" width="" align="center" />
      <el-table-column prop="remarks" label="摘要" width="" align="center" />
      <el-table-column prop="payerAccount" label="对方账号" width="" align="center" />
      <el-table-column prop="payeeAccountName" label="对方账号名称" align="center" :show-overflow-tooltip="true" />
      <el-table-column prop="payerBank" label="对方开户行" align="center" :show-overflow-tooltip="true" />
    </el-table>
    <el-row style="margin-top: 20px;text-align: center;">
      <el-col :span="8" :offset="16">
        <el-button type="primary" icon="el-icon-check" size="mini" @click="handleClose('saveBtn')">保存</el-button>
        <el-button type="primary" icon="el-icon-close" size="mini" @click="handleClose('canselBtn')">取消</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getFinancialInfoList,
  saveCheck
} from '@/api/hxxd/financial'
export default {
  name: 'add_modality',
  props: {
    fdmsg: {
      type: [String, Number,Object],
      required: true,
      default: ''
    }
    ,
    fdshow2:{
      type: [Boolean],
      required: true,
      default: false
    }
  },
  data() {
    return {
      show:false,
      formQuery: {
        id:'',
        saleDate:'',
        saleNum:'',
        creditAmount:'',
        remarks:'',
        payerAccount:'',
        payeeAccountName:'',
        payerBank:''
      },
      fdshow: false,
      memberIds:'',
      selectArr: [],
      childArr: [],
      tableData: []
    }
  },
  created(){
    this.getTableList()
  },
  watch:{
    'fdshow2':function(val, oldVal) {
      if(val){
        this.getTableList()
      }
    }
  },
  methods: {
          
     getTableList() {
      this.tableLoading = true
      getFinancialInfoList(this.formQuery,this.memberIds).then(response => {
        this.tableData = response.data
        this.pageTotal = response.page.total
        this.tableLoading = false
      })
    },
     search() {
      this.getTableList()
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
      })
    },
     handleSelectionChange(val) {
      this.selectArr = val
    },
     headRowStyle(row, rowIndex) {
      return "height:15px;";
    },
     rowStyle(row, rowIndex) {
      return "height:15px;font-size:13px;color:#333;font-weight:normal; ";
    },
     getCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background:#F2F2F2;font-size:13px;color:#333;font-weight:normal;";
      } else {
        return "";
      }
    },
    batchCheck() {
      if (!this.selectArr) {
        this.$message({
          type: 'info',
          message: '请选中要操作的数据!'
        })
        return
      }
      const selectRows = this.selectArr
      if (selectRows.length === 0) {
        this.$message({
          type: 'info',
          message: '请选中要操作的数据!'
        })
        return
      }
          var idArr = []
          Object.keys(selectRows).forEach(function(key) {
            if (selectRows[key].id) {
              idArr.push(selectRows[key].id)
            }
          })
          if (idArr && idArr.length > 0) {
            var Ids = idArr.join()
            saveCheck(Ids,this.memberIds).then(response => {
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
              this.getTableList()
            })
          }
    },
     handleClose(e) {
      if(e=='saveBtn'){
        if (!this.selectArr) {
        this.$message({
          type: 'info',
          message: '请选中要操作的数据!'
        })
        return
      }
      const selectRows = this.selectArr
      if (selectRows.length === 0) {
        this.$message({
          type: 'info',
          message: '请选中要操作的数据!'
        })
        return
      }
      }
      this.$emit('closeDalog',e,this.selectArr)

    }
  }
}
</script>

<style scoped>
*{
  font-weight: normal;
}
.detailsContainer {
  background: none;
  width: 100%;
  height: 100%;
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
.el-table>th {
  background-color: #eee !important;
}
.el-dialog {
  width: 70% !important;
}
</style>
