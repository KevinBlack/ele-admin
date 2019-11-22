<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./resize";

export default {
  mixins: [resize],
  props: {
    title: {
      type: String,
      default: "柱状图"
    },
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "350px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.chartData);
    },
    // yItems ：一共显示多少列竖状条
    // xItems ：x轴分几个刻度
    // xDatas ：x轴分每个刻度对应的数据
    setOptions({ yItems,xItems,xDatas } = {}) {
      if(!yItems){
        return
      }
      if(!xItems){
        return
      }
      if(!xDatas){
        return
      }
      // 生成具体的选项
      var typeArr=new Array();// series 处使用
      var itemArr=new Array()
      itemArr.push("xItem")
      for (let index = 0; index < yItems.length; index++) {
         const yItem = yItems[index];
         itemArr.push(yItems[index]);
         typeArr.push({ type: "bar" })
      }
      // 生成x轴数据
      var xDataArr=new Array()
      Object.keys(xDatas).forEach(function(index) {
        var item=new Array()
        var xData= xDatas[index];
        var xItem= xItems[index];
        xData= Object.assign({}, xData, { "xItem": xItem})
        xDataArr.push(xData)
      });
      this.chart.setOption({
        title: { text: this.title ,x:'left' },
        tooltip: {},
        legend: {},
        dataset: {
          // dimensions: ["xItem", "华中", "华北","华东","华南","西北","东北","西南"],
          dimensions: itemArr,
          // source: [
          //   { xItem: "一月", "华中": 43.3, "华北": 85.8, "华东": 93.7 ,"华南": 43.3, "西北": 85.8, "东北": 93.7 , "西南": 1000.7},
          //   { xItem: "二月", "华中": 83.1, "华北": 73.4, "华东": 55.1 ,"华南": 43.3, "西北": 85.8, "东北": 93.7 , "西南": 33.7},
          //   { xItem: "三月", "华中": 86.4, "华北": 65.2, "华东": 82.5 ,"华南": 43.3, "西北": 85.8, "东北": 93.7 , "西南": 33.7},
          //   { xItem: "四月", "华中": 72.4, "华北": 53.9, "华东": 39.1 ,"华南": 43.3, "西北": 85.8, "东北": 93.7 , "西南": 33.7},
          //   { xItem: "五月", "华中": 43.3, "华北": 85.8, "华东": 93.7 ,"华南": 43.3, "西北": 85.8, "东北": 93.7 , "西南": 33.7},
          //   { xItem: "六月", "华中": 83.1, "华北": 73.4, "华东": 55.1 ,"华南": 43.3, "西北": 85.8, "东北": 93.7 , "西南": 33.7},
          //   { xItem: "七月", "华中": 86.4, "华北": 65.2, "华东": 82.5 ,"华南": 43.3, "西北": 85.8, "东北": 93.7 , "西南": 33.7},
          //   { xItem: "八月", "华中": 72.4, "华北": 53.9, "华东": 39.1 ,"华南": 43.3, "西北": 85.8, "东北": 93.7 , "西南": 33.7},
          //   { xItem: "九月", "华中": 43.3, "华北": 85.8, "华东": 93.7 ,"华南": 43.3, "西北": 85.8, "东北": 93.7 , "西南": 33.7},
          //   { xItem: "十月", "华中": 83.1, "华北": 73.4, "华东": 55.1 ,"华南": 43.3, "西北": 85.8, "东北": 93.7 , "西南": 33.7},
          //   { xItem: "十一月", "华中": 86.4, "华北": 65.2, "华东": 82.5 ,"华南": 43.3, "西北": 85.8, "东北": 93.7 , "西南": 33.7},
          //   { xItem: "十二月", "华中": 72.4, "华北": 53.9, "华东": 39.1 ,"华南": 43.3, "西北": 85.8, "东北": 93.7 , "西南": 33.7}
          // ]
          source: xDataArr
        },
        xAxis: { type: "category" },
        yAxis: {},
        // series: [{ type: "bar" }, { type: "bar" }, { type: "bar" },{ type: "bar" }, { type: "bar" }, { type: "bar" },{ type: "bar" }]
        series: typeArr
      });
    }
  }
};
</script>
<style lang="scss" scoped>
// .chart-wrapper {
//     background: #fff;
//     padding: 16px 16px 0;
//     margin-bottom: 32px;
// }

// @media (max-width:1024px) {
//   .chart-wrapper {
//     padding: 8px;
//   }
// }
</style>