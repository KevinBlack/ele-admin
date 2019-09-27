	<template>
  <div>
    <el-card class="box-card" style="margin: 0 10px;">
      <!-- 查询面板 -->
      <el-card class="box-card" shadow="never">
        <!-- label-width="65px" -->
        <el-form ref="formQuery" :model="formQuery" label-width="100px">
          <el-row>
            <el-col :md="6" :lg="6" :xl="4">
              <el-form-item label="机构Id" size="mini" prop="officeId" style="display:none;">
                <el-input v-model="formQuery.officeId" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="6" :lg="6" :xl="4">
              <el-form-item label="登录名" size="mini" prop="loginCode">
                <el-input v-model="formQuery.loginCode" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="6" :lg="6" :xl="4">
              <el-form-item label="用户名" size="mini" prop="userName">
                <el-input v-model="formQuery.userName" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="6" :lg="6" :xl="4">
              <el-form-item label="邮箱" size="mini" prop="email">
                <el-input v-model="formQuery.email" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="6" :lg="6" :xl="4">
              <el-form-item label="手机" size="mini" prop="mobile">
                <el-input v-model="formQuery.mobile" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="6" :lg="6" :xl="4">
              <el-form-item label="电话" size="mini" prop="phone">
                <el-input v-model="formQuery.phone" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="6" :lg="6" :xl="4">
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
            <el-col :md="6" :lg="6" :xl="4">
              <el-form-item size="mini">
                <el-button type="primary" size="mini" @click="search">查询</el-button>
                <el-button size="mini" @click="resetForm('formQuery')">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <!-- 表格区 -->
      <el-card class="box-card" shadow="never" :body-style="{ minHeight: '600px' }">
        <!-- 按钮区 -->
        <el-card
          shadow="never"
          style="padding:15px;border-radius:0px;"
          :body-style="{ padding: '0px' }"
        >
          <el-button type="primary" icon="el-icon-download" size="mini" @click="handleDownload()" :loading="downloadLoading" >导出</el-button>
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
        <!-- 表格区 -->
        <el-table
          ref="userTable"
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
          <el-table-column prop="loginCode" label="登录账号" width="200" align="center"></el-table-column>
          <el-table-column prop="userName" label="用户名" width="200" align="center"></el-table-column>
          <el-table-column
            align="center"
            prop="status"
            width="150"
            :formatter="statusFmt"
            label="状态"
          ></el-table-column>
          <el-table-column prop="email" label="邮箱" width="200" align="center"></el-table-column>
          <el-table-column prop="mobile" label="手机" width="200" align="center"></el-table-column>
          <el-table-column prop="phone" label="电话" width="200" align="left"></el-table-column>
          <el-table-column prop="remarks" label="备注" align="left" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column fixed="right" label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
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

export default {
  data() {
    return {
      downloadLoading:false,
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
        pageNo: 1,
        pageSize: 15,
        orderBy: ""
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
    //exception导出
   handleDownload() {
      this.downloadLoading = true
      // 引入Excel导出js文件
      import('@/vendor/Export2Excel').then(excel => {
        // excel 列标题
        const tHeader = ['登录名', '用户名', '邮箱', '手机', '电话','备注']
        //  excel 每行的数据（如果想导出所有数据，发送ajax，从服务端获取数据）
        const list = this.tableData
        // excel 数据对应的字段
        const filterVal = ['loginCode','userName', 'email', 'mobile', 'phone', 'remarks']
        // 从list 中去出值
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          // excel 列标题
          header: tHeader,
          // excel 数据
          data,
          // excel 文件名
          filename: '用户数据',
          // excel 是否自动宽度
          autoWidth: true,
          // excel 文件后缀 ['xlsx', 'csv', 'txt']
          bookType: 'xlsx'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
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
    handleBatchCommand(command) {
      if (command == "batchDelete") {
        this.batchDelete();
      } else if (command == "batchStop") {
        this.batchStop();
      } else if (command == "batchStart") {
        this.batchStart();
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
      console.log("delete");
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
      this.$router.push({ path: "/sys/user-detail", query: {} });
    },
    handleEdit(row) {
      let userId = row.userId;
      this.$router.push({
        path: "/sys/user-detail",
        query: { userId: userId }
      });
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
    }
  }
};
</script>
	<style>
/* el-select 比正常的框长 */
.el-form-item .el-select {
  width: 100%;
}
</style>
