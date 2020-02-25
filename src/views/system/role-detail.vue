<template>
  <div>
    <el-card class="detailsContainer">
      <el-row style="border-bottom: 1px solid #e6e6e6;margin-bottom: 20px;padding-bottom:10px;">
        <el-col :span="12">
          <a href="javascript:;">角色详情</a>
        </el-col>
        <el-col :span="12" style="text-align:right;">
          <el-button type="primary" size="mini" @click="saveRole">保存</el-button>
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
        <el-row :gutter="10">
          <el-col :span="24">
            <h5 class="dtl-title-line">功能菜单</h5>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-tree
              :data="menuTreeData"
              show-checkbox
              node-key="id"
              ref="tree"
              highlight-current
              :props="treeDefaultProps"
              :check-strictly="true"
              :default-checked-keys="menuTreeSelected"
            ></el-tree>
          </el-col>
        </el-row>
      </el-form>
      <!-- <el-card class="box-card rol-dtl-card">
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
            :check-strictly="true"
            :default-checked-keys="menuTreeSelected"
          ></el-tree>
        </el-card>
      </el-card>-->
      <!-- <el-row>
        <el-col :span="24">
          <div class="rol-dtl-btn">
            <el-button type="primary" icon="el-icon-check" @click="saveRole">保存</el-button>
            <el-button icon="el-icon-close" @click="resetForm('detailForm')">重置</el-button>
          </div>
        </el-col>
      </el-row>-->
    </el-card>
  </div>
</template>
<script>
import { getMenuTree, getRole, saveRole, getSortNo } from "@/api/system/role";
import { toPinYinUppercase, getDictDataLists } from "@/api/system/comm/comm";

export default {
  name:'RoleDetail',
  data() {
    return {
      title: "",
      detailForm: {
        roleId: "",
        roleCode: "",
        roleName: "",
        roleSort: "",
        remarks: "",
        system: ""
      },
      menuTreeData: [],
      menuTreeSelected: [],
      treeDefaultProps: {
        children: "childs",
        label: function(data, node) {
          return data.name;
        }
      },
      dict: {
        system: []
      },
      props: {
        expandTrigger: "hover",
        value: "id",
        label: "roleCode",
        children: "childs"
      },
      rules: {
        roleCode: [
          {
            required: true,
            message: "角色编码不能为空",
            trigger: ["blur", "change"]
          }
        ],
        roleName: [
          {
            required: true,
            message: "角色名称不能为空",
            trigger: ["blur", "change"]
          }
        ],
        roleSort: [
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
    let roleId = this.$route.query.roleId;
    this.beforeLoading();
    this.getRoleInfo(roleId);
  },
  methods: {
    beforeLoading(){
      //加载菜单项
      getMenuTree().then(response => {
        this.menuTreeData = response.data;
      });
      //加载归属系统
       getDictDataLists("97001005").then(response => {
        this.dict.system = response.data.jq97001005;
      });
    },
    roleNameChange(val) {
      if (val) {
        toPinYinUppercase(val).then(response => {
          this.detailForm.roleCode = response.data.pinyin;
        });
      }
    },
    getRoleInfo(roleId) {
      if (roleId) {
        getRole(roleId).then(response => {
          this.detailForm = response.data;
          var menuIds = response.data.menuIds;
          if (menuIds) {
            var arr = new Array();
            this.menuTreeSelected = menuIds.split(",");
          }
        });
      }else{
         //获取排序号
         this.getRoleSortNo();
      }
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
      const { roleId, roleCode, roleName, roleSort, remarks,system } = this.detailForm;
      saveRole({
        roleId,
        roleCode,
        roleName,
        roleSort,
        remarks,
        menuIds,
        system
      }).then(response => {
        var msg = roleId ? "更新成功" : "新增成功";
        this.$message({
          type: "success",
          message: msg
        });
        this.detailForm.roleId = response.data.roleId;
      });
    },
    getRoleSortNo() {
      getSortNo().then(response => {
        this.detailForm.roleSort = response.data;
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
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
</style>
