<template>
<div class="pdf">
  <el-button class="pdf-tab">
    <el-button type="primary" size="mini" class="btn-def btn-pre" @click.stop="prePage">上一页</el-button>
    <el-button type="primary" size="mini" class="btn-def btn-next" @click.stop="nextPage">下一页</el-button>
    <el-button type="primary" size="mini" class="btn-def" @click.stop="clock">顺时针</el-button>
    <el-button type="primary" size="mini" class="btn-def" @click.stop="counterClock">逆时针</el-button>
    <!-- <el-button class="btn-def" @click.stop="pdfPrintAll">全部打印</el-button>
    <el-button class="btn-def" @click.stop="pdfPrint">部分打印</el-button> -->
  </el-button>
  <div>{{pageNum}}/{{pageTotalNum}}</div>
  <el-progress :text-inside="true" :stroke-width="20" :percentage="loadedRatio" class="progres"></el-progress>
  <!-- <div>进度：{{loadedRatio}}</div> -->
  <p>页面加载成功: {{curPageNum}}</p>
  <pdf
    ref="pdf"
    :src="pdfUrl"
    :page="pageNum"
    :rotate="pageRotate"
    @password="password"
    @progress="loadedRatio = $event"
    @page-loaded="pageLoaded($event)"
    @num-pages="pageTotalNum=$event"
    @error="pdfError($event)"
    @link-clicked="page = $event">
  </pdf>
</div>
</template>
<script>
import pdf from 'vue-pdf'
export default {
  name: 'Pdf',
  components:{ pdf },
  data(){
    return {
      pdfUrl:"../../assets/img/clbxd.pdf",
      pageNum:1,
      pageTotalNum:1,
      pageRotate:0,
      // 加载进度
      loadedRatio:0,
      curPageNum:0,
    }
  },
  mounted: function() {
  },
  methods: {
    prePage(){
      var p = this.pageNum
      p = p>1?p-1:this.pageTotalNum
      this.pageNum = p
    },
    nextPage(){
      var p = this.pageNum
      p = p<this.pageTotalNum?p+1:1
      this.pageNum = p
    },
    clock(){
      this.pageRotate += 90
    },
    counterClock(){
      this.pageRotate -= 90
    },
    password(updatePassword, reason) {
      updatePassword(prompt('password is "123456"'))
      console.log('...reason...')
      console.log(reason)
      console.log('...reason...')
    },
    pageLoaded(e){
      this.curPageNum = e
    },
    pdfError(error){
      console.error(error)
    },
    pdfPrintAll(){
      this.$refs.pdf.print()
    },
    pdfPrint(){
      this.$refs.pdf.print(100,[1,2])
    },
  }
}
</script>
<style scoped>
.pdf {
  width: 98%;
  margin: auto;
  text-align: center;
}
.progres {
  width: 40%;
  margin: auto;
}
</style>
