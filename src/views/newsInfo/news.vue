<template>
  <div class="app-wrapper">
    <header-reload />
    <div class="contont-main" v-bind:style="{minHeight: Height+'px'}">
      <el-card class="detailsContainer">
        <h3>{{ queryList.industryTitle }}</h3>
        <p>{{ queryList.publishTime }}</p>
        <p>附件：<el-button :key="index" v-for="(item, index) in fileList" type="text" @click="fileClick(item.fileCatalog,item.belongId,item.fileName)">{{ item.fileName }}</el-button></p>
        <div class="new-con-c" v-html="newsbody">
          <!-- <p>{{ queryList.industryBody }}</p> -->
        </div>
      </el-card>
    </div>
    <footer-reload />
  </div>
</template>

<script>
import HeaderReload from '@/components/HeaderReload'
import FooterReload from '@/components/FooterReload'
import { selectIndustryById } from '@/api/hxxd/industryInfoPublish';

export default {
  name: 'News',
  components: { FooterReload, HeaderReload },
  data() {
      return {
        queryList: [],
        newsbody: '',
        Height: 0,
        fileList: []
      }
    },
    created() {
      let nid = this.$route.params.id
      selectIndustryById(nid).then(response => {
        this.queryList = response.data
        this.newsbody = response.data.contentBody
        this.fileList = response.data.fileList
        console.log(this.queryList.industryTitle)
      })
    },
    mounted() {
      this.Height = document.documentElement.clientHeight - 194;
  　　//监听浏览器窗口变化　
      window.onresize = ()=> {this.Height = document.documentElement.clientHeight -194}
    },
    methods: {

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
      text-align: center;
      margin-top: 10px;
      margin-bottom: 100px;
      border-top: 1px solid #e6e6e6;
    }
  }
}
</style>
