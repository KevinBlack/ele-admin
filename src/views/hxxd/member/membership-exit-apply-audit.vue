<template>
  <el-card class="detailsContainer">
    <!-- part1 -->
    <el-form ref="queryForm" :model="queryForm" label-width="100px" size="mini">
      <el-row :gutter="20" class="area_border">
        <el-col :span="6">
          <el-form-item label="会员证书编号" prop="memberCertNo">
            <el-input v-model="queryForm.memberCertNo" size="mini"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="会员名称" prop="memberName">
            <el-input v-model="queryForm.memberName" size="mini"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="提交时间从" size="mini" prop="submitDateFrom">
            <el-date-picker
              v-model="queryForm.submitDateFrom"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              style="width:100%"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="提交时间到" size="mini" prop="submitDateTo">
            <el-date-picker
              v-model="queryForm.submitDateTo"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              style="width:100%"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="退会原因类型" size="mini" prop="exitType">
            <el-select
              v-model="queryForm.exitType"
              filterable
              clearable
              placeholder="请选择"
              size="mini"
              style="width:100%"
            >
              <el-option
                v-for="item in dict.exitType"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="状态" prop="status">
            <el-select
              v-model="queryForm.status"
              filterable
              placeholder="请选择"
              size="mini"
              style="width:100%"
            >
              <el-option
                v-for="item in queryFormOptions.status"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="24" style="text-align: center;margin: 10px 0;">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="formSearch">查询</el-button>
          <el-button icon="el-icon-refresh-right" size="mini" @click="resetForm('queryForm')">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="area_bordes">
      <el-col :span="24">
        <el-button-group size="mini">
          <el-button
            type="primary"
            icon="el-icon-circle-check"
            size="mini"
            @click="handleAuditPass"
          >审核通过</el-button>
          <el-button
            type="primary"
            icon="el-icon-circle-close"
            size="mini"
            @click="handleAuditNotPass"
          >审核驳回</el-button>
        </el-button-group>

        <el-button-group size="mini" style="margin-left: 20px;">
          <!-- <el-button
              type="primary"
              class="btn_line"
              icon="el-icon-zoom-in"
              size="mini"
              @click="handleView"
          >查看</el-button>-->
          <el-button
            type="primary"
            class="btn_line"
            icon="el-icon-zoom-in"
            size="mini"
            @click="handleProcessLogView"
          >流程日志</el-button>
        </el-button-group>

        <!--
        <el-button-group  size="mini" style="margin-left: 20px;">
            <el-button type="primary" class="btn_line"  icon="el-icon-zoom-in" size="mini" @click="handleView">查看</el-button>
             <el-button type="primary" icon="el-icon-download" size="mini" @click="handleExport">导出</el-button> 
        </el-button-group>-->
      </el-col>
    </el-row>
    <!-- part3 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      tooltip-effect="dark"
      style="width: 100%;margin-bottom:20px;"
      @selection-change="handleTableSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="code" label="申请编号" width="250" align="center"></el-table-column>
      <el-table-column prop="memberCertNo" label="会员证书编号" width="250" align="center"></el-table-column>
      <el-table-column prop="memberName" label="会员名称" width="150" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" width="100" align="center" :formatter="statusFmt"></el-table-column>
      <el-table-column prop="submitDate" label="提交时间" width="180" align="center"></el-table-column>
      <el-table-column
        prop="exitType"
        label="退会原因类型"
        width="200"
        align="center"
        :formatter="exitTypeFmt"
      ></el-table-column>
      <el-table-column prop="exitReason" label="退会原因" align="left" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column fixed="right" label="文件列表" align="center" width="100">
        <template slot-scope="scope">
          <el-button
            @click="handleViewUploadFile(scope.row.attachIds)"
            type="text"
            size="small"
          >文件列表</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-row class="area_bordes">
      <el-col :span="24" style="text-align: right;">
        <el-pagination
          background
          @size-change="handlePageSizeChange"
          @current-change="handlePageNoChange"
          :current-page.sync="queryForm.pageNo"
          :page-size.sync="queryForm.pageSize"
          :page-sizes="[15, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotal"
        />
      </el-col>

      <!-- 审核弹框 -->
      <el-dialog :visible.sync="auditDialog.isShow" :title="auditDialog.title">
        <AuditDialog
          :auditType="auditDialog.auditType"
          :isShow="auditDialog.isShow"
          @callBack="auditDialogCallBack"
        />
      </el-dialog>

      <!-- 流程日志弹框 -->
      <el-dialog :visible.sync="processLog.show" title="流程日志查询" width="60%">
        <SysProcessLogDialog
          :dataId="processLog.dataId"
          :dataCode="processLog.dataCode"
          :isShow="processLog.show"
          tableName="HX_XD_MEMBER_EXIT"
          @closeDalog="closeProcessLogDialog"
        />
      </el-dialog>

      <!-- 文件列表弹框 -->
      <el-dialog :visible.sync="uploadFile.show" title="文件列表查询" width="50%">
        <SysFileUploadListDialog
          :isShow="uploadFile.show"
          :ids="uploadFile.ids"
          @closeDalog="closeFileUploadListDialog"
        />
      </el-dialog>
    </el-row>
  </el-card>
</template>

