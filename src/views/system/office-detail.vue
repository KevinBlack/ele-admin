<template>
  <div class="app-container">
    <el-card class="box-card" style="height:60px">
      <span>{{title}}</span>
      <!-- <el-divider direction="vertical"></el-divider> -->
    </el-card>
    <el-card class="box-card">
      <div class="title-cls">基本信息</div>
      <el-card class="box-card" style="padding:15px;border-radius:0px;">
        <el-form ref="detailForm" :model="detailForm" label-width="150px" :rules="rules">
          <el-row>
             <el-col :span="12" style="display:none">
              <el-form-item label="机构编号" size="mini" prop="officeId">
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
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="机构全称" size="mini" prop="officeFullName">
                <el-input v-model="detailForm.officeFullName" size="mini"></el-input>
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
                <el-button type="primary" icon="el-icon-check" @click="saveOffice">保存</el-button>
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
import { getOffice, saveOffice, getOfficeTree,getSortNo } from "@/api/office";
import { toPinYinUppercase } from "@/api/comm/comm";

export default {
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
        remarks: ""
      },
      props: {
        checkStrictly: true,
        expandTrigger: "hover",
        value: "id",
        label: "officeName",
        children: "childs"
      },
      cascaderOpts: [],
      rules: {
        officeCode: [
          { required: true, message: "机构编码不能为空", trigger: ['blur', 'change'] }
        ],
        officeName: [
          { required: true, message: "机构名称不能为空", trigger: ['blur', 'change'] }
        ],
        treeSort: [
          { required: true, message: "排序号不能为空", trigger: ['blur', 'change'] },
          { type: "number", message: "排序号必须为数字值" }
        ]
      }
    };
  },
  created() {
    this.getCascaderOpts();
    // 参数传递 router.push({ path: 'register', query: { plan: 'private' }})
    // 参数接受 let id = this.$route.query.jId;
    let officeId = this.$route.query.officeId;
    if (officeId) {
      this.title = "编辑机构";
      this.getOfficeInfo(officeId);
    } else {
      this.title = "新建机构";
    }
    // 添加下级菜单时，此处不为空
    var arr = new Array();
    if (this.$route.query.parentIds) {
      var parentIdArr = (this.$route.query.parentIds || "").split(",");
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
    if(arr.length>0){
        this.getTreeSortNo(arr[arr.length-1])
    }
  },
  methods: {
    getCascaderOpts() {
      getOfficeTree().then(response => {
        this.cascaderOpts = response.data;
      });
    },
    getOfficeInfo(officeId) {
      getOffice(officeId).then(response => {
        this.detailForm = response.data;              
        var parentIds = response.data.parentIds;
        if (parentIds) {
          var arr = new Array();
          var parentIdArr = parentIds.split(",");
          Object.keys(parentIdArr).forEach(function(key) {
            if (parseInt(parentIdArr[key])) {
              arr.push(parseInt(parentIdArr[key]));
            }
          });
          this.detailForm.parentIds = arr;
        }
      });
    },
    saveOffice() {
      const {
        officeId,
        parentIds,
        officeCode,
        officeName,
        officeFullName,
        treeSort,
        remarks
      } = this.detailForm;
      let parentIdsStr = "";
      if (parentIds && parentIds.length >= 1) {
        parentIdsStr = parentIds.join(",");
      }
      saveOffice({
        officeId,
        parentIds: parentIdsStr,
        officeCode,
        officeName,
        officeFullName,
        treeSort,
        remarks
      }).then(response => {
        var msg = officeId ? "更新成功" : "新增成功";
        this.$message({
          type: "success",
          message: msg
        });
        this.detailForm.officeId = response.data.officeId;
      });
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    officeNameChange(val){
      if(val){
      toPinYinUppercase(val).then(response => {
          this.detailForm.officeCode = response.data.pinyin;
        });
      }
    },
    getTreeSortNo(parentId){
      console.log(parentId)
      if(parentId){
        getSortNo(parentId).then(response => {
          this.detailForm.treeSort = response.data;
        });
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
</style>
