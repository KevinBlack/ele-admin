<template>
  <el-card class="detailsContainer">
    <!-- part1 -->
    <el-form ref="ruleForm" label-width="100px" size="mini">
      <el-row :gutter="20" class="area_border">
        <el-col :span="5">
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
        <el-col :span="5">
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

        <el-col :span="5">
          <el-form-item label="申请编号" prop="code">
            <el-input v-model="queryForm.code" size="mini"></el-input>
          </el-form-item>
        </el-col>

         <el-col :span="5">
          <el-form-item label="会员证书编号" prop="certificateNo">
            <el-input v-model="queryForm.certificateNo" size="mini"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="会员名称" prop="name">
            <el-input v-model="queryForm.name" size="mini"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="公司性质" prop="corporateNature">
            <el-input v-model="queryForm.corporateNature" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="法人代表" prop="legalRepresentName">
            <el-input v-model="queryForm.legalRepresentName" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="状态" size="mini" prop="status">
            <el-select v-model="queryForm.status" filterable placeholder="请选择" size="mini" style="width:100%">
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
          <el-button
            type="primary"
            icon="el-icon-refresh-right"
            size="mini"
            @click="resetForm('queryForm')"
          >重置</el-button>
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
          <el-button
            type="primary"
            class="btn_line"
            icon="el-icon-zoom-in"
            size="mini"
            @click="handleView"
          >查看</el-button>
           <el-button
              type="primary"
              class="btn_line"
              icon="el-icon-zoom-in"
              size="mini"
              @click="handleProcessLogView"
            >流程日志</el-button>
          <!-- <el-button type="primary" icon="el-icon-download" size="mini" @click="handleExport">导出</el-button> -->
        </el-button-group>
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
      <el-table-column prop="code" label="会员编号" width="250" align="center"></el-table-column>
      <el-table-column prop="name" label="会员名称" width="100" align="center"></el-table-column>
      <el-table-column prop="status" label="状态" width="100" align="center" :formatter="statusFmt"></el-table-column>
      <el-table-column prop="legalRepresentName" label="法人代表" width="150" align="center"></el-table-column>
      <el-table-column prop="registeredFunds" label="注册资金(万)" width="140" align="center"></el-table-column>
      <el-table-column prop="corporateNature" label="公司性质" align="center"></el-table-column>
      <el-table-column
        prop="mainBusinessScope"
        label="主业务范围"
        align="left"
        :show-overflow-tooltip="true"
        width="200"
      ></el-table-column>
      <el-table-column prop="contactName" label="联系人" width="100" align="center"></el-table-column>
      <el-table-column prop="submitDate" label="提交时间" width="180" align="center"></el-table-column>
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
    </el-row>
    <!-- 审核弹框 -->
    <el-dialog :visible.sync="auditDialog.isShow" :title="auditDialog.title">
      <ApplyAuditDialog
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
        tableName='HX_XD_MEMBER'
        @closeDalog="closeProcessLogDialog"
      />
    </el-dialog>
  </el-card>
</template>

<script>
// 此处引入axios 相关包
// 引入axios
import { getMemberList, auditMember } from "@/api/hxxd/member";
import { parseTime, getIdsFromArr } from "@/utils/index.js";
import ApplyAuditDialog from "./apply-audit-dialog";
import SysProcessLogDialog from "@/views/comm/sys-process-log-dialog";

export default {
  name: "MembershipApplyAudit",
  components: { ApplyAuditDialog,SysProcessLogDialog },
  data() {
    return {
      //查询条件options集合
      queryFormOptions: {
        status: [
          { value:"20", label: "待审核" },
          { value:"30", label: "审核通过" },
          { value:"40",label: "退会" }
        ]
      },
      // 查询条件
      queryForm: {
        // 会员编号
        code: "",
        // 会员名称
        name: "",
        // 公司性质
        corporateNature: "",
        // 法人代表姓名
        legalRepresentName: "",
        // 制单时间从
        submitDateFrom: "",
        // 制单时间至
        submitDateTo: "",
        // 会员证书编号
        certificateNo: '',
        status:"20",
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
      processLog:{
        show:false,
        dataId:'',
        dataCode:'',
        system:'hxxd'
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
    handleView() {
      var rows = this.multipleSelection;
      if (!rows || rows.length == 0 ) {
        this.$message({
          type: "info",
          message: "请选择要操作的数据!"
        });
        return;
      }
      if(rows.length.length>1){
        this.$message({
          type: "info",
          message: "只能选择一条要操作的数据!"
        });
        return;
      }
      var id = rows[0].id
      this.$router.push({ path: "/membership-manage/membership-apply-audit-detail", query: {id: id} });
    },
    //导出
    handleExport() {
     
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
      this.processLog.dataId=selectRows[0].id
      this.processLog.show=true
    },
    //关闭流程日志框
    closeProcessLogDialog() {
      this.processLog.show = false;
    },
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
      var illegalNameArr = new Array();
      Object.keys(rows).forEach(function(key) {
        if (rows[key].status != "20") {
          illegalNameArr.push(rows[key].name);
        }
      });
      if (illegalNameArr.length > 0) {
        var msg = "选择的数据不能进行审核，会员名称：" + illegalNameArr.join(",");
        this.$message({
          type: "error",
          message: msg
        });
        return;
      }
      this.auditDialog.isShow = true;
      this.auditDialog.auditType = "1";
      this.auditDialog.title = "审核通过";
    },
    //审核不通过
    handleAuditNotPass() {
      var rows = this.multipleSelection;
      if (!rows || rows.length == 0) {
        this.$message({
          type: "info",
          message: "请选择要操作的数据!"
        });
        return;
      }
      var illegalNameArr = new Array();
      Object.keys(rows).forEach(function(key) {
        if (rows[key].status != "20") {
          illegalNameArr.push(rows[key].name);
        }
      });
      if (illegalNameArr.length > 0) {
        var msg = "选择的数据不能进行审核，会员名称：" + illegalNameArr.join(",");
        this.$message({
          type: "error",
          message: msg
        });
        return;
      }
      this.auditDialog.isShow = true;
      this.auditDialog.auditType = "2";
      this.auditDialog.title = "审核不通过";
    },
    auditDialogCallBack(command, data) {
      this.auditDialog.isShow = false;
      if (command == "ok") {
        //发送请求
        var auditType = data.auditType;
        var auditReason = data.auditReason;
        var identityMark = data.identityMark;
        var ids = getIdsFromArr(this.multipleSelection);
        auditMember(ids, auditType, auditReason, identityMark).then(response => {
          this.$message({
            type: "success",
            message: "操作成功!"
          });
          //审核成功重新加载数据
          this.getTableList();
        });
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
      } else if (status === "40") {
        return "已退会";
      } else {
        return row.status;
      }
    },
    getTableList() {
      var query = this.queryForm;
      getMemberList(query).then(response => {
        this.tableData = response.data;
        this.pageTotal = response.page.total || 0;
      });
    },
    handleTableSelectionChange(val) {
      this.multipleSelection = val;
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
