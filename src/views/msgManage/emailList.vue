<template>
  <el-card class="detailsContainer">
    <!-- part1 -->
    <el-form ref="formQuery" :model="formQuery" label-width="100px" size="mini">
      <el-row :gutter="20" class="area_border">
        <el-col :span="8">
          <el-form-item label="发送时间从" size="mini" prop="timeValue">
            <el-date-picker
              type="datetimerange"
              v-model="formQuery.timeValue"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              unlink-panels
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width: 250px;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="主题" size="mini" prop="subject">
            <el-input v-model="formQuery.subject" size="mini" style="width: 80%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否发送"  size="mini" prop="status">
            <el-select
                v-model="formQuery.status"
                filterable
                placeholder="请选择"
                style="width:80%">
              <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="getTableList">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh-right" @click="resetForm('formQuery')" size="mini">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="area_bordes">
      <el-col :span="24">
        <el-radio-group  size="mini">
          <el-radio-button v-show="btnShow('100020902010')" v-if="btnDisplay('10')" type="primary" class="btn_line" @click.native.prevent="addData">新 增</el-radio-button>
          <el-radio-button v-show="btnShow('100020902060')" v-if="btnDisplay('10')" type="primary" class="btn_line" @click.native.prevent="updData">修 改</el-radio-button>
          <el-radio-button v-show="btnShow('100020902020')" v-if="btnDisplay('10')" type="primary" class="btn_line" @click.native.prevent="delData">删 除</el-radio-button>
          <el-radio-button v-show="btnShow('100020902040')" v-if="btnDisplay('10')" type="primary" class="btn_line" @click.native.prevent="sendData">发 送</el-radio-button>
        </el-radio-group>
        <el-radio-group size="mini" style="margin-left: 20px;">
          <el-radio-button v-show="btnShow('100020902030')" v-if="btnDisplay('10')" type="primary" class="btn_line" @click.native.prevent="handleSee">查 看</el-radio-button>
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
      style="width: 100%;margin-bottom:20px;"
      @selection-change="selectionChange"
    >
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
      <el-table-column prop="subject" label="主题" align="center"></el-table-column>
      <el-table-column prop="receiveUser" label="收件人" align="center"></el-table-column>
      <el-table-column prop="sendTime" label="发送时间" align="center"></el-table-column>
      <el-table-column prop="statusName" label="发送状态" align="center"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row class="area_bordes">
      <el-col :span="24" style="text-align: right;">
        <el-pagination
          background
          style="text-align: margin-top: 20px;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="formQuery.pageNo"
          :page-size.sync="formQuery.pageSize"
          :page-sizes="[5, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotal"
        ></el-pagination>
      </el-col>
    </el-row>
  </el-card>

</template>

<script>
import { getSysEmailList,delData,sendData } from "@/api/msgManage/email.js";
export default {
  data() {
    return {
      btns: this.$store.getters.btns['1000209020'],
      pageTotal: 0,
      tableLoading: false,
      tableData: [],
      tableMultiSelection: [],
      formQuery: {
        pageNo: 1,
        pageSize: 5,
        orderBy: "",
        subject: "",
        timeValue: "",
        status: ""
      },
      statusOptions: [
        {
          value: "",
          label: "全部"
        },
        {
          value: 0,
          label: "未发送"
        },
        {
          value: 1,
          label: "已发送"
        }
      ]
    }
  },
  created() {
    this.getTableList();
  },
  methods: {
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
    addData() {
      this.$router.push({
        path: "/message-manage/email-add",query: {}
      });
    },
    updData() {
      if (this.tableMultiSelection.length==0) {
        this.$message({
          type: "info",
          message: "请选中要查看的数据!"
        });
        return;
      }
      if (this.tableMultiSelection.length!=1) {
        this.$message({
          type: "info",
          message: "请选中要一条需要查看的数据!"
        });
        return;
      }
      this.$router.push({
        path: "/message-manage/email-upd",query: {id:this.tableMultiSelection[0].id}
      });
    },
    handleSee() {
       if (this.tableMultiSelection.length==0) {
        this.$message({
          type: "info",
          message: "请选中要查看的数据!"
        });
        return;
      }
      if (this.tableMultiSelection.length!=1) {
        this.$message({
          type: "info",
          message: "请选中要一条需要查看的数据!"
        });
        return;
      }
      this.$router.push({
        path: "/message-manage/email-see",query: {readonly:true,id:this.tableMultiSelection[0].id}
      });
    },
    delData() {
      let selectRows = this.tableMultiSelection;
      if (selectRows.length==0) {
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
          var idArr = selectRows.map(selectRow => selectRow.id);
          if (idArr && idArr.length > 0) {
            var ids = idArr.join();
            delData(ids).then(response => {
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
    sendData(){
      if (this.tableMultiSelection.length==0) {
        this.$message({
          type: "info",
          message: "请选中要查看的数据!"
        });
        return;
      }
      if (this.tableMultiSelection.length!=1) {
        this.$message({
          type: "info",
          message: "请选中要一条需要查看的数据!"
        });
        return;
      }

      sendData(this.tableMultiSelection[0].id).then(response => {
        this.$message({
          type: "success",
          message: "发送成功!"
        });
        this.getTableList();
      });
    },
    getTableList() {
      this.tableLoading = true;
      if (this.formQuery.timeValue.length >= 0) {
        this.formQuery.beginTime = this.formQuery.timeValue[0];
        this.formQuery.endTime = this.formQuery.timeValue[1];
      }

      getSysEmailList(this.formQuery).then(response => {
        this.tableData = response.data;
        for(var i=0;i<response.data.length;i++){
          var data=response.data[i];
          if(data.status==0){
            this.tableData[i].statusName="未发送";
          }else if(data.status==1){
            this.tableData[i].statusName="已发送";
          }
        }
        this.pageTotal = response.page.total;
        this.tableLoading = false;
      });
    },
   resetForm(formQuery) {
      this.$nextTick(() => {
        this.$refs[formQuery].resetFields();
      });
    },
    selectionChange(val) {
      this.tableMultiSelection = val;
    },
    handleSizeChange(val) {
      this.getTableList();
    },
    handleCurrentChange(val) {
      this.getTableList();
    },

  }
}
</script>

<style scoped>
@import '~@/styles/hxxd.scss';
</style>
