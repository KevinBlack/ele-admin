<template>
  <el-card class="detailsContainer">
    <!-- part1 -->
    <el-form ref="formQuery" :model="formQuery" label-width="100px" size="mini">
      <el-row :gutter="20" class="area_border">
        <el-col :span="10">
          <el-form-item label="创建时间" size="mini" prop="createDate">
            <el-date-picker
              v-model="createDate"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              style="width:100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="消息类型" size="mini" prop="businessName">
            <el-input v-model="formQuery.businessName" size="mini"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="text-align: center;">
          <el-button
            type="primary"
            icon="el-icon-search"
            v-show="btnShow('1000210030')"
            size="mini"
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
        <el-radio-group size="mini">
          <el-radio-button
            type="primary"
            class="btn_line"
            v-show="btnShow('1000210040')"
            @click.native.prevent="handleAdd"
            >新 增</el-radio-button
          >
          <el-radio-button
            type="primary"
            class="btn_line"
            v-show="btnShow('1000210080')"
            @click.native.prevent="handleEdit('update')"
            >修 改</el-radio-button
          >
          <el-radio-button
            type="primary"
            class="btn_line"
            v-show="btnShow('1000210050')"
            @click.native.prevent="callInfoDeleteBatch"
            >删 除</el-radio-button
          >
          <el-radio-button
            type="primary"
            class="btn_line"
            v-show="btnShow('1000210060')"
            @click.native.prevent="handleEdit('show')"
            >查 看</el-radio-button
          >
        </el-radio-group>
        <el-radio-group size="mini" style="margin-left: 20px;">
          <el-radio-button
            type="primary"
            class="btn_line"
            v-show="btnShow('1000210070')"
            @click.native.prevent="handleEdit('send')"
            >催缴消息发送</el-radio-button
          >
        </el-radio-group>
      </el-col>
    </el-row>
    <!-- part3 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      v-loading="tableLoading"
      tooltip-effect="dark"
      :header-cell-style="getCellStyle"
      highlight-current-row
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
        prop="sendTime"
        label="日期"
        width="250"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="content"
        label="消息正文"
        width="250"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="sendScope"
        label="发送范围"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="remarks"
        label="备注"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="repetRule"
        label="重复规则"
        align="left"
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
import { getCallInfoList, callInfoDeleteBatch } from "@/api/hxxd/agent";
import { parseTime } from "@/utils/index.js";
export default {
  name: "CallInfoManage",
  data() {
    return {
      //获取有权限的按钮
      btns: this.$store.getters.btns["1000210020"],
      param: {
        ids: []
      },
      dialogVisible: false,
      sum: 0,
      added: 0,
      multipleSelection: [],
      pageTotal: 0,
      tableLoading: false,
      tableData: [],
      createDate: [],
      formQuery: {
        beginTime: "",
        endTime: "",
        messageType: "",
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
    getCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background: #F2F2F2;font-size: 13px;color: #333;font-weight: normal";
      } else {
        return "";
      }
    },
    handleAdd() {
      this.$router.push({
        path: "/urge-pay-manage/urge-pay-setting"
      });
    },
    handleEdit(type) {
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "请选择数据",
          type: "warning"
        });
      } else if (this.multipleSelection.length == 1) {
        var id = this.multipleSelection[0].id;
        if (id) {
          this.$router.push({
            path: "/urge-pay-manage/urge-pay-detail",
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
    callInfoDeleteBatch() {
      var ids = "";
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "请选择数据",
          type: "warning"
        });
      } else {
        this.multipleSelection.forEach(i => {
          ids = ids + i.id + ",";
        });
        //批量删除
        this.param.ids = ids;
        callInfoDeleteBatch(this.param).then(response => {
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
      getCallInfoList(this.formQuery).then(response => {
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
