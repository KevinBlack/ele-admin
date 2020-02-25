<template>
  <el-card class="detailsContainer">
    <!-- part1 -->

    <el-form ref="ruleForm" :model="queryForm" label-width="100px" size="mini">
      <el-row :gutter="20" class="area_border">
        <el-col :span="6">
          <el-form-item label="年份" prop="year">
            <el-date-picker
              v-model="queryForm.year"
              type="year"
              placeholder="选择年"
              size="mini"
              style="width:100%"
              format="yyyy"
              value-format="yyyy"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="text-align: left;padding-left: 1.3em;">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="formSearch">查询</el-button>
        </el-col>
      </el-row>
    </el-form>

    <!-- part3 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      tooltip-effect="dark"
      style="width: 100%;margin-bottom:20px;"
      show-summary
      sum-text="月汇总"
      @summary-method="summaryMethod"
    >
      <el-table-column prop="region" label="地区" align="center"></el-table-column>
      <el-table-column prop="january" label="一月" width="90" align="center"></el-table-column>
      <el-table-column prop="february" label="二月" width="90" align="center"></el-table-column>
      <el-table-column prop="march" label="三月" width="90" align="center"></el-table-column>
      <el-table-column prop="april" label="四月" width="90" align="center"></el-table-column>
      <el-table-column prop="may" label="五月" width="90" align="center"></el-table-column>
      <el-table-column prop="june" label="六月" width="90" align="center"></el-table-column>
      <el-table-column prop="july" label="七月" width="90" align="center"></el-table-column>
      <el-table-column prop="august" label="八月" width="90" align="center"></el-table-column>
      <el-table-column prop="september" label="九月" width="90" align="center"></el-table-column>
      <el-table-column prop="october" label="十月" width="90" align="center"></el-table-column>
      <el-table-column prop="november" label="十一月" width="90" align="center"></el-table-column>
      <el-table-column prop="december" label="十二月" width="90" align="center"></el-table-column>
      <el-table-column prop="summary" label="汇总" align="center"></el-table-column>
    </el-table>

    <!-- 引入省份表格开始 -->
    <el-row :gutter="20" class="area_border">
      <el-col :span="24">
        <!-- 引入柱状图 -->
        <bar-chart :chart-data="barChartData" title="会员数量地区柱状图" />
      </el-col>
    </el-row>
    <el-row :gutter="20" class="area_border">
      <el-col :span="24">
        <!-- 引入饼状图 -->
        <line-chart :chart-data="lineChartData" title="会员数量地区线状图" />
      </el-col>
    </el-row>
    <!-- 引入省份表格结束 -->
  </el-card>
</template>

<script>
// 引入axios
import { getStatistics } from "@/api/hx/member";
import { parseTime } from "@/utils/index.js";
import BarChart from "@/views/comm/echarts/bar-chart";
import PieChart from "@/views/comm/echarts/pie-chart";
import LineChart from "@/views/comm/echarts/line-chart";

export default {
  name: "MemberStatistics",
  components: {
    BarChart,
    PieChart,
    LineChart
  },
  data() {
    return {
      //查询条件options集合
      queryFormOptions: {},
      // 查询条件
      queryForm: {
        // 年份
        year: ""
      },
      // 表格数据
      tableData: [],
      //柱状图
      barChartData: [],
      //柱状图
      pieChartData: [],
      lineChartData: []
    };
  },
  // 相当于javascript的 $.ready()
  created() {
    // 初始化查询表单
    this.initQueryForm();
    // 初始加载表格数据
    this.initLoadTable();
    //初始化echart
    this.barChartData = {
      yItems: ["华中", "华北", "华东", "华南", "西北", "东北", "西南"],
      xItems: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ],
      xDatas: [
        {
          华中: 0,
          华北: 0,
          华东: 0,
          华南: 0,
          西北: 0,
          东北: 0,
          西南: 0
        },
        {
          华中: 0,
          华北: 0,
          华东: 0,
          华南: 0,
          西北: 0,
          东北: 0,
          西南: 0
        },
        {
          华中: 0,
          华北: 0,
          华东: 0,
          华南: 0,
          西北: 0,
          东北: 0,
          西南: 0
        },
        {
          华中: 0,
          华北: 0,
          华东: 0,
          华南: 0,
          西北: 0,
          东北: 0,
          西南: 0
        },
        {
          华中: 0,
          华北: 0,
          华东: 0,
          华南: 0,
          西北: 0,
          东北: 0,
          西南: 0
        },
        {
          华中: 0,
          华北: 0,
          华东: 0,
          华南: 0,
          西北: 0,
          东北: 0,
          西南: 0
        },
        {
          华中: 0,
          华北: 0,
          华东: 0,
          华南: 0,
          西北: 0,
          东北: 0,
          西南: 0
        },
        {
          华中: 0,
          华北: 0,
          华东: 0,
          华南: 0,
          西北: 0,
          东北: 0,
          西南: 0
        },
        {
          华中: 0,
          华北: 0,
          华东: 0,
          华南: 0,
          西北: 0,
          东北: 0,
          西南: 0
        },
        {
          华中: 0,
          华北: 0,
          华东: 0,
          华南: 0,
          西北: 0,
          东北: 0,
          西南: 0
        },
        {
          华中: 0,
          华北: 0,
          华东: 0,
          华南: 0,
          西北: 0,
          东北: 0,
          西南: 0
        },
        {
          华中: 0,
          华北: 0,
          华东: 0,
          华南: 0,
          西北: 0,
          东北: 0,
          西南: 0
        }
      ]
    };
    // this.pieChartData = {
    //   items: ["民航数据", "携程数据", "去哪儿数据", "热线数据", "邮件数据"],
    //   itemDatas: [
    //     { value: 335, name: "民航数据" },
    //     { value: 310, name: "携程数据" },
    //     { value: 234, name: "去哪儿数据" },
    //     { value: 1535, name: "热线数据" },
    //     { value: 148, name: "邮件数据" }
    //   ]
    // };
    this.lineChartData = {
      xItems: ["x1", "x2", "x3", "x4", "x5", "x6", "x7", "x8"],
      lineTypes: ["第一条线", "第二条线"],
      lineDatas: [
        //第一条线x轴刻度对应的数据
        [0, 0, 0, 0, 0, 0, 0, 0],
        //第二条线x轴刻度对应的数据
        [0, 0, 0, 0, 0, 0, 0, 0]
      ]
    };
  },
  methods: {
    initQueryForm() {
      // 设置制单时间从，制单时间到
      var currDate = new Date();
      this.queryForm.year = parseTime(currDate, "{y}");
    },
    initLoadTable() {
      this.getTableList();
    },
    // 表单查询
    formSearch() {
      this.getTableList();
    },
    getTableList() {
      var year = this.queryForm.year;
      getStatistics(year).then(response => {
        this.tableData = response.data.tableList;
        this.barChartData = response.data.barEchart;
        this.lineChartData = response.data.lineEchart;
      });
    },
    summaryMethod(columns, data) {
      return 0;
      // const sums = [];
      // columns.forEach((column, index) => {
      //   if (index === 0) {
      //     sums[index] = "总价";
      //     return;
      //   }
      //   const values = data.map(item => Number(item[column.property]));
      //   if (!values.every(value => isNaN(value))) {
      //     sums[index] = values.reduce((prev, curr) => {
      //       const value = Number(curr);
      //       if (!isNaN(value)) {
      //         return prev + curr;
      //       } else {
      //         return prev;
      //       }
      //     }, 0);
      //     sums[index] += " 元";
      //   } else {
      //     sums[index] = "N/A";
      //   }
      // });
      // return sums;
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
