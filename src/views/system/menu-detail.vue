<template>
  <div class="app-container">
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
            <el-col :span="12"></el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="菜单名称" size="mini" prop="menuName">
                <el-input v-model="detailForm.menuName" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="菜单编号" size="mini" prop="menuCode">
                <el-input v-model="detailForm.menuCode" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="菜单类型" size="mini" prop="menuType">
                <el-radio-group v-model="detailForm.menuType" size="mini">
                  <el-radio label="1">菜单</el-radio>
                  <el-radio label="2">权限</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="可见" size="mini" prop="isShow">
                <el-radio-group v-model="detailForm.isShow" size="mini">
                  <el-radio label="1">显示</el-radio>
                  <el-radio label="0">隐藏</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
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
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="备注" size="mini" prop="remarks">
                <el-input type="textarea" v-model="detailForm.remarks" size="mini" :rows="4"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div style="text-align: center;">
                <el-button type="primary" icon="el-icon-check" @click="saveMenu()">保存</el-button>
                <el-button icon="el-icon-close" @click="resetForm('detailForm')">重置</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </el-card>
  </div>
</template>

<script>
import { getMenu, addMenu, getMenuTree, updateMenu } from "@/api/menu";
// import { closeSelectedTag } from '@/layout/components/TagsView'

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
        isShow: "1",
        remarks: ""
      },
      props: {
        checkStrictly: true,
        expandTrigger: "hover",
        value: "id",
        label: "menuName",
        children: "childs",
        ref: "tag"
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
        menuType: [
          { required: true, message: "菜单不能为空", trigger: "blur" }
        ],
        isShow: [{ required: true, message: "可见不能为空", trigger: "blur" }]
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
      arr.push(parseInt(parentIdArr[key]));
    });
    this.detailForm.parentId = arr;
  },
  methods: {
    getCascaderOpts() {
      getMenuTree().then(response => {
        this.cascaderOpts = response.data;
      });
    },
    getMenuInfo(menuId) {
      getMenu(parseInt(menuId)).then(response => {
        this.detailForm=response.data;
        var {parentIds} =response.data;
        if(parentIds){
          parentIds = parentIds.substring(3,parentIds.length-1);
        }
        var arr = new Array();
        var parentIdArr = (parentIds || "").split(",");
        Object.keys(parentIdArr).forEach(function(key) {
            arr.push(parseInt(parentIdArr[key]));
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
        isShow,
        remarks
      } = this.detailForm;
      let parentIds = "";
      if (parentId && parentId.length >= 1) {
        parentIds = parentId.join(",")
      }
      if (!menuId) {
        addMenu({
          menuId,
          parentIds,
          menuCode,
          menuName,
          menuType,
          menuHref,
          treeSort,
          isShow,
          remarks
        }).then(response => {
          this.$message({
            type: "success",
            message: "新增成功!"
          })
          // closeSelectedTag(this.ref)
          //保存完之后清空表格数据
          this.resetForm("detailForm")
        });
      } else {
        updateMenu({
          menuId,
          parentIds,
          menuCode,
          menuName,
          menuType,
          menuHref,
          treeSort,
          isShow,
          remarks
        }).then(response => {
          this.$message({
            type: "success",
            message: "更新成功 !"
          })
          // closeSelectedTag(this.ref)
          //保存完之后清空表格数据
          this.resetForm("detailForm")
        })
      }
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      })
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
