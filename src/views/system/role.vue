<template>
  <div class="app-container">
    <div class="filter-container">
      <el-card class="box-card" shadow="never">
        <el-form ref="formQuery" :model="formQuery" label-width="80px" :inline="true">
          <el-row>
            <el-col :md="8" :lg="8" :xl="6">
              <el-form-item label="角色编号" size="mini" prop="roleCode">
                <el-input v-model="formQuery.roleCode" size="mini" style="width: 200px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="8" :lg="8" :xl="6">
              <el-form-item label="角色名称" size="mini" prop="roleName">
                <el-input v-model="formQuery.roleName" size="mini" style="width: 200px;"></el-input>
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
          </el-row>
          <el-row>
            <el-col :span="24" style="text-align:left">
              <el-form-item size="mini">
                <el-button type="primary" size="mini" @click="search">查询</el-button>
                <el-button size="mini" @click="resetForm('formQuery')">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>

      <el-card class="box-card" shadow="never" :body-style="{ minHeight: '600px' }">
        <el-card
          shadow="never"
          style="padding:15px;border-radius:0px;"
          :body-style="{ padding: '0px' }"
        >
          <el-button type="primary" icon="el-icon-search" size="mini" @click="handleView()">查看</el-button>
          <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd()">新建</el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit()">编辑</el-button>
          <el-button type="primary" icon="el-icon-delete" size="mini" @click="batchDelete()">删除</el-button>
          <el-button type="primary" icon="el-icon-check" size="mini" @click="batchStart()">启用</el-button>
          <el-button type="primary" icon="el-icon-close" size="mini" @click="batchStop()">停用</el-button>
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
        </el-table>
      </el-card>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="400px">
      <el-form
        ref="dialogForm"
        :rules="rules"
        :model="dialogForm"
        label-position="right"
        label-width="80px"
        style="width: 300px;"
        size="mini"
      >
        <el-form-item label="角色Id" prop="roleId" style="display:none;" size="mini">
          <el-input v-model="dialogForm.roleId" class="filter-item" placeholder size="mini" />
        </el-form-item>
        <el-form-item label="角色编码" prop="roleCode" size="mini">
          <el-input v-model="dialogForm.roleCode" class="filter-item" placeholder size="mini" />
        </el-form-item>
        <el-form-item label="角色名称" prop="roleName" size="mini">
          <el-input v-model="dialogForm.roleName" class="filter-item" placeholder size="mini" />
        </el-form-item>
        <el-form-item label="排序号" prop="roleSort" size="mini">
          <el-input
            v-model.number="dialogForm.roleSort"
            class="filter-item"
            placeholder
            size="mini"
          />
        </el-form-item>
        <el-form-item label="备注" prop="remarks" size="mini">
          <el-input v-model="dialogForm.remarks" class="filter-item" placeholder size="mini" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog" size="mini">取消</el-button>
        <el-button type="primary" @click="okDialog" size="mini">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoleList,
  getRole,
  addRole,
  updateRole,
  deleteRole,
  stopRole,
  startRole
} from "@/api/role";

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
          value: "1",
          label: "删除"
        },
        {
          value: "2",
          label: "停用"
        }
      ],
      dialogVisible: false,
      dialogTitle: "新建",
      dialogForm: {
        roleId: "",
        roleCode: "",
        roleName: "",
        roleSort: "",
        remarks: ""
      },
      rules: {
        roleCode: [
          { required: true, message: "角色编码不能为空", trigger: "blur" }
        ],
        roleName: [
          { required: true, message: "角色名称不能为空", trigger: "blur" }
        ],
        roleSort: [
          { required: true, message: "排序号不能为空", trigger: "blur" },
          { type: "number", message: "排序号必须为数字值" }
        ]
      }
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
      } else if (status === "1") {
        return "删除";
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
    sortChange(data) {
      // "descending"  "ascending"
      let orderFld = data.prop;
      let orderBy;
      if (data.order === "descending") {
        orderBy = "-";
      } else {
        orderBy = "+";
      }
      this.formQuery.orderBy = orderFld + orderBy;
      this.getTableList();
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
      // if (!this.tableMultiSelection) {
      //   this.$message({
      //     type: "info",
      //     message: "请选中要删除的数据!"
      //   });
      // } else {
      //   let selectRows = this.tableMultiSelection;
      //   this.$confirm("是否执行停用操作?", "提示", {
      //     confirmButtonText: "确定",
      //     cancelButtonText: "取消",
      //     type: "warning"
      //   })
      //     .then(() => {
      //       var roleIdArr = new Array();
      //       Object.keys(selectRows).forEach(function(key) {
      //         console.log(selectRows[key].roleId);
      //         if (selectRows[key].roleId) {
      //           roleIdArr.push(selectRows[key].roleId);
      //         }
      //       });
      //       if (roleIdArr && roleIdArr.length > 0) {
      //         var roleIds = roleIdArr.join();
      //         stopRole(roleIds).then(response => {
      //           this.$message({
      //             type: "success",
      //             message: "停用成功!"
      //           });
      //         });
      //       }
      //     })
      //     .catch(() => {
      //       // 取消时执行此处
      //     });
      // }
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
      // if (!this.tableMultiSelection) {
      //   this.$message({
      //     type: "info",
      //     message: "请选中要删除的数据!"
      //   });
      // } else {
      //   let selectRows = this.tableMultiSelection;
      //   this.$confirm("是否执行启用操作?", "提示", {
      //     confirmButtonText: "确定",
      //     cancelButtonText: "取消",
      //     type: "warning"
      //   })
      //     .then(() => {
      //       var roleIdArr = new Array();
      //       Object.keys(selectRows).forEach(function(key) {
      //         console.log(selectRows[key].roleId);
      //         if (selectRows[key].roleId) {
      //           roleIdArr.push(selectRows[key].roleId);
      //         }
      //       });
      //       if (roleIdArr && roleIdArr.length > 0) {
      //         var roleIds = roleIdArr.join();
      //         startRole(roleIds).then(response => {
      //           this.$message({
      //             type: "success",
      //             message: "启用成功!"
      //           });
      //         });
      //       }
      //     })
      //     .catch(() => {
      //       // 取消时执行此处
      //     });
      // }
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
      // if (!this.tableMultiSelection) {
      //   this.$message({
      //     type: "info",
      //     message: "请选中要删除的数据!"
      //   });
      // } else {
      //   let selectRows = this.tableMultiSelection;
      //   this.$confirm("是否执行删除操作?", "提示", {
      //     confirmButtonText: "确定",
      //     cancelButtonText: "取消",
      //     type: "warning"
      //   })
      //     .then(() => {
      //       var roleIdArr = new Array();
      //       Object.keys(selectRows).forEach(function(key) {
      //         console.log(selectRows[key].roleId);
      //         if (selectRows[key].roleId) {
      //           roleIdArr.push(selectRows[key].roleId);
      //         }
      //       });
      //       if (roleIdArr && roleIdArr.length > 0) {
      //         var roleIds = roleIdArr.join();
      //         deleteRole(roleIds).then(response => {
      //           this.$message({
      //             type: "success",
      //             message: "删除成功!"
      //           });
      //         });
      //       }
      //     })
      //     .catch(() => {
      //       // 取消时执行此处
      //     });
      // }
    },
    handleStart(row) {
      // this.$confirm("是否执行启用操作?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // }).then(() => {
      //     if (row.roleId) {
      //       stopOrStartRole(row.roleId, 0).then(response => {
      //         this.$message({
      //           type: "success",
      //           message: "启用成功!"
      //         });
      //       });
      //     }
      //   })
      //   .catch(() => {
      //     // 取消时执行此处
      //   });
    },
    handleStop(row) {
      // this.$confirm("是否执行停用操作?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(() => {
      //     if (row.roleId) {
      //       stopOrStartRole(row.roleId, 2).then(response => {
      //         this.$message({
      //           type: "success",
      //           message: "停用成功!"
      //         });
      //       });
      //     }
      //   })
      //   .catch(() => {
      //     // 取消时执行此处
      //   });
    },
    handleAdd() {
      this.dialogVisible = true;
      this.dialogTitle = "新建";
      this.resetForm("dialogForm");
    },
    handleView() {
      if (!this.tableMultiSelection) {
        this.$message({
          type: "info",
          message: "请选中要查看的数据!"
        });
        return;
      }
      let selectRows = this.tableMultiSelection;
      if (selectRows.length == 0) {
        this.$message({
          type: "info",
          message: "请选中要查看的数据!"
        });
        return;
      } else if (selectRows.length > 1) {
        this.$message({
          type: "info",
          message: "只能选中一条数据!"
        });
        return;
      }
      this.dialogVisible = true;
      this.dialogTitle = "查看";
      getRole(selectRows[0].roleId).then(response => {
        this.dialogForm = response.data;
        this.$nextTick(() => {
          this.$refs["dialogForm"].clearValidate();
        });
      });
    },
    handleEdit() {
      if (!this.tableMultiSelection) {
        this.$message({
          type: "info",
          message: "请选中要查看的数据!"
        });
        return;
      }
      let selectRows = this.tableMultiSelection;
      if (selectRows.length == 0) {
        this.$message({
          type: "info",
          message: "请选中要查看的数据!"
        });
        return;
      } else if (selectRows.length > 1) {
        this.$message({
          type: "info",
          message: "只能选中一条数据!"
        });
        return;
      }
      this.dialogVisible = true;
      this.dialogTitle = "编辑";
      getRole(selectRows[0].roleId).then(response => {
        this.dialogForm = response.data;
        this.$nextTick(() => {
          this.$refs["dialogForm"].clearValidate();
        });
      });
    },
    handleDelete() {
      let rowId = row.roleId;
      this.$confirm("是否执行删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteRole(rowId).then(response => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(() => {
          // 取消时执行此处
        });
    },
    rowStyle(row, rowIndex) {
      return "height:15px;font-size: 13px;color: #333;font-weight: normal; ";
    },
    headRowStyle(row, rowIndex) {
      return "height:15px;";
    },
    getCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background: #F2F2F2;font-size: 13px;color: #333;font-weight: normal;";
      } else {
        return "";
      }
    },
    okDialog() {
      const dialogForm = this.dialogForm;
      if (this.dialogTitle == "查看") {
        this.dialogVisible = false;
      } else if (this.dialogTitle == "编辑") {
        if (this.dialogForm.roleId) {
          const { roleId, roleCode, roleName, roleSort, remarks } = dialogForm;
          updateRole({ roleId, roleCode, roleName, roleSort, remarks }).then(
            response => {
              this.dialogVisible = false;
              this.$message({
                type: "success",
                message: "更新成功!"
              });
            }
          );
        }
      } else if (this.dialogTitle == "新建") {
        const {
          roleId,
          roleCode,
          roleName,
          roleSort,
          remarks
        } = this.dialogForm;
        console.log(2222);
        addRole({ roleId, roleCode, roleName, roleSort, remarks }).then(
          response => {
            this.dialogVisible = false;
            this.$message({
              type: "success",
              message: "新建成功 !"
            });
          }
        );
      }
    },
    cancelDialog() {
      console.log("close");
      this.dialogVisible = false;
      this.resetForm("dialogForm");
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
