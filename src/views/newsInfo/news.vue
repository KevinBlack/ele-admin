<template>
  <div class="app-wrapper">
    <header-reload />
    <div class="contont-main" v-bind:style="{minHeight: Height+'px'}">
      <el-card class="detailsContainer">
        <h3>{{ queryList.industryTitle }}</h3>
        <p>{{ queryList.publishTime }}</p>
        <div class="new-con-c" v-html="newsbody">
          <!-- <p>{{ queryList.industryBody }}</p> -->
        </div>
        <p align="left" v-if="isShow"><span>附件：</span><el-button :key="index" v-for="(item, index) in fileList" type="text" @click="fileClick(item.fileCatalog,item.belongId,item.fileName)">{{ item.fileName }}</el-button></p>
      </el-card>
    </div>
    <footer-reload />
  </div>
</template>

<script>
import HeaderReload from '@/components/HeaderReload'
import FooterReload from '@/components/FooterReload'
import { selectIndustryById } from '@/api/hxxd/industryInfoPublish';
import { downloadTemplate } from '@/api/hxxd/financialManage'
export default {
  name: 'News',
  components: { FooterReload, HeaderReload },
  data() {
      return {
        queryList: [],
        newsbody: '',
        Height: 0,
        fileList: [],
        isShow: true
      }
    },
    created() {
      let nid = this.$route.params.id
      selectIndustryById(nid).then(response => {
        this.queryList = response.data
        this.newsbody = response.data.contentBody
        this.fileList = response.data.fileList
        if(response.data.fileList.length === 0){
          console.log(1)
          this.isShow = false
        }else{
          console.log(2)
          this.isShow = true
        }
      })
    },
    mounted() {
      this.Height = document.documentElement.clientHeight - 194;
  　　//监听浏览器窗口变化　
      window.onresize = ()=> {this.Height = document.documentElement.clientHeight -194}
    },
    methods: {
      fileClick(fileCatalog, belongId,fileName){
        downloadTemplate(belongId,fileCatalog).then(response => {
          // console.log(response.headers)
          var contentDisposition = response.headers["content-disposition"]; //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
          console.log('contentDisposition',contentDisposition)
          var patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*")
          var result = patt.exec(contentDisposition)
          // console.log(contentDisposition)
          var fileName = decodeURIComponent(result[1]).trim()
          // var fileName="20190906~航协系统项目开发蓝图.xlsx"
          // console.log(fileName);
          const blob = new Blob([response.data])
          if ("download" in document.createElement("a")) {
            // 非IE下载
            const elink = document.createElement("a")
            elink.download = fileName
            elink.style.display = "none"
            elink.href = URL.createObjectURL(blob)
            console.log(elink.href)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName)
          }
        })
      },
    }
}
</script>

<style lang="scss" scoped>
  @import '~@/styles/register.scss';
.contont-main{
  .detailsContainer{
    h3 {
      font-size: 30px;
      font-weight: bold;
      text-align: center;
      line-height: 60px;
    }
    p {
        line-height: 40px;
      }
    .new-con-c {
      box-sizing: border-box;
      text-align: justify;
      margin-top: 10px;
      margin-bottom: 100px;
      border-top: 1px solid #e6e6e6;
      line-height: 30px;
      // text-indent: 2em;
    }
  }
}
</style>
