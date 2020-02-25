<template>
  <div :class="classObj" class="app-wrapper">
    <el-header class="header-throw">
      <div class="left-menu">
        <img src="../assets/img/logo_w.png" style="margin-top: 11px;" width="80" />
        <h2>
          销售代理人综合信息平台
          <br />
          <span>SALES AGENT COMPREHENSIVE INFORMATION PLATFORM</span>
        </h2>
      </div>
      <div class="right-menu">
        <span class="ritMnuTitle">{{ name }}，欢迎你！</span>
        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
          <div class="avatar-wrapper">
            <i class="iconfont user_center">&#xe604;</i>
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/profile/index">
              <el-dropdown-item>个人中心</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span style="display:block;" @click="logout">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <sidebar class="sidebar-container" />
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <!-- <navbar /> -->
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import RightPanel from "@/components/RightPanel";
import { AppMain, Navbar, Settings, Sidebar, TagsView } from "./components";
import ResizeMixin from "./mixin/ResizeHandler";
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "Layout",
  components: {
    AppMain,
    Navbar,
    RightPanel,
    Settings,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    ...mapGetters(["avatar", "name", "roleType"]),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === "mobile"
      };
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("app/closeSideBar", { withoutAnimation: false });
    },
    async logout() {
      var roleType='0'
    //超级管理员 1 非管理员为0
      if (roleType === '1') {
        await this.$store.dispatch("user/logout");
        this.$store.state.tagsView.visitedViews = []
        // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
        this.$router.push(`/login`);
      } else {
        await this.$store.dispatch("user/logout");
        this.$store.state.tagsView.visitedViews = []
        this.$router.push(`/newlogin`);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
@import "~@/styles/register.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  margin-top: 65px;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
  .header-throw {
    .left-menu {
      color: #fff;
      float: left;
      height: 60px !important;
      overflow: hidden;
      position: relative;
      img {
        display: inline-block;
        position: absolute;
        top: -10px;
      }
      h2 {
        display: inline-block;
        font-weight: normal;
        width: 500px; 
        font-size: 26px;
        letter-spacing: 6.7px;
        position: inherit;
        left: 80px;
        top: 10px;
        line-height: 20px;
        span {
          font-size: 12px;
          letter-spacing: 0;
          // transform: scale(0.2);
        }
      }
    }

    .right-menu {
      float: right;
      height: 100%;
      padding-top: 4px;

      .ritMnuTitle {
        display: inline-block;
        height: 100%;
        vertical-align: text-bottom;
      }

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          position: relative;

          .user_center {
            font-size: 36px;
            color: #fff;
          }

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 60px;
  right: 0;
  z-index: 9;
  height: 50px;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
