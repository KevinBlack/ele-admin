<template>
  <div class="detailsContainer">
    <!-- part1 -->
    <el-form ref="mainForm" :model="mainForm" label-width="80px" size="mini">
      <el-row :gutter="20" class="area_border">
        <el-col :span="8">
          <el-form-item label="公司编号" prop="companyCode">
            <el-input v-model="mainForm.companyCode" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="公司名称" prop="companyName">
            <el-input v-model="mainForm.companyName" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :span="8" style="text-align: left;padding-left: 1.3em;">
           <el-button type="primary" icon="el-icon-search" size="mini" @click="mainFormSearch">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      style="width: 100%;"
      size="mini"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column prop="companyCode"      label="公司编号"   width="200" align="center"></el-table-column>
      <el-table-column prop="companyName"      label="公司名称"   align="center"></el-table-column>
    </el-table>
    <el-row class="area_bordes">
      <el-col :span="24" style="text-align: right">
        <el-pagination
          background
          @size-change="handlePageSizeChange"
          @current-change="handlePageNoChange"
          :current-page.sync="mainForm.pageNo"
          :page-size.sync="mainForm.pageSize"
          :page-sizes="[15, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotal"
        />
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
        <el-button type="primary" icon="el-icon-check" size="mini" @click="handleClose('ok')">保存</el-button>
        <el-button type="primary" icon="el-icon-close" size="mini" @click="handleClose('close')">取消</el-button>
    </div>
  </div>
</template>

<script>
// 引入相应的加载数据的程序
import {  getCompanyList } from '@/api/system/company'

export default {
  name: 'SysCompanyDialog',
  props: {
    // 传入对象，使用时和使用data对象里面的参数一样
    isShow: {
      type: [Boolean],
      required: true
    },   
    companyName: {
      type: [String],
      required: true,
      default: ''
    },
    companyCode: {
      type: [Number,String],
      required: true,
      default: ''
    }
  },
  created(){
    //界面被创建时拉去数据
    this.getTableList();
  },
  watch:{
    //监控传入对象变化（类似于监听）
    'companyName':function(val, oldVal) {
      //将改变的值赋值给mainForm中对应的字段
      this.mainForm.companyName=val;
      if(this.isShow){
        this.getTableList();
      }
    },
    'companyCode':function(val, oldVal) {
      //将改变的值赋值给mainForm中对应的字段
      this.mainForm.companyCode=val;
       if(this.isShow){
        this.getTableList();
      }
    }
  },
  data() {
    return {
      //表单参数
      mainForm:{
        companyName:'',
        companyCode:'',
        pageNo:0,
        pageSize:15
      },
      pageTotal:0,
      tableLoading:true,
      tableData: [],
      multipleSelection: []
    }
  },
  methods: {
    // 查询函数
    mainFormSearch(){
      this.getTableList();
    },
    //重新加载表格数据
    getTableList(){
      getCompanyList(this.mainForm).then(response => {
        this.tableData = response.data
        this.pageTotal = response.page.total
        this.tableLoading = false
      })
    },
    //分页改变触发
    handlePageSizeChange(val) {
      this.getTableList();
    },
    //页码改变触发
    handlePageNoChange(val) {
      this.getTableList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleClose(command) {
      //直接调用外部的@closeDalog对应的函数
      this.$emit('closeDalog',command,this.multipleSelection)
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
.el-table>th {
  background-color: #eee !important;
}
.area_border, .area_bordes {
  box-sizing: border-box;
  border: 1px solid #e6e6e6;
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding: 10px 0 0 0;
  margin-bottom: 20px;
  overflow: hidden;
}
.area_bordes {
  padding: 10px;
  margin-top: 15px
}
/* 标题下线和 保存取消上部线 样式 */
.dialog-footer {
  border-top: 1px solid #e6e6e6;
  margin-top: 30px;
  padding-top: 10px;
  text-align: right;
}
</style>
