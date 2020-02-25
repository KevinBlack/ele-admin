<template>
  <el-card class="detailsContainer">
    <!-- 查询面板start -->
    <el-form ref="formQuery" :model="formQuery" label-width="100px" :inline="true">
      <el-row class="area_border">
        <el-col :span="12">
          <el-form-item label="查询时间" size="mini" prop="timeValue">
            <el-date-picker
              type="datetimerange"
              v-model="formQuery.timeValue"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              unlink-panels
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width: 338px !important;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="投诉状态" size="mini" prop="status">
            <el-select
              v-model="formQuery.status"
              style="width: 400px !important;"
              filterable
              placeholder="请选择"
              size="mini"
            >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                style="width: 400px !important;"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="投诉内容" size="mini" prop="complaintsContents">
            <el-input
              v-model="formQuery.complaintsContents"
              size="mini"
              style="width: 338px !important;"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="投诉单位" size="mini" prop="complaintName">
            <el-input
              v-model="formQuery.complaintName"
              size="mini"
              style="width: 400px !important;"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="投诉类别" size="mini" prop="complaintClassification">
            <el-select v-model="formQuery.complaintClassification" filterable placeholder="请选择" size="mini"  style="width: 338px !important;">
              <el-option v-for="item in complaintOptions" :key="item.key" :label="item.value" :value="item.key"
                ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" style="text-align: left">
          <el-form-item size="mini">
            <el-button type="primary" size="mini" @click="search">查询</el-button>
            <el-button type="primary" size="mini" @click="resetForm('formQuery')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 查询面板end -->
    <!-- 按钮区 -->
    <el-row class="area_bordes">
      <el-col :span="24">
        <el-button-group size="mini">
          <template slot-scope="scope">
            <el-button
              v-show="btnShow('100021301010')"
              v-if="btnDisplay('10')"
              type="primary"
              size="mini"
              @click="handleAdd(scope.row)"
            >投诉处理</el-button>
            <el-button
              v-show="btnShow('100021301020')"
              v-if="btnDisplay('10')"
              type="primary"
              size="mini"
              @click="handleDetails(scope.row)"
            >查看详情</el-button>
            <el-button
              v-show="btnShow('100021301030')"
              v-if="btnDisplay('10')"
              type="primary"
              size="mini"
              @click="handleExamine(scope.row)"
            >审核</el-button>
            <el-button
              v-show="btnShow('100021301040')"
              v-if="btnDisplay('10')"
              type="primary"
              size="mini"
              @click="handleProcessLogView(scope.row)"
            >流程日志</el-button>
            <el-button
              v-show="btnShow('100021301080')"
              v-if="btnDisplay('10')"
              type="primary"
              size="mini"
              @click="handleExport(scope.row)"
            >导出</el-button>
          </template>
        </el-button-group>
      </el-col>
    </el-row>
    <!-- 表格区 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      tooltip-effect="dark"
      style="width: 100%;"
      :header-cell-style="getCellStyle"
      @selection-change="selectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        prop="complaintDate"
        width="160"
        label="投诉日期"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        prop="complaintTheme"
        width="100"
        label="投诉主题"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column
        prop="complaintName"
        width="192"
        label="投诉单位"
        :show-overflow-tooltip="true"
        align="center"
      />
      <el-table-column prop="complainant" width="100" label="投诉人" align="center" />
      <el-table-column
        prop="contractInformation"
        width="120"
        label="手机号"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="contractEmail"
        width="140"
        label="邮箱"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column align="center" width="90" prop="status" :formatter="statusFmt" label="处理状态" />
      <el-table-column align="center" prop="examineStatus" label="审核状态">
        <template scope="scope">
          <span v-if="scope.row.examineStatus === '20' ">待审核</span>
          <span v-else-if="scope.row.examineStatus === '30' ">审核通过</span>
          <span v-else-if="scope.row.examineStatus === '15' ">驳回</span>
          <span v-else-if="scope.row.examineStatus === '50' ">待复审</span>
          <span v-else style="color: red">{{scope.row.spState}}</span>
        </template>
      </el-table-column>
      <el-table-column label="相关附件、图片" align="center" width="200">
        <template slot-scope="scope">
          <el-button
            :key="index"
            v-for="(item, index) in scope.row.fileList"
            type="text"
            @click="fileClick(item.fileCatalog,item.belongId,item.fileName)"
          >{{ item.fileName }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格区2end -->
    <el-row class="area_bordes" style="margin-top:20px">
      <el-col :span="24" style="text-align: right">
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
    <!-- 表格区end -->
    <!-- 流程日志弹框 -->
    <el-dialog :visible.sync="processLog.show" title="流程日志查询" width="60%">
      <SysProcessLogDialog
        :dataId="processLog.dataId"
        :dataCode="processLog.dataCode"
        :isShow="processLog.show"
        tableName="HX_XD_COMPLAINT_INFO"
        @closeDalog="closeProcessLogDialog"
      />
    </el-dialog>
  </el-card>
</template>

<script>
import { selectComplainInfoAndProcessing } from "@/api/hxxd/complaintInfo";
import { downloadTemplate } from "@/api/hxxd/financialManage";
import { parseTime } from "@/utils/index.js";
import SysProcessLogDialog from "@/views/comm/sys-process-log-dialog";
import { getDictDataLists, getDictDataList } from "@/api/system/comm/comm";
export default {
  name: "ComplaintInfo",
  components: { SysProcessLogDialog },
  props: {
    pageCode: {
      type: String,
      default: ""
    }
  },
  // data 开始
  data() {
    return {
      btns: this.$store.getters.btns["1000213010"],
      show: false,
      treeData: [],
      treeDefaultProps: {
        children: "childs",
        label: function(data, node) {
          return data.complainant;
        }
      },
      complaintOptions: [],
      pageTotal: 0,
      formQuery: {
        complaintProfessingId: "",
        complaintsContents: "",
        complainant: "",
        status: "",
        remark: "",
        complaintName: "",
        handlePerson: "",
        pageNo: 1,
        pageSize: 15,
        startTime: "",
        endTime: "",
        timeValue: [],
        examineStatus: "",
        auditReason: "",
        fileList: [],
        complaintClassification: ""
      },
      downloadQuery: {
        fileCatalog: "test_file",
        belongId: 1,
        fileName: ""
      },
      statusOptions: [
        {
          value: 0,
          label: "未处理"
        },
        {
          value: 1,
          label: "已处理"
        }
      ],
      tableLoading: false,
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
      tableData: [],
      tableMultiSelection: []
    };
  },
  // data 结束
  created() {
    // const end = new Date()
    // const start = new Date()
    // start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
    // this.formQuery.timeValue = [parseTime(start), parseTime(end)]
    this.formQuery.startTime = this.formQuery.timeValue[0];
    this.formQuery.endTime = this.formQuery.timeValue[1];
    this.getTableList();
    //加载字典
    this.beforeLoading();
  },
  methods: {
    beforeLoading() {
      getDictDataLists("97001017").then(response => {
        this.complaintOptions = response.data.jq97001017;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "status") {
            return this.parseStatus(v[j]);
          } else if(j === "examineStatus"){
            return this.examineStatus(v[j]);
          }else if(j === "complaintClassification"){
            return this.complaintClassification(v[j]);
          }else{
            return v[j];
          }
        })
      );
    },
    complaintClassification(value){
      if(value == 1){
        return "价格"
      }else if(value == 2){
        return "退票"
      }else if(value == 3){
        return "改期"
      }else if(value == 4){
        return "服务"
      }else if(value == 5){
        return "其他"
      }
    },
    parseStatus(value){
      if(value == '0'){
        return "待处理"
      }else if(value == '1'){
        return "已处理"
      }
    },
    examineStatus(value){
      if(value == '20'){
        return "待审核"
      }else if(value == '15'){
        return "驳回"
      }else if(value == '30'){
        return "审核通过"
      }
    },
    handleExport() {
      var selectedRows = this.tableMultiSelection;
      if (!selectedRows || selectedRows.length === 0) {
        this.$message({
          type: "info",
          message: "请选中要导出的数据!"
        });
        return;
      }
      this.downloadLoading = true;
      // 引入Excel导出js文件
      import("@/vendor/Export2Excel").then(excel => {
        // excel 列标题
        const tHeader = ["投诉类别","投诉日期", "投诉主题", "投诉单位", "投诉人","投诉内容","手机号","邮箱","处理状态","审核状态"];
        //  excel 每行的数据（如果想导出所有数据，发送ajax，从服务端获取数据）
        const list = selectedRows;
        // excel 数据对应的字段
        const filterVal = ["complaintClassification", "complaintDate", "complaintTheme", "complaintName","complainant","complaintsContents","contractInformation","contractEmail","status","examineStatus"];
        // 从list 中去出值
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          // excel 列标题
          header: tHeader,
          // excel 数据
          data,
          // excel 文件名
          filename: "投诉管理表",
          // excel 是否自动宽度
          autoWidth: true,
          // excel 文件后缀 ['xlsx', 'csv', 'txt']
          bookType: "xlsx"
        });
        this.downloadLoading = false;
      });
    },
    //data中这个不能少：btns: this.$store.getters.btns['100010'],
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
    btnDisplay(status) {
      //根据具体业务数据控制
      if (status == "10") {
        return true;
      }
      return false;
    },
    getCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background: #F2F2F2;font-size: 13px;color: #333;font-weight: normal";
      } else {
        return "";
      }
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
      console.log(selectRows[0].id);
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
    fileClick(fileCatalog, belongId, fileName) {
      downloadTemplate(belongId, fileCatalog).then(response => {
        // console.log(response.headers)
        var contentDisposition = response.headers["content-disposition"]; //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
        console.log("contentDisposition", contentDisposition);
        var patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
        var result = patt.exec(contentDisposition);
        // console.log(contentDisposition)
        var fileName = decodeURIComponent(result[1]).trim();
        // var fileName="20190906~航协系统项目开发蓝图.xlsx"
        // console.log(fileName);
        const blob = new Blob([response.data]);
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          console.log(elink.href);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      });
    },
    downloads(data) {
      if (!data) {
        return;
      }
      let url = window.URL.createObjectURL(new Blob([data]));
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", this.downloadQuery.fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
    handleExamine() {
      if (!this.tableMultiSelection) {
        this.$message({
          type: "info",
          message: "请选中要审核的数据!"
        });
        return;
      }
      const selectRows = this.tableMultiSelection;
      if (selectRows.length === 0) {
        this.$message({
          type: "info",
          message: "请选中要审核的数据!"
        });
        return;
      } else if (selectRows.length >= 2) {
        this.$message({
          type: "info",
          message: "只能审核单条!"
        });
        return;
      } else if (!selectRows[0].complaintProfessingId) {
        console.log(selectRows[0].complaintProfessingId);
        this.$message({
          type: "info",
          message: "请先进行处理再进行审核!"
        });
        return;
      } else if (selectRows[0].examineStatus === "30") {
        this.$message({
          type: "info",
          message: "已审核，请重新选择!"
        });
        return;
      }
      var id = selectRows[0].id;
      console.log(id);
      this.$router.push({
        path: "/complaint-manage/complainExamine",
        query: { id: id }
      });
    },
    handleDetails() {
      if (!this.tableMultiSelection) {
        this.$message({
          type: "info",
          message: "请选中要查看的数据!"
        });
        return;
      }
      const selectRows = this.tableMultiSelection;
      if (selectRows.length === 0) {
        this.$message({
          type: "info",
          message: "请选中要查看的数据!"
        });
        return;
      } else if (selectRows.length >= 2) {
        this.$message({
          type: "info",
          message: "请选中查看数据!"
        });
        return;
      }
      var id = selectRows[0].id;
      this.$router.push({
        path: "/complaint-manage/complainDetails",
        query: { id: id }
      });
    },
    handleAdd() {
      if (!this.tableMultiSelection) {
        this.$message({
          type: "info",
          message: "请选中要处理的数据!"
        });
        return;
      }
      const selectRows = this.tableMultiSelection;
      if (selectRows.length === 0) {
        this.$message({
          type: "info",
          message: "请选中要处理的数据!"
        });
        return;
      } else if (selectRows.length >= 2) {
        this.$message({
          type: "info",
          message: "请选中单条数据!"
        });
        return;
      } else if (
        selectRows[0].complaintProfessingId &&
        selectRows[0].examineStatus === "50"
      ) {
        this.$message({
          type: "info",
          message: "该数据已处理，请重新选择!"
        });
        return;
      } else if (selectRows[0].examineStatus === "30") {
        this.$message({
          type: "info",
          message: "该数据已复审，请重新选择!"
        });
        return;
      }
      var id = selectRows[0].id;
      this.$router.push({
        path: "/complaint-manage/saveComplainProcessing",
        query: { id: id }
      });
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
      // var startTime = ''
      // var endTime = ''
      if (this.formQuery.timeValue.length >= 0) {
        this.formQuery.startTime = this.formQuery.timeValue[0];
        this.formQuery.endTime = this.formQuery.timeValue[1];
      }
      this.tableLoading = true;
      selectComplainInfoAndProcessing(this.formQuery).then(response => {
        this.tableData = response.data;
        this.pageTotal = response.page.total;
        this.tableLoading = false;
      });
    },
    handleSizeChange() {
      this.getTableList();
    },
    handleCurrentChange() {
      this.getTableList();
    },
    statusFmt(row, column, cellValue, index) {
      const spState = row.status;
      if (spState === 0) {
        return "未处理";
      } else if (spState === 1) {
        return "已处理";
      } else {
        return row.status;
      }
    },
    // typeName(row, column, cellValue, index) {
    //   const typename = row.fileList
    //   for (const key in typename) {
    //     return typename[key].fileName
    //   }
    // },
    handleDownload() {}
  }
};
</script>
<style>
@import "~@/styles/hxxd.scss";
</style>
