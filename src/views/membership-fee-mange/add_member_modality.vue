<template>
  <div class="detailsContainer">
    <!-- part1 -->
    
    <el-card class="box-card" shadow="never">
          <!-- label-width='65px' -->
          <el-form ref="formQuery" :model="formQuery" :inline="true">
            <el-row>
              <el-col :span="18">
                <el-form-item label="会员名称" size="mini" prop="name">
                  <el-input v-model="formQuery.name" size="mini" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
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
      <el-table-column prop="code" label="会员编号" width="" align="center" />
      <el-table-column prop="name" label="会员名称" width="" align="center" />
      <el-table-column prop="remarks" label="备注" width="" align="center" />
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
  getMemberList
} from '@/api/hxxd/member'
export default {
  name: 'add_member_modality',
  props: {
    fdmsg: {
      type: [String, Number,Object],
      required: true,
      default: ''
    }
    ,
    fdshow3:{
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
        code:'',
        name:'',
        remarks:''
      },
      fdshow: false,
      selectArr: [],
      childArr: [],
      tableData: []
    }
  },
  created(){
    this.getTableList()
  },
  watch:{
    'fdshow3':function(val, oldVal) {
      if(val){
        this.getTableList()
      }
    }
  },
  methods: {
     getTableList() {
      this.tableLoading = true
      getMemberList(this.formQuery).then(response => {
        this.tableData = response.data
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
      if (selectRows.length > 1) {
        this.$message({
          type: 'info',
          message: '只能选中一条操作数据!'
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
              this.getTableList()
          }
        this.$emit('closeDalogPay', this.selectArr[0], this.fdshow)
        this.selectArr = []
        this.$refs.multipleTable.clearSelection() // 清空所有选择
    },
     handleClose(e) {
      if (e === 'saveBtn') {
        this.batchCheck();
      }else{
        this.$emit('closeDalogPay', '', this.fdshow)
      } 
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
