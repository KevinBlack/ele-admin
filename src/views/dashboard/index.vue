<template>
  <div class="dashboard-container">
    <!-- <component :is="currentRole" /> -->

    <div
      id="img"
      ref="img"
      style="position:absolute;  left:35px; top:556px; width:120;height:400;background-color: #EBEBEB;"
    >
      <table background="./01.jpg" width="300" height="200">
        <tr>
          <td align="center"><a href="#">欢迎您!登陆系统</a></td>
        </tr>
        <tr>
          <td align="center">如您未缴纳会费，请按时缴纳。</td>
        </tr>
        <tr>
          <td align="center">请关注最新的培训课程。</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import adminDashboard from './admin'
// import editorDashboard from './editor'

export default {
  // name: "Dashboard",
  // components: { adminDashboard, editorDashboard },
  data() {
    return {
      xPos: 20,
      yPos: document.body.clientHeight,
      step: 1,
      delay: 30,
      height: 0,
      Hoffset: 0,
      Woffset: 0,
      yon: 0,
      xon: 0,
      pause: true,
      interval: "",
      img: this.$refs.img
    };
    // return {
    //   currentRole: 'adminDashboard'
    // }
  },
  computed: {
    // ...mapGetters([
    //   'roles'
    // ])
  },
  created() {
    this.img.style.top = yPos;
    start();
  },
  methods: {
    changePos() {
      this.width = this.document.body.clientWidth; //网页可见区域宽
      this.height = this.document.body.clientHeight; //网页可见区域高
      this.Hoffset = this.img.offsetHeight;
      this.Woffset = this.img.offsetWidth;
      this.img.style.left = this.xPos + this.document.body.scrollLeft; //网页被卷去的高
      this.img.style.top = this.yPos + this.document.body.scrollTop; //网页被卷去的左

      if (this.yon) {
        this.yPos = this.yPos + this.step;
      } else {
        this.yPos = this.Pos - this.step;
      }
      if (this.yPos < 0) {
        //y轴方向的距离为负值,改变yon、yPos使其向下移动
        this.yon = 1;
        this.yPos = 0;
      }
      if (this.yPos >= this.height - this.Hoffset) {
        //y轴方向的距离超出来了可移动的距离
        this.yon = 0;
        this.yPos = this.height - this.Hoffset;
      }
      if (this.xon) {
        //x轴正方向移动
        this.xPos = this.xPos + this.step;
      } else {
        this.xPos = this.xPos - this.step;
      }
      if (this.xPos < 0) {
        //x轴方向的距离为负值,改变xon、xPos使其向右移动
        this.xon = 1;
        this.xPos = 0;
      }
      if (this.xPos >= this.width - this.Woffset) {
        //x轴方向的距离超出来了可移动的距离
        this.xon = 0;
        this.xPos = this.width - this.Woffset;
      }
    },
    start() {
      this.img.visibility = "visible";
      this.interval = this.setInterval("changePos()", this.delay);
    }
  }
};
</script>
