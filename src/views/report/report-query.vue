<template>
  <el-card class="detailsContainer">
    <!-- part1 -->
    <el-form ref="formQuery" :model="formQuery" label-width="100px" size="mini">
      <el-row :gutter="24" class="area_bordes">
        <el-col :span="6">
          <el-form-item label="年份查询" size="mini" prop="annual">
            <el-date-picker
              v-model="formQuery.annual"
              type="year"
              placeholder="请选择年份"
              format="yyyy"
              value-format="yyyy"
              style="width: 100%"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
         <el-form-item label="企业名称" size="mini" prop="businessName">
            <el-input v-model="formQuery.businessName" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="省份" size="mini" prop="businessName">
            <el-select
              v-model="formQuery.province"
              filterable
              placeholder="请选择"
              style="width: 100%;"
            >
              <el-option
                v-for="item in provinceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="地区" size="mini" prop="businessName">
            <el-select
              v-model="formQuery.area"
              filterable
              placeholder="请选择"
              style="width: 100%;"
            >
              <el-option
                v-for="item in areaOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="6">
          <el-form-item label="上报状态" size="mini" prop="status">
            <el-select
              v-model="formQuery.status"
              size="mini"
              style="width: 100%"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col> -->
        <el-col :span="12" style="text-align: right;">
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
             v-show="btnShow('100020702010')"
            @click="getTableList"
            >查询</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-refresh-right"
            @click="resetForm('formQuery')"
            size="mini"
            >重置</el-button
          >
        </el-col>
      </el-row>
    </el-form>
    <el-row :gutter="20" class="area_bordes">
      <el-col :span="24">
        <el-button-group size="mini">
          <!-- <el-button
            type="primary"
            class="btn_line"
            icon="el-icon-circle-check"
            size="mini"
            v-show="btnShow('100020702030')"
            @click="handleAuditPass"
            >审核通过</el-button
          >
          <el-button
            type="primary"
            class="btn_line"
            icon="el-icon-circle-close"
            size="mini"
            v-show="btnShow('100020702030')"
            @click="handleAuditNotPass"
            >审核驳回</el-button
          >
          <el-button
            type="primary"
            class="btn_line"
            icon="el-icon-zoom-in"
            size="mini"
            v-show="btnShow('100020702050')"
            @click="handleProcessLogView"
            >流程日志</el-button
          > -->
          <el-button
            type="primary"
            class="btn_line"
            icon="el-icon-zoom-in"
            size="mini"
            v-show="btnShow('100020702080')"
            @click="pubOrCancelAnnualReport(true)"
            >批量发布</el-button
          >
          <el-button
            type="primary"
            class="btn_line"
            icon="el-icon-zoom-in"
            size="mini"
            v-show="btnShow('100020702090')"
            @click="pubOrCancelAnnualReport(false)"
            >取消发布</el-button
          >
        </el-button-group>
        <el-button-group size="mini" style="margin-left: 20px;">
          <el-button
            type="primary"
            class="btn_line"
            icon="el-icon-zoom-in"
            size="mini"
            v-show="btnShow('100020702040')"
            @click.native.prevent="handleEdit"
            >查看信息</el-button
          >
          <el-button
            type="primary"
            class="btn_line"
            icon="el-icon-delete"
            v-show="btnShow('100020702020')"
            size="mini"
            @click.native.prevent="deleteBatch"
            >删除信息</el-button
          >
        </el-button-group>
      </el-col>
    </el-row>
    <!-- part3 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      v-loading="tableLoading"
      tooltip-effect="dark"
      highlight-current-row
      :header-cell-style="getCellStyle"
      @selection-change="handleSelectionChange"
      class="table-hxxd"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        type="index"
        width="55"
        label="序号"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="annual"
        label="年度"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="businessName"
        label="企业名称"
        width="250"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="createDate"
        label="省份"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="submitBy"
        label="地区"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <!-- <el-table-column
        prop="status"
        label="上报状态"
        align="center"
        :formatter="statusFmt"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="submitDate"
        label="上报时间"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column> -->
      <el-table-column
        prop="isPub"
        label="发布状态"
        align="center"
        :formatter="statusPub"
        :show-overflow-tooltip="true"
      ></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row class="area_bordes">
      <el-col :span="24" style="text-align: right;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="formQuery.pageNo"
          :page-size.sync="formQuery.pageSize"
          :page-sizes="[5, 30, 50, 100]"
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
      <el-dialog
        :visible.sync="processLog.show"
        title="流程日志查询"
        width="60%"
      >
        <SysProcessLogDialog
          :dataId="processLog.dataId"
          :dataCode="processLog.dataCode"
          :isShow="processLog.show"
          tableName="HX_XD_ANNUAL_REPORT"
          @closeDalog="closeProcessLogDialog"
        />
      </el-dialog>
    </el-row>
  </el-card>
</template>

