<template>
  <div>
    <el-card class="box-card" style="margin: 0 10px;">
      <el-card class="box-card" style="height:60px">
        <span>{{title}}</span>
        <!-- <el-divider direction="vertical"></el-divider> -->
      </el-card>
      <el-card class="box-card">
        <div class="title-cls">基本信息</div>
        <el-card class="box-card" style="padding:15px;border-radius:0px;">
          <el-form ref="detailForm" :model="detailForm" label-width="150px" :rules="rules">
            <el-row>
              <el-col :span="12">
                <el-form-item label="公司编号" size="mini" prop="companyCode">
                  <el-input v-model="detailForm.companyCode" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="公司名称" size="mini" prop="companyName">
                  <el-input
                    v-model="detailForm.companyName"
                    size="mini"
                    @change="companyNameChange"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="公司全称" size="mini" prop="companyFullName">
                  <el-input v-model="detailForm.companyFullName" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="排序号" size="mini" prop="treeSort">
                  <el-input v-model.number="detailForm.treeSort" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="备注" size="mini" prop="remarks">
                  <el-input type="textarea" v-model="detailForm.remarks" size="mini" :rows="4"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="24">
                <div style="text-align: center;">
                  <el-button type="primary" icon="el-icon-check" @click="saveCompany">保存</el-button>
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
import { getCompany, saveCompany, getSortNo } from "@/api/system/company";
import { toPinYinUppercase } from "@/api/system/comm/comm";

export default {
  data() {
    return {
      title: "新建公司",
      detailForm: {
        companyId: "",
        companyCode: "",
        companyName: "",
        companyFullName: "",
        treeSort: "",
        remarks: ""
      },
      props: {
        checkStrictly: true,
        expandTrigger: "hover",
        value: "id",
        label: "companyName",
        children: "childs"
      },
      cascaderOpts: [],
      rules: {
        companyCode: [
          { required: true, message: "公司编码不能为空", trigger: "blur" }
        ],
        companyName: [
          { required: true, message: "公司名称不能为空", trigger: "blur" }
        ],
        treeSort: [
          { required: true, message: "排序号不能为空", trigger: "blur" },
          { type: "number", message: "排序号必须为数字值" }
        ]
      }
    };
  },
  created() {
    // 参数传递 router.push({ path: 'register', query: { plan: 'private' }})
    // 参数接受 let id = this.$route.query.jId;
    let companyId = this.$route.query.companyId;
    if (companyId) {
      this.title = "编辑公司";
      this.getCompanyInfo(companyId);
    } else {
      this.title = "新建公司";
    }
    //获取序列号
    this.getSortNo();
  },
  methods: {
    getCompanyInfo(companyId) {
      getCompany(companyId).then(response => {
        this.detailForm = response.data;
      });
    },
    saveCompany() {
      const {
        companyId,
        companyCode,
        companyName,
        companyFullName,
        treeSort,
        remarks
      } = this.detailForm;
      saveCompany({
        companyId,
        companyCode,
        companyName,
        companyFullName,
        treeSort,
        remarks
      }).then(response => {
        var msg = companyId ? "更新成功" : "新增成功";
        this.$message({
          type: "success",
          message: msg
        });
        this.detailForm.companyId = response.data.companyId;
      });
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    companyNameChange(val) {
      if (val) {
        toPinYinUppercase(val).then(response => {
          this.detailForm.companyCode = response.data.pinyin;
        });
      }
    },
    getSortNo() {
      getSortNo().then(response => {
        this.detailForm.treeSort = response.data;
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
