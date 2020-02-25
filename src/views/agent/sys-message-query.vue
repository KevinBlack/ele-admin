<template>
  <el-card class="detailsContainer">
    <!-- part1 -->
    <el-form ref="formQuery" :model="formQuery" label-width="100px" size="mini">
      <el-row :gutter="20" class="area_bordes">
        <el-col :span="11">
          <el-form-item label="生成时间从" size="mini" prop="createDate">
            <el-date-picker
              v-model="createDate"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions"
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
        <el-col :span="6">
          <el-form-item label="公司名称" size="mini" prop="companyBel">
            <el-input v-model="formQuery.companyBel" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" style="text-align: center;margin: 10px 0">
          <el-button
            type="primary"
            icon="el-icon-search"
            v-show="btnShow('100020905050')"
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
            v-show="btnShow('100020905010')"
            class="btn_line"
            @click.native.prevent="handleAdd"
            >新 增</el-radio-button
          >
          <el-radio-button
            type="primary"
            class="btn_line"
            v-show="btnShow('100020905020')"
            @click.native.prevent="handleEdit('update')"
            >修 改</el-radio-button
          >
          <el-radio-button
            type="primary"
            class="btn_line"
            v-show="btnShow('100020905030')"
            @click.native.prevent="deleteBatch"
            >删 除</el-radio-button
          >
          <el-radio-button
            type="primary"
            class="btn_line"
            v-show="btnShow('100020905040')"
            @click.native.prevent="handleEdit('show')"
            >查 看</el-radio-button
          >
          <el-radio-button
            type="primary"
            class="btn_line"
            v-show="btnShow('100020905090')"
            @click.native.prevent="handleRead()"
            >标记已读</el-radio-button
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
      highlight-current-row
      :header-cell-style="getCellStyle"
      @selection-change="handleSelectionChange"
      class="table-hxxd"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column
        type="index"
        width="55"
        label="序号"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="time"
        label="日期"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="header"
        label="消息标题"
        width="325"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="despatcher"
        label="发送人"
        align="center"
      ></el-table-column>
      <el-table-column v-if="btnShow('100020905090')"
        prop="isRead"
        label="是否已读"
        align="center"
      ></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row class="area_bordes">
      <el-col :span="24" style="text-align: right">
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
  getSysMessageList,
  sysMessageDeleteBatch,
  msgMarksRead
} from "@/api/hxxd/agent";
import { parseTime } from "@/utils/index.js";
export default {
  name: "SysMessageQuery",
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      //获取有权限的按钮
      btns: this.$store.getters.btns["1000209050"],
      param: {
        idList: []
      },
      sum: 0,
      added: 0,
      multipleSelection: [],
      pageTotal: 0,
      tableLoading: false,
      tableData: [],
      createDate: [],
      formQuery: {
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
    // 初始化页面时
    // 参数传递 router.push({ path: 'register', query: { plan: 'private' }})
    // 参数接受 let id = this.$route.query.jId
    // let flag = this.$route.query.flag
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
          }else if ("10001050" === btns[i]){
            // 存在10001050则为管理员，隐藏是否已读 字段
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
        path: "/message-manage/system-message-edit"
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
        // 批量删除
        this.param.idList = idList;
        sysMessageDeleteBatch(this.param).then(response => {
          if (response.status == 200) {
            // 删除成功
            this.$message({
              type: "success",
              message: "删除成功"
            });
            // 更新列表
            this.getTableList();
          }
        });
      }
    },
    handleEdit(type) {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: "请选择数据",
          type: "warning"
        });
      } else if (this.multipleSelection.length === 1) {
        var id = this.multipleSelection[0].id;
        if (id) {
          this.$router.push({
            path: "/message-manage/system-message-detail",
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
    handleRead() {
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
        idList.push(rows[key].id);
        if (rows[key].isRead === "1") {
          //已读消息
          illegalNameArr.push(rows[key].header);
        }
      });

      if (illegalNameArr.length > 0) {
        var msg = "请选择未读数据，标题：" + illegalNameArr.join(",");
        this.$message({
          type: "warning",
          message: msg
        });
        return;
      }
      this.param.idList = idList;
      msgMarksRead(this.param).then(response => {
        debugger;
        if (response.data) {
          var message = "标记为已读"; //操作成功
          this.$message({
            type: "success",
            message: message
          });
          //更新列表
          this.getTableList();
        } else {
          var message = "标记为已读"; //操作失败
          this.$message({
            type: "false",
            message: message
          });
        }
        // 更新列表
        this.getTableList();
      });
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
      getSysMessageList(this.formQuery).then(response => {
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
