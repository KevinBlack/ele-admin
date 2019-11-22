<template>
  <div>
    <el-card class="box-card" style="margin: 0 10px;">
      <!-- part1 -->
      <el-row :gutter="10">
        <el-col :span="24">
          <h5 class="dtl-title-line">行业信息修改</h5>
        </el-col>
      </el-row>
      <el-form ref="detailForm" :model="detailForm" :rules="rules1" label-width="150px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属分组" prop="industryType">
              <el-select v-model="detailForm.industryType" style="width: 100%;" placeholder="请选择">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="内容标题" prop="industryTitle">
              <el-input v-model="detailForm.industryTitle" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="内容描述" prop="industryContent">
              <el-input v-model="detailForm.industryContent" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="内容添加" prop="industryBody">
              <rich-components :catchData="handlecatchData" :checkId="checkId"></rich-components>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="附件">
              <el-button :key="index" v-for="(item, index) in detailForm.fileList" type="text" @click="fileClick(item.fileCatalog,item.belongId,item.fileName)">{{ item.fileName }}</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col :span="24" class="btn_bottom">
          <div style="text-align: center;">
            <el-button type="primary" size="mini" @click="saveMenu">保存</el-button>
            <el-button type="warning" size="mini" @click="resetForm('detailForm')">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { selectIndustry, updateIndustryInfo } from '@/api/hxxd/industryInfoPublish'
import RichComponents from './rich-components'

export default {
  name: 'UpdateIndustryInfo',
  components: { RichComponents },
  data() {
    return {
      title: '更新行业信息发布',
      editorContent: '',
      content: '',
      checkId: '',
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
      cascaderOpts: [],
      statusOptions: [{
          value: 1,
          label: "消代分会"
        },
        {
          value: 2,
          label: "航食分会"
        }
      ],
      rules1: {
        industryTitle: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        createTime: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    let id = this.$route.query.id
    this.checkId = this.$route.query.id
    this.title = "修改行业信息发布"
    this.getMenuInfo(id)
  },
  methods: {
    getMenuInfo(id) {
      this.detailForm.id = id
      selectIndustry(this.detailForm).then(response => {
        this.detailForm.industryContent = response.data[0].industryContent
        this.detailForm.industryType = response.data[0].industryType
        this.detailForm.industryTitle = response.data[0].industryTitle
        this.detailForm.fileList = response.data[0].fileList
        this.content = response.data[0].contentBody
      })
    },
    handlecatchData:function (params) {
      this.editorContent = params
    },
    saveMenu() {
      const {
        id,
        industryContent,
        industryType
      } = this.detailForm
      updateIndustryInfo(this.detailForm).then(response => {
        // this.$router.push({
        //   path: '/infoPublish/selectIndustryInfo',
        //   query: {}
        // })
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
<style lang="scss">
  @import '~@/styles/hxxd.scss';
</style>
