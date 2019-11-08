<template>
  <div>
    <el-card class="box-card" style="margin: 0 10px;">
      <div class="filter-container">
        <el-card class="box-card" shadow="never">
          <el-form ref="formQuery" :model="formQuery" label-width="80px" :inline="true">
            <el-row>
              <el-col :md="8" :lg="8" :xl="6">
                <el-form-item label="角色编号" size="mini" prop="roleCode">
                  <el-input v-model="formQuery.roleCode" size="mini" style="width: 200px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="8" :lg="8" :xl="6">
                <el-form-item label="角色名称" size="mini" prop="roleName">
                  <el-input v-model="formQuery.roleName" size="mini" style="width: 200px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :md="8" :lg="8" :xl="6">
                <el-form-item label="状态" size="mini" prop="status">
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
              <el-col :md="8" :lg="8" :xl="6">
                <el-form-item size="mini">
                  <el-button type="primary" size="mini" @click="search">查询</el-button>
                  <el-button size="mini" @click="resetForm('formQuery')">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>

        <el-card class="box-card" shadow="never" :body-style="{ minHeight: '600px' }">
          <!-- 按钮区 -->
          <el-card
            shadow="never"
            style="padding:15px;border-radius:0px;"
            :body-style="{ padding: '0px' }"
          >
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd()">新建</el-button>
            <el-dropdown trigger="click" size="mini" @command="handleBatchCommand">
              <el-button type="primary" size="mini">
                批量操作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-delete" command="batchDelete">删除</el-dropdown-item>
                <el-dropdown-item icon="el-icon-close" command="batchStop">停用</el-dropdown-item>
                <el-dropdown-item icon="el-icon-check" command="batchStart">启用</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-card>

          <el-table
            ref="roleTable"
            :data="tableData"
            style="width:100%"
            :header-row-style="headRowStyle"
            :row-style="rowStyle"
            :header-cell-style="getCellStyle"
            v-loading="tableLoading"
            border
            highlight-current-row
            @selection-change="selectionChange"
          >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="roleCode" label="角色编码" width="200" align="center"></el-table-column>
            <el-table-column prop="roleName" label="角色名称" width="200" align="center"></el-table-column>
            <el-table-column
              align="center"
              prop="status"
              width="150"
              :formatter="statusFmt"
              label="状态"
            ></el-table-column>
            <el-table-column prop="roleSort" label="排序号" width="150" align="center"></el-table-column>
            <el-table-column prop="updateDate" label="更新时间" width="200" align="center"></el-table-column>
            <el-table-column prop="remarks" label="备注" align="left" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column fixed="right" label="操作" width="150" align="center">
              <template slot-scope="scope">
                <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="editDataScope(scope.row)" type="text" size="small">数据权限</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  getRoleList,
  getRole,
  deleteRole,
  stopRole,
  startRole
} from "@/api/system/role";

export default {
  data() {
    return {
      formQuery: {
        roleCode: "",
        roleName: "",
        status: "0",
        pageNo: 1,
        pageSize: 20,
        orderBy: "roleSort+"
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
    this.getTableList();
  },
  methods: {
    statusFmt(row, column, cellValue, index) {
      let status = row.status;
      if (status === "0") {
        return "正常";
      } else if (status === "2") {
        return "停用";
      } else {
        return row.status;
      }
    },
    getTableList() {
      this.tableLoading = true;
      getRoleList(this.formQuery).then(response => {
        this.tableData = response.data;
        this.tableLoading = false;
      });
    },
    search() {
      this.getTableList();
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    handleBatchCommand(command) {
      if (command == "batchDelete") {
        this.batchDelete();
      } else if (command == "batchStop") {
        this.batchStop();
      } else if (command == "batchStart") {
        this.batchStart();
      }
    },
    selectionChange(val) {
      this.tableMultiSelection = val;
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
          var roleIdArr = new Array();
          Object.keys(selectRows).forEach(function(key) {
            if (selectRows[key].roleId) {
              roleIdArr.push(selectRows[key].roleId);
            }
          });
          if (roleIdArr && roleIdArr.length > 0) {
            var roleIds = roleIdArr.join();
            stopRole(roleIds).then(response => {
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
          var roleIdArr = new Array();
          Object.keys(selectRows).forEach(function(key) {
            console.log(selectRows[key].roleId);
            if (selectRows[key].roleId) {
              roleIdArr.push(selectRows[key].roleId);
            }
          });
          if (roleIdArr && roleIdArr.length > 0) {
            var roleIds = roleIdArr.join();
            startRole(roleIds).then(response => {
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
          var roleIdArr = new Array();
          Object.keys(selectRows).forEach(function(key) {
            if (selectRows[key].roleId) {
              roleIdArr.push(selectRows[key].roleId);
            }
          });
          if (roleIdArr && roleIdArr.length > 0) {
            var roleIds = roleIdArr.join();
            deleteRole(roleIds).then(response => {
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
      this.$router.push({ path: "/system/role-detail", query: {} });
    },
    handleEdit(row) {
      var roleId = row.roleId;
      if (roleId) {
        this.$router.push({
          path: "/system/role-detail",
          query: { roleId: roleId }
        });
      }
    },
    editDataScope(row) {
      this.$router.push({
        path: "/system/role-datascope",
        query: { roleId: row.roleId }
      });
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
    }
  }
};
</script>
<style>
.el-table--medium th,
.el-table--medium td {
  padding: 0px 0;
}
</style>
