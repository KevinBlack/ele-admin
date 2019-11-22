<template>
  <div>
    <el-card class="detailsContainer">
      <!-- 组织机构详情 -->
      <el-row style="border-bottom: 1px solid #e6e6e6;margin-bottom: 20px;padding-bottom:10px;">
        <el-col :span="12">
          <a href="javascript:;">机构详情</a>
        </el-col>
        <el-col :span="12" style="text-align:right;">
          <el-button type="primary" size="mini" @click="saveOffice">保存</el-button>
        </el-col>
      </el-row>

      <el-form ref="detailForm" :model="detailForm" label-width="110px" :rules="rules" size="mini">
        <el-row :gutter="10">
          <el-col :span="24">
            <h5 class="dtl-title-line">基础信息</h5>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" style="display:none">
            <el-form-item label="机构编号" size="mini" prop="officeId" style="display:none">
              <el-input v-model="detailForm.officeId" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级机构" size="mini" prop="parentIds">
              <el-cascader
                :props="props"
                :show-all-levels="false"
                :options="cascaderOpts"
                v-model="detailForm.parentIds"
                clearable
                filterable
                size="mini"
                style="width:100%;"
                change-on-select
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- 此处为占位符，不能删除，否则el-cascader 长度显示不正常 -->
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构编号" size="mini" prop="officeCode">
              <el-input v-model="detailForm.officeCode" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构名称" size="mini" prop="officeName">
              <el-input v-model="detailForm.officeName" size="mini" @change="officeNameChange"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构全称" size="mini" prop="officeFullName">
              <el-input v-model="detailForm.officeFullName" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构全路径" size="mini" prop="officeFullPath">
              <el-input v-model="detailForm.officeFullPath" size="mini" :disabled="true"></el-input>
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
              <el-input type="textarea" v-model="detailForm.remarks" size="mini" :rows="4"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  getOffice,
  saveOffice,
  getOfficeTree,
  getSortNo
} from "@/api/system/office";
import { toPinYinUppercase, getDictDataLists } from "@/api/system/comm/comm";

export default {
  name:'OfficeDetail',
  data() {
    return {
      title: "新建机构",
      detailForm: {
        officeId: "",
        parentIds: [],
        officeCode: "",
        officeName: "",
        officeFullName: "",
        treeSort: "",
        remarks: "",
        officeFullPath: "",
        system: ""
      },
      props: {
        checkStrictly: true,
        expandTrigger: "hover",
        value: "id",
        label: "officeName",
        children: "childs"
      },
      cascaderOpts: [],
      dict:{
        system: []
      },
      rules: {
        officeCode: [
          {
            required: true,
            message: "机构编码不能为空",
            trigger: ["blur", "change"]
          }
        ],
        officeName: [
          {
            required: true,
            message: "机构名称不能为空",
            trigger: ["blur", "change"]
          }
        ],
        treeSort: [
          {
            required: true,
            message: "排序号不能为空",
            trigger: ["blur", "change"]
          },
          { type: "number", message: "排序号必须为数字值" }
        ]
      }
    };
  },
  created() {
    this.getCascaderOpts();
    let officeId = this.$route.query.officeId;
    this.getOfficeInfo(officeId);
    // 添加下级菜单时，此处不为空
    var arr = new Array();
    if (this.$route.query.parentIds) {
      var parentIdArr = (this.$route.query.parentIds || "").split(".");
      console.log(parentIdArr);
      Object.keys(parentIdArr).forEach(function(key) {
        if (parentIdArr[key]) {
          var pid = parseInt(parentIdArr[key]);
          if (pid > 0) {
            arr.push(pid);
          }
        }
      });
      this.detailForm.parentIds = arr;
    }
    //获取排序号
    if (arr.length > 0) {
      this.getTreeSortNo(arr[arr.length - 1]);
    } else {
      this.getTreeSortNo(0);
    }
  },
  methods: {
    getCascaderOpts() {
      getOfficeTree().then(response => {
        this.cascaderOpts = response.data;
      });
    },
    getOfficeInfo(officeId) {
      //获取字典
      getDictDataLists("97001005").then(response => {
        this.dict.system = response.data.jq97001005;
      });
      if (officeId) {
        getOffice(officeId).then(response => {
          this.detailForm = response.data;
          var parentIds = response.data.parentIds;
          if (parentIds) {
            var arr = new Array();
            var parentIdArr = parentIds.split(".");
            Object.keys(parentIdArr).forEach(function(key) {
              if (parseInt(parentIdArr[key])) {
                arr.push(parseInt(parentIdArr[key]));
              }
            });
            this.detailForm.parentIds = arr;
          }
        });
      }
    },
    saveOffice() {
      const {
        officeId,
        parentIds,
        officeCode,
        officeName,
        officeFullName,
        treeSort,
        remarks,
        system
      } = this.detailForm;
      let parentIdsStr = "";
      if (parentIds && parentIds.length >= 1) {
        parentIdsStr = parentIds.join(".");
      }
      saveOffice({
        officeId,
        parentIds: parentIdsStr,
        officeCode,
        officeName,
        officeFullName,
        treeSort,
        remarks,
        system
      }).then(response => {
        if (!response.data.officeId) {
          this.$message({
            type: "error",
            message: response.message
          });
          return;
        }
        var msg = officeId ? "更新成功" : "新增成功";
        this.$message({
          type: "success",
          message: msg
        });
        this.detailForm.officeId = response.data.officeId
        this.detailForm.officeFullPath = response.data.officeFullPath
        //重新加载数据
        this.getCascaderOpts();
      });
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    officeNameChange(val) {
      if (val) {
        toPinYinUppercase(val).then(response => {
          this.detailForm.officeCode = response.data.pinyin;
        });
      }
    },
    getTreeSortNo(parentId) {
      if (parentId) {
        getSortNo(parentId).then(response => {
          this.detailForm.treeSort = response.data;
        });
      } else {
        this.detailForm.treeSort = 1000;
      }
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