<script>
import {
  getReportInfoList,
  annualReportDeleteBatch,
  auditReport,
  pubOrCancelAnnualReport
} from "@/api/hxxd/agent";
import { parseTime, getIdsFromArr } from "@/utils/index.js";
import AuditDialog from "@/views/comm/audit-dialog";
import SysProcessLogDialog from "@/views/comm/sys-process-log-dialog";
export default {
  name: "reportAudit",
  components: { AuditDialog, SysProcessLogDialog },
  data() {
    return {
      //获取有权限的按钮
      btns: this.$store.getters.btns["1000207020"],
      auditDialog: {
        isShow: false,
        title: "审核通过",
        auditType: "1"
      },
      processLog: {
        show: false,
        dataId: "",
        dataCode: "",
        system: "hxxd"
      },
      param: {
        idList: [],
        pubOrCancel: ""
      },
      sum: 0,
      added: 0,
      multipleSelection: [],
      pageTotal: 0,
      tableLoading: false,
      tableData: [],
      createDate: [],
      formQuery: {
        annual: "",
        status: "0",
        pageNo: 1,
        pageSize: 5,
        orderBy: "",
        area: "",
        province: "",
        businessName: ""
      },
      options: [
        {
          value: "0",
          label: "--所有--"
        },
        {
          value: "10",
          label: "未上报"
        },
        {
          value: "15",
          label: "已经上报的"
        }
      ],
      value: "0",
      areaOptions: [
        {
          value: "华东地区",
          label: "华东地区"
        },
        {
          value: "华南地区",
          label: "华南地区"
        },
        {
          value: "华中地区",
          label: "华中地区"
        },
        {
          value: "3",
          label: "华北地区"
        },
        {
          value: "4",
          label: "西北地区"
        },
        {
          value: "5",
          label: "西南地区"
        },
        {
          value: "6",
          label: "东北地区"
        }
      ],
      provinceOptions: [
        {
          value: "0",
          label: "北京市"
        },
        {
          value: "1",
          label: "天津市"
        },
        {
          value: "2",
          label: "上海市"
        },
        {
          value: "3",
          label: "重庆市"
        },
        {
          value: "4",
          label: "河北省"
        },
        {
          value: "5",
          label: "山西省"
        },
        {
          value: "6",
          label: "辽宁省"
        },
        {
          value: "7",
          label: "吉林省"
        },
        {
          value: "8",
          label: "黑龙江省"
        },
        {
          value: "9",
          label: "江苏省"
        },
        {
          value: "10",
          label: "浙江省"
        },
        {
          value: "11",
          label: "安徽省"
        },
        {
          value: "12",
          label: "福建省"
        },
        {
          value: "13",
          label: "江西省"
        },
        {
          value: "14",
          label: "山东省"
        },
        {
          value: "15",
          label: "河南省"
        },
        {
          value: "16",
          label: "湖北省"
        },
        {
          value: "17",
          label: "湖南省"
        },
        {
          value: "18",
          label: "广东省"
        },
        {
          value: "19",
          label: "海南省"
        },
        {
          value: "20",
          label: "四川省"
        },
        {
          value: "21",
          label: "贵州省"
        },
        {
          value: "22",
          label: "云南省"
        },
        {
          value: "23",
          label: "陕西省"
        },
        {
          value: "24",
          label: "甘肃省"
        },
        {
          value: "25",
          label: "测试二"
        },
        {
          value: "26",
          label: "青海省"
        },
        {
          value: "27",
          label: "台湾省"
        },
        {
          value: "28",
          label: "内蒙古自治区"
        },
        {
          value: "29",
          label: "广西壮族自治区"
        },
        {
          value: "30",
          label: "西藏自治区"
        },
        {
          value: "31",
          label: "宁夏回族自治区"
        },
        {
          value: "32",
          label: "新疆维吾尔自治区"
        },
        {
          value: "33",
          label: "香港特别行政区"
        },
        {
          value: "34",
          label: "澳门特别行政区"
        }
      ]
    };
  },
  created() {
    //初始化页面时
    // 参数传递 router.push({ path: 'register', query: { plan: 'private' }})
    // 参数接受 let id = this.$route.query.jId;
    // let flag = this.$route.query.flag;
    // if (flag) {
    this.getTableList();
    this.formQuery.endTime = parseTime(new Date());
    // }
  },
  methods: {
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
    },
    //发布或者取消发布
    pubOrCancelAnnualReport(pubOrCancel) {
      var idList = [];
      var rows = this.multipleSelection;
      if (!rows || rows.length == 0) {
        this.$message({
          type: "warning",
          message: "请选择要操作的数据!"
        });
        return;
      }
      var illegalNameArr = new Array();
      Object.keys(rows).forEach(function(key) {
        idList.push( rows[key].id);
        if (pubOrCancel) {
          if (rows[key].isPub === "1") {
            //如果已经发布，则提示
            illegalNameArr.push(
              rows[key].annual + "-" + rows[key].businessName
            );
          }
        } else {
          if ( rows[key].isPub != "1") {
            //如果未发布，则提示
            illegalNameArr.push(
              rows[key].annual + "-" + rows[key].businessName
            );
          }
        }
      });

      if (illegalNameArr.length > 0) {
        var msg =
          "选择的数据状态非法，年份-企业名称：" + illegalNameArr.join(",");
        this.$message({
          type: "warning",
          message: msg
        });
        return;
      }
      this.param.idList = idList;
      this.param.pubOrCancel = pubOrCancel;
      pubOrCancelAnnualReport(this.param).then(response => {
        if (response.data) {
          var message = pubOrCancel ? "发布成功" : "取消发布成功"; //操作成功
          this.$message({
            type: "success",
            message: message
          });
          //更新列表
          this.getTableList();
        } else {
          var message = pubOrCancel ? "发布失败" : "取消发布失败"; //操作失败
          this.$message({
            type: "false",
            message: message
          });
        }
      });
    },
    //代码转换
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
    statusPub(row, column, cellValue, index) {
      let isPub = row.isPub;
      if (isPub === "0") {
        return "未发布";
      } else if (isPub === "1") {
        return "已发布";
      } else if (isPub === "2") {
        return "取消发布";
      } else {
        return row.isPub;
      }
    },
    handleProcessLogView() {
      if (!this.multipleSelection) {
        this.$message({
          type: "warning",
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
          type: "warning",
          message: msg
        });
        return;
      }
      //数据id
      this.processLog.dataId = selectRows[0].id;
      this.processLog.show = true;
    },
    //审核通过
    handleAuditPass() {
      var rows = this.multipleSelection;
      if (!rows || rows.length == 0) {
        this.$message({
          type: "warning",
          message: "请选择要操作的数据!"
        });
        return;
      }
      var illegalNameArr = new Array();
      Object.keys(rows).forEach(function(key) {
        if (rows[key].status != "20") {
          illegalNameArr.push(rows[key].annual + "-" + rows[key].businessName);
        }
      });

      if (illegalNameArr.length > 0) {
        var msg =
          "选择的数据状态非法，年份-企业名称：" + illegalNameArr.join(",");
        this.$message({
          type: "warning",
          message: msg
        });
        return;
      }
      this.auditDialog.auditType = "1";
      this.auditDialog.title = "审核通过";
      this.auditDialog.isShow = true;
    },
    // 审核不通过
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
      var illegalNameArr = new Array();
      Object.keys(rows).forEach(function(key) {
        if (rows[key].status != "20") {
          illegalNameArr.push(rows[key].annual + "-" + rows[key].businessName);
        }
      });
      if (illegalNameArr.length > 0) {
        var msg =
          "选择的数据状态非法，年份-企业名称：" + illegalNameArr.join(",");
        this.$message({
          type: "warning",
          message: msg
        });
        return;
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
          auditReport(ids, auditType, auditReason).then(response => {
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
    //关闭流程日志框
    closeProcessLogDialog() {
      this.processLog.show = false;
    },
    deleteBatch() {
      var idList = [];
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "请选择数据",
          type: "warning"
        });
      } else {
        this.multipleSelection.forEach(i => {
          idList.push(i.id);
        });
        //批量删除
        this.param.idList = idList;
        annualReportDeleteBatch(this.param).then(response => {
          if (response.status == 200) {
            //删除成功
            this.$message({
              type: "success",
              message: "删除成功"
            });
            //更新列表
            this.getTableList();
          }
        });
      }
    },
    getCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background: #F2F2F2;font-size: 13px;color: #333;font-weight: normal";
      } else {
        return "";
      }
    },
    handleEdit() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: "请选择数据",
          type: "warning"
        });
      } else if (this.multipleSelection.length === 1) {
        let id = this.multipleSelection[0].id;
        if (id) {
          this.$router.push({
            path: "/annual-report/annual-report-detail",
            query: { id: id }
          });
        }
      } else if (this.multipleSelection.length > 1) {
        this.$message({
          message: "请选择单条数据",
          type: "warning"
        });
      }
    },
    handleSizeChange(val) {
      this.getTableList();
    },
    handleCurrentChange(val) {
      this.getTableList();
    },
    getTableList() {
      this.tableLoading = true;
      this.formQuery.beginTime = this.createDate[0];
      this.formQuery.endTime = this.createDate[1];
      getReportInfoList(this.formQuery).then(response => {
        this.tableData = response.data;
        this.pageTotal = response.page.total;
        this.tableLoading = false;
      });
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // if (val.length > 1) {
      //   this.$message({
      //     message: "只能选择单条",
      //     type: "warning"
      //   });
      // }
      if (val.length !== 0) {
        this.added = val.length;
        this.sum = this.added;
      } else if (val.length === 0) {
        this.sum -= this.added;
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    }
  }
};
</script>
<style>
@import "~@/styles/hxxd.scss";
</style>
