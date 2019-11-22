<template>
  <div class="detailsContainer">
    <!-- part1 -->
    <el-form ref="formQuery" size="mini" :inline="true">
      <el-row>
        <el-col :span="18">
          <el-form-item :label="ttmsg" prop="value">
            <el-input v-model="value" style="width: 100%;" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" size="mini" @click="search">查询</el-button>
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
          :current-page.sync="pageNo"
          :page-size.sync="pageSize"
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
import { getDictDataList } from "@/api/system/comm/comm";

export default {
  name: 'SecurityQuery',
  props: {
    fdmsg: {
      type: [String],
      required: true,
      default: ''
    },
    ttmsg: {
      type: [String],
      required: true,
      default: ''
    }
  },
  data() {
    return {
      show:false,
      pageNo: 1,
      pageSize: 5,
      value: '',
      key: '',
      pageTotal: 0,
      fdshow: false,
      fdmag: this.fdmsg,
      selectArr: [],
      childArr: [],
      tableData: []
    }
  },
  created(){
    this.getTableList()
  },
  watch: {
    fdmsg (newV, oldV) {
      this.fdmag = newV
      this.getTableList()
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.getTableList();
    },
    handleSizeChange(val) {
      this.getTableList();
    },
    getTableList() {
      this.tableLoading = true
      if (this.fdmag === '1') {
        getDictDataList('97001003',this.value,this.key,true,this.pageNo,this.pageSize).then(response => {
          this.tableData = response.data
        })
      } else if (this.fdmag === '2') {
        getDictDataList('97001004',this.value,this.key,true,this.pageNo,this.pageSize).then(response => {
          this.tableData = response.data
        })
      }
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
      if (this.selectArr.length === 0) {
        this.$message({
          type: 'info',
          message: '请选中要操作的数据!'
        })
        return
      } else {
        this.$emit('closeDalogPay', this.selectArr[0], this.fdmag, this.fdshow)
        this.selectArr = []
        this.$refs.multipleTable.clearSelection() // 清空所有选择
      }
    },
    handleClose(e) {
      if (e === 'saveBtn') {
        this.batchCheck();
      } else if (e === 'canselBtn') {
        this.$emit('closeDalogPay', '', this.fdshow)
      }
    }
  }
}
</script>

<style scoped>
@import '~@/styles/hxxd.scss';
</style>
