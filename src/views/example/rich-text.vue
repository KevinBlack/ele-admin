<template>
    <div class="rt-content">
        <div ref="editor" style="text-align:left"></div>
        <button v-on:click="getContent">查看内容</button>
    </div>
</template>

<script>
    import E from 'wangeditor'

    export default {
      name: 'editor',
      data () {
        return {
          editorContent: ''
        }
      },
      methods: {
        getContent: function () {
          this.$router.push({
            name: 'NewsInfo',
            params: { edCont: this.editorContent }
          })
        }
      },
      mounted() {
        var editor = new E(this.$refs.editor)
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        editor.create()
      }
    }
</script>

<style lang="scss" scoped>
.rt-content {
  width: 99%;
  box-sizing: border-box;
  border-radius: 3px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  margin: auto;
  padding: 10px;
  background-color: #fff;
}
</style>
