<template>
  <el-card class="detailsContainer">
    <!-- part1 -->
    <el-form ref="ruleForm" label-width="100px" size="mini">
      <el-row :gutter="20" class="area_border">
        <el-col :span="5">
          <el-form-item label="制单时间从" size="mini" prop="startTime">
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
          <el-form-item label="制单时间到" size="mini" prop="endTime">
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
          <el-form-item label="状态" prop="status">
            <el-select
              v-model="queryForm.status"
              filterable
              placeholder="请选择"
              size="mini"
              style="width:100%"
            >
              <el-option
                v-for="item in queryFormOptions.statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="xxx编码" prop="code">
            <el-input v-model="queryForm.code" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="系统字典" size="mini" prop="isSys">
            <el-radio-group v-model="queryForm.isSys" size="mini">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="归属公司" prop="companyName">
            <el-input v-model="queryForm.companyName" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="归属机构" prop="officeFullPaths">
            <el-input v-model="queryForm.officeFullPaths" size="mini"></el-input>
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
            <el-button type="primary"  icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
            <el-button type="primary"   icon="el-icon-edit" size="mini" @click="handleModify">修改</el-button>
            <el-button type="primary"   icon="el-icon-delete" size="mini" @click="handleDelete">删除</el-button>
            <el-button type="primary" icon="el-icon-check" size="mini" @click="handleSubmit">提交</el-button>
            <el-button type="primary" icon="el-icon-circle-check" size="mini" @click="handleCheckPass">审核通过</el-button>
            <el-button type="primary" icon="el-icon-circle-close" size="mini" @click="handleCheckNotPass">审核不通过</el-button>
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
      <el-table-column prop="code"      label="xxx编码"   width="200" align="center"></el-table-column>
      <el-table-column prop="status"    label="状态"      width="150" align="center" :formatter="statusFmt" ></el-table-column>
      <el-table-column prop="compName"  label="公司名称"   width="200" align="center"></el-table-column>
      <el-table-column prop="sex"       label="性别"      width="200" align="center"></el-table-column>
      <el-table-column prop="price"     label="金额"      width="200" align="center"></el-table-column>
      <el-table-column prop="submitTime" label="提交时间"      width="200" align="left"></el-table-column>
      <el-table-column prop="checkStatus" label="审核原因"      width="200" align="left"></el-table-column>
      <el-table-column prop="remarks"   label="备注"      align="left" :show-overflow-tooltip="true"></el-table-column>
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
import { list,check,deleteByTableName,getByTableName } from '@/api/system/demo'

export default {
  data() {
    return {
      //查询条件options集合
      queryFormOptions: {
        statusOptions: []
      },
      // 查询条件
      queryForm: {
        // 编码
        code: "",
        // 制单时间从
        startTime: "",
        // 制单时间至
        endTime: "",
        // 状态
        status: "10",
        // 具备角色
        roleIds: "",
        // 公司编码（隐藏）
        companyId: "",
        // 公司名称
        companyName: "",
        // 归属机构
        officeFullPaths: "",
        // 归属机构
        isSys: "1",
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
      // 状态
      var statusJson = [
        { value: "10", label: "制单" },
        { value: "20", label: "提交" }
      ];
      this.statusOptions = statusJson;
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
    //增加
    handleAdd(){
       this.$router.push({ path: '/example2/likejian-detail', query: {}})
    },
    //修改
    handleModify(){
      let selectRows = this.multipleSelection;
      if (!selectRows) {
        this.$message({
          type: "info",
          message: "请选中要编辑的数据!"
        });
        return;
      }
      if (selectRows.length == 0 || selectRows.length>1) {
        this.$message({
          type: "info",
          message: "只能选择一条数据编辑!"
        });
        return;
      }
      var id=selectRows[0].id
      this.$router.push({ path: '/example2/likejian-detail', query: {id:id}})
    },
    //删除
    handleDelete(){},
    //提交
    handleSubmit(){},
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
    statusFmt(row, column, cellValue, index) {
      let status = row.status;
      if (status === "0") {
        return "正常";
      } else if (status === "1") {
        return "删除";
      } else if (status === "2") {
        return "停用";
      } else {
        return row.status;
      }
    },
    getTableList() {
      var query=this.queryForm;
      list(query).then(response => {
        this.tableData = response.data;
        this.pageTotal = response.page.total || 0;
      });
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
