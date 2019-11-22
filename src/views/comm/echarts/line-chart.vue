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
      required: true,
      default: "线性图"
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
    // xItems :x轴坐标刻度 （数组）
    // lineTypes :有几条线，线的名字 （数组）
    // lineDatas ：每条线对应的刻度
    setOptions({ xItems, lineTypes,lineDatas } = {}) {
       if(!lineTypes){
        return
      }
      if(!xItems){
        return
      }
      if(!lineDatas){
        return
      }

      var colorArr=new Array();
      colorArr.push("#2ec7c9")
      colorArr.push("#b6a2de")
      colorArr.push("#5ab1ef")
      colorArr.push("#ffb980")
      colorArr.push("#d87a80")
      colorArr.push("#8d98b3")
      colorArr.push("#e5cf0d")

      var lineSerieArr=new Array();
      Object.keys(lineTypes).forEach(function(index) {

        var lineType=lineTypes[index];
        var lineColor=colorArr[index];
        console.log(lineColor)
        var lineData=lineDatas[index];
        
        var lineSerie={
            name: lineType,
            itemStyle: {
              normal: {
                color: lineColor,
                lineStyle: {
                  color: lineColor,
                  width: 2
                }
              }
            },
            smooth: true,
            type: "line",
            // data: [120, 120, 161, 134, 175, 160, 115,120],
            data: lineData,
            animationDuration: 2800,
            animationEasing: "cubicInOut"
          }
          lineSerieArr.push(lineSerie)
      });


      this.chart.setOption({
        title: { text: this.title ,x:'left' },
        xAxis: {
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          data: xItems,
          boundaryGap: false,
          axisTick: {
            length:15,      
            show: false
          }
        },
        grid: {
          left:50,
          right: 20,
          bottom: 20,
          top: 60,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          // data: ["第一条线名称", "第二条线名称"]
          data: lineTypes
        },
        series: lineSerieArr
        // series: [
        //   {
        //     name: "第一条线名称",
        //     itemStyle: {
        //       normal: {
        //         color: "#FF005A",
        //         lineStyle: {
        //           color: "#FF005A",
        //           width: 2
        //         }
        //       }
        //     },
        //     smooth: true,
        //     type: "line",
        //     data: expectedData,
        //     animationDuration: 2800,
        //     animationEasing: "cubicInOut"
        //   },
        //   {
        //     name: "第二条线名称",
        //     smooth: true,
        //     type: "line",
        //     itemStyle: {
        //       normal: {
        //         color: "#3888fa",
        //         lineStyle: {
        //           color: "#3888fa",
        //           width: 2
        //         },
        //         areaStyle: {
        //           color: "#f3f8ff"
        //         }
        //       }
        //     },
        //     data: actualData,
        //     animationDuration: 2800,
        //     animationEasing: "quadraticOut"
        //   }
        // ]
      });
    }
  }
};
</script>
