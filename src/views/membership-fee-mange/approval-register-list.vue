<template>
  <el-card class="detailsContainer">
    <!-- 查询面板start -->
    <!-- label-width='65px' -->
    <el-form ref="formQuery" :model="formQuery" :inline="true" size="mini">
      <el-row :gutter="20" style="padding-left: 15px;" class="area_border">
        <el-col :span="6">
          <el-form-item label="会员名称" size="mini" prop="memberName">
            <el-input v-model="formQuery.memberName" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="会员类别" size="mini" prop="memberType">
            <el-select v-model="formQuery.memberType" filterable placeholder="请选择" size="mini">
              <el-option v-for="item in memberTypeOptions" :key="item.key" :label="item.value" :value="item.key"  style="width:100%"
                ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="缴费年度" size="mini" prop="paymentYear">
            <el-date-picker
              v-model="formQuery.paymentYear"
              type="year"
              placeholder="请选择缴费年度"
              format="yyyy"
              value-format="yyyy"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="审批状态" size="mini" prop="spState">
            <el-select v-model="formQuery.spState" filterable placeholder="请选择" size="mini">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" style="text-align: center;">
          <el-form-item size="mini">
            <el-button type="primary" size="mini" @click="search" icon="el-icon-search">查询</el-button>
            <el-button size="mini" @click="resetForm('formQuery')" icon="el-icon-refresh-right">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 查询面板end -->
    <!-- 表格区 -->
    <!-- 按钮区 -->
    <el-row class="area_bordes" style="margin-bottom: 0;">
      <el-col :span="24">
        <el-radio-group size="mini">
          <el-radio-button
            class="btn_line"
            type="primary"
            icon="el-icon-check"
            size="mini"
            @click.native.prevent="batchSpTg"
            v-show="btnShow('100021502010')"
          >通 过</el-radio-button>
          <el-radio-button
            class="btn_line"
            type="primary"
            icon="el-icon-close"
            size="mini"
            @click.native.prevent="batchSpBh"
            v-show="btnShow('100021502020')"
          >驳 回</el-radio-button>
          <el-radio-button
            class="btn_line"
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click.native.prevent="handleInfo"
            v-show="btnShow('100021502040')"
          >查 看</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <!-- 按钮区end -->
    <!-- 表格区2 -->
    <!-- <el-row :gutter="10">
      <el-col :span="24">
        <div class="dtl-info-line">
          已选择{{ sum }}条
          <el-button type="text" style="margin-left: 20px;" @click="toggleSelection()">清空</el-button>
        </div>
      </el-col>
    </el-row> -->
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
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column prop="id" label="ID"  align="center" v-if="show" />
      <el-table-column prop="memberId" label="会员ID" align="center" v-if="show" />
      <el-table-column prop="memberName" label="会员名称"  align="center" />
      <el-table-column prop="memberType" label="会员类别" width="105" align="center" />
      <el-table-column prop="memberGrade" label="会员等级" width="80" align="center" />
      <el-table-column prop="paymentYear" label="缴费年度" width="80" align="center" />
      <el-table-column
        prop="paymentDate"
        label="缴纳日期"
        align="center"
        width="120"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="contributionStandard"
        label="会费标准"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column prop="discount" width="50" label="折扣" align="center" :show-overflow-tooltip="true" />
      <el-table-column prop="amountDue" width="80" label="应缴金额" align="center" :show-overflow-tooltip="true" />
      <el-table-column
        prop="paymentAmount"
        label="实缴金额"
        align="center"
        width="80"
        :show-overflow-tooltip="true"
      />
      <el-table-column prop="agent" width="80" label="经办人" align="center" :show-overflow-tooltip="true" />
      <el-table-column fixed="right" prop="spState" label="状态" width="100" align="center">
        <template scope="scope">
          <span v-if="scope.row.spState==='30'" style="color:green">通过</span>
          <span v-else-if="scope.row.spState==='25'" style="color: red">驳回</span>
          <span v-else-if="scope.row.spState==='10'" style="color: blue">未提交</span>
          <span v-else-if="scope.row.spState==='20'" style="color: blue">待审核</span>
          <span v-else style="color: red">{{scope.row.spState}}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格区2end -->
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
    <!-- 表格区end -->
  </el-card>
</template>

