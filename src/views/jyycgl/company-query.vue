<template>
  <div>
    <!-- part1 -->
    <el-form ref="formQuery" :inline="true">
      <el-row>
         <el-col :span="18">
          <el-form-item label="企业名称" size="mini" prop="businessName">
            <el-input v-model="formQuery.businessName" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item size="mini">
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
      :header-cell-style="getCellStyle"
      class="table-hxxd"
      v-loading="tableLoading"
    >
      <el-table-column type="selection" width="55"  align="center" />
      <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
      <el-table-column prop="businessName" label="企业名称" width="250" align="center"></el-table-column>
      <el-table-column prop="socialCode" label="社会信用代码" align="center"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row class="area_bordes">
      <el-col :span="24" style="text-align: right;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="formQuery.pageNo"
          :page-size.sync="formQuery.pageSize"
          :page-sizes="[5, 30, 50, 100]"
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
import { getCompanyInfoList } from '@/api/hxxd/agent'
import { getDictDataList } from "@/api/system/comm/comm";

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
      pageTotal: 0,
      fdshow: false,
      selectArr: [],
      tableData: [],
      tableLoading: false,
      formQuery: {
        businessName: "",
        pageNo: 1,
        pageSize: 5,
        orderBy: ""
      },
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
      getCompanyInfoList(this.formQuery).then(response => {
        this.tableData = response.data;
        this.pageTotal = response.page.total;
        this.tableLoading = false;
      });
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
      if (this.selectArr.length!=1) {
        this.$message({
          type: 'info',
          message: '请选单条操作的数据!'
        })
        return
      }
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
@import '~@/styles/hxxd.scss';
</style>
