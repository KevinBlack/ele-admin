<template>
  <div>
    <el-card class="detailsContainer">
      <el-row class="area_bordes">
        <el-col :span="24">
          <el-button-group size="mini">
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
            <el-button type="primary" icon="el-icon-delete" size="mini" @click="handleDelete">删除</el-button>
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="addSubMnu">添加下级</el-button>
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

      <el-table
        ref="menuTable"
        :data="tableData"
        tooltip-effect="dark"
        border
        row-key="menuId"
        lazy
        :tree-props="{children: 'children', hasChildren: 'hasChild'}"
        :load="load"
        @selection-change="selectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="menuName" label="菜单名称" width="400" align="left"></el-table-column>
        <el-table-column prop="menuCode" label="菜单编号" width="200" align="center"></el-table-column>
        <el-table-column prop="menuHref" label="链接"  align="left"></el-table-column>
        <el-table-column prop="treeSort" label="排序号" width="200" align="left"></el-table-column>
        <el-table-column
          prop="menuType"
          label="类型"
          width="200"
          align="center"
          :formatter="menuTypeFmt"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getMenuList, getMenu, deleteMenu } from "@/api/system/menu";

export default {
  name:'Menu',
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
    selectionChange(val) {
      this.tableMultiSelection = val;
    },
    handleAdd() {
      this.$router.push({ path: "/system/menu-detail", query: {} });
    },
    handleView(row) {
      if (!this.tableMultiSelection) {
        this.$message({
          type: "info",
          message: "请选中要查看的数据!"
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
      const menuId = selectRows[0].menuId;
      this.$router.push({
        path: "/system/menu-detail",
        query: { menuId: menuId }
      });
    },
    handleDelete() {
      if (!this.tableMultiSelection) {
        this.$message({
          type: "info",
          message: "请选中要删除的数据!"
        });
        return;
      }
      const selectRows = this.tableMultiSelection;
      if (selectRows.length === 0 || selectRows.length > 1) {
        var msg =
          selectRows.length == 0
            ? "请选中要删除的数据"
            : "只能选择一条数据进行删除";
        this.$message({
          type: "info",
          message: msg
        });
        return;
      }
      const menuId = selectRows[0].menuId;
      this.$confirm("本操作将删除当前节点下所有子节点，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteMenu(menuId).then(response => {
            if (response.status == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              //重新加载数据
              this.getTableList()
            }
          });
        })
        .catch(() => {
          // 取消时执行此处
        });
    },
    addSubMnu(row) {
      if (!this.tableMultiSelection) {
        this.$message({
          type: "info",
          message: "请选中要删除的数据!"
        });
        return;
      }
      const selectRows = this.tableMultiSelection;
      if (selectRows.length === 0 || selectRows.length > 1) {
        var msg =
          selectRows.length == 0
            ? "请选中要删除的数据"
            : "只能选择一条数据进行删除";
        this.$message({
          type: "info",
          message: msg
        });
        return;
      }
      const menuType = selectRows[0].menuType;
      //当是按钮时，不能添加下级菜单
      if (menuType == "2") {
        this.$message({
          type: "info",
          message: "[权限]不能添加下级!"
        });
        return;
      }
      var parentId = selectRows[0].parentIds + selectRows[0].menuId;
      parentId = parentId.substring(3);
      this.$router.push({
        path: "/system/menu-detail",
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