<script>
import {
  getDjInfoList,
  deleteMember,
  saveSp
} from "@/api/hxxd/membership-fee-mange";
import { getDictDataLists, getDictDataList } from "@/api/system/comm/comm";
import { getDictName } from "@/utils/index.js";
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
      btns: this.$store.getters.btns['1000215020'],
      sum: 0,
      show: false,
      treeData: [],
      treeDefaultProps: {
        children: "childs",
        label: function(data, node) {
          return data.memberName;
        }
      },
      pageTotal: 0,
      formQuery: {
        id: "",
        memberId: "",
        memberName: "",
        memberType: "",
        memberGrade: "",
        paymentYear: "",
        paymentDate: "",
        contributionStandard: "",
        discount: "",
        amountDue: "",
        paymentAmount: "",
        agent: "",
        remarks: "",
        spState: "20"
        
      },
      tableLoading: false,
      tableData: [],
      memberTypeOptions: [],
      tableMultiSelection: [],
      yearOptions: [
        {
          value: "2019",
          label: "2019"
        },
        {
          value: "2020",
          label: "2020"
        },
        {
          value: "2021",
          label: "2021"
        },
        {
          value: "2022",
          label: "2022"
        }
      ],
      statusOptions: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "20",
          label: "待审核"
        },
        {
          value: "10",
          label: "未提交"
        },
        {
          value: "30",
          label: "通过"
        },
        {
          value: "25",
          label: "驳回"
        }
      ]
    };
  },
  // data 结束
  created() {
    this.getTableList();
    //加载字典
    this.beforeLoading();
  },
  methods: {
    //查看详情
    handleInfo() {
      if (this.tableMultiSelection.length === 0) {
        this.$message({
          type: "info",
          message: "请选中要处理的数据!"
        });
        return;
      }
      const selectRows = this.tableMultiSelection;
      if (selectRows.length == 0) {
        this.$message({
          type: "info",
          message: "请选中要处理的数据!"
        });
        return;
      } else if (selectRows.length >= 2) {
        this.$message({
          type: "info",
          message: "请选中单条数据!"
        });
        return;
      }
      var selectId = selectRows[0].id;
      this.$router.push({
        path: "/membership-fee-manage/register-info",
        query: {
          selectId: selectId
        }
      });
    },
     beforeLoading() {
      getDictDataLists("97001014").then(response => {
        this.memberTypeOptions = response.data.jq97001014;
      });
    },
    btnShow(menuCode) {
      //根据用户所具有的菜单项控制
      var btns = this.btns;
      if (btns && btns.length > 0) {
        for (var i = 0; i < btns.length; i++) {
          if (menuCode === btns[i]) {
            return true;
          }
        }
      }
      return false;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.companyTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.companyTable.clearSelection();
      }
    },
    selectionChange(val) {
      this.tableMultiSelection = val;
      if (val.length !== 0) {
        this.added = val.length;
        this.sum = this.added;
      } else if (val.length === 0) {
        this.sum -= this.added;
      }
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
      this.tableLoading = true;
      getDjInfoList(this.formQuery).then(response => {
        this.tableData = response.data;
        this.pageTotal = response.page.total;
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
      return "height:15px;font-size: 13px;color: #333;font-weight: normal ";
    },
    headRowStyle(row, rowIndex) {
      return "height:15px";
    },
    getCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background:#F2F2F2;font-size: 13px;color: #333;font-weight: normal";
      } else {
        return "";
      }
    },
    batchSpBh() {
      if (!this.tableMultiSelection) {
        this.$message({
          type: "info",
          message: "请选中要驳回的数据!"
        });
        return;
      }
      const selectRows = this.tableMultiSelection;
      if (selectRows.length === 0) {
        this.$message({
          type: "info",
          message: "请选中要驳回的数据!"
        });
        return;
      }
      var spState = selectRows[0].spState;
      if (spState != "20") {
        this.$message({
          type: "warning",
          message: "请选择 待审核 的数据!"
        });
        return;
      }
      this.$confirm("是否执行驳回操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var idArr = [];
          Object.keys(selectRows).forEach(function(key) {
            if (selectRows[key].id) {
              idArr.push(selectRows[key].id);
            }
          });
          if (idArr && idArr.length > 0) {
            var Ids = idArr.join();
            var state = "25";
            saveSp(Ids, state).then(response => {
              this.$message({
                type: "success",
                message: "驳回成功!"
              });
              this.getTableList();
            });
          }
        })
        .catch(() => {
          // 取消时执行此处
        });
    },
    //批量审核通过saveSpTg
    batchSpTg() {
      if (!this.tableMultiSelection) {
        this.$message({
          type: "info",
          message: "请选中要审批通过的数据!"
        });
        return;
      }
      const selectRows = this.tableMultiSelection;
      if (selectRows.length === 0) {
        this.$message({
          type: "info",
          message: "请选中要审批通过的数据!"
        });
        return;
      }
      var spState = selectRows[0].spState;
      if (spState === "10" || spState === "30") {
        this.$message({
          type: "warning",
          message: "请选择 待审核 或 已驳回 的数据!"
        });
        return;
      }
      this.$confirm("是否执行审批通过操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var idArr = [];
          Object.keys(selectRows).forEach(function(key) {
            if (selectRows[key].id) {
              idArr.push(selectRows[key].id);
            }
          });
          if (idArr && idArr.length > 0) {
            var Ids = idArr.join();
            var state = "30";
            saveSp(Ids, state).then(response => {
              this.$message({
                type: "success",
                message: "审批通过!"
              });
              this.getTableList();
            });
          }
        })
        .catch(() => {
          // 取消时执行此处
        });
    },
    batchDelete() {
      if (!this.tableMultiSelection) {
        this.$message({
          type: "info",
          message: "请选中要删除的数据!"
        });
        return;
      }
      const selectRows = this.tableMultiSelection;
      if (selectRows.length === 0) {
        this.$message({
          type: "info",
          message: "请选中要删除的数据!"
        });
        return;
      }
      var spState = selectRows[0].spState;
      if (spState === "25" || spState === "30") {
        this.$message({
          type: "warning",
          message: "请选择 未提交 或 已驳回 的数据!"
        });
        return;
      }
      this.$confirm("是否执行删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var idArr = [];
          Object.keys(selectRows).forEach(function(key) {
            if (selectRows[key].id) {
              idArr.push(selectRows[key].id);
            }
          });
          if (idArr && idArr.length > 0) {
            var ids = idArr.join();
            deleteMember(ids).then(response => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getTableList();
            });
          }
        })
        .catch(() => {
          // 取消时执行此处
        });
    }
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
}
.btn_line {
  margin-right: 2px;
}
/* .el-col-5 {
    width: 24.83333%;
} */
</style>
