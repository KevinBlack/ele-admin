<template>
  <div  class="app-container">
    <el-row>
      <el-col :md="5" :lg="5" :xl="4">
        <el-card class="box-card" style="height:736px">
          <el-tree :data="treeData" :props="treeDefaultProps" @node-click="handleNodeClick"></el-tree>
        </el-card>  
      </el-col>
      <el-col :md="19" :lg="19" :xl="20">
        <!-- 查询面板 -->
        <el-card class="box-card" shadow="never">
          <!-- label-width="65px" -->
          <el-form ref="formQuery" :model="formQuery" :inline="true">
            <el-form-item label="机构Id" size="mini" prop="officeId" style="display:none;">
              <el-input v-model="formQuery.officeId" size="mini"></el-input>
            </el-form-item>
            <el-row>
              <el-col  :md="8" :lg="8" :xl="6">
                <el-form-item label="机构编号" size="mini" prop="officeCode" >
                  <el-input v-model="formQuery.officeCode" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col   :md="8" :lg="8" :xl="6">
                <el-form-item label="机构名称" size="mini" prop="officeName">
                  <el-input v-model="formQuery.officeName" size="mini" ></el-input>
                </el-form-item>
              </el-col>
              <el-col   :md="8" :lg="8" :xl="6">
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
              <!-- <el-col :md="8" :lg="6" style="text-align:center">
                <el-form-item size="mini">
                  <el-button type="primary" size="mini" @click="search">查询</el-button>
                  <el-button size="mini" @click="resetForm('formQuery')">重置</el-button>
                </el-form-item>
              </el-col> -->
            </el-row>
            <el-row>
              <el-col :span="24" style="text-align:center">
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
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd()">新建</el-button>
            <el-button type="primary" icon="el-icon-delete" size="mini" @click="batchDelete()">删除</el-button>
            <el-button type="primary" icon="el-icon-close" size="mini" @click="batchStop()">停用</el-button>
            <el-button type="primary" icon="el-icon-check" size="mini" @click="batchStart()">启用</el-button>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit()">编辑</el-button>
          </el-card>
          <!-- 表格区 -->
          <el-table
            ref="officeTable"
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
            <el-table-column prop="officeCode" label="机构编码" width="200" align="center"></el-table-column>
            <el-table-column prop="officeName" label="机构名称" width="200" align="center"></el-table-column>
            <el-table-column
              align="center"
              prop="status"
              width="150"
              :formatter="statusFmt"
              label="状态"
            ></el-table-column>
            <el-table-column prop="treeSort" label="排序号" width="150" align="center"></el-table-column>
            <el-table-column prop="updateDate" label="更新时间" width="200" align="center"></el-table-column>
            <el-table-column prop="remarks" label="备注" align="left" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100" align="center">
              <template slot-scope="scope">
                <el-button @click="addSubOffice(scope.row)" type="text" size="small">添加下级</el-button>
              </template>
            </el-table-column>
          </el-table>
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
  addOffice,
  updateOffice,
  deleteOffice,
  stopOffice,
  startOffice
} from "@/api/office";

export default {
  data() {
    return {
      treeData: [],
      treeDefaultProps: {
        children: "childs",
        label: function(data, node) {
          return  data.officeName;
        }
      },
      pageTotal: 0,
      formQuery: {
        officeId: "",
        officeCode: "",
        officeName: "",
        status: "0",
        pageNo: 1,
        pageSize: 20,
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
          value: "1",
          label: "删除"
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
    this.getTreeData();
  },
  methods: {
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
        this.tableLoading = false;
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
            });
          }
        })
        .catch(() => {
          // 取消时执行此处
        });
    },
    addSubOffice(row) {
      var parentId = row.parentIds + row.officeId;
      parentId = parentId.substring(3);
      // 添加下级
      this.$router.push({
        path: "/system/office-detail",
        query: { parentId: parentId }
      });
    },
    handleAdd() {
      this.$router.push({ path: "/system/office-detail", query: {} });
    },
    handleEdit() {
      if (this.tableMultiSelection) {
        if (this.tableMultiSelection <= 0) {
          this.$message({
            type: "info",
            message: "请选择一条数据"
          });
          return;
        }
        if (this.tableMultiSelection.length > 1) {
          this.$message({
            type: "info",
            message: "只能选择一条数据"
          });
          return;
        }
        let officeId = this.tableMultiSelection["0"].officeId;
        if (officeId) {
          this.$router.push({
            path: "/system/office-detail",
            query: { officeId: officeId }
          });
        }
      }
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
.el-aside {
  /* background-color: #d3dce6; */
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
  /* text-align: center; */
  /* line-height: 0px; */
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
