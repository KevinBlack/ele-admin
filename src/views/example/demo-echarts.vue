<template>
  <el-card style="width: 99%;margin: auto;">
    <el-button @click="handleChange">改变数据</el-button>
    <div class="chart" id="bar_dv" ref="chart"></div>
    <div class="chart" id="bar_bing" ref="bing"></div>
  </el-card>
</template>

<script>
var echart = require('echarts')
export default {
  name: 'demo-echarts',
  data() {
    return {
      myChart: '',
      option: {
        title: { text: '柱状图示例' },
        tooltip: {},
        legend: {},
        dataset: {
          dimensions: ['product', '2015', '2016', '2017'],
          source: [
            { product: '航协数据', '2015': 43.3, '2016': 85.8, '2017': 93.7 },
            { product: '携程数据', '2015': 83.1, '2016': 73.4, '2017': 55.1 },
            { product: '热线数据', '2015': 86.4, '2016': 65.2, '2017': 82.5 },
            { product: '邮件数据', '2015': 72.4, '2016': 53.9, '2017': 39.1 }
          ]
        },
        xAxis: { type: 'category' },
        yAxis: {},
        series: [
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' }
        ]
      }
    }
  },
  watch: {
    option: {
      handler(newVal, oldVal) {
        if (this.myChart) {
          if (newVal) {
            this.myChart.setOption(newVal)
          } else {
            this.myChart.setOption(oldVal)
          }
        } else {
          this.drawLine()
        }
      },
      deep: true
    }
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      var bar_dv = this.$refs.chart
      var bar_bing = this.$refs.bing
      if (bar_dv && bar_bing) {
        console.log('bar_dv不为空')
        this.myChart = echart.init(bar_dv)
        console.log(this.option.series)
        this.myChart.setOption(this.option)
        const myBing = echart.init(bar_bing)
        myBing.setOption({
          title: { text: '饼状图示例' },
          legend: {
            orient: 'vertical',
            left: 'right',
            data: ['民航数据', '携程数据', '去哪儿数据', '热线数据', '邮件数据']
          },
          series: [
            {
              type: 'pie',
              radius: '70%',
              center: ['50%', '60%'],
              data: [
                { value: 335, name: '民航数据' },
                { value: 310, name: '携程数据' },
                { value: 234, name: '去哪儿数据' },
                { value: 1535, name: '热线数据' },
                { value: 148, name: '邮件数据' }
              ]
            }
          ]
        })
      } else {
        console.log('bar_dv为空!')
      }
    },
    handleChange() {
      this.option.dataset.source = [
        { product: '航协数据', '2015': 66.3, '2016': 45.8, '2017': 33.7 },
        { product: '携程数据', '2015': 43.1, '2016': 93.4, '2017': 85.1 },
        { product: '热线数据', '2015': 66.4, '2016': 75.2, '2017': 42.5 },
        { product: '邮件数据', '2015': 32.4, '2016': 63.9, '2017': 79.1 }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  width: 90%;
  height: 400px;
}
</style>
