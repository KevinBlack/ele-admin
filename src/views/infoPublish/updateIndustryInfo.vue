<template>
  <div>
    <el-card class="box-card" style="margin: 0 10px;">
      <el-card class="box-card" style="height:60px">
        <span>{{title}}</span>
      </el-card>
      <el-card class="box-card">
        <div class="title-cls">基本信息</div>
        <el-card class="box-card" style="padding:15px;border-radius:0px;">
          <el-form ref="detailForm" :model="detailForm" label-width="150px">
           <el-row>
            <el-col :span="12">
              <el-form-item label="发布内容" size="mini" prop="industryContent">
                <el-input v-model="detailForm.industryContent" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12"></el-col>
           </el-row>
            <el-row>
            <el-col :span="12">
              <el-form-item label="行业类型" size="mini" prop="industryType">
                <el-select
                  v-model="detailForm.industryType"
                  filterable
                  placeholder="请选择"
                  size="mini"
                >
                  <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    style="width:100%"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12"></el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div style="text-align: center;">
                  <el-button type="primary"  icon="el-icon-check" @click="saveMenu">保存</el-button>
                  <el-button icon="el-icon-close" @click="resetForm('detailForm')">重置</el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-card>
    </el-card>
  </div>
</template>

<script>
import { selectIndustry,updateIndustryInfo } from "@/api/hxxd/industryInfoPublish";

export default {
  data() {
    return {
      title: "更新行业信息发布",
      detailForm: {
        id: "",
        industryContent: "",
        industryType: "",
        publishStatus: ""
      },
      cascaderOpts: [],
      statusOptions: [
        {
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
    let id = this.$route.query.id;
    this.title = "修改行业信息发布";
    this.getMenuInfo(id);
  },
  methods: {
    getMenuInfo(id) {
      this.detailForm.id=id
      selectIndustry(this.detailForm).then(response => {
        this.detailForm.industryContent = response.data[0].industryContent;
        this.detailForm.industryType = response.data[0].industryType;
      });
    },
    saveMenu() {
      const {
        id,
        industryContent,
        industryType
      } = this.detailForm;
      updateIndustryInfo(this.detailForm).then(response => {
        this.$router.push({
        path: "/infoPublish/selectIndustryInfo",
        query: {}
      });
      });
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    }
  }
};
</script>
<style>
.title-cls {
  color: #409eff;
  border-bottom: 1px solid #409eff;
  padding-bottom: 10px;
}
</style>
