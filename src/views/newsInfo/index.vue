<template>
  <div class="app-wrapper">
    <header-reload />
    <div class="contont-main">
      <el-card class="detailsContainer">
        <h3>新闻标题</h3>
        <p>2019-10-23</p>
        <div v-html="editorContent" class="new-con-c">
          {{ this.editorContent }}
        </div>
      </el-card>
    </div>
    <footer-reload />
  </div>
</template>

<script>
import HeaderReload from '@/components/HeaderReload'
import FooterReload from '@/components/FooterReload'

export default {
  name: 'NewsInfo',
  components: { FooterReload, HeaderReload },
  data() {
      return {
        editorContent: ''
      };
    },
    mounted() {
      this.editorContent = this.$route.params.edCont
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>
  @import '~@/styles/register.scss';

  h3, p {
    text-align: center;
    margin: 0;
    padding: 0;
  }
  h3 {
    border-bottom: 1px solid #bfbfc0;
    font-size: 30px;
    line-height: 50px;
    margin-bottom: 10px;
  }
  p {
    line-height: 20px;
  }
  .new-con-c {
    padding: 0 20px;
  }
</style>
