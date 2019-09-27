<template>
  <div>
    <el-card class="box-card" style="margin: 0 10px;">
      <div class="filter-container">
        <!-- <el-card class="box-card" shadow="never">
        <el-form ref="formQuery" :model="formQuery" label-width="80px" :inline="true">
          <el-row>
            <el-col :md="8" :lg="8" :xl="6">
              <el-form-item label="菜单名称" size="mini" prop="menuName">
                <el-input v-model="formQuery.menuName" size="mini" style="width: 200px;"></el-input>
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
        </el-card>-->

        <el-card class="box-card" shadow="never" :body-style="{ minHeight: '600px' }">
          <el-card
            shadow="never"
            style="padding:15px;border-radius:0px;"
            :body-style="{ padding: '0px' }"
          >
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd()">新建</el-button>
          </el-card>
          <el-table
            ref="menuTable"
            :data="tableData"
            style="width:100%"
            :header-row-style="headRowStyle"
            :row-style="rowStyle"
            :header-cell-style="getCellStyle"
            v-loading="tableLoading"
            border
            highlight-current-row
            row-key="menuId"
            lazy
            :tree-props="{children: 'children', hasChildren: 'hasChild'}"
            :load="load"
          >
            <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
            <el-table-column prop="menuName" label="菜单名称" width="300" align="left"></el-table-column>
            <el-table-column prop="menuCode" label="菜单编号" width="200" align="center"></el-table-column>
            <el-table-column prop="menuHref" label="链接" width="320" align="left"></el-table-column>
            <el-table-column prop="treeSort" label="排序号" width="200" align="left"></el-table-column>
            <el-table-column
              prop="menuType"
              label="类型"
              width="200"
              align="center"
              :formatter="menuTypeFmt"
            ></el-table-column>
            <el-table-column fixed="right" label="操作" width="200" align="center">
              <template slot-scope="scope">
                <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
                <el-button @click="addSubMnu(scope.row)" type="text" size="small">添加下级</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getMenuList, getMenu, deleteMenu } from "@/api/system/menu";

export default {
  data() {
    return {
      formQuery: {
        parentId: "0"
      },
      tableLoading: false,
      tableData: [],
      tableMultiSelection: []
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    menuTypeFmt(row, column, cellValue, index) {
      let menuType = row.menuType;
      if (menuType === "1") {
        return "菜单";
      } else if (menuType === "2") {
        return "权限";
      }
    },
    getTableList() {
      this.tableLoading = true;
      getMenuList(this.formQuery).then(response => {
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
    handleAdd() {
      this.$router.push({ path: "/sys/menu-detail", query: {} });
    },
    handleEdit(row) {
      this.$router.push({
        path: "/sys/menu-detail",
        query: { menuId: row.menuId }
      });
    },
    handleDelete(row) {
      let menuId = row.menuId;
      this.$confirm("本操作将删除当前节点下所有子节点，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteMenu(menuId).then(response => {
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
    addSubMnu(row) {
      let menuType = row.menuType;
      //当是按钮时，不能添加下级菜单
      if (menuType == "2") {
        this.$message({
          type: "info",
          message: "[权限]不能添加下级!"
        });
        return;
      }
      var parentId = row.parentIds + row.menuId;
      parentId = parentId.substring(3);
      this.$router.push({
        path: "/sys/menu-detail",
        query: { parentId: parentId }
      });
    },
    load(tree, treeNode, resolve) {
      console.log(tree);
      let parentId = tree.menuId;
      getMenuList({ parentId }).then(response => {
        let dataList = response.data;
        resolve(dataList);
      });
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
