<template>
  <div>
    <el-card class="detailsContainer">
      <el-form ref="formQuery" :model="formQuery" label-width="100px" size="mini">
        <el-row :gutter="20" class="area_border">
          <el-col :span="5">
            <el-form-item label="角色编号" size="mini" prop="roleCode">
              <el-input v-model="formQuery.roleCode" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="角色名称" size="mini" prop="roleName">
              <el-input v-model="formQuery.roleName" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="状态" size="mini" prop="status">
              <el-select
                v-model="formQuery.status"
                filterable
                placeholder="请选择"
                size="mini"
                style="width:100%"
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
          <el-col :span="5">
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
            <el-button type="primary" icon="el-icon-view" size="mini" @click="editDataScope">数据权限</el-button>
          </el-button-group>
        </el-col>
      </el-row>

      <el-table
        ref="roleTable"
        :data="tableData"
        border
        tooltip-effect="dark"
        style="width: 100%;margin-bottom:20px;"
        @selection-change="selectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="roleCode" label="角色编码" width="200" align="left"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="250" align="left"></el-table-column>
        <el-table-column prop="status" label="状态" width="150" align="center" :formatter="statusFmt"></el-table-column>
        <el-table-column
          prop="system"
          label="归属系统"
          width="200"
          align="center"
          :formatter="systemFmt"
        />
        <el-table-column prop="roleSort" label="排序号" width="150" align="center"></el-table-column>
        <el-table-column prop="updateDate" label="更新时间" width="200" align="center"></el-table-column>
        <el-table-column prop="remarks" label="备注" align="left" :show-overflow-tooltip="true"></el-table-column>
      </el-table>
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
import { getDictDataLists } from "@/api/system/comm/comm";
import { getDictName } from "@/utils/index.js";

export default {
  name: "Role",
  data() {
    return {
      formQuery: {
        roleCode: "",
        roleName: "",
        system: "",
        status: "0",
        pageNo: 1,
        pageSize: 20,
        orderBy: "roleSort+"
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
  },
  methods: {
    beforeLoading() {
      getDictDataLists("97001005").then(response => {
        this.dict.system = response.data.jq97001005;
      });
    },
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
      const roleId = selectRows[0].roleId;
      if (roleId) {
        this.$router.push({
          path: "/system/role-detail",
          query: { roleId: roleId }
        });
      }
    },
    systemFmt(row, column, cellValue, index) {
      return getDictName(this.dict.system, row.system);
    },
    editDataScope() {
      if (!this.tableMultiSelection) {
        this.$message({
          type: "info",
          message: "请选中要操作的数据!"
        });
        return;
      }
      const selectRows = this.tableMultiSelection;
      if (selectRows.length === 0 || selectRows.length > 1) {
        var msg =
          selectRows.length == 0
            ? "请选中要操作的数据"
            : "只能选择一条数据进行操作";
        this.$message({
          type: "info",
          message: msg
        });
        return;
      }
      const roleId = selectRows[0].roleId;
      if (roleId) {
        this.$router.push({
          path: "/system/role-datascope",
          query: { roleId: roleId }
        });
      }
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
