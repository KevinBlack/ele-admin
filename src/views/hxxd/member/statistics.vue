<template>
  <el-card class="detailsContainer">
    <!-- part1 -->
    <el-form ref="ruleForm" label-width="100px" size="mini">
      <el-row>
        <el-col :span="5">
          <el-form-item label="年份" prop="code">
            <el-date-picker
              v-model="queryForm.year"
              type="year"
              placeholder="选择年"
              size="mini"
              style="width:100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="9" style="text-align: left;padding-left: 1.3em;">
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
      <el-table-column prop="code" label="省份" align="center"></el-table-column>
      <el-table-column prop="month1" label="一月" width="100" align="center"></el-table-column>
      <el-table-column prop="month1" label="二月" width="100" align="center"></el-table-column>
      <el-table-column prop="month1" label="三月" width="100" align="center"></el-table-column>
      <el-table-column prop="month1" label="四月" width="100" align="center"></el-table-column>
      <el-table-column prop="month1" label="五月" width="100" align="center"></el-table-column>
      <el-table-column prop="month1" label="六月" width="100" align="center"></el-table-column>
      <el-table-column prop="month1" label="七月" width="100" align="center"></el-table-column>
      <el-table-column prop="month1" label="八月" width="100" align="center"></el-table-column>
      <el-table-column prop="month1" label="九月" width="100" align="center"></el-table-column>
      <el-table-column prop="month1" label="十月" width="100" align="center"></el-table-column>
      <el-table-column prop="month1" label="十一月" width="100" align="center"></el-table-column>
      <el-table-column prop="month1" label="十二月" width="100" align="center"></el-table-column>
      <el-table-column prop="month1" label="汇总" width="150" align="center"></el-table-column>
    </el-table>

    <!-- 引入省份表格开始 -->
    <el-row>
      <el-col :span="24">
        <!-- 引入柱状图 -->
        <bar-chart :chart-data="barChartData" title="会员数量地区分布图" />
      </el-col>
      <el-col :span="24">
        <!-- 引入饼状图 -->
        <pie-chart :chart-data="pieChartData" title="饼状图" />
      </el-col>
      <el-col :span="24">
        <!-- 引入饼状图 -->
        <line-chart :chart-data="lineCharData" title="线状图" />
      </el-col>
    </el-row>
    <!-- 引入省份表格结束 -->
  </el-card>
</template>

<script>
// 引入axios
// import { getMemberList, auditMember } from "@/api/hxxd/member";
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
      lineCharData: []
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
          华中: 43.3,
          华北: 85.8,
          华东: 93.7,
          华南: 43.3,
          西北: 85.8,
          东北: 93.7,
          西南: 1000.7
        },
        {
          华中: 43.3,
          华北: 85.8,
          华东: 93.7,
          华南: 43.3,
          西北: 85.8,
          东北: 93.7,
          西南: 1000.7
        },
        {
          华中: 43.3,
          华北: 85.8,
          华东: 93.7,
          华南: 43.3,
          西北: 85.8,
          东北: 93.7,
          西南: 1000.7
        },
        {
          华中: 43.3,
          华北: 85.8,
          华东: 93.7,
          华南: 43.3,
          西北: 85.8,
          东北: 93.7,
          西南: 1000.7
        },
        {
          华中: 43.3,
          华北: 85.8,
          华东: 93.7,
          华南: 43.3,
          西北: 85.8,
          东北: 93.7,
          西南: 1000.7
        },
        {
          华中: 43.3,
          华北: 85.8,
          华东: 93.7,
          华南: 43.3,
          西北: 85.8,
          东北: 93.7,
          西南: 1000.7
        },
        {
          华中: 43.3,
          华北: 85.8,
          华东: 93.7,
          华南: 43.3,
          西北: 85.8,
          东北: 93.7,
          西南: 1000.7
        },
        {
          华中: 43.3,
          华北: 85.8,
          华东: 93.7,
          华南: 43.3,
          西北: 85.8,
          东北: 93.7,
          西南: 1000.7
        },
        {
          华中: 43.3,
          华北: 85.8,
          华东: 93.7,
          华南: 43.3,
          西北: 85.8,
          东北: 93.7,
          西南: 1000.7
        },
        {
          华中: 43.3,
          华北: 85.8,
          华东: 93.7,
          华南: 43.3,
          西北: 85.8,
          东北: 93.7,
          西南: 1000.7
        },
        {
          华中: 43.3,
          华北: 85.8,
          华东: 93.7,
          华南: 43.3,
          西北: 85.8,
          东北: 93.7,
          西南: 1000.7
        },
        {
          华中: 43.3,
          华北: 85.8,
          华东: 93.7,
          华南: 43.3,
          西北: 85.8,
          东北: 93.7,
          西南: 1000.7
        }
      ]
    };
    this.pieChartData = {
      items: ["民航数据", "携程数据", "去哪儿数据", "热线数据", "邮件数据"],
      itemDatas: [
        { value: 335, name: "民航数据" },
        { value: 310, name: "携程数据" },
        { value: 234, name: "去哪儿数据" },
        { value: 1535, name: "热线数据" },
        { value: 148, name: "邮件数据" }
      ]
    };
    this.lineCharData={
        xItems:['x1','x2','x3','x4','x5','x6','x7','x8'],
        lineTypes: ['第一条线','第二条线'],
        lineDatas:[
            //第一条线x轴刻度对应的数据
            [120, 120, 161, 134, 175, 160, 115,120],
            //第二条线x轴刻度对应的数据
            [100, 140, 161, 184, 105, 190, 165,230]
        ]
    }

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
      //   var query = this.queryForm;
      //   getMemberList(query).then(response => {
      //     this.tableData = response.data;
      //     this.pageTotal = response.page.total || 0;
      //   });
    },
    summaryMethod(columns, data) {
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总价";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += " 元";
        } else {
          sums[index] = "N/A";
        }
      });
      return sums;
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
