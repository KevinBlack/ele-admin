<template>
  <el-card class="detailsContainer">
    <!-- 查询面板start -->
    <!-- label-width='65px' -->
    <el-form ref="formQuery" :model="formQuery" :inline="true" size="mini">
      <el-row :gutter="20" class="area_border">
        <el-col :span="6">
          <el-form-item label="会员名称" size="mini" prop="memberName">
            <el-input v-model="formQuery.memberName" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="会员类别" size="mini" prop="memberType">
            <el-input v-model="formQuery.memberType" size="mini" />
          </el-form-item>
        </el-col>
        <el-col :span="7">
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
        <el-col :span="5" style="text-align: left;padding-left: 1.3em;">
          <el-form-item size="mini">
            <el-button type="primary" size="mini" icon="el-icon-search" @click="search">查询</el-button>
            <el-button size="mini" icon="el-icon-refresh-right" @click="resetForm('formQuery')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 查询面板end -->
    <!-- 按钮区 -->
    <el-row class="area_bordes">
      <el-col :span="24">
        <el-radio-group size="mini">
          <el-radio-button
            class="btn_line"
            type="primary"
            size="mini"
            @click.native.prevent="handleAdd()"
          >新建</el-radio-button>
          <el-radio-button
            class="btn_line"
            type="primary"
            size="mini"
            @click.native.prevent="modify()"
          >修改</el-radio-button>
          <el-radio-button
            class="btn_line"
            type="primary"
            size="mini"
            @click.native.prevent="batchDelete()"
          >删除</el-radio-button>
          <el-radio-button
            class="btn_line"
            type="primary"
            size="mini"
            @click.native.prevent="handleInfo()"
          >查看</el-radio-button>
        </el-radio-group>
        <el-button class="btn_line" type="primary" icon="el-icon" size="mini" @click="submit">提交</el-button>
      </el-col>
    </el-row>
    <!-- 按钮区end -->
    <!-- 表格区2 -->
    <el-row :gutter="10">
      <el-col :span="24">
        <div class="dtl-info-line">
          已选择{{ sum }}条
          <el-button type="text" style="margin-left: 20px;" @click="toggleSelection()">清空</el-button>
        </div>
      </el-col>
    </el-row>
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
      <el-table-column prop="id" label="ID" align="center" v-if="show" />
      <el-table-column
        prop="memberId"
        label="会员ID"
        width="70"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column prop="memberName" label="会员名称" width="80" align="center" />
      <el-table-column prop="memberType" label="会员类别" width="80" align="center" />
      <el-table-column prop="memberGrade" label="会员等级" width="80" align="center" />
      <el-table-column prop="paymentYear" label="缴费年度" width="80" align="center" />
      <el-table-column
        prop="paymentDate"
        label="缴纳日期"
        width="80"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="contributionStandard"
        label="会费标准"
        width="80"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="discount"
        label="折扣"
        width="50"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="amountDue"
        label="应缴金额"
        width="80"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="paymentAmount"
        label="实缴金额"
        width="80"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="agent"
        label="经办人"
        width="80"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="remarks"
        label="备注"
        width="50"
        align="center"
        :show-overflow-tooltip="true"
      />
      <!-- <el-table-column
              align="center"
              prop="spState"
              width="150"
              :formatter="statusFmt"
              label="状态"
      />-->
      <el-table-column fixed="right" prop="spState" label="状态" width="160" align="center">
        <template scope="scope">
          <span v-if="scope.row.spState==='30'" style="color:green">通过</span>
          <span v-else-if="scope.row.spState==='25'" style="color: red">驳回</span>
          <span v-else-if="scope.row.spState==='10'" style="color: blue">未提交</span>
          <span v-else-if="scope.row.spState==='20'" style="color: blue">待审核</span>
          <span v-else-if="scope.row.spState==='00'" style="color: blue">制单中</span>
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
  saveSp,
  getDjInfoList,
  deleteMember
} from "@/api/hxxd/membership-fee-mange";

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
        spState: ""
      },
      tableLoading: false,
      tableData: [],
      tableMultiSelection: [],
      statusOptions: [
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
  },
  methods: {
    submit() {
      let selectRows = this.tableMultiSelection;
      if (!this.tableMultiSelection) {
        this.$message({
          type: "info",
          message: "请选中要提交的数据!"
        });
        return;
      }
      if (selectRows.length === 0) {
        this.$message({
          type: "info",
          message: "请选中要提交的数据!"
        });
        return;
      }
      var idArr = [];
      Object.keys(selectRows).forEach(key => {
        if (selectRows[key].spState != "10") {
          this.$notify({
            title: "提示",
            message: "只能操作未提交数据",
            type: "warning",
            duration: 2000
          });
          return;
        }
        if (selectRows[key].id) {
          idArr.push(selectRows[key].id);
        }
      });
      if (idArr && idArr.length > 0) {
        var ids = idArr.join();
        saveSp(ids, "20").then(response => {
          if (response.status == 200) {
            this.getTableList();
            //保存成功
            this.$message({
              type: "success",
              message: "提交成功!"
            });
          } else {
            //保存失败
            this.$message({
              type: "success",
              error: "提交失败!"
            });
          }
        });
      }
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
      return "height:15px;font-size: 13px;color: #333;font-weight: normal";
    },
    headRowStyle(row, rowIndex) {
      return "height:15px";
    },
    getCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background: #F2F2F2;font-size: 13px;color: #333;font-weight: normal";
      } else {
        return "";
      }
    },
    handleBatchCommand(command) {
      if (command === "batchDelete") {
        this.batchDelete();
      }
    },
    batchDelete() {
      if (this.tableMultiSelection.length === 0) {
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
    },
    handleAdd() {
      this.$router.push({
        path: "/membership-fee-mange/add",
        query: {}
      });
    },
    modify() {
      if (this.tableMultiSelection.length === 0) {
        this.$message({
          type: "info",
          message: "请选中要修改的数据!"
        });
        return;
      }
      const selectRows = this.tableMultiSelection;
      if (selectRows.length == 0) {
        this.$message({
          type: "info",
          message: "请选中要修改的数据!"
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
      var spState = selectRows[0].spState;
      if (spState != "10") {
        this.$message({
          type: "info",
          message: "请选择未提交的数据!"
        });
        return;
      }
      this.$router.push({
        path: "/membership-fee-mange/add",
        query: {
          selectId: selectId
        }
      });
    },
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
        path: "/membership-fee-mange/dj_Info",
        query: {
          selectId: selectId
        }
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
</style>
