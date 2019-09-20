<template>
  <div class="app-container">
    <el-card class="box-card">
      <div class="title-cls">基本信息</div>
      <el-card class="box-card" style="padding:15px;border-radius:0px;">
        <el-form ref="detailForm" :model="detailForm" label-width="150px" :rules="rules">
          <el-row>
            <el-col :span="12">
              <el-form-item label="角色id" size="mini" prop="roleId" style="display:none;">
                <el-input v-model="detailForm.roleId" size="mini"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="12">
              <el-form-item label="角色编号" size="mini" prop="roleCode">
                <el-input v-model="detailForm.roleCode" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="角色名称" size="mini" prop="roleName">
                <el-input v-model="detailForm.roleName" size="mini" @change="roleNameChange"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="排序号" size="mini" prop="roleSort">
                <el-input v-model="detailForm.roleSort" size="mini"></el-input>
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
    </el-card>
    <el-card class="box-card rol-dtl-card">
      <div class="title-cls">功能菜单</div>
      <el-card class="box-card" style="padding:15px;border-radius:0px;">
        <el-tree
          :data="menuTreeData"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :props="treeDefaultProps"
          :default-checked-keys="menuTreeSelected"
        ></el-tree>
      </el-card>
    </el-card>
    <el-row>
      <el-col :span="24">
        <div class="rol-dtl-btn">
          <el-button type="primary" icon="el-icon-check" @click="saveRole">保存</el-button>
          <el-button icon="el-icon-close" @click="resetForm('detailForm')">重置</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getMenuTree,getRole,saveRole,getSortNo } from "@/api/role";
import { toPinYinUppercase } from "@/api/comm/comm";

export default {
  data() {
    return {
      title: "",
      detailForm: {
        roleId: "",
        roleCode: "",
        roleName: "",
        roleSort: "",
        remarks: ""
      },
      menuTreeData: [],
      menuTreeSelected:[],
      treeDefaultProps: {
        children: "childs",
        label: function(data, node) {
          return data.name;
        }
      },
      props: {
        checkStrictly: true,
        expandTrigger: "hover",
        value: "id",
        label: "roleCode",
        children: "childs"
      },
      rules: {
        roleCode: [
          { required: true, message: "角色编码不能为空", trigger: ['blur', 'change'] }
        ],
        roleName: [
          { required: true, message: "角色名称不能为空", trigger: ['blur', 'change'] }
        ],
        roleSort: [
          { required: true, message: "排序号不能为空", trigger: ['blur', 'change'] },
          { type: "number", message: "排序号必须为数字值" }
        ]
      }
    };
  },
  created() {
    let roleId = this.$route.query.roleId;
    if (roleId) {
      this.title = "编辑角色";
      this.getRoleInfo(roleId);
    } else {
      this.title = "新建角色";
    }
    this.getMenuTreeData();
    //获取排序号
    if(!roleId){
      this.getRoleSortNo()
    }
  },
  methods: {
    roleNameChange(val){
    if(val){
      toPinYinUppercase(val).then(response => {
          this.detailForm.roleCode = response.data.pinyin;
        });
      }
    },
    getRoleInfo(roleId){
      getRole(roleId).then(response => {
        this.detailForm = response.data;
        var menuIds = response.data.menuIds;
        if (menuIds) {
          var arr = new Array();
          this.menuTreeSelected =  menuIds.split(",");
        }
      });
    },
    saveRole() {
      var selectedMenu = this.$refs.tree.getCheckedNodes();
      var arr = new Array();
      Object.keys(selectedMenu).forEach(function(index) {
        if (selectedMenu[index]) {
          var menuId = parseInt(selectedMenu[index].id);
          if (menuId > 0) {
            arr.push(menuId);
          }
        }
      });
      var menuIds = arr.join(",");
      const {
        roleId,
        roleCode,
        roleName,
        roleSort,
        remarks
      } = this.detailForm;
      saveRole({
        roleId,
        roleCode,
        roleName,
        roleSort,
        remarks,
        menuIds
      }).then(response => {
        var msg = roleId ? "更新成功" : "新增成功";
        this.$message({
          type: "success",
          message: msg
        });
        this.detailForm.roleId = response.data.roleId;
      });
    },
    getMenuTreeData() {
      getMenuTree().then(response => {
        this.menuTreeData = response.data;
      });
    },
    getRoleSortNo(){
        getSortNo().then(response => {
          this.detailForm.roleSort = response.data;
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
.rol-dtl-card {
  margin-top: 20px;
}
.rol-dtl-btn {
  text-align: center;
  padding-top: 20px;
}
</style>
