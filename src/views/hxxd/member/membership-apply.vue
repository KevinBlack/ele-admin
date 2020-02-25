	<template>
  <div>
    <el-card class="detailsContainer">
      <!-- 查询面板 -->
      <!-- label-width="65px" -->
      <el-form ref="formQuery" :model="formQuery" label-width="100px" size="mini">
        <el-row :gutter="20" class="area_border">
          <el-col :span="6">
            <el-form-item label="申请编号" size="mini" prop="code">
              <el-input v-model="formQuery.code" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="会员名称" size="mini" prop="name">
              <el-input v-model="formQuery.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="法定代表人" size="mini" prop="legalRepresentName">
              <el-input v-model="formQuery.legalRepresentName" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="邮箱" size="mini" prop="email">
              <el-input v-model="formQuery.email" size="mini"></el-input>
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
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd" 
                          v-show="btnShow('100020601010')">新增</el-button>
            <el-button type="primary" icon="el-icon-delete" size="mini" @click="batchDelete" v-show="btnShow('100020601020')">删除</el-button>
          </el-button-group>
          <el-button-group size="mini" style="margin-left: 20px;">
            <el-button
              type="primary"
              class="btn_line"
              icon="el-icon-zoom-in"
              size="mini"
              @click="handleView"
              v-show="btnShow('100020601030')"
            >查看</el-button>
            <el-button
              type="primary"
              class="btn_line"
              icon="el-icon-zoom-in"
              size="mini"
              @click="handleProcessLogView"
              v-show="btnShow('100020601040')"
            >流程日志</el-button>
          </el-button-group>
        </el-col>
      </el-row>

      <!-- 表格区 -->
      <el-card class="box-card" shadow="never" :body-style="{ minHeight: '600px' }">
        <!-- 表格区 -->
        <el-table
          ref="tableData"
          :data="tableData"
          v-loading="tableLoading"
          border
          tooltip-effect="dark"
          style="width: 100%;margin-bottom:20px;"
          @selection-change="selectionChange"
        >
          <el-table-column type="selection" width="55" align="center"></el-table-column>
          <el-table-column prop="code" label="申请编号" width="200" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="certificateNo" label="会员证书编号" width="200" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="name" label="会员名称" width="120" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="legalRepresentName" label="法定代表人" width="120" align="center" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column
            prop="corporateNature"
            label="公司性质"
            width="120"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="mainBusinessScope"
            label="主要业务范围"
            width="120"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column prop="remarks" label="备注" align="center" :show-overflow-tooltip="true"></el-table-column>
           <el-table-column
            align="center"
            prop="status"
            width="80"
            :formatter="statusFmt"
            label="状态"
          ></el-table-column>
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
    <!-- 流程日志弹框 -->
    <el-dialog :visible.sync="processLog.show" title="流程日志查询" width="60%">
      <SysProcessLogDialog
        :dataId="processLog.dataId"
        :dataCode="processLog.dataCode"
        :isShow="processLog.show"
        tableName="HX_XD_MEMBER"
        @closeDalog="closeProcessLogDialog"
      />
    </el-dialog>
  </div>
</template>

	<script>
import { getMemberList, deleteMember } from "@/api/hxxd/member";
import { getDictDataLists } from "@/api/system/comm/comm";
import { getDictName } from "@/utils/index.js";
import SysProcessLogDialog from "@/views/comm/sys-process-log-dialog";

export default {
  // name: "MembershipApply",
  components: { SysProcessLogDialog },
  data() {
    return {
      downloadLoading: false,
      pageTotal: 0,
      formQuery: {
        code: "",
        name: "",
        legalRepresentName: "",
        email: "",
        pageNo: 1,
        pageSize: 15,
        orderBy: ""
      },
      tableLoading: false,
      tableData: [],
      tableMultiSelection: [],
      //流程日志弹框
      processLog: {
        show: false,
        dataId: "",
        dataCode: "",
        system: "hxxd"
      },
      btns: this.$store.getters.btns["1000206010"]
    };
  },
  created() {
    this.getTableList();
    this.beforeLoading();
  },  
  methods: {
    beforeLoading() {
      // getDictDataLists("97001005").then(response => {
      //   this.dict.system = response.data.jq97001005;
      // });
    },
    handleProcessLogView() {
      if (!this.tableMultiSelection) {
        this.$message({
          type: "info",
          message: "请选中查看流程日志的数据!"
        });
        return;
      }
      const selectRows = this.tableMultiSelection;
      if (selectRows.length === 0 || selectRows.length > 1) {
        var msg =
          selectRows.length == 0
            ? "请选中查看流程日志的数据"
            : "只能选择一条数据进行查看";
        this.$message({
          type: "info",
          message: msg
        });
        return;
      }
      //数据id
      this.processLog.dataId = selectRows[0].id;
      this.processLog.show = true;
    },
    //关闭流程日志框
    closeProcessLogDialog() {
      this.processLog.show = false;
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
      if (id) {
        this.$router.push({
          path: "/membership-manage/membership-apply-detail",
          query: { id: id }
        });
      }
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
      getMemberList(this.formQuery).then(response => {
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
      for (var i = 0; i < selectRows.length; i++) {
        if (selectRows.status != "10" && selectRows.status != "15") {
          this.$message({
            type: "error",
            message: "只有未提交或者审核驳回状态的数据，才能删除!"
          });
          return;
        }
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
            deleteMember(ids).then(response => {
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
      this.$router.push({
        path: "/membership-manage/membership-apply-detail",
        query: { id: 0 }
      });
    },
    statusFmt(row, column, cellValue, index) {
      let status = row.status.trim();
      if (status === "10") {
        return "未提交";
      } else if (status === "15") {
        return "审核驳回";
      } else if (status === "20") {
        return "待审核";
      } else if (status === "30") {
        return "审核通过";
      } else if (status === "40") {
        return "退会";
      } else {
        return row.status;
      }
    },
    //data中这个不能少：
    btnShow(menuCode) {
      //根据用户所具有的菜单项控制
      var btns = this.btns;
      if (btns && btns.length > 0) {
        for (var i = 0; i < btns.length; i++) {
          if (menuCode === btns[i]) {
            return true;
          }
        }
      }
      return false;
    }
    //, systemFmt(row, column, cellValue, index) {
    //   return getDictName(this.dict.system, row.system);
    // }
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
