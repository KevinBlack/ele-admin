<template>
  <div>
    <el-card class="box-card" style="margin: 0 10px;">
      <!-- part1 -->
      <el-row :gutter="10">
        <el-col :span="24">
          <h5 class="dtl-title-line">查看行业信息</h5>
        </el-col>
      </el-row>
      <el-form ref="detailForm" :model="detailForm" disabled label-width="150px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属分组" prop="industryType">
              <el-input v-model="detailForm.industryType" style="width: 100%;" placeholder="请选择" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="内容标题" prop="industryTitle">
              <el-input v-model="detailForm.industryTitle" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="内容描述" prop="industryContent">
              <el-input v-model="detailForm.industryContent" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发布时间" prop="createTime">
              <el-input v-model="detailForm.modifyTime" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="添加附件" prop="industryContent">
              <el-input v-model="detailForm.industryContent" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="内容添加" prop="industryBody">
              <el-input type="textarea" v-model="detailForm.industryBody"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { selectIndustry, updateIndustryInfo } from '@/api/hxxd/industryInfoPublish'

export default {
  name: 'IndustryInfoDetail',
  data() {
    return {
      title: '更新行业信息发布',
      editorContent: '',
      detailForm: {
        id: '',
        industryContent: '',
        industryType: '',
        publishStatus: '',
        industryBody: '',
        modifyTime: ''
      },
      cascaderOpts: [],
      statusOptions: [{
          value: 1,
          label: "消代分会"
        },
        {
          value: 2,
          label: "航食分会"
        }
      ]
    };
  },
  created() {
    let id = this.$route.query.id
    this.title = '修改行业信息发布'
    this.getMenuInfo(id)
  },
  methods: {
    getMenuInfo(id) {
      this.detailForm.id = id
      selectIndustry(this.detailForm).then(response => {
        this.detailForm.industryContent = response.data[0].industryContent
        this.detailForm.industryType = response.data[0].industryType
      })
    },
    saveMenu() {
      // const {
      //   id,
      //   industryContent,
      //   industryType
      // } = this.detailForm
      updateIndustryInfo(this.detailForm).then(response => {
        var msg = response.status === 200 ? '保存成功' : '保存失败'
        if (response.status === 200) {
          this.$message({
            type: 'success',
            message: msg
          })
        } else {
          this.$message({
            type: 'success',
            error: msg
          })
        }
      })
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../styles/hxxd.scss';
</style>
