<template>
<div>
  <header class="header-throwsf">
    <div class="header-position">
      <img class="logo" src="../../assets/img/logo.png">
      <div class="head_group">
        <ul class="nav_cont">
          <li><router-link :key="$route.fullPath" :to="{name: 'NewsList', query: {id: 3}}"><i class="iconfont">&#xe634;</i>最新动态</router-link></li>
          <li><router-link :key="$route.fullPath" :to="{name: 'NewsList', query: {id: 2}}"><i class="iconfont">&#xe714;</i>会员风采</router-link></li>
          <li><router-link :key="$route.fullPath" :to="{name: 'NewsList', query: {id: 1}}"><i class="iconfont">&#xe6aa;</i>会员动态</router-link></li>
          <li><router-link :to="{ path: '/newlogin' }"><i class="iconfont">&#xe61a;</i>首页</router-link></li>
        </ul>
      </div>
    </div>
  </header>
</div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
  // watch: {
  //   '$route' (to, from) {
  //     this.getStatus(this.$route.path)
  //   }
  // }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/register.scss';
</style>
