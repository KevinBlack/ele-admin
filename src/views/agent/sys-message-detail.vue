<template>
  <el-card class='detailsContainer'>
    <el-row>
      <!-- 系统消息录入 -->
      <el-row :gutter='10'>
        <el-col :span='24'>
          <h5 class='dtl-title-line'>{{ title }}</h5>
        </el-col>
      </el-row>

      <el-form
        ref='ruleForm'
        :disabled='disabled'
        :model='hxXdSysMessageParam'
        label-width='135px'
        size="mini"
        :rules='rules1'
      >
        <el-row :gutter='20'>
          <el-col :span='12'>
            <el-form-item label='日期' prop='time'>
              <el-date-picker v-model='hxXdSysMessageParam.time' type='datetime' style='width: 100%' placeholder='选择日期时间'></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label='消息标题' prop='header'>
              <el-input v-model='hxXdSysMessageParam.header' />
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label='发送人' prop='despatcher'>
              <el-input v-model='hxXdSysMessageParam.despatcher' />
            </el-form-item>
          </el-col>
          <el-col :span='24'>
            <el-form-item label='消息内容' prop='content'>
               <el-input
                type="textarea"
                maxlength="30"
                :autosize="{ minRows: 6, maxRows: 8 }"
                show-word-limit
                v-model="hxXdSysMessageParam.content"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 按钮区 -->
      <el-row v-if="isButton" :gutter="10">
        <el-col :span="24" class="btn_bottom">
          <el-button type="primary" size="mini"  v-show="btnShow('10002090507010')" @click='save'>保存</el-button>
          <el-button type="primary" size="mini"  v-show="btnShow('10002090507010')" >发送</el-button>
        </el-col>
      </el-row>
    </el-row>
  </el-card>
</template>

<script>
import { getSysMessageById, sysMessageUpdate } from '@/api/hxxd/agent'
export default {
  data() {
    return {
      btns: this.$store.getters.btns['100020905070'],
      disabled: true,
      isButton: true,
      title: '',
      hxXdSysMessageParam: {
        time: '',
        header: '',
        despatcher: '',
        content: ''
      },
      rules1: {
        time: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        header: [{ required: true, message: '不能为空' }],
        despatcher: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        content: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    // 初始化页面时
    // 参数传递 router.push({ path: 'register', query: { plan: 'private' }})
    // 参数接受 let id = this.$route.query.jId
    const id = this.$route.query.id
    var type = this.$route.query.type
    if (type === 'update') {
      this.title = '信息修改'
      this.disabled = false
    } else if (type === 'show') {
      this.title = '信息查看'
      this.disabled = true
      this.isButton = false
    }
    if (id) {
      this.getSysMessageById(id)
    }
  },
  methods: {
     btnShow(menuCode) {
      //根据用户所具有的菜单项控制
      var btns = this.btns;
      if (btns && btns.length > 0) {
        for (var i = 0; i < btns.length; i++) {
          if (menuCode === btns[i]) {
            return true;
          }
        }
      }
      return false;
    },
    // 系统信息保存
    save() {
      // this.$refs['ruleForm'].validate(valid => {
      // if (valid) {
      // 数据校验成功
      sysMessageUpdate(this.hxXdSysMessageParam).then(response => {
        var msg = response.status === 200 ? '保存成功' : '保存失败'
        if (response.status === 200) {
          // 保存成功
          this.$message({
            type: 'success',
            message: msg
          })
        } else {
          // 保存失败
          this.$message({
            type: 'success',
            error: msg
          })
          console.log(response.message)
        }
      })
      // } else {
      //   //校验失败
      //   this.$message({
      //     message: '请正确录入页面数据',
      //     type: 'warning'
      //   })
      // }
      // })
    },
    // 系统消息查询
    getSysMessageById(id) {
      this.hxXdSysMessageParam.id = id
      getSysMessageById(this.hxXdSysMessageParam).then(response => {
        this.hxXdSysMessageParam = response.data
      })
    }
  }
}
</script>
<style>
 @import '~@/styles/hxxd.scss'
</style>
