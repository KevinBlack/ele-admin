<template>
  <div class="detailsContainer">
    <!-- part1 -->
    <el-form ref="queryForm" :model="queryForm" label-width="100px" size="mini">
      <el-row :gutter="20" class="area_border">
        <el-col :span="12">
          <el-form-item label="会员名称" size="mini" prop="name">
            <el-input v-model="queryForm.name" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="会员编号" size="mini" prop="code">
            <el-input v-model="queryForm.code" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" style="text-align: center;margin: 10px 0;">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="getTableList">查询</el-button>
          <el-button
            type="primary"
            icon="el-icon-refresh-right"
            @click="resetForm('queryForm')"
            size="mini"
          >重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- part3 -->
    <el-row :gutter="10">
      <el-col :span="24">
        <div class="dtl-info-line">
          已选择{{ sum }}条
          <el-button type="text" style="margin-left: 20px;" @click="toggleSelection()">清空</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      v-loading="tableLoading"
      tooltip-effect="dark"
      style="width: 100%;margin-bottom:20px;"
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50" />
      <el-table-column type="index" width="100" label="序号" align="center"></el-table-column>
      <el-table-column prop="name" label="会员名称" width="285" align="center"></el-table-column>
      <el-table-column prop="code" label="会员编号" width="300" align="center"></el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      style="text-align: margin-top: 20px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="queryForm.pageNo"
      :page-size.sync="queryForm.pageSize"
      :page-sizes="[5, 30, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageTotal"
    ></el-pagination>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" icon="el-icon-check" size="mini" @click="handleClose('ok')">选择会员</el-button>
      <el-button type="primary" icon="el-icon-close" size="mini" @click="handleClose('close')">取消</el-button>
    </div>
  </div>
</template>

<script>
import { getMemberList } from "@/api/hxxd/member";
import { parseTime } from "@/utils/index.js";
export default {
  name: "Leaguer",
  data() {
    return {
      sum: 0,
      added: 0,
      multipleSelection: [],
      pageTotal: 0,
      tableLoading: false,
      tableData: [],
      // 查询条件
      queryForm: {
        // 会员编号
        code: "",
        // 会员名称
        name: "",
        // 当前页码
        pageNo: 0,
        // 每页查询条数
        pageSize: 15
      },
    };
  },
  created() {
    //初始化页面时
    // 参数传递 router.push({ path: 'register', query: { plan: 'private' }})
    // 参数接受 let id = this.$route.query.jId;
    // let flag = this.$route.query.flag;
    this.getTableList();
    this.queryForm.endTime = parseTime(new Date());
  },
  methods: {
    handleSizeChange(val) {
      this.getTableList();
    },
    handleCurrentChange(val) {
      this.getTableList();
    },
    getTableList() {
      this.tableLoading = true;
      getMemberList(this.queryForm).then(response => {
        this.tableData = response.data;
        this.pageTotal = response.page.total;
        this.tableLoading = false;
      });
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (val.length > 1) {
        this.$message({
          message: "只能选择单条",
          type: "warning"
        });
      }
      if (val.length !== 0) {
        this.added = val.length;
        this.sum = this.added;
      } else if (val.length === 0) {
        this.sum -= this.added;
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleClose(command) {
      var data = JSON.parse(JSON.stringify(this.multipleSelection));
      this.$emit("callBack", command, data);
    }
  }
};
</script>

<style scoped>
* {
  font-weight: normal;
}
.detailsContainer {
  margin: 0 10px;
}
.dtl-title-line {
  display: inline-block;
  border-left: 5px solid #409eff;
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
.el-table > th {
  background-color: #eee !important;
}
.area_border,
.area_bordes {
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
  margin-top: 15px;
}
/* 标题下线和 保存取消上部线 样式 */
.dialog-footer {
  border-top: 1px solid #e6e6e6;
  margin-top: 30px;
  padding-top: 10px;
  text-align: right;
}
</style>
