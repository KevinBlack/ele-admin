<template>
  <el-card class="detailsContainer">
    <!-- part1 -->
    <el-form ref="formQuery" :model="formQuery" label-width="100px" size="mini">
      <el-row :gutter="20" class="area_border">
        <el-col :span="11">
          <el-form-item label="生成时间从" size="mini" prop="createDate">
            <el-date-picker
              v-model="formQuery.createDate"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              style="width:100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="关键字搜索" size="mini" prop="header">
            <el-input v-model="formQuery.header" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="公司名称" size="mini" prop="companyBel">
            <el-input v-model="formQuery.companyBel" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" style="text-align: center;">
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            v-show="btnShow('100020903010')"
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

    <!-- 增删改查按钮 -->
    <el-row class="area_bordes">
      <el-col :span="24">
        <el-button-group size="mini">
          <el-button
            type="primary"
            class="btn_line"
            icon="el-icon-zoom-in"
            size="mini"
            v-show="btnShow('100020903030')"
            @click.native.prevent="handleAdd"
            >新 增</el-button
          >
          <el-button
            type="primary"
            class="btn_line"
            icon="el-icon-zoom-in"
            size="mini"
            v-show="btnShow('100020903080')"
            @click.native.prevent="handleEdit('update')"
            >修 改</el-button
          >
          <el-button
            type="primary"
            class="btn_line"
            icon="el-icon-zoom-in"
            size="mini"
            v-show="btnShow('100020903020')"
            @click.native.prevent="deleteBatch"
            >删 除</el-button
          >
          <el-button
            type="primary"
            class="btn_line"
            icon="el-icon-zoom-in"
            size="mini"
            v-show="btnShow('100020903040')"
            @click.native.prevent="handleEdit('show')"
            >查 看</el-button
          >
        </el-button-group>
        <el-button-group size="mini">
          <el-button
            type="primary"
            class="btn_line"
            icon="el-icon-zoom-in"
            size="mini"
            @click.native.prevent="handleExit"
            >导 出</el-button
          >
          <el-button
            type="primary"
            class="btn_line"
            icon="el-icon-zoom-in"
            size="mini"
            @click.native.prevent="sendMessage('1')"
            >发送短信</el-button
          >
          <el-button
            type="primary"
            class="btn_line"
            icon="el-icon-zoom-in"
            size="mini"
            @click.native.prevent="sendMessage('2')"
            >发送邮件</el-button
          >
          <!-- <el-button
            type="primary"
            class="btn_line"
            icon="el-icon-zoom-in"
            size="mini"
            @click.native.prevent="handleAdd"
            >发布内部消息</el-button
          > -->
          <el-button
            type="primary"
            class="btn_line"
            icon="el-icon-zoom-in"
            size="mini"
            @click="pubOrCancelNotice(true)"
            >门户发布</el-button
          >
          <el-button
            type="primary"
            class="btn_line"
            icon="el-icon-zoom-in"
            size="mini"
            @click="pubOrCancelNotice(false)"
            >门户取消</el-button
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
        prop="header"
        label="标题"
        width="325"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="time"
        label="发布时间"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="content"
        label="通知内容"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="identityMark"
        label="会员身份"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="isPub"
        label="发布状态"
        align="center"
        :formatter="statusPub"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="sendType"
        label="已发送消息"
        align="center"
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
    </el-row>
  </el-card>
</template>

