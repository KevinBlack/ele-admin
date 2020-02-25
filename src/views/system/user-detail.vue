<template>
  <div>
    <el-card class="detailsContainer">
      <el-row style="border-bottom: 1px solid #e6e6e6;margin-bottom: 20px;padding-bottom:10px;">
        <el-col :span="12">
          <a href="javascript:;">用户详情</a>
        </el-col>
        <el-col :span="12" style="text-align:right;">
          <el-button type="primary" size="mini" @click="saveUser">保存</el-button>
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
            <el-form-item label="登录账号" size="mini" prop="loginCode">
              <el-input v-model="detailForm.loginCode" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户名" size="mini" prop="userName">
              <el-input v-model="detailForm.userName" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码" size="mini" prop="password">
              <el-input
                v-model="detailForm.password"
                size="mini"
                show-password
                placeholder="不修改密码时请不要填写"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别" size="mini" prop="sex">
              <el-select v-model="detailForm.sex" placeholder="请选择" size="mini" style="width:100%">
                <el-option
                  v-for="item in [{'value':'1',label:'男'},{'value':'0',label:'女'}]"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" size="mini" prop="email">
              <el-input v-model="detailForm.email" size="mini">
                <template slot="append">
                  <svg-icon icon-class="email" />
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号" size="mini" prop="mobile">
              <el-input v-model="detailForm.mobile" size="mini">
                <template slot="append">
                  <i class="el-icon-mobile-phone" />
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话号" size="mini" prop="phone">
              <el-input v-model="detailForm.phone" size="mini">
                <template slot="append">
                  <i class="el-icon-phone" />
                </template>
              </el-input>
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
            <h5 class="dtl-title-line">权限信息</h5>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="管理员类型" size="mini" prop="mgrType">
              <el-select
                v-model="detailForm.mgrType"
                filterable
                placeholder="请选择"
                size="mini"
                style="width:100%;"
              >
                <el-option
                  v-for="item in mgrTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户类型" size="mini" prop="userType">
              <el-input v-model="detailForm.userType" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="归属Id" size="mini" prop="companyId" style="display:none;">
              <el-input v-model="detailForm.companyId" size="mini"></el-input>
            </el-form-item>
            <el-form-item label="归属公司" size="mini" prop="companyName">
              <el-input
                v-model="detailForm.companyName"
                size="mini"
                :readonly="true"
                @focus="chooseCompany"
              >
                <template slot="append">
                  <el-button slot="append" icon="el-icon-search" @click="chooseCompany"></el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="归属机构" size="mini" prop="officeIds">
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
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="角色" size="mini" prop="roleIdArr">
              <el-select
                v-model="detailForm.roleIdArr"
                multiple
                placeholder="请选择"
                size="mini"
                style="width:100%"
              >
                <el-option
                  v-for="item in roleOptions"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
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
            v-loading="companyDialog.table.loading"
            border
            highlight-current-row
            @current-change="currentRowChange"
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
    </el-card>
  </div>
</template>

<script>
import { getUser, saveUser } from "@/api/system/user";
import { getCompanyList } from "@/api/system/company";
import { getOfficeTree } from "@/api/system/office";
import { getRoleList } from "@/api/system/role";
import { constants } from "crypto";
import { getDictDataLists,getSubAreaById  } from "@/api/system/comm/comm";

