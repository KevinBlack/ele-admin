<template>
  <div>
    <el-card class="detailsContainer">
      <el-row style="border-bottom: 1px solid #e6e6e6;margin-bottom: 20px;padding-bottom:10px;">
        <el-col :span="12">
          <a href="javascript:;">数据权限</a>
        </el-col>
        <el-col :span="12" style="text-align:right;">
          <el-button type="primary" size="mini" @click="saveDataScope">保存</el-button>
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
            <el-form-item label="主键" size="mini" prop="id" style="display:none;">
              <el-input v-model="detailForm.id" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色ID" size="mini" prop="roleId" style="display:none;">
              <el-input v-model="detailForm.roleId" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色编号" size="mini" prop="roleCode">
              <el-input v-model="detailForm.roleCode" size="mini" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色名称" size="mini" prop="roleName">
              <el-input v-model="detailForm.roleName" size="mini" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="数据范围" size="mini" prop="dataScope">
              <el-radio-group v-model="detailForm.dataScope" size="mini" @change="dataScopeChange">
                <el-radio :label="0">自己数据</el-radio>
                <el-radio :label="1">全部数据</el-radio>
                <el-radio :label="2">本公司数据</el-radio>
                <el-radio :label="3">本部门数据</el-radio>
                <el-radio :label="4">自定义数据</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="已选公司" size="mini" prop="companyNames">
              <el-input
                v-model="detailForm.companyNames"
                size="mini"
                :readonly="true"
                @focus="chooseCompany"
                :disabled="disable"
              >
                <template slot="append">
                  <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="chooseCompany"
                    :disabled="disable"
                  ></el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="已选机构" size="mini" prop="officeIds">
              <el-cascader
                :props="props"
                :show-all-levels="false"
                :options="cascaderOpts"
                v-model="detailForm.officeIds"
                clearable
                filterable
                size="mini"
                style="width:100%;"
                change-on-select
                :disabled="disable"
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="已选用户" size="mini" prop="userNames">
              <el-input
                v-model="detailForm.userNames"
                size="mini"
                :readonly="true"
                @focus="chooseUser"
                :disabled="disable"
              >
                <template slot="append">
                  <el-button
                    slot="append"
                    icon="el-icon-search"
                    @click="chooseUser"
                    :disabled="disable"
                  ></el-button>
                </template>
              </el-input>
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

    <!--所属公司弹框  -->
    <el-dialog :visible.sync="companyDialog.visible" width="700px" title="公司选择">
      <!-- 查询条件区域 -->
      <el-card class="box-card" style="height:60px">
        <el-form :model="companyDialog.form" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="公司名称" size="mini" prop="companyName">
                <el-input v-model="companyDialog.form.companyName" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item size="mini">
                <el-button type="primary" size="mini" @click="searchCompany">查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>

      <!-- 内容区域 -->
      <el-card class="box-card">
        <!-- 已选择 -->
        <div style="margin-bottom: 10px;">
          <span>已选择：</span>
          <el-tag
            v-for="tag in companyDialog.selectedTags"
            :key="tag.companyId"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >{{ tag.companyName }}</el-tag>
        </div>
        <el-table
          ref="companyTable"
          :data="companyDialog.table.data"
          style="width:100%"
          :header-row-style="headRowStyle"
          :row-style="rowStyle"
          :header-cell-style="getCellStyle"
          v-loading="companyDialog.table.loading"
          border
          highlight-current-row
          @row-click="rowClick"
          height="300"
        >
          <el-table-column
            prop="companyId"
            label="公司id"
            width="200"
            align="center"
            style="display:none;"
          ></el-table-column>
          <el-table-column prop="companyCode" label="公司编号" width="200" align="center"></el-table-column>
          <el-table-column prop="companyName" label="公司名称" align="center"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page.sync="companyDialog.page.pageNo"
          :page-size.sync="companyDialog.page.pageSize"
          layout="total,prev, pager, next, jumper"
          :total="companyDialog.page.total"
        ></el-pagination>
      </el-card>
      <!-- 底部确定和取消按钮  -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogClose">取消</el-button>
        <el-button type="primary" @click="dialogOk">确定</el-button>
      </div>
    </el-dialog>

    <!--用户弹框  -->
    <el-dialog :visible.sync="userDialog.visible" width="700px" title="用户选择">
      <el-card class="box-card" style="height:60px">
        <el-form :model="userDialog.form" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="用户名称" size="mini" prop="userName">
                <el-input v-model="userDialog.form.userName" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item size="mini">
                <el-button type="primary" size="mini" @click="searchUser">查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <el-card class="box-card">
        <div style="margin-bottom: 10px;">
          <span>已选择：</span>
          <el-tag
            v-for="tag in userDialog.selectedTags"
            :key="tag.userId"
            closable
            :disable-transitions="false"
            @close="handleUserClose(tag)"
          >{{ tag.userName }}</el-tag>
        </div>
        <el-table
          ref="companyTable"
          :data="userDialog.table.data"
          style="width:100%"
          :header-row-style="headRowStyle"
          :row-style="rowStyle"
          :header-cell-style="getCellStyle"
          v-loading="userDialog.table.loading"
          border
          highlight-current-row
          @row-click="userRowClick"
          height="300"
        >
          <el-table-column
            prop="userId"
            label="用户id"
            width="200"
            align="center"
            style="display:none;"
          ></el-table-column>
          <el-table-column prop="loginCode" label="登录名" width="200" align="center"></el-table-column>
          <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="userSizeChange"
          @current-change="userCurrentChange"
          :current-page.sync="userDialog.page.pageNo"
          :page-size.sync="userDialog.page.pageSize"
          layout="total,prev, pager, next, jumper"
          :total="userDialog.page.total"
        ></el-pagination>
      </el-card>
      <!-- 底部确定和取消按钮  -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="userDialogClose">取消</el-button>
        <el-button type="primary" @click="userDialogOk">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getDataScope,
  saveDataScope,
  deleteDataScope
} from "@/api/system/role-datascope";
import { getRole } from "@/api/system/role";
import { getCompanyList } from "@/api/system/company";
import { getOfficeTree } from "@/api/system/office";
import { getUserList } from "@/api/system/user";