<script>
// 此处引入axios 相关包
import { getMemberExitList, auditMemberExit } from "@/api/hxxd/memberExit";
import { getDictDataLists } from "@/api/system/comm/comm";
import { getDictName } from "@/utils/index.js";
import { parseTime, getIdsFromArr } from "@/utils/index.js";
import AuditDialog from "@/views/comm/audit-dialog";
import SysProcessLogDialog from "@/views/comm/sys-process-log-dialog";
import SysFileUploadListDialog from "@/views/comm/sys-file-upload-list-dialog";

export default {
  name: "MembershipExitApplyAudit",
  components: { AuditDialog, SysProcessLogDialog, SysFileUploadListDialog },
  data() {
    return {
      //查询条件options集合
      queryFormOptions: {
        exitType: [
          { value: "1", label: "韧性" },
          { value: "0", label: "就是想退会" }
        ],
        status: [
          { value: "20", label: "待审核" },
          { value: "15", label: "审核驳回" },
          { value: "30", label: "审核通过" }
        ]
      },
      // 查询条件
      queryForm: {
        // 会员编号
        memberCertNo: "",
        // 会员名称
        memberName: "",
        // 制单时间从
        submitDateFrom: "",
        // 制单时间至
        submitDateTo: "",
        status: "20",
        // 当前页码
        pageNo: 0,
        // 每页查询条数
        pageSize: 15
      },
      // 查询到的总数据条数
      pageTotal: 0,
      // 当前勾选的行
      multipleSelection: [],
      // 表格数据
      tableData: [],
      auditDialog: {
        isShow: false,
        title: "审核通过",
        auditType: "1"
      },
      dict: {
        exitType: []
      },
      //流程日志弹框
      processLog: {
        show: false,
        dataId: "",
        dataCode: "",
        system: "hxxd"
      },
      //附件列表弹框
      uploadFile: {
        show: false,
        ids: ""
      }
    };
  },
  // 相当于javascript的 $.ready()
  created() {
    // 初始化查询表单
    this.initQueryForm();
    // 初始加载表格数据
    this.initLoadTable();
  },
  methods: {
    initQueryForm() {
      getDictDataLists("97001007").then(response => {
        this.dict.exitType = response.data.jq97001007;
      });
      // 设置制单时间从，制单时间到
      var currDate = new Date();
      this.queryForm.submitDateFrom = parseTime(
        currDate.getTime() - 3600 * 1000 * 24 * 7
      );
    },
    initLoadTable() {
      this.getTableList();
    },
    // 表单查询
    formSearch() {
      this.getTableList();
    },
    // 表单重置
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    //查看
    handleView() {},
    //导出
    handleExport() {},
    //审核通过
    handleAuditPass() {
      var rows = this.multipleSelection;
      if (!rows || rows.length == 0) {
        this.$message({
          type: "info",
          message: "请选择要操作的数据!"
        });
        return;
      }
      for (var i = 0; i < rows.length; i++) {
        if (rows[i].status != "20") {
          this.$message({
            type: "error",
            message: "选择的数据包含已经审核的数据，不能重复审核"
          });
          return;
        }
      }
      this.auditDialog.auditType = "1";
      this.auditDialog.title = "审核通过";
      this.auditDialog.isShow = true;
    },
    //审核不通过
    handleAuditNotPass() {
      console.log("审核不通过");
      var rows = this.multipleSelection;
      if (!rows || rows.length == 0) {
        this.$message({
          type: "info",
          message: "请选择要操作的数据!"
        });
        return;
      }
      for (var i = 0; i < rows.length; i++) {
        if (rows[i].status != "20") {
          this.$message({
            type: "error",
            message: "选择的数据包含已经审核的数据，不能重复审核"
          });
          return;
        }
      }
      this.auditDialog.auditType = "2";
      this.auditDialog.title = "审核不通过";
      this.auditDialog.isShow = true;
    },
    auditDialogCallBack(command, data) {
      this.auditDialog.isShow = false;
      if (command == "ok") {
        //发送请求
        var auditType = data.auditType;
        var auditReason = data.auditReason;
        var ids = getIdsFromArr(this.multipleSelection);
        if (ids) {
          auditMemberExit(ids, auditType, auditReason).then(response => {
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            //审核成功重新加载数据
            this.getTableList();
          });
        }
      }
    },
    //分页改变触发
    handlePageSizeChange(val) {
      this.getTableList();
    },
    //页码改变触发
    handlePageNoChange(val) {
      this.getTableList();
    },
    getTableList() {
      var query = this.queryForm;
      getMemberExitList(query).then(response => {
        this.tableData = response.data;
        this.pageTotal = response.page.total || 0;
      });
    },
    handleTableSelectionChange(val) {
      this.multipleSelection = val;
    },
    statusFmt(row, column, cellValue, index) {
      let status = row.status;
      if (status === "10") {
        return "未提交";
      } else if (status === "15") {
        return "审核驳回";
      } else if (status === "20") {
        return "待审核";
      } else if (status === "30") {
        return "审核通过";
      } else {
        return row.status;
      }
    },
    exitTypeFmt(row, column, cellValue, index) {
      return getDictName(this.dict.exitType, row.exitType);
    },
    handleProcessLogView() {
      if (!this.multipleSelection) {
        this.$message({
          type: "info",
          message: "请选中查看流程日志的数据!"
        });
        return;
      }
      const selectRows = this.multipleSelection;
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
    handleViewUploadFile(ids) {
      this.uploadFile.ids = ids;
      this.uploadFile.show = true;
    },
    //关闭附件列表框
    closeFileUploadListDialog() {
      this.uploadFile.show = false;
      this.uploadFile.ids = "";
    }
  }
};
</script>

<style scoped>
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
