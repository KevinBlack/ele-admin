<template>
  <div class="detailsContainer">
    <!-- part1 -->
    <el-form ref="formQuery" :model="formQuery" :inline="true">
      <el-row>
        <el-col :span="18">
          <el-form-item label="投诉单位名称" size="mini" prop="value">
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
      class="table-hxxd"
    >
      <el-table-column type="selection" width="55"  align="center" />
      <el-table-column prop="value" label="企业名称" align="center" />
      <el-table-column prop="key" label="社会统一信用代码" align="center" />
    </el-table>
    <el-row class="area_bordes">
      <el-col :span="24" style="text-align: right">
        <el-pagination
          :current-page.sync="this.pageNo"
          :page-size.sync="this.pageSize"
          :page-sizes="[15, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotal"
        />
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px;text-align: center;">
      <el-col :span="8" :offset="16">
        <el-button type="primary" icon="el-icon-check" size="mini" @click="handleClose('saveBtn')">保存</el-button>
        <el-button type="primary" icon="el-icon-close" size="mini" @click="handleClose('canselBtn')">取消</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { componyQueryList } from '@/api/hxxd/agent'

export default {
  name: 'ComplainQuery',
  props: {
    fdmsg: {
      type: [String, Number,Object],
      required: true,
      default: ''
    }
  },
  data() {
    return {
      show:false,
      pageNo: 1,
      pageSize: 5,
      formQuery: {
        name:'',
        pageNo: 1,
        pageSize: 5
      },
      pageTotal: 0,
      fdshow: false,
      selectArr: [],
      tableData: []
    }
  },
  created(){
    this.getTableList()
  },
  methods: {
    handleCurrentChange(val) {
      this.getTableList()
    },
    handleSizeChange(val) {
      this.getTableList()
    },
    getTableList() {
      this.tableLoading = true
      componyQueryList(this.formQuery).then(response => {
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
      return 'height:15px'
    },
     rowStyle(row, rowIndex) {
      return 'height:15pxfont-size:13pxcolor:#333font-weight:normal '
    },
     getCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background:#F2F2F2font-size:13pxcolor:#333font-weight:normal'
      } else {
        return ''
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
      // const selectRows = this.selectArr
      // if (selectRows.length === 0) {
      //   this.$message({
      //     type: 'info',
      //     message: '请选中要操作的数据!'
      //   })
      //   return
      // }
      // if (selectRows.length > 1) {
      //   this.$message({
      //     type: 'info',
      //     message: '只能选中一条操作数据!'
      //   })
      //   return
      // }
      // var idArr = []
      // Object.keys(selectRows).forEach(function(key) {
      //   if (selectRows[key].name) {
      //     idArr.push(selectRows[key].name)
      //   }
      // })
      // if (idArr && idArr.length > 0) {
      //   var Ids = idArr.join()
      //   this.getTableList()
      // }
      this.$emit('closeDalogPay', this.selectArr[0], this.fdshow)
      this.selectArr = []
      this.$refs.multipleTable.clearSelection() // 清空所有选择
    },
     handleClose(e) {
      if (e === 'saveBtn') {
        this.batchCheck()
      }else{
        this.$emit('closeDalogPay', '', this.fdshow)
      }
    }
  }
}
</script>

<style scoped>
@import '../../styles/hxxd.scss';
</style>
