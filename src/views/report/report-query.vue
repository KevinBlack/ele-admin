  <template>
  <el-card class="detailsContainer">
    <!-- part1 -->
    <el-form ref="formQuery" :model="formQuery" label-width="100px" size="mini">
      <el-row :gutter="20" class="area_border">
        <el-col :span="10">
          <el-form-item label="创建时间" size="mini" prop="createDate">
            <el-date-picker
              v-model="createDate"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              style="width:100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12" style="text-align: center;">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="getTableList">查询</el-button>
          <el-button
            type="primary"
            icon="el-icon-refresh-right"
            @click="resetForm('formQuery')"
            size="mini"
          >重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row :gutter="20" class="area_border">
      <el-col :span="24">
        <el-button type="primary" icon size="mini" @click="handleEdit">查看信息</el-button>
      </el-col>
    </el-row>
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
      style="width: 100%;"
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
      <el-table-column prop="reportYear" label="上报年份" width="250" align="center"></el-table-column>
      <el-table-column prop="businessName" label="企业名称" width="250" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="250" align="center"></el-table-column>
      <el-table-column prop="reportTime" label="上报时间" width="250" align="center"></el-table-column>
      <el-table-column prop="reporter" label="上报人" width="250" align="center"></el-table-column>
      <el-table-column prop="status" label="上报状态" align="left"></el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      style="text-align: margin-top: 20px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="formQuery.pageNo"
      :page-size.sync="formQuery.pageSize"
      :page-sizes="[5, 30, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageTotal"
    ></el-pagination>
  </el-card>
</template>

<script>
import { getReportInfoList } from "@/api/hxxd/agent";
import { parseTime } from "@/utils/index.js";
export default {
  data() {
    return {
      sum: 0,
      added: 0,
      multipleSelection: [],
      pageTotal: 0,
      tableLoading: false,
      tableData: [],
      createDate: [],
      formQuery: {
        beginTime: "",
        endTime: "",
        pageNo: 1,
        pageSize: 5,
        orderBy: ""
      }
    };
  },
  created() {
    //初始化页面时
    // 参数传递 router.push({ path: 'register', query: { plan: 'private' }})
    // 参数接受 let id = this.$route.query.jId;
    // let flag = this.$route.query.flag;
    // if (flag) {
    this.getTableList();
    this.formQuery.endTime = parseTime(new Date());
    // }
  },
  methods: {
    handleEdit() {
      debugger;
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "请选择数据",
          type: "warning"
        });
      } else if (this.multipleSelection.length == 1) {
        debugger;

        var id = this.multipleSelection[0].id;
        if (id) {
          this.$router.push({
            path: "/agent/annual_report_detail",
            query: { id: id }
          });
        }
      } else if (this.multipleSelection.length > 1) {
        this.$message({
          message: "请选择单条数据",
          type: "warning"
        });
      }
    },
    handleSizeChange(val) {
      this.getTableList();
    },
    handleCurrentChange(val) {
      this.getTableList();
    },
    getTableList() {
      this.tableLoading = true;
      this.formQuery.beginTime = this.createDate[0];
      this.formQuery.endTime = this.createDate[1];
      getReportInfoList(this.formQuery).then(response => {
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
    }
  }
};
</script>
<style>
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
</style>
