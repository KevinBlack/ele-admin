<template>
  <div class="detailsContainer">
    <!-- part1 -->
    <el-form ref="formQuery" :model="formQuery" :inline="true">
      <el-row>
        <el-col :span="18"  align="left">
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
    <!--  tooltip-effect="dark" -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      tooltip-effect="dark"
      style="width: 100%;"
      :header-row-style="headRowStyle"
      :row-style="rowStyle"
      :header-cell-style="getCellStyle"
      class="table-hxxd"
    >
      <el-table-column prop="id" label="ID" width="" align="center" v-if='show' />
      <el-table-column prop="code" label="会员编号" width="" align="center" />
      <el-table-column prop="name" label="会员名称" width="" align="center" />
      <el-table-column prop="remarks" label="备注" width="" align="center" />
    </el-table>
        <!-- 分页 -->
    <el-row class="area_bordes" style="margin-top:20px">
      <el-col :span="24" style="text-align: right;">
        <el-pagination
          background
          :total="pageTotal"
          layout="total, sizes, prev, pager, next, jumper"
          :current-page.sync="formQuery.pageNo"
          :page-size.sync="formQuery.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-col>
    </el-row>
    <!-- 分页end -->
    <el-row class="btn_bottom">
        <el-col :span="24">
        <el-button type="primary" size="mini" @click="handleClose()">取消</el-button>
      </el-col> 
    </el-row>
  </div>
</template>
<script>
import {
  getMemberByRegion
} from '@/api/hxxd/member'
export default {
  name: 'dues-count-dialog',
  props: {
    fdmsg: { 
      type: [String, Number,Object],
      required: true,
      default: ''
    },
    fdshow3:{
      type: [Boolean],
      required: true,
      default: false
    }
  },
  data() {
    return {
      pageTotal: 0,
      show:false,
      formQuery: {
        id:'',
        code:'',
        name:'',
        remarks:'',
        status:'30',
        region:'',
        pageNo: 1,
        pageSize: 15,
      },
      fdshow: false,
      tableData: []
    }
  },
  created(){
    var fdmsg = JSON.stringify(this.fdmsg)
    this.formQuery.region = fdmsg.region
    // this.getTableList()
  },
  watch:{
    'fdshow3':function(val, oldVal) {
      if(val){
        this.getTableList()
      }
    }
  },
  methods: {
    handleSizeChange() {
      this.getTableList();
    },
    handleCurrentChange() {
      this.getTableList();
    },
     getTableList() {
      this.tableLoading = true
      getMemberByRegion(this.formQuery).then(response => {
        this.tableData = response.data
         this.pageTotal = response.page.total;
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
     handleClose() {
        this.$emit('closeDalog', this.fdshow)
    }
  }
}
</script>

<style scoped>
 @import '~@/styles/hxxd.scss';
</style>
