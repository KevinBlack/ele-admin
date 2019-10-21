<template>
  <el-card class="detailsContainer">
    <!-- part1 -->
    <el-form ref="ruleForm" label-width="100px" size="mini">
      <el-row :gutter="20" class="area_border">
        <el-col :span="5">
          <el-form-item label="提交时间从" size="mini" prop="startTime">
            <el-date-picker
              v-model="queryForm.startTime"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              style="width:100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="提交时间到" size="mini" prop="endTime">
            <el-date-picker
              v-model="queryForm.endTime"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              style="width:100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="会员编号" prop="code">
            <el-input v-model="queryForm.code" size="mini"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="会员名称" prop="name">
            <el-input v-model="queryForm.name" size="mini"></el-input>
          </el-form-item>
        </el-col>
         <el-col :span="5">
          <el-form-item label="退出原因类型" prop="exitType">
            <el-select
              v-model="queryForm.status"
              filterable
              placeholder="请选择"
              size="mini"
              style="width:100%"
            >
              <el-option
                v-for="item in queryFormOptions.exitType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>

          </el-form-item>
        </el-col>
        <el-col :span="9" style="text-align: left;padding-left: 1.3em;">
           <el-button type="primary" icon="el-icon-search" size="mini" @click="formSearch">查询</el-button>
           <el-button type="primary" icon="el-icon-refresh-right" size="mini"  @click="resetForm('queryForm')" >重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="area_bordes">
      <el-col :span="24">
        <el-button-group  size="mini">
            <el-button type="primary" icon="el-icon-circle-check" size="mini" @click="handleCheckPass">审核通过</el-button>
            <el-button type="primary" icon="el-icon-circle-close" size="mini" @click="handleCheckNotPass">审核驳回</el-button>
        </el-button-group>
        <el-button-group  size="mini" style="margin-left: 20px;">
            <el-button type="primary" class="btn_line"  icon="el-icon-zoom-in" size="mini" @click="handleView">查看</el-button>
            <el-button type="primary" icon="el-icon-download" size="mini" @click="handleExport">导出</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <!-- part3 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      tooltip-effect="dark"
      style="width: 100%;margin-bottom:20px;"
      @selection-change="handleTableSelectionChange"
    >
      <el-table-column type="selection" width="55"       align="center"></el-table-column>
      <el-table-column prop="submitDate"   label="提交时间"   width="120"   align="left" ></el-table-column>
      <el-table-column prop="code"      label="会员编号"   width="200" align="center"></el-table-column>
      <el-table-column prop="name"    label="会员名称"      width="150" align="center" ></el-table-column>
      <el-table-column prop="exitType"  label="退会原因类型"   width="200" align="center"></el-table-column>
      <el-table-column prop="exitReason"       label="退会原因" align="left " :show-overflow-tooltip="true"></el-table-column>
    </el-table>
    <el-row class="area_bordes">
      <el-col :span="24" style="text-align: right;">
        <el-pagination
          background
          @size-change="handlePageSizeChange"
          @current-change="handlePageNoChange"
          :current-page.sync="queryForm.pageNo"
          :page-size.sync="queryForm.pageSize"
          :page-sizes="[15, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotal"
        />
      </el-col>
    </el-row>
  </el-card>
</template>

<script>

// 此处引入axios 相关包
// import { list,check,deleteByTableName,getByTableName } from '@/api/system/demo'

export default {
  data() {
    return {
      //查询条件options集合
      queryFormOptions: {
        exitType: [
            {10:'就像退会'} ,{15:'咋定吧'}]
      },
      // 查询条件
      queryForm: {
        // 会员编号
        code: "",
         // 会员名称
        name: "",
        // 制单时间从
        startTime: "",
        // 制单时间至
        endTime: "",
        // 当前页码
        pageNo: 0,
        // 每页查询条数
        pageSize: 15
      },
      // 查询到的总数据条数
      pageTotal: 0,
      // 当前勾选的行
      multipleSelection: [],
      // 表格数据
      tableData: []
    }
  },
  // 相当于javascript的 $.ready()
  created() {
    // 初始化查询表单
    this.initQueryForm();
    // 初始加载表格数据
    this.initLoadTable();
  },
  methods: {
    initQueryForm() {
      // 设置制单时间从，制单时间到
      var currDate = new Date();
      this.queryForm.startTime = currDate.getTime() - 3600 * 1000 * 24 * 7;
      this.queryForm.endTime = currDate;
    },
    initLoadTable() {
      this.getTableList();
    },
    // 表单查询
    formSearch() {
      this.getTableList();
    },
    // 表单重置
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    //查看
    handleView(){},
    //导出
    handleExport(){},
    //审核通过
    handleCheckPass(){},
    //审核不通过
    handleCheckNotPass(){},
    //分页改变触发
    handlePageSizeChange(val) {
      this.getTableList();
    },
    //页码改变触发
    handlePageNoChange(val) {
      this.getTableList();
    },
    getTableList() {
    //   var query=this.queryForm;
    //   list(query).then(response => {
    //     this.tableData = response.data;
    //     this.pageTotal = response.page.total || 0;
    //   });
    },
    handleTableSelectionChange(val) {
      this.multipleSelection = val;
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
}

</style>
