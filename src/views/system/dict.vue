	<template>
  <div>
    <el-card class="detailsContainer">
      <!-- 查询面板 -->
      <el-form ref="formQuery" :model="formQuery" label-width="100px" size="mini">
        <el-row :gutter="20" class="area_border">
          <el-col :span="6">
            <el-form-item label="字典名称" size="mini" prop="loginCode">
              <el-input v-model="formQuery.dictName" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="字典类型" size="mini" prop="userName">
              <el-input v-model="formQuery.dictType" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否系统" size="mini" prop="status">
              <el-select v-model="formQuery.isSys" filterable placeholder="请选择" size="mini">
                <el-option
                  v-for="item in isSysOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

           <el-col :span="6" >
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
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleDictData">操作字典项</el-button>
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
        :data="tableData"
        v-loading="tableLoading"
        border
        tooltip-effect="dark"
        style="width: 100%;margin-bottom:20px;"
        @selection-change="selectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="dictType" label="字典类型" width="200" align="center"></el-table-column>
        <el-table-column prop="dictName" label="字典名称" width="200" align="center"></el-table-column>
        <el-table-column align="center" prop="status" width="150" :formatter="statusFmt" label="状态"></el-table-column>
        <el-table-column
          align="center"
          prop="isSys"
          width="150"
          :formatter="statusFmt"
          label="系统字典"
        ></el-table-column>
        <el-table-column prop="remarks" label="备注" align="left" :show-overflow-tooltip="true"></el-table-column>
      </el-table>

      <el-row class="area_bordes">
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
      </el-row>
    </el-card>
    <!-- 字典详情页弹框 -->
    <el-dialog title="字典项" :visible.sync="dialogVisible" width="50%">
      <!-- <span>错误信息详细</span> -->
      <el-input type="textarea" :rows="20" v-model="dialogMsg"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

	<script>
import {
  getDict,
  getDictList,
  deleteDict,
} from "@/api/system/dict";

export default {
  name:'Dict',
  data() {
    return {
      dialogVisible: false,
      dialogMsg: "",
      treeData: [],
      treeDefaultProps: {
        children: "childs",
        label: function(data, node) {
          return data.officeName;
        }
      },
      pageTotal: 0,
      formQuery: {
        dictName: "",
        dictType: "",
        status: "",
        isSys: "",
        pageNo: 1,
        pageSize: 15,
        orderBy: ""
      },
      tableLoading: false,
      tableData: [],
      tableMultiSelection: [],
      isSysOptions: [
        {
          value: "1",
          label: "是"
        },
        {
          value: "0",
          label: "否"
        }
      ]
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
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
      getDictList(this.formQuery).then(response => {
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
          var idArr = new Array();
          Object.keys(selectRows).forEach(function(key) {
            if (selectRows[key].id) {
              idArr.push(selectRows[key].id);
            }
          });
          if (idArr && idArr.length > 0) {
            var ids = idArr.join();
            deleteDict(ids).then(response => {
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
      this.$router.push({ path: "/system/dict-detail", query: {} });
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
      const id = selectRows[0].id;
      this.$router.push({
        path: "/system/dict-detail",
        query: { id: id }
      });
    },
    // 添加字典项
    handleDictData() {

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
      const id = selectRows[0].id;
      this.$router.push({
        path: "/system/dict-data",
        query: { dictId: id }
      });
    },
    statusFmt(row, column, cellValue, index) {
      let status = row.status;
      if (status === 0) {
        return "正常";
      } else if (status === 1) {
        return "删除";
      } else if (status === 2) {
        return "停用";
      } else {
        return row.status;
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
