<template>
  <div style="margin: 0 10px;">
    <el-row>
      <el-col :md="5" :lg="5" :xl="4">
        <el-card class="box-card" style="height:736px">
          <el-tree :data="treeData" :props="treeDefaultProps" @node-click="handleNodeClick"></el-tree>
        </el-card>
      </el-col>
      <el-col :md="19" :lg="19" :xl="20">
        <!-- 查询面板 -->
        <el-card class="detailsContainer" style="height:736px">
          <el-form ref="formQuery" :model="formQuery" label-width="100px" size="mini">
            <el-row :gutter="20" class="area_border">
              <el-col>
                <el-form-item label="机构Id" size="mini" prop="officeId" style="display:none;">
                  <el-input v-model="formQuery.officeId" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="机构编号" size="mini" prop="officeCode">
                  <el-input v-model="formQuery.officeCode" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="机构名称" size="mini" prop="officeName">
                  <el-input v-model="formQuery.officeName" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="归属系统" size="mini" prop="system">
                  <el-select
                    v-model="formQuery.system"
                    filterable clearable
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
              <el-col :span="5">
                <el-form-item label="状态" size="mini" prop="status">
                  <el-select v-model="formQuery.status" filterable clearable placeholder="请选择" size="mini"  
                  >
                    <el-option
                      v-for="item in statusOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
             <el-col :span="9" style="text-align: left;padding-left: 1.3em;">
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
                <el-button
                  type="primary"
                  icon="el-icon-arrow-down"
                  size="mini"
                  @click="addSubOffice"
                >添加下级</el-button>
                <el-button
                  type="primary"
                  icon="el-icon-delete"
                  size="mini"
                  @click="batchDelete"
                >批量删除</el-button>
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
            ref="officeTable"
            :data="tableData"
            border
            @selection-change="selectionChange"
            tooltip-effect="dark"
            style="width: 100%;margin-bottom:20px;"
          >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="officeCode" label="机构编码" width="150" align="center"></el-table-column>
            <el-table-column prop="officeName" label="机构名称" width="200" align="center"></el-table-column>
            <el-table-column
              align="center"
              prop="status"
              width="100"
              :formatter="statusFmt"
              label="状态"
            ></el-table-column>
            <el-table-column prop="treeSort" label="排序号" width="100" align="center"></el-table-column>
            <el-table-column
              prop="system"
              label="归属系统"
              width="200"
              align="center"
              :formatter="systemFmt"
            ></el-table-column>
            <el-table-column prop="updateDate" label="更新时间" width="180" align="center"></el-table-column>
            <el-table-column prop="remarks" label="备注" align="left" :show-overflow-tooltip="true"></el-table-column>
          </el-table>
          <!-- 分页 -->
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
              ></el-pagination>
            </el-col>
          </el-col>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getOfficeList,
  getOfficeTree,
  getOffice,
  saveOffice,
  deleteOffice,
  stopOffice,
  startOffice
} from "@/api/system/office";
import { getDictDataLists } from "@/api/system/comm/comm";
import { getDictName } from "@/utils/index.js";

export default {
  name:'Office',
  data() {
    return {
      treeData: [],
      treeDefaultProps: {
        children: "childs",
        label: function(data, node) {
          return data.officeName;
        }
      },
      pageTotal: 0,
      formQuery: {
        officeId: "",
        officeCode: "",
        officeName: "",
        system: "",
        status: "0",
        pageNo: 1,
        pageSize: 15,
        orderBy: ""
      },
      dict: {
        system: []
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
    this.beforeLoading();
    this.getTableList();
    this.getTreeData();
  },
  methods: {
    beforeLoading() {
      getDictDataLists("97001005").then(response => {
        this.dict.system = response.data.jq97001005;
      });
    },
    handleNodeClick(data) {
      this.formQuery.officeId = data.officeId;
      this.getTableList();
    },
    selectionChange(val) {
      this.tableMultiSelection = val;
    },
    search() {
      this.formQuery.officeId = "";
      this.getTableList();
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    getTreeData() {
      getOfficeTree().then(response => {
        this.treeData = response.data;
      });
    },
    getTableList() {
      this.tableLoading = true;
      getOfficeList(this.formQuery).then(response => {
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
      const officeId = selectRows[0].officeId;
      if (officeId) {
        this.$router.push({
          path: "/system/office-detail",
          query: { officeId: officeId }
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
      let selectRows = this.tableMultiSelection;
      if (selectRows.length == 0) {
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
          var officeIdArr = new Array();
          Object.keys(selectRows).forEach(function(key) {
            if (selectRows[key].officeId) {
              officeIdArr.push(selectRows[key].officeId);
            }
          });
          if (officeIdArr && officeIdArr.length > 0) {
            var officeIds = officeIdArr.join();
            stopOffice(officeIds).then(response => {
              this.$message({
                type: "success",
                message: "停用成功!"
              });
              this.getTableList();
              this.getTreeData();
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
      let selectRows = this.tableMultiSelection;
      if (selectRows.length == 0) {
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
          var officeIdArr = new Array();
          Object.keys(selectRows).forEach(function(key) {
            console.log(selectRows[key].officeId);
            if (selectRows[key].officeId) {
              officeIdArr.push(selectRows[key].officeId);
            }
          });
          if (officeIdArr && officeIdArr.length > 0) {
            var officeIds = officeIdArr.join();
            startOffice(officeIds).then(response => {
              this.$message({
                type: "success",
                message: "启用成功!"
              });
              this.getTableList();
              this.getTreeData();
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
      let selectRows = this.tableMultiSelection;
      if (selectRows.length == 0) {
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
          var officeIdArr = new Array();
          Object.keys(selectRows).forEach(function(key) {
            if (selectRows[key].officeId) {
              officeIdArr.push(selectRows[key].officeId);
            }
          });
          if (officeIdArr && officeIdArr.length > 0) {
            var officeIds = officeIdArr.join();
            deleteOffice(officeIds).then(response => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getTableList();
              this.getTreeData();
            });
          }
        })
        .catch(() => {
          // 取消时执行此处
        });
    },
    addSubOffice() {
      if (!this.tableMultiSelection) {
        this.$message({
          type: "info",
          message: "请选中要操作的的数据!"
        });
        return;
      }
      const selectRows = this.tableMultiSelection;
      if (selectRows.length === 0 || selectRows.length > 1) {
        var msg =
          selectRows.length == 0 ? "请选中要操作的数据" : "只能选择一条数据";
        this.$message({
          type: "info",
          message: msg
        });
        return;
      }
      const parentIds = selectRows[0].parentIds + selectRows[0].officeId;
      // 添加下级
      this.$router.push({
        path: "/system/office-detail",
        query: { parentIds: parentIds }
      });
    },
    handleAdd() {
      this.$router.push({ path: "/system/office-detail", query: {} });
    },
    statusFmt(row, column, cellValue, index) {
      let status = row.status.trim();
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
