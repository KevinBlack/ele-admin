<template>
  <div id="wangeditor">
    <div ref="editorElem" style="text-align:left;"></div>
  </div>
</template>
<script>
import E from "wangeditor";
import { selectIndustry } from '@/api/hxxd/industryInfoPublish'

export default {
  name: "Editor",
  data() {
    return {
      editor: null,
      editorContent: '',
      content: '',
      detailForm: {
        id: '',
        industryContent: '',
        industryType: '',
        publishStatus: '',
        industryBody: '',
        modifyTime: '',
        industryTitle: '',
        fileList: []
      },
    };
  },
  // catchData是一个类似回调函数，来自父组件，当然也可以自己写一个函数，主要是用来获取富文本编辑器中的html内容用来传递给服务端
  props: ['catchData', 'checkId'], // 接收父组件的方法
  created() {
    // console.log(this.checkId)
    if(this.checkId) {
      this.detailForm.id = this.checkId
      this.getMenuInfo(this.checkId)
    }
  },
  watch:{
    'content':function(val, oldVal) {
      if(val){
        this.editor.txt.html(this.content)
      }
    }
  },
  mounted() {
    this.editor = new E(this.$refs.editorElem);
    // 图片以base64形式保存
    this.editor.customConfig.uploadImgShowBase64 = true
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.customConfig.onchange = html => {
      this.editorContent = html;
      this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
    }
    this.editor.customConfig.menus = [
      // 菜单配置
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'emoticon', // 表情
      'image', // 插入图片
      'table', // 表格
      'code', // 插入代码
      'undo', // 撤销
      'redo' // 重复
    ]
    this.editor.create(); // 创建富文本实例
    this.editor.txt.html(this.content)
  },
  methods: {
    getMenuInfo(id) {
      selectIndustry(this.detailForm).then(response => {
        this.content = response.data[0].contentBody
        console.log(response.data)
        // console.log(this.content)
      })
    }
  }
}
</script>
<style lang="scss">
// .w-e-menu, .w-e-text-container {
//   z-index: 0 !important;
// }
</style>
