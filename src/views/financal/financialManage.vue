<template>
    <!-- part1 -->
 <el-card class="box-card" style="margin: 0 10px;">
       <!-- 查询面板 -->
      <el-card class="box-card" shadow="never">
        <!-- label-width="65px" -->
        <el-form ref="formQuery" :model="formQuery" label-width="100px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="交易流水号" size="mini" prop="tradePipelineNum">
                <el-input v-model="formQuery.tradePipelineNum" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="摘要" size="mini" prop="abstractContent">
                <el-input v-model="formQuery.abstractContent" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="对方账号" size="mini" prop="oppositeAccount">
                <el-input v-model="formQuery.oppositeAccount" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="对方账户名称" size="mini" prop="oppositeAccountName">
                <el-input v-model="formQuery.oppositeAccountName" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收款账户" size="mini" prop="paymentAccount">
                <el-select v-model="formQuery.paymentAccount" filterable placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in accountOptions"
                    :key="item.value"
                    :label="item.label"
                    style="width:100%"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="记录状态" size="mini" prop="status">
                <el-select v-model="formQuery.status" filterable placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    style="width:100%"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            
            <el-col :span="16">
                  <el-form-item label="交易日期" size="mini" prop="timeValue">
                    <el-date-picker
                      type="datetimerange"
                      v-model="formQuery.timeValue"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      style="width:100%"
                      unlink-panels
                      format="yyyy-MM-dd HH:mm:ss"
                      value-format="yyyy-MM-dd HH:mm:ss"
                    ></el-date-picker>
                  </el-form-item>
            </el-col>
            <el-col :span="8" style="text-align: left;">
              <el-form-item size="mini">
                <el-button type="primary" size="mini" @click="search">查询</el-button>
                <el-button size="mini" @click="resetForm('formQuery')">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      tooltip-effect="dark"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        prop="tradeTime"
        label="交易日期"
      />
      <el-table-column
        prop="tradePipelineNum"
        label="交易流水号"
      />
      <el-table-column
        prop="tradeMoney"
        label="交易金额"
      />
      <el-table-column
        prop="abstractContent"
        label="摘要"
      />
      <el-table-column
        prop="oppositeAccount"
        label="对方账号"
      />
      <el-table-column
        prop="oppositeAccountName"
        label="对方账户名称"
      />
      <el-table-column
        prop="openingBank"
        label="对方开户行"
      />
      <el-table-column
        prop="paymentAccount"
        label="收款账户"
      />
      <el-table-column
        prop="status"
        :formatter="statusFmt"
        label="记录状态"
      />
    </el-table>
    <!-- 表格区2end -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="formQuery.pageNo"
              :page-size.sync="formQuery.pageSize"
              :page-sizes="[15, 30, 50, 100]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageTotal"
            ></el-pagination>
  </el-card>
</template>
<script>
import { selectFinancialManageByParam,importFile,downloadTemplate,financialDataConfirm,deleteFinancialData} from "@/api/hxxd/financialManage";
import { parseTime } from "@/utils/index.js";
export default {
  data() {
    return {
      show: false,
      treeData: [],
      treeDefaultProps: {
        children: "childs",
        label: function(data, node) {
          return data.complainant;
        }
      },
       formQuery: {
        tradePipelineNum: "",
        tradeMoney: "",
        abstractContent: "",
        oppositeAccount: "",
        oppositeAccountName: "",
        openingBank: "",
        paymentAccount: "",
        status: "",
        pageNo: 1,
        pageSize: 15,
        tradeStartTime: "",
        tradeEndTime: "",
        timeValue: []
      },
      pageNo: 1,
      pageSize: 15,
      pageTotal: 0,
      tableLoading: false,
      tableData: [],
      tableMultiSelection: [],
      statusOptions: [
        {
          value: '0',
          label: '未确认'
        },
        {
          value: '1',
          label: '已确认'
        }
      ],
      accountOptions: [
        {
          value: '0118014210001347',
          label: '0118014210001347'
        },
        {
          value: '0115014210001671',
          label: '0115014210001671'
        }
      ]
    };
  },
  created() {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
    this.formQuery.timeValue = [parseTime(start), parseTime(end)];
    this.formQuery.tradeStartTime = this.formQuery.timeValue[0];
    this.formQuery.tradeEndTime = this.formQuery.timeValue[1];
    this.getTableList();
  },
  methods: {
      getTableList() {
      this.tableLoading = true;
       if (this.formQuery.timeValue.length >= 0) {
        this.formQuery.tradeStartTime = this.formQuery.timeValue[0];
        this.formQuery.tradeEndTime = this.formQuery.timeValue[1];
      }
      selectFinancialManageByParam(this.formQuery).then(response => {
        this.tableData = response.data;
        this.pageTotal = response.page.total;
        this.tableLoading = false;
      });
    },
     handleSelectionChange(val) {
      this.tableMultiSelection = val;
    },
     handleSizeChange() {
      this.getTableList();
    },
    handleCurrentChange() {
      this.getTableList();
    },
    statusFmt(row, column, cellValue, index) {
      const status = row.status
      if (status === 0) {
        return '未确认'
      } else if (status === 1) {
        return '已确认'
      } else {
        return row.status
      }
    },
    search() {
      this.getTableList()
    },
  }
}
</script>

<style scoped>
*{
  font-weight: normal;
}
.detailsContainer {
  margin: 0 10px;
}
.dtl-title-line {
  display: inline-block;
  border-left: 5px solid #409EFF;
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
.el-table>th {
  background-color: #eee !important;
}
.tsfDlg{
  margin: 0 10px;
}
</style>
