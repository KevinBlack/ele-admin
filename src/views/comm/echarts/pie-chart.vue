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
      default: "饼状图"
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
    // items ：饼状图一共多少项
    // itemDatas ：数据项 格式：[ {name:xxx,value:xxx},{name:xxx,value:xxx} ]
    setOptions({ items, itemDatas } = {}) {
      this.chart.setOption({
        title: { text: this.title, x: "left" },
        legend: {
          orient: "vertical",
          left: "right",
          // data: ['民航数据', '携程数据', '去哪儿数据', '热线数据', '邮件数据']
          data: items
        },
        series: [
          {
            type: "pie",
            radius: "70%",
            center: ["50%", "60%"],
            // data: [
            //   { value: 335, name: '民航数据' },
            //   { value: 310, name: '携程数据' },
            //   { value: 234, name: '去哪儿数据' },
            //   { value: 1535, name: '热线数据' },
            //   { value: 148, name: '邮件数据' }
            // ]
            data: itemDatas
          }
        ]
      });

      // this.chart.setOption({
      //     title: { text: this.title ,  x:'center'},
      //     legend: {
      //       orient: 'vertical',
      //       left: 'left',
      //       // data: ['民航数据', '携程数据', '去哪儿数据', '热线数据', '邮件数据']
      //       data: items
      //     },
      //     series: [
      //       {
      //         type: 'pie',
      //         radius: '70%',
      //         center: ['50%', '60%'],
      //         // data: [
      //         //   { value: 335, name: '民航数据' },
      //         //   { value: 310, name: '携程数据' },
      //         //   { value: 234, name: '去哪儿数据' },
      //         //   { value: 1535, name: '热线数据' },
      //         //   { value: 148, name: '邮件数据' }
      //         // ]
      //         data: itemDatas
      //       }
      //     ]
      //   });
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