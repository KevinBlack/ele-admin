	<template>
  <div>
    <el-card class="detailsContainer">
      <!-- 查询面板 -->
      <!-- label-width="65px" -->
      <el-form ref="formQuery" :model="formQuery" label-width="100px" size="mini">
        <el-row :gutter="20" class="area_border">
          <el-col :span="6">
            <el-form-item label="机构Id" size="mini" prop="officeId" style="display:none;">
              <el-input v-model="formQuery.officeId" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="登录名" size="mini" prop="loginCode">
              <el-input v-model="formQuery.loginCode" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="用户名" size="mini" prop="userName">
              <el-input v-model="formQuery.userName" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="邮箱" size="mini" prop="email">
              <el-input v-model="formQuery.email" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机" size="mini" prop="mobile">
              <el-input v-model="formQuery.mobile" size="mini"></el-input>
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
            <el-form-item label="电话" size="mini" prop="phone">
              <el-input v-model="formQuery.phone" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
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
          <el-col :span="24" style="text-align: center;margin: 10px 0;">
            <el-button type="primary" icon="el-icon-search" size="mini" @click="search">查询</el-button>
            <el-button icon="el-icon-refresh-right" @click="resetForm('formQuery')" size="mini">重置</el-button>
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
            <el-button
              type="primary"
              icon="el-icon-download"
              size="mini"
              @click="handleDownload()"
              :loading="downloadLoading"
            >导出</el-button>
          </el-button-group>
        </el-col>
      </el-row>

      <!-- 表格区 -->
      <el-card class="box-card" shadow="never" :body-style="{ minHeight: '600px' }">
        <!-- 表格区 -->
        <el-table
          ref="userTable"
          :data="tableData"
          v-loading="tableLoading"
          border
          tooltip-effect="dark"
          style="width: 100%;margin-bottom:20px;"
          @selection-change="selectionChange"
        >
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="loginCode" label="登录账号" width="200" align="center"></el-table-column>
          <el-table-column prop="userName" label="用户名" width="200" align="center"></el-table-column>
          <el-table-column
            align="center"
            prop="status"
            width="100"
            :formatter="statusFmt"
            label="状态"
          ></el-table-column>
          <el-table-column prop="email" label="邮箱" width="200" align="center"></el-table-column>
          <el-table-column prop="mobile" label="手机" width="150" align="center"></el-table-column>
          <el-table-column prop="phone" label="电话" width="150" align="center"></el-table-column>
          <el-table-column
            prop="system"
            label="归属系统"
            width="150"
            align="center"
            :formatter="systemFmt"
          ></el-table-column>
          <el-table-column
            prop="freezeCause"
            label="冻结内容"
            width="150"
            align="left"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column prop="remarks" label="备注" align="left" :show-overflow-tooltip="true"></el-table-column>
        </el-table>
        <el-col class="area_bordes">
          <el-col :span="24" style="text-align: right;">
            <el-pagination
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
    </el-card>
  </div>
</template>

	<script>
import {
  getUser,
  getUserList,
  deleteUser,
  stopUser,
  startUser
} from "@/api/system/user";
import { getDictDataLists } from "@/api/system/comm/comm";
import { getDictName } from "@/utils/index.js";

export default {
  name: "User",
  data() {
    return {
      downloadLoading: false,
      treeData: [],
      treeDefaultProps: {
        children: "childs",
        label: function(data, node) {
          return data.officeName;
        }
      },
      pageTotal: 0,
      formQuery: {
        loginCode: "",
        userName: "",
        email: "",
        mobile: "",
        phone: "",
        status: "0",
        system: "",
        freezeCause: "",
        pageNo: 1,
        pageSize: 15,
        orderBy: ""
      },
      dict: {
        system: ""
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
        },
        {
          value: "3",
          label: "僵尸账号"
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
    //exception导出
    handleDownload() {
      this.downloadLoading = true;
      // 引入Excel导出js文件
      import("@/vendor/Export2Excel").then(excel => {
        // excel 列标题
        const tHeader = ["登录名", "用户名", "邮箱", "手机", "电话", "备注"];
        //  excel 每行的数据（如果想导出所有数据，发送ajax，从服务端获取数据）
        const list = this.tableData;
        // excel 数据对应的字段
        const filterVal = [
          "loginCode",
          "userName",
          "email",
          "mobile",
          "phone",
          "remarks"
        ];
        // 从list 中去出值
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          // excel 列标题
          header: tHeader,
          // excel 数据
          data,
          // excel 文件名
          filename: "用户数据",
          // excel 是否自动宽度
          autoWidth: true,
          // excel 文件后缀 ['xlsx', 'csv', 'txt']
          bookType: "xlsx"
        });
        this.downloadLoading = false;
      });
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
      const userId = selectRows[0].userId;
      if (userId) {
        this.$router.push({
          path: "/system/user-detail",
          query: { userId: userId }
        });
      }
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
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
      getUserList(this.formQuery).then(response => {
        this.tableData = response.data;
        this.pageTotal = response.page.total || 0;
        this.tableLoading = false;
      });
    },
    handleSizeChange(val) {
      this.getTableList();
    },
    handleCurrentChange(val) {
      this.getTableList();
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
          var userIdArr = new Array();
          Object.keys(selectRows).forEach(function(key) {
            if (selectRows[key].userId) {
              userIdArr.push(selectRows[key].userId);
            }
          });
          if (userIdArr && userIdArr.length > 0) {
            var userIds = userIdArr.join();
            stopUser(userIds).then(response => {
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
          var userIdArr = new Array();
          Object.keys(selectRows).forEach(function(key) {
            console.log(selectRows[key].userId);
            if (selectRows[key].userId) {
              userIdArr.push(selectRows[key].userId);
            }
          });
          if (userIdArr && userIdArr.length > 0) {
            var userIds = userIdArr.join();
            startUser(userIds).then(response => {
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
          var userIdArr = new Array();
          Object.keys(selectRows).forEach(function(key) {
            if (selectRows[key].userId) {
              userIdArr.push(selectRows[key].userId);
            }
          });
          if (userIdArr && userIdArr.length > 0) {
            var userIds = userIdArr.join();
            deleteUser(userIds).then(response => {
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
      this.$router.push({ path: "/system/user-detail", query: {} });
    },
    statusFmt(row, column, cellValue, index) {
      let status = row.status.trim();
      if (status === "0") {
        return "正常";
      } else if (status === "1") {
        return "删除";
      } else if (status === "2") {
        return "停用";
      } else if (status === "3") {
        return "僵尸账号";
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
