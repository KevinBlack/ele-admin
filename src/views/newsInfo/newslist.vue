<template>
  <div class="app-wrapper">
    <header-reload />
    <div class="contont-main" v-bind:style="{minHeight: Height+'px'}">
      <el-card class="detailsContainer">
        <ul class="news_list">
          <li v-for="(item) in queryList"><b>&nbsp;</b><router-link :to="{name: 'News', params: {id: item.id}}">{{ item.industryTitle }}</router-link><span>{{ item.publishTime }}</span></li>
        </ul>
        <!-- 分页 -->
        <el-row class="area_bordes">
          <el-col :span="24" style="text-align: right">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="formQuery.pageNo"
              :page-size.sync="formQuery.pageSize"
              :page-sizes="[8, 18, 28, 38]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageTotal"
            />
          </el-col>
        </el-row>
      </el-card>
    </div>
    <footer-reload />
  </div>
</template>

<script>
import HeaderReload from '@/components/HeaderReload'
import FooterReload from '@/components/FooterReload'
import { selectIndustry } from '@/api/hxxd/industryInfoPublish';

export default {
  name: 'NewsList',
  components: { FooterReload, HeaderReload },
  data() {
    return {
      Height: 0,
      pageTotal: 0,
      queryList: [],
      formQuery: {
        industryType: '',
        publishStatus: 1,
        industryTitle: '',
        industryContent: '',
        modifyTime: '',
        pageNo: 1,
        pageSize: 8
      }
    }
  },
  created() {
    this.getTableList()
  },
  watch: {
    '$route' (to, from) {
      this.getTableList()
    }
  },
  mounted() {
    this.Height = document.documentElement.clientHeight - 194;
　　//监听浏览器窗口变化　
    window.onresize = ()=> {this.Height = document.documentElement.clientHeight -194}
  },
  methods: {
    handleSizeChange(val) {
      this.getTableList();
    },
    handleCurrentChange(val) {
      this.getTableList();
    },
    getTableList() {
      this.tableLoading = true
      this.formQuery.industryType = this.$route.query.id
      console.log(this.$route.query.id)
      selectIndustry(this.formQuery).then(response => {
        this.queryList = response.data
        this.pageTotal = response.page.total
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@/styles/register.scss';
  @import '~@/styles/hxxd.scss';

  .news_list {
    width: 96%;
    height: 470px;
    margin: auto;
    padding: 0 0 20px 0;
    text-align: left;
    line-height: 50px;
    overflow-y: auto;
    li {
      border-bottom: 1px dashed #e6e6e6;
      position: relative;
      span {
        display: inline-block;
        width: 100px;
        height: 38px;
        text-align: right;
        overflow: hidden;
        position: absolute;
        right: 0px;
      }
    }
    li:nth-last-child(1) {
      border-bottom: none;
    }
  }
</style>
