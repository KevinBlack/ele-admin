<template>
  <el-card style="margin: 0 10px;">
    <div class="app-container">
      <el-row>
        <el-col>
          <!-- 查询面板start -->
          <el-card class="box-card" shadow="never">
            <!-- label-width='65px' -->
            <el-form ref="formQuery" :model="formQuery" :inline="true">
              <el-row>
                <el-col :span="14">
                  <el-form-item label="签约时间从" size="mini" prop="timeValue">
                    <el-date-picker
                      type="datetimerange"
                      v-model="formQuery.timeValue"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      format="yyyy-MM-dd HH:mm:ss"
                      value-format="yyyy-MM-dd HH:mm:ss"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="处罚类别" size="mini" prop="punishmentType">
                    <el-select v-model="formQuery.punishmentType" filterable placeholder="请选择" size="mini"  >
                      <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value" >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4" style="text-align: right;">
                  <el-form-item size="mini">
                    <el-button type="primary" size="mini" @click="search">查询</el-button>
                    <el-button size="mini" @click="resetForm('formQuery')">重置</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-card>
          <!-- 查询面板end -->
          <!-- 表格区 -->
          <el-card class="box-card" shadow="never" :body-style="{ minHeight: '600px' }">
            <!-- 按钮区 -->
            <el-card
              shadow="never"
              style="padding:15px;border-radius:0px;"
              :body-style="{ padding: '0px' }"
            >
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleAdd()">新增</el-button>
                <el-button type="primary" size="mini" @click="handleRelease(scope.row)">门户发布</el-button>
                <el-button type="primary" size="mini" @click="handleReport(scope.row)">上报</el-button>
              </template>
            </el-card>
            <!-- 按钮区end -->
            <!-- 表格区2 -->
            <el-table
              ref="companyTable"
              v-loading="tableLoading"
              :data="tableData"
              style="width:100%"
              :header-row-style="headRowStyle"
              :row-style="rowStyle"
              :header-cell-style="getCellStyle"
              border
              highlight-current-row
              @selection-change="selectionChange"
            >
              <el-table-column type="selection" width="55" align="center" /><el-table-columnprop="businessCategory" label="业务类别" align="center" />
              <el-table-column prop="praiseEvent" label="表扬事件" align="center" />
              <el-table-column prop="salesAgent" label="销售代理人" align="center" />
              <el-table-column
                prop="validityAgreement"
                label="协议有效期"
                align="center"
                :show-overflow-tooltip="true"
              />
              <el-table-column
                prop="createTime"
                label="签约时间"
                align="left"
                :show-overflow-tooltip="true"
              />
              <el-table-column
                align="center"
                prop="releaseStatus"
                :formatter="releaseStatus"
                label="发布状态"
              />
              <el-table-column
                align="center"
                prop="punishmentType"
                :formatter="punishCategory"
                label="处罚类别"
              />
            </el-table>
            <!-- 表格区2end -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="formQuery.pageNo"
              :page-size.sync="formQuery.pageSize"
              :page-sizes="[15, 30, 50, 100]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageTotal"
            ></el-pagination>
          </el-card>
          <!-- 表格区end -->
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import {selectSecurityIncident } from "@/api/hxxd/complaintInfo";
import { parseTime } from "@/utils/index.js";
export default {
  props: {
    pageCode: {
      type: String,
      default: ""
    }
  },
  // data 开始
  data() {
    return {
      show: false,
      treeData: [],
      treeDefaultProps: {
        children: "childs",
        label: function(data, node) {
          return data.complainant;
        }
      },
      pageTotal: 0,
      formQuery: {
        punishmentType: "",
        pageNo: 1,
        pageSize: 15,
        startTime: "",
        endTime: "",
        timeValue: []
      },
      tableLoading: false,
      tableData: [],
      tableMultiSelection: [],
      statusOptions: [
        {
          value: "1",
          label: "警告"
        },
        {
          value: "2",
          label: "罚款"
        }
      ]
    };
  },
  // data 结束
  created() {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
    this.formQuery.timeValue = [parseTime(start), parseTime(end)];
    this.formQuery.startTime = this.formQuery.timeValue[0];
    this.formQuery.endTime = this.formQuery.timeValue[1];
    this.getTableList();
  },
  methods: {
    handleAdd() {
       this.$router.push({
        path: "/hxxd/securityIncidentAdd",query: {}
      });
    },
    selectionChange(val) {
      this.tableMultiSelection = val;
    },
    search() {
      this.getTableList();
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    getTableList() {
      var startTime = "";
      var endTime = "";
      if (this.formQuery.timeValue.length >= 0) {
        this.formQuery.startTime = this.formQuery.timeValue[0];
        this.formQuery.endTime = this.formQuery.timeValue[1];
      }
      this.tableLoading = true;
      selectSecurityIncident(this.formQuery).then(response => {
        this.tableData = response.data;
        this.pageTotal = response.page.total;
        console.log(this.pageTotal);
        this.tableLoading = false;
      });
    },
    handleSizeChange() {
      this.getTableList();
    },
    handleCurrentChange() {
      this.getTableList();
    },
    rowStyle(row, rowIndex) {
      return "height:15pxfont-size: 13pxcolor: #333font-weight: normal ";
    },
    headRowStyle(row, rowIndex) {
      return "height:15px";
    },
    getCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background: #F2F2F2font-size: 13pxcolor: #333font-weight: normal";
      } else {
        return "";
      }
    },
    releaseStatus(row, column, cellValue, index) {
      let status = row.releaseStatus;
      if (status === "0") {
        return "未发布";
      } else if (status === "1") {
        return "已发布";
      } else {
        return row.status;
      }
    },
    punishCategory(row, column, cellValue, index) {
      const punishmentType = row.punishmentType;
      if (punishmentType === "1") {
        return "警告";
      } else if (punishmentType === "2") {
        return "罚款";
      } else {
        return row.punishmentType;
      }
    }
  }
};
</script>
<style>
.el-aside {
  /* background-color: #d3dce6 */
  color: #333;
  margin-top: 12px;
  width: 250px;
  min-height: 600px;
  margin-bottom: 0px;
  padding-right: 1px;
}

.el-main {
  padding-left: 1px;
  background-color: #e9eef3;
  color: #333;
  /* text-align: center */
  /* line-height: 0px */
  min-height: 600px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-table--medium th,
.el-table--medium td {
  padding: 0px 0;
}
</style>