export default {
   name:'UserDetail',
  data() {
    return {
      detailForm: {
        userId: "",
        officeIds: [],
        companyId: "",
        companyName: "",
        loginCode: "",
        userName: "",
        email: "",
        mobile: "",
        phone: "",
        userType: "",
        mgrType: "0",
        remarks: "",
        roleIdArr: [],
        password: "",
        sex: "",
        system: ""
      },
      props: {
        multiple: true,
        checkStrictly: true,
        showAllLevels: true,
        value: "id",
        label: "officeName",
        children: "childs"
      },
      roleOptions: [],
      cascaderOpts: [],
      rules: {
        companyName: [
        ],
        loginCode: [
          {
            required: true,
            message: "登录编号不能为空",
            trigger: ["blur", "change"]
          },
          {
            pattern: /^[a-zA-Z0-9!@#$%^&*?_-]{8,16}$/,
            message: "只能是字母，数字，以及常规字符。最小长度8,最大长度16",
            trigger: ["blur", "change"]
          }
        ],
        userName: [
          {
            required: true,
            message: "用户名不能为空",
            trigger: ["blur", "change"]
          }
        ],
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
            trigger: ["blur", "change"],
            min: 11,
            max: 11,
            message: "长度必须是11位",
            trigger: ["blur", "change"]
          }
        ],
        phone: [
          {
            min: 11,
            max: 11,
            message: "长度必须是11位",
            trigger: ["blur", "change"]
          }
        ],
        roleIdArr: [
          {
            required: true,
            message: "角色不能为空",
            trigger: ["blur", "change"]
          }
        ],
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          {
            min: 8,
            max: 15,
            message: "长度在 8 到 15 个字符",
            trigger: ["blur", "change"]
          }
        ],
        officeIds:[
          {
            type: "array",
            required: true,
            message: "请选择组织机构",
            trigger: ["blur", "change"]
          }
        ]
      },
      dict: {
        system: []
      },
      value1: [],
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
      mgrTypeOptions: [
        {
          value: "0",
          label: "非管理员"
        },
        {
          value: "1",
          label: "管理员"
        }
      ]
    };
  },
  created() {
    this.beforeLoading();
    let userId = this.$route.query.userId;
    if (userId) {
      this.getUserInfo(userId);
    }
  },
  methods: {
    beforeLoading() {
      getOfficeTree().then(response => {
        this.cascaderOpts = response.data;
      });
      getRoleList().then(response => {
        this.roleOptions = response.data;
      });
      //获取归属系统字典
      getDictDataLists("97001005").then(response => {
        this.dict.system = response.data.jq97001005;
      });
    },
    getUserInfo(userId) {
      getUser(userId).then(response => {
        var {
          userId,
          companyId,
          companyName,
          loginCode,
          userName,
          email,
          mobile,
          phone,
          userType,
          mgrType,
          remarks,
          password,
          sex,
          system
        } = response.data;
        var { officeFullPaths, roleIds } = response.data;
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
        // 角色回显
        var parentIdArr2 = roleIds.split(",");
        var temp2 = new Array();
        Object.keys(parentIdArr2).forEach(function(key) {
          if (Number(parentIdArr2[key]) > 0) {
            temp2.push(Number(parentIdArr2[key]));
          }
        });
        this.detailForm = {
          userId,
          companyId,
          companyName,
          loginCode,
          userName,
          email,
          mobile,
          phone,
          userType,
          mgrType,
          remarks,
          password,
          sex,
          officeIds: tempArr,
          roleIdArr: temp2,
          system
        };
      });
    },
    saveUser() {
      var {
        userId,
        companyId,
        loginCode,
        userName,
        email,
        mobile,
        phone,
        userType,
        mgrType,
        remarks,
        officeIds,
        roleIdArr,
        password,
        sex,
        system
      } = this.detailForm;
      var officeIdArr = new Array();
      if (officeIds && officeIds.length >= 1) {
        Object.keys(officeIds).forEach(function(key) {
          var officeFullPathArr = officeIds[key];
          officeIdArr.push(officeFullPathArr[officeFullPathArr.length - 1]);
        });
      }
      let roleIds = "";
      if (roleIdArr && roleIdArr.length >= 1) {
        roleIds = roleIdArr.join(",");
      }
      // 若果密码存在，则对密码进行加密操作
      if (password) {
        password = this.$encruption(password);
      }
      const user = {
        userId,
        companyId,
        loginCode,
        userName,
        email,
        mobile,
        phone,
        userType,
        mgrType,
        remarks,
        roleIds,
        officeIds: officeIdArr.join(","),
        password,
        sex,
        system
      };
      this.$refs["detailForm"].validate(valid => {
        if (!valid) {
          this.$message({
            type: "success",
            message: "请按照要求填写输入框 !"
          });
          return false;
        }
        saveUser(user).then(response => {
          this.detailForm.userId = response.data.userId;
          var msg = userId ? "更新成功" : "新增成功";
          this.$message({
            type: "success",
            message: msg
          });
        });
      });
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
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
      console.log(companyQuery);
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
      var selectedCompany = this.companyDialog.selectedTags[0];
      if (selectedCompany) {
        this.detailForm.companyId = selectedCompany.companyId;
        this.detailForm.companyName = selectedCompany.companyName;
      } else {
        this.detailForm.companyId = "";
        this.detailForm.companyName = "";
      }
    },
    sizeChange(val) {
      this.searchCompany();
    },
    currentChange(val) {
      this.searchCompany();
    },
    currentRowChange(newVal, oldVal) {
      if (oldVal) {
        this.companyDialog.selectedTags.splice(
          this.companyDialog.selectedTags.indexOf(oldVal),
          1
        );
      }
      if (newVal) {
        this.companyDialog.selectedTags.push(newVal);
      }
    },
    rowClick(row, column, event) {
      //当找不到元素时，执行操作
      if (this.companyDialog.selectedTags.indexOf(row) < 0) {
        this.companyDialog.selectedTags.push(row);
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