<script>
import {
  getSysNoticeList,
  sysNoticeDeleteBatch,
  pubOrCancelNotice,
  sendMessage
} from "@/api/hxxd/agent";
import { parseTime } from "@/utils/index.js";
export default {
  name: "SysNoticeQuery",
  data() {
    return {
      //获取有权限的按钮
      btns: this.$store.getters.btns["1000209030"],
      param: {
        idList: [],
        sendType: "",
        pubOrCancel: ""
      },
      sum: 0,
      added: 0,
      multipleSelection: [],
      pageTotal: 0,
      tableLoading: false,
      tableData: [],
      
      formQuery: {
        createDate: [],
        companyBel: "",
        header: "",
        beginTime: "",
        endTime: "",
        pageNo: 1,
        pageSize: 5,
        orderBy: ""
      }
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
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "isPub") {
            return this.parseStatus(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    parseStatus(value){
      if(value == "0"){
        return "未发布"
      }else if(value == "1"){
        return "已发布"
      }else if(value == "2"){
        return "取消发布"
      }
    },
    handleExit() {
      var selectedRows = this.multipleSelection;
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
        const tHeader = ["标题", "发布时间", "通知内容", "会员身份","发布状态"];
        //  excel 每行的数据（如果想导出所有数据，发送ajax，从服务端获取数据）
        const list = selectedRows;
        // excel 数据对应的字段
        const filterVal = ["header", "time", "content", "identityMark","isPub"];
        // 从list 中去出值
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          // excel 列标题
          header: tHeader,
          // excel 数据
          data,
          // excel 文件名
          filename: "通知公告表",
          // excel 是否自动宽度
          autoWidth: true,
          // excel 文件后缀 ['xlsx', 'csv', 'txt']
          bookType: "xlsx"
        });
        this.downloadLoading = false;
      });
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
    //发送消息，1为短信，2为邮件
    sendMessage(sendType) {
      var idList = [];
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
        idList.push(rows[key].id);
          if (rows[key].isPub != "1") {
            //发送邮件
            illegalNameArr.push(rows[key].header);
          }
      });
      if (illegalNameArr.length > 0) {
        var msg = "选择的数据状态非法，标题：" + illegalNameArr.join(",");
        this.$message({
          type: "error",
          message: msg
        });
        return;
      }
      this.param.idList = idList;
      this.param.sendType = sendType;
      sendMessage(this.param).then(response => {
        if (response.data) {
          var message = "信息发送完成";
          if (sendType === "1") {
            //发送短信
            message = "短信发送完成";
          } else if (sendType === "2") {
            //发送邮箱
            message = "邮件发送完成";
          }
          this.$message({
            type: "success",
            message: message
          });
          //更新列表
          this.getTableList();
        } else {
          var message = "信息发送完成";
          if (sendType === "1") {
            //发送短信
            message = "短信发送完成";
          } else if (sendType === "2") {
            //发送邮箱
            message = "邮件发送完成";
          }
          this.$message({
            type: "false",
            message: message
          });
        }
      });
    },
    //发布或者取消发布
    pubOrCancelNotice(pubOrCancel) {
      var idList = [];
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
        idList.push(rows[key].id);
        if (pubOrCancel) {
          if (rows[key].isPub === "1") {
            //已经发布
            illegalNameArr.push(rows[key].header);
          }
        } else {
          if (rows[key].isPub != "1") {
            //已发发布
            illegalNameArr.push(rows[key].header);
          }
        }
      });

      if (illegalNameArr.length > 0) {
        var msg = "选择的数据状态非法，标题：" + illegalNameArr.join(",");
        this.$message({
          type: "error",
          message: msg
        });
        return;
      }
      this.param.idList = idList;
      this.param.pubOrCancel = pubOrCancel;
      pubOrCancelNotice(this.param).then(response => {
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
    getCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background: #F2F2F2;font-size: 13px;color: #333;font-weight: normal";
      } else {
        return "";
      }
    },
    handleAdd() {
      this.$router.push({
        path: "/message-manage/notice-announcement-edit"
      });
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
        sysNoticeDeleteBatch(this.param).then(response => {
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
    handleEdit(type) {
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "请选择数据",
          type: "warning"
        });
      } else if (this.multipleSelection.length == 1) {
        debugger;

        var id = this.multipleSelection[0].id;
        if (id) {
          this.$router.push({
            path: "/message-manage/notice-announcement-detail",
            query: { id: id, type: type }
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
      this.formQuery.beginTime = this.formQuery.createDate[0];
      this.formQuery.endTime = this.formQuery.createDate[1];
      getSysNoticeList(this.formQuery).then(response => {
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
