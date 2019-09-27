<template>
  <div>
    <el-card class="box-card" style="margin: 0 10px;">
      <el-card class="box-card" style="height:60px">
        <span>{{title}}</span>
      </el-card>
      <el-card class="box-card">
        <div class="title-cls">基本信息</div>
        <el-card class="box-card" style="padding:15px;border-radius:0px;">
          <el-form ref="detailForm" :model="detailForm" label-width="150px" :rules="rules">
            <el-form-item label="菜单id" size="mini" prop="menuId" style="display:none;">
              <el-input v-model="detailForm.menuId" size="mini"></el-input>
            </el-form-item>
            <el-row>
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
            <el-row>
              <el-col :span="24">
                <div style="text-align: center;">
                  <el-button type="primary" icon="el-icon-check" @click="saveMenu">保存</el-button>
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
import { getMenu, getMenuTree, saveMenu, getSortNo } from "@/api/system/menu";

export default {
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
    // 参数传递 router.push({ path: 'register', query: { plan: 'private' }})
    // 参数接受 let id = this.$route.query.jId;
    let menuId = this.$route.query.menuId;
    if (menuId) {
      this.title = "编辑菜单";
      this.getMenuInfo(menuId);
    } else {
      this.title = "新建菜单";
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
        this.detailForm.treeSort = 1000;
        this.detailForm.menuCode = 1000;
      } else {
        this.getSortNo(arr[arr.length - 1]);
      }
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
.title-cls {
  color: #409eff;
  border-bottom: 1px solid #409eff;
  padding-bottom: 10px;
}
</style>
