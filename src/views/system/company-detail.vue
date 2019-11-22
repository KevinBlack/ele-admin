<template>
  <div>
    <el-card class="detailsContainer">
      <el-row style="border-bottom: 1px solid #e6e6e6;margin-bottom: 20px;padding-bottom:10px;">
        <el-col :span="12">
          <a href="javascript:;">公司详情</a>
        </el-col>
        <el-col :span="12" style="text-align:right;">
          <el-button type="primary" size="mini" @click="saveCompany">保存</el-button>
        </el-col>
      </el-row>
      <el-form ref="detailForm" :model="detailForm" label-width="110px" :rules="rules" size="mini">
        <!-- 第一块分组 -->
        <el-row :gutter="10">
          <el-col :span="24">
            <h5 class="dtl-title-line">基础信息</h5>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="公司编号" size="mini" prop="companyCode">
              <el-input v-model="detailForm.companyCode" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司名称" size="mini" prop="companyName">
              <el-input v-model="detailForm.companyName" size="mini" @change="companyNameChange"></el-input>
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
          <el-col :span="12">
            <el-form-item label="归属系统" size="mini" prop="system">
              <el-select
                v-model="detailForm.system"
                placeholder="请选择"
                size="mini"
                style="width:100%"
              >
                <el-option
                  v-for="item in dict.system"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" size="mini" prop="remarks">
              <el-input
                type="textarea"
                v-model="detailForm.remarks"
                size="mini"
                :rows="4"
                maxlength="30"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getCompany, saveCompany, getSortNo } from "@/api/system/company";
import { toPinYinUppercase, getDictDataLists } from "@/api/system/comm/comm";

export default {
  name:'CompanyDetail',
  data() {
    return {
      detailForm: {
        companyId: "",
        companyCode: "",
        companyName: "",
        companyFullName: "",
        treeSort: "",
        remarks: "",
        system: ""
      },
      dict: {
        system: []
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
    let companyId = this.$route.query.companyId;
    if (!companyId) {
      //获取序列号
      this.getSortNo();
    }
    this.getCompanyInfo(companyId);
  },
  methods: {
    getCompanyInfo(companyId) {
      //获取字典
      getDictDataLists("97001005").then(response => {
        this.dict.system = response.data.jq97001005;
      });
      if (companyId) {
        //加载数据
        getCompany(companyId).then(response => {
          this.detailForm = response.data;
        });
      }
    },
    saveCompany() {
      const {
        companyId,
        companyCode,
        companyName,
        companyFullName,
        treeSort,
        remarks,
        system
      } = this.detailForm;
      saveCompany({
        companyId,
        companyCode,
        companyName,
        companyFullName,
        treeSort,
        remarks,
        system
      }).then(response => {
        if (!response.data.companyId) {
          this.$message({
            type: "error",
            message: response.message
          });
          return;
        }
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
* {
  font-weight: normal;
}
.detailsContainer {
  margin: 0 10px;
}
.dtl-title-line {
  display: inline-block;
  border-left: 3px solid #409eff;
  padding-left: 5px;
}
.el-table__fixed-right::before {
  background-color: none;
}
.area_border,
.area_bordes {
  box-sizing: border-box;
  border: 1px solid #e6e6e6;
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding: 10px 0 0 0;
  margin-bottom: 20px;
  overflow: hidden;
}
.area_bordes {
  padding: 10px;
}
</style>