export default {
  name:'RoleDatascope',
  data() {
    return {
      title: "",
      detailForm: {
        id: "",
        roleId: "",
        roleCode: "",
        roleName: "",
        dataScope: 0,
        companyIds: "",
        companyNames: "",
        officeIds: [],
        officeFullPaths: "",
        userIds: "",
        userNames: "",
        remarks: ""
      },
      disable: true,
      props: {
        multiple: true,
        checkStrictly: true,
        showAllLevels: true,
        value: "id",
        label: "officeName",
        children: "childs"
      },
      cascaderOpts: [],
      menuTreeData: [],
      menuTreeSelected: [],
      treeDefaultProps: {
        children: "childs",
        label: function(data, node) {
          return data.name;
        }
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
        ]
      },
      companyDialog: {
        // 是否可见
        visible: false,
        // 表单
        form: {
          companyName: ""
        },
        // 表格
        table: {
          loading: false,
          data: [],
          multiSelected: []
        },
        // 分页
        page: {
          pageNo: 1,
          pageSize: 10,
          total: 0
        },
        // 已经选择的项
        selectedTags: []
      },
      userDialog: {
        // 是否可见
        visible: false,
        // 表单
        form: {
          companyName: ""
        },
        // 表格
        table: {
          loading: false,
          data: [],
          multiSelected: []
        },
        // 分页
        page: {
          pageNo: 1,
          pageSize: 10,
          total: 0
        },
        // 已经选择的项
        selectedTags: []
      }
    };
  },
  created() {
    let roleId = this.$route.query.roleId;
    if (roleId) {
      this.getRoleInfo(roleId);
      this.getDataScope(roleId);
    }
    this.getCascaderOpts();
  },
  methods: {
    rowStyle(row, rowIndex) {
      return "height:15px;font-size: 13px;color: #333;font-weight: normal; ";
    },
    headRowStyle(row, rowIndex) {
      return "height:15px;";
    },
    getCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background: #F2F2F2;font-size: 13px;color: #333;font-weight: normal;";
      } else {
        return "";
      }
    },
    // 获取组织机构下拉选项
    getCascaderOpts() {
      getOfficeTree().then(response => {
        this.cascaderOpts = response.data;
      });
    },
    // 获取角色信息
    getRoleInfo(roleId) {
      getRole(roleId).then(response => {
        this.detailForm.roleId = response.data.roleId;
        this.detailForm.roleCode = response.data.roleCode;
        this.detailForm.roleName = response.data.roleName;
      });
    },
    // 获取数据权限
    getDataScope(roleId) {
      if (!roleId) {
        return;
      }
      getDataScope(roleId).then(response => {
        var {
          id,
          roleId,
          roleCode,
          roleName,
          dataScope,
          companyIds,
          companyNames,
          officeFullPaths,
          userIds,
          userNames,
          remarks
        } = response.data;
        //组织机构回显
        var tempArr = new Array();
        if (officeFullPaths) {
          var officeFullPathArr = officeFullPaths.split(",");
          if (officeFullPathArr && officeFullPathArr.length > 0) {
            Object.keys(officeFullPathArr).forEach(function(key) {
              if (officeFullPathArr[key]) {
                var fullPathArr = officeFullPathArr[key].split(".");
                var temp3 = new Array();
                Object.keys(fullPathArr).forEach(function(key) {
                  if (Number(fullPathArr[key]) > 0) {
                    temp3.push(Number(fullPathArr[key]));
                  }
                });
                tempArr.push(temp3);
              }
            });
          }
        }

        this.detailForm = {
          id,
          roleId,
          roleCode,
          roleName,
          dataScope,
          companyIds,
          companyNames,
          officeIds: tempArr,
          officeFullPaths,
          userIds,
          userNames,
          remarks
        };
        //dataScope==4 自定义
        this.disable = !(dataScope == 4);
      });
    },
    // 保存数据
    saveDataScope() {
      const {
        id,
        roleId,
        roleCode,
        roleName,
        dataScope,
        companyIds,
        officeIds,
        userIds,
        remarks
      } = this.detailForm;

      var officeIdArr = new Array();
      if (officeIds && officeIds.length >= 1) {
        Object.keys(officeIds).forEach(function(key) {
          var officeFullPathArr = officeIds[key];
          officeIdArr.push(".0." + officeFullPathArr.join(".") + ".");
        });
      }

      saveDataScope({
        id,
        roleId,
        roleCode,
        roleName,
        dataScope,
        companyIds,
        officeFullPaths: officeIdArr.join(","),
        userIds,
        remarks
      }).then(response => {
        var msg = id ? "更新成功" : "新增成功";
        this.$message({
          type: "success",
          message: msg
        });
        this.detailForm.id = response.data.id;
      });
    },
    //当数据范围发生变化时
    dataScopeChange() {
      if (this.detailForm.dataScope == 4) {
        this.disable = false;
      } else {
        this.disable = true;
        this.detailForm.companyIds = "";
        this.detailForm.companyNames = "";
        this.detailForm.officeIds = "";
        this.detailForm.officeFullPaths = "";
        this.detailForm.userIds = "";
        this.detailForm.userNames = "";
      }
    },
    deleteDataScope() {
      var id = this.detailForm.id;
      deleteDataScope({ id }).then(response => {
        var success = response.data.success;
        var msg = success ? "删除成功" : "删除失败";
        this.$message({
          type: "success",
          message: msg
        });
      });
    },
    //选择公司
    chooseCompany() {
      this.companyDialog.visible = true;
      this.searchCompany();
    },
    searchCompany() {
      this.companyDialog.tableLoading = true;
      var companyName = this.companyDialog.form.companyName;
      var pageNo = this.companyDialog.page.pageNo;
      var pageSize = this.companyDialog.page.pageSize;
      var companyQuery = {
        companyName: companyName,
        pageNo: pageNo,
        pageSize: pageSize
      };
      getCompanyList(companyQuery).then(response => {
        this.companyDialog.table.data = response.data;
        this.companyDialog.tableLoading = false;
        if (response.page) {
          this.companyDialog.page.total = response.page.total;
        }
      });
    },
    handleClose(tag) {
      if (this.companyDialog.selectedTags) {
        this.companyDialog.selectedTags.splice(
          this.companyDialog.selectedTags.indexOf(tag),
          1
        );
      }
    },
    dialogClose() {
      this.companyDialog.visible = false;
      this.companyDialog.selectedTags = [];
      this.companyDialog.form.companyName = "";
    },
    dialogOk() {
      this.companyDialog.visible = false;
      var companyNameArr = new Array();
      var companyIdArr = new Array();
      var selectedTags = this.companyDialog.selectedTags;
      Object.keys(selectedTags).forEach(function(key) {
        companyIdArr.push(selectedTags[key].companyId);
        companyNameArr.push(selectedTags[key].companyName);
      });
      if (companyNameArr) {
        this.detailForm.companyIds = companyIdArr.join(",");
        this.detailForm.companyNames = companyNameArr.join(",");
      } else {
        this.detailForm.companyIds = "";
        this.detailForm.companyNames = "";
      }
    },
    sizeChange(val) {
      this.searchCompany();
    },
    currentChange(val) {
      this.searchCompany();
    },
    rowClick(row, column, event) {
      if (row) {
        //当找不到元素时，执行操作
        var { companyId, companyName } = row;
        var selectedTags = this.companyDialog.selectedTags;
        var hasInclude = false;
        Object.keys(selectedTags).forEach(function(key) {
          if (selectedTags[key].companyId == companyId) {
            hasInclude = true;
          }
        });
        if (!hasInclude) {
          this.companyDialog.selectedTags.push({ companyId, companyName });
        }
      }
    },
    //选择用户
    chooseUser() {
      this.userDialog.visible = true;
      this.searchUser();
    },
    searchUser() {
      this.userDialog.tableLoading = true;
      var userName = this.userDialog.form.userName;
      var pageNo = this.userDialog.page.pageNo;
      var pageSize = this.userDialog.page.pageSize;
      var userQuery = {
        userName: userName,
        pageNo: pageNo,
        pageSize: pageSize
      };
      getUserList(userQuery).then(response => {
        this.userDialog.table.data = response.data;
        this.userDialog.tableLoading = false;
        if (response.page) {
          this.userDialog.page.total = response.page.total;
        }
      });
    },
    handleUserClose(tag) {
      if (this.userDialog.selectedTags) {
        this.userDialog.selectedTags.splice(
          this.userDialog.selectedTags.indexOf(tag),
          1
        );
      }
    },
    userDialogClose() {
      this.userDialog.visible = false;
      this.userDialog.selectedTags = [];
      this.userDialog.form.companyName = "";
    },
    userDialogOk() {
      this.userDialog.visible = false;
      var userNameArr = new Array();
      var userIdArr = new Array();
      var selectedTags = this.userDialog.selectedTags;
      Object.keys(selectedTags).forEach(function(key) {
        userIdArr.push(selectedTags[key].userId);
        userNameArr.push(selectedTags[key].userName);
      });
      if (userNameArr) {
        this.detailForm.userIds = userIdArr.join(",");
        this.detailForm.userNames = userNameArr.join(",");
      } else {
        this.detailForm.userIds = "";
        this.detailForm.userNames = "";
      }
    },
    userSizeChange(val) {
      this.searchUser();
    },
    userCurrentChange(val) {
      this.searchUser();
    },
    userRowClick(row, column, event) {
      if (row) {
        //当找不到元素时，执行操作
        var { userId, userName } = row;
        var selectedTags = this.userDialog.selectedTags;
        var hasInclude = false;
        Object.keys(selectedTags).forEach(function(key) {
          if (selectedTags[key].userId == userId) {
            hasInclude = true;
          }
        });
        if (!hasInclude) {
          this.userDialog.selectedTags.push({ userId, userName });
        }
      }
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
