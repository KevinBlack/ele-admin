<template>
  <div>
    <el-card class="detailsContainer">
      <el-row style="border-bottom: 1px solid #e6e6e6;margin-bottom: 20px;padding-bottom:10px;">
        <el-col :span="12">
          <a href="javascript:;">菜单详情</a>
        </el-col>
        <el-col :span="12" style="text-align:right;">
          <el-button type="primary" size="mini" @click="saveMenu">保存</el-button>
        </el-col>
      </el-row>

      <el-form ref="detailForm" :model="detailForm" label-width="110px" :rules="rules">
        <el-row :gutter="10">
          <el-col :span="24">
            <h5 class="dtl-title-line">基础信息</h5>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="菜单id" size="mini" prop="menuId" style="display:none;">
              <el-input v-model="detailForm.menuId" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级菜单" size="mini" prop="parentId">
              <el-cascader
                :props="props"
                :show-all-levels="false"
                :options="cascaderOpts"
                v-model="detailForm.parentId"
                clearable
                filterable
                size="mini"
                style="width:100%;"
                change-on-select
                @change="cascaderChange"
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12"></el-col>
          <el-col :span="12">
            <el-form-item label="菜单编号" size="mini" prop="menuCode">
              <el-input v-model="detailForm.menuCode" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单名称" size="mini" prop="menuName">
              <el-input v-model="detailForm.menuName" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单类型" size="mini" prop="menuType">
              <el-radio-group v-model="detailForm.menuType" size="mini">
                <el-radio label="1">菜单</el-radio>
                <el-radio label="2">权限</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="链接" size="mini" prop="menuHref">
              <el-input v-model="detailForm.menuHref" size="mini"></el-input>
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
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getMenu, getMenuTree, saveMenu, getSortNo } from "@/api/system/menu";

export default {
  name:'MenuDetail',
  data() {
    return {
      title: "新建菜单",
      detailForm: {
        menuId: "",
        parentId: [],
        menuCode: "",
        menuName: "",
        menuType: "1",
        menuHref: "",
        treeSort: "",
        remarks: "",
        isBatchBtn: "1",
        jsMethodName: ""
      },
      props: {
        checkStrictly: true,
        expandTrigger: "hover",
        value: "id",
        label: "menuName",
        children: "childs"
      },
      cascaderOpts: [],
      rules: {
        menuCode: [
          { required: true, message: "机构编码不能为空", trigger: "blur" }
        ],
        menuName: [
          { required: true, message: "机构名称不能为空", trigger: "blur" }
        ],
        treeSort: [
          { required: true, message: "排序号不能为空", trigger: "blur" },
          { type: "number", message: "排序号必须为数字值" }
        ],
        menuType: [{ required: true, message: "菜单不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getCascaderOpts();
    let menuId = this.$route.query.menuId;
    if (menuId) {
      this.getMenuInfo(menuId);
    } else {
    }
    var arr = new Array();
    var parentIdArr = (this.$route.query.parentId || "").split(",");
    Object.keys(parentIdArr).forEach(function(key) {
      if (parentIdArr[key] && parseInt(parentIdArr[key]) > 0) {
        arr.push(parseInt(parentIdArr[key]));
      }
    });
    this.detailForm.parentId = arr;
    //获取排序号
    if (!menuId) {
      if (arr.length == 0) {
        arr.push(0);
      }
      this.getSortNo(arr[arr.length - 1]);
    }
  },
  methods: {
    getSortNo(parentId) {
      getSortNo(parseInt(parentId)).then(response => {
        this.detailForm.treeSort = response.data;
        this.detailForm.menuCode = response.data;
      });
    },
    getCascaderOpts() {
      getMenuTree().then(response => {
        this.cascaderOpts = response.data;
      });
    },
    getMenuInfo(menuId) {
      getMenu(parseInt(menuId)).then(response => {
        this.detailForm = response.data;
        var { parentIds } = response.data;
        if (parentIds) {
          parentIds = parentIds.substring(3, parentIds.length - 1);
        }
        var arr = new Array();
        var parentIdArr = (parentIds || "").split(",");
        Object.keys(parentIdArr).forEach(function(key) {
          if (parseInt(parentIdArr[key]) && parseInt(parentIdArr[key]) > 0) {
            arr.push(parseInt(parentIdArr[key]));
          }
        });
        this.detailForm.parentId = arr;
      });
    },
    cascaderChange(value){
      var parentId=0
      if(value && value.length>=2){
        parentId=value[value.length-2];
      }
      this.getSortNo(parentId)
    },
    saveMenu() {
      const {
        menuId,
        parentId,
        menuCode,
        menuName,
        menuType,
        menuHref,
        treeSort,
        remarks
      } = this.detailForm;
      let parentIds = "";
      if (parentId && parentId.length >= 1) {
        parentIds = parentId.join(",");
      }
      saveMenu({
        menuId,
        parentIds,
        menuCode,
        menuName,
        menuType,
        menuHref,
        treeSort,
        remarks
      }).then(response => {
        var msg = menuId ? "更新成功" : "新增成功";
        this.$message({
          type: "success",
          message: msg
        });
        this.detailForm.menuId = response.data.menuId;
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
