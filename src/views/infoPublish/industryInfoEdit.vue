<template>
  <el-card class="detailsContainer">
    <!-- 系统消息录入 -->
    <el-row :gutter="10">
      <el-col :span="24">
        <h5 class="dtl-title-line">新增行业信息</h5>
      </el-col>
    </el-row>

    <el-form
      ref="ruleForm"
      :model="industryInfoParam"
      label-width="135px"
      size="mini"
      :rules="rules1"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="所属分组" prop="industryType">
            <el-select v-model="industryInfoParam.industryType" style="width: 100%;" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="内容标题" prop="industryTitle">
            <el-input v-model="industryInfoParam.industryTitle" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="内容描述" prop="industryContent">
            <el-input v-model="industryInfoParam.industryContent" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="发布时间" prop="createTime">
            <el-input v-model="industryInfoParam.createTime" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="添加附件" prop="industryContent">
            <el-upload
              class="upload-demo"
              ref="upload"
              action="/hxxd/hxXdSignContract/batchUpload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :auto-upload="false"
              :headers="uploadHeaders"
              :data="uploadData"
              :multiple="true"
            >
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="内容添加" prop="industryBody">
            <div ref="editor"></div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮区 -->
    <el-row class="btn_bottom">
      <el-col :span="24">
        <el-button type="primary" size="mini" @click="save">保存</el-button>
        <el-button type="primary" size="mini">发送</el-button>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { addIndustryInfo } from '@/api/hxxd/industryInfoPublish'
import E from 'wangeditor'

export default {
  name: 'IndustryInfoEdit',
  data() {
    return {
      editorContent: '',
      industryInfoParam: {
        industryType: '',
        industryTitle: '',
        industryContent: '',
        createTime: '',
        industryBody: ''
      },
      options: [
        {
          value: '1',
          label: '消代分会'
        },
        {
          value: '2',
          label: '航食分会'
        },
        {
          value: '3',
          label: '其他分会'
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
  mounted() {
    var editor = new E(this.$refs.editor)
    editor.customConfig.onchange = (html) => {
      this.editorContent = html
    }
    editor.create()
  },
  methods: {
    save() {
      const paramTitle = this.industryInfoParam.industryTitle
      const paramTime = this.industryInfoParam.createTime
      if ( paramTitle === '' || paramTime === '') {
        this.$message({
          message: '请完善数据',
          type: 'warning'
        })
      } else {
        addIndustryInfo(this.industryInfoParam).then(response => {
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
            console.log(response.message)
          }
        })
      }

    }
  }
}
</script>
<style>
 @import '../../styles/hxxd.scss';
</style>
