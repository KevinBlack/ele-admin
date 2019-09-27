  <template>
  <el-card class="detailsContainer">
    <!-- part1 -->
    <el-form ref="formQuery" :model="formQuery" label-width="100px" size="mini">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="时间从" size="mini" prop="beginTime">
            <el-date-picker
              type="datetime"
              v-model="formQuery.beginTime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              size="mini"
              suffix-icon="el-icon-date"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="至" size="mini" prop="endTime">
            <el-date-picker
              v-model="formQuery.endTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              size="mini"
              suffix-icon="el-icon-date"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="企业名称" size="mini" prop="businessName">
            <el-input v-model="formQuery.businessName" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否经营异常" size="mini" prop="status">
            <el-select v-model="formQuery.status" filterable placeholder="请选择" size="mini">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" style="text-align: center;margin: 10px 0;">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="getTableList">查询</el-button>
          <el-button
            type="primary"
            icon="el-icon-refresh-right"
            @click="resetForm('formQuery')"
            size="mini"
          >重置</el-button>
        </el-col>
        <el-col :span="24">
          <el-button type="primary" icon size="mini">查看信息</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- part3 -->
    <el-row :gutter="10">
      <!-- <el-col :span="24">
        <div class="dtl-info-line">
          已选择{{ sum }}条
          <el-button type="text" style="margin-left: 20px;" @click="toggleSelection()">清空</el-button>
        </div>
      </el-col> -->
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
      <!-- <el-table-column type="selection" width="55" /> -->
      <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
      <el-table-column prop="businessName" label="企业名称" width="250" align="center"></el-table-column>
      <el-table-column prop="socialCode" label="社会信用代码" width="250" align="center"></el-table-column>
      <el-table-column prop="licenseNo" label="工商营业执照" width="250" align="center"></el-table-column>
      <el-table-column prop="securityEvent" label="安全事件" width="250" align="center"></el-table-column>
      <el-table-column prop="status" label="是否经营异常" align="left" :show-overflow-tooltip="true"></el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      style="text-align: right;margin-top: 20px;"
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
import { getCompanyInfoList } from "@/api/hxxd/agent";
import { parseTime } from "@/utils/index.js";
export default {
  data() {
    return {
      pageTotal: 0,
      tableLoading: false,
      sum: 2,
      tableData: [],
      formQuery: {
        businessName: "",
        beginTime: "",
        endTime: "",
        status: "",
        pageNo: 1,
        pageSize: 5,
        orderBy: ""
      },
      statusOptions: [
        {
          value: "0",
          label: "异常"
        },
        {
          value: "1",
          label: "非异常"
        }
      ]
    };
  },
  created() {
    this.getTableList();
    this.formQuery.endTime = parseTime(new Date());
  },
  methods: {
    getTableList() {
      this.tableLoading = true;
      getCompanyInfoList(this.formQuery).then(response => {
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
    handleSelectionChange() {},
    toggleSelection() {}
  }
};
</script>
<style>
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
