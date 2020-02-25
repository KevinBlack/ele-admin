<template>
  <div>
    <el-card class="detailsContainer">
      <!-- 查询面板 -->
      <el-form ref="formQuery" :model="formQuery" label-width="100px" size="mini">
        <el-row :gutter="20" class="area_border">
          <el-col :span="6">
            <el-form-item label="公司编号" size="mini" prop="companyCode">
              <el-input v-model="formQuery.companyCode" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="公司名称" size="mini" prop="companyName">
              <el-input v-model="formQuery.companyName" size="mini" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="归属系统" size="mini" prop="system">
              <el-select
                v-model="formQuery.system"
                filterable
                clearable
                placeholder="请选择"
                size="mini"
                style="width:100%"
              >
                <el-option
                  v-for="item in dict.system"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态" size="mini" prop="status">
              <el-select
                v-model="formQuery.status"
                filterable
                clearable
                placeholder="请选择"
                size="mini"
                style="width:100%"
              >
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" style="text-align: center;margin: 10px 0;">
            <el-form-item size="mini">
              <el-button type="primary" icon="el-icon-search" size="mini" @click="search">查询</el-button>
              <el-button size="mini" icon="el-icon-refresh-right" @click="resetForm('formQuery')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 按钮区域 -->
      <el-row class="area_bordes">
        <el-col :span="24">
          <el-button-group size="mini">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
            <el-button type="primary" icon="el-icon-delete" size="mini" @click="batchDelete">批量删除</el-button>
            <el-button
              type="primary"
              icon="el-icon-circle-check"
              size="mini"
              @click="batchStart"
            >批量启用</el-button>
            <el-button
              type="primary"
              icon="el-icon-circle-close"
              size="mini"
              @click="batchStop"
            >批量停用</el-button>
          </el-button-group>
          <el-button-group size="mini" style="margin-left: 20px;">
            <el-button
              type="primary"
              class="btn_line"
              icon="el-icon-zoom-in"
              size="mini"
              @click="handleView"
            >查看</el-button>
          </el-button-group>
        </el-col>
      </el-row>

      <!-- 表格区 -->
      <el-table
        ref="companyTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%;margin-bottom:20px;"
        @selection-change="selectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column prop="companyName" label="公司名称" width="200" align="left" />
        <el-table-column prop="companyCode" label="公司编码" width="150" align="center" />
        <el-table-column
          align="center"
          prop="status"
          width="100"
          :formatter="statusFmt"
          label="状态"
        />
        <el-table-column prop="treeSort" label="排序号" width="100" align="center" />
        <el-table-column prop="updateDate" label="更新时间" width="180" align="center" />
        <el-table-column
          prop="system"
          label="归属系统"
          width="200"
          align="center"
          :formatter="systemFmt"
        />
        <el-table-column prop="remarks" label="备注" align="left" :show-overflow-tooltip="true" />
        <!-- <el-table-column fixed="right" label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>-->
      </el-table>
      <el-col class="area_bordes">
        <el-col :span="24" style="text-align: right;">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="formQuery.pageNo"
            :page-size.sync="formQuery.pageSize"
            :page-sizes="[15, 30, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageTotal"
          />
        </el-col>
      </el-col>
    </el-card>
  </div>
</template>

<script>
import {
  getCompanyList,
  // getCompany,
  deleteCompany,
  stopCompany,
  startCompany
} from "@/api/system/company";
import { getDictDataLists } from "@/api/system/comm/comm";
import { getDictName } from "@/utils/index.js";

export default {
  name:'Company',
  props: {
    pageCode: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      treeData: [],
      treeDefaultProps: {
        children: "childs",
        label: function(data, node) {
          return data.companyName;
        }
      },
      dict: {
        system: []
      },
      pageTotal: 0,
      formQuery: {
        companyCode: "",
        companyName: "",
        status: "0",
        system:'',
        pageNo: 1,
        pageSize: 15,
        orderBy: "",
        isDelete: "0"
      },
      tableLoading: false,
      tableData: [],
      tableMultiSelection: [],
      statusOptions: [
        {
          value: "0",
          label: "正常"
        },
        {
          value: "2",
          label: "停用"
        }
      ]
    };
  },
  created() {
    //加载字典
    this.beforeLoading();
    this.getTableList();
  },
  mounted() {
    console.log(this.pageCode);
  },
  methods: {
    beforeLoading() {
      getDictDataLists("97001005").then(response => {
        this.dict.system = response.data.jq97001005;
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
      this.tableLoading = true;
      getCompanyList(this.formQuery).then(response => {
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
    handleView() {
      if (!this.tableMultiSelection) {
        this.$message({
          type: "info",
          message: "请选中查看的数据!"
        });
        return;
      }
      const selectRows = this.tableMultiSelection;
      if (selectRows.length === 0 || selectRows.length > 1) {
        var msg =
          selectRows.length == 0
            ? "请选中要查看的数据"
            : "只能选择一条数据进行查看";
        this.$message({
          type: "info",
          message: msg
        });
        return;
      }
      const companyId = selectRows[0].companyId;
      if (companyId) {
        this.$router.push({
          path: "/system/company-detail",
          query: { companyId: companyId }
        });
      }
    },
    batchStop() {
      if (!this.tableMultiSelection) {
        this.$message({
          type: "info",
          message: "请选中要停用的数据!"
        });
        return;
      }
      const selectRows = this.tableMultiSelection;
      if (selectRows.length === 0) {
        this.$message({
          type: "info",
          message: "请选中要停用的数据!"
        });
        return;
      }
      this.$confirm("是否执行停用操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var companyIdArr = [];
          Object.keys(selectRows).forEach(function(key) {
            if (selectRows[key].companyId) {
              companyIdArr.push(selectRows[key].companyId);
            }
          });
          if (companyIdArr && companyIdArr.length > 0) {
            var companyIds = companyIdArr.join();
            stopCompany(companyIds).then(response => {
              this.$message({
                type: "success",
                message: "停用成功!"
              });
              this.getTableList();
            });
          }
        })
        .catch(() => {
          // 取消时执行此处
        });
    },
    batchStart() {
      if (!this.tableMultiSelection) {
        this.$message({
          type: "info",
          message: "请选中要启用的数据!"
        });
        return;
      }
      const selectRows = this.tableMultiSelection;
      if (selectRows.length === 0) {
        this.$message({
          type: "info",
          message: "请选中要启用的数据!"
        });
        return;
      }
      this.$confirm("是否执行启用操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var companyIdArr = [];
          Object.keys(selectRows).forEach(function(key) {
            console.log(selectRows[key].companyId);
            if (selectRows[key].companyId) {
              companyIdArr.push(selectRows[key].companyId);
            }
          });
          if (companyIdArr && companyIdArr.length > 0) {
            var companyIds = companyIdArr.join();
            startCompany(companyIds).then(response => {
              this.$message({
                type: "success",
                message: "启用成功!"
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
      this.$confirm("是否执行删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var companyIdArr = [];
          Object.keys(selectRows).forEach(function(key) {
            if (selectRows[key].companyId) {
              companyIdArr.push(selectRows[key].companyId);
            }
          });
          if (companyIdArr && companyIdArr.length > 0) {
            var companyIds = companyIdArr.join();
            deleteCompany(companyIds).then(response => {
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
      this.$router.push({ path: "/system/company-detail", query: {} });
    },
    statusFmt(row, column, cellValue, index) {
      const status = row.status.trim();
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
    systemFmt(row, column, cellValue, index) {
      return getDictName(this.dict.system, row.system);
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
</style>
