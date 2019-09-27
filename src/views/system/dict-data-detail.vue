<template>
  <div >
    <el-card class="box-card" style="margin: 0 10px;">
      <div class="title-cls">基本信息</div>
      <el-card class="box-card" style="padding:15px;border-radius:0px;">
        <el-form ref="detailForm" :model="detailForm" label-width="150px" :rules="rules">
         <el-row>
            <el-col :span="24">
              <el-form-item label="字典键" size="mini" prop="key">
                <el-input v-model="detailForm.key" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="字典值" size="mini" prop="value">
                <el-input v-model="detailForm.value" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="系统字典" size="mini" prop="isSys">
                <el-radio-group v-model="detailForm.isSys" size="mini">
                  <el-radio :label="0" >否</el-radio>
                  <el-radio :label="1" >是</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
			<el-col :span="12">
              <el-form-item label="状态" size="mini" prop="status">
                <el-switch
                  v-model="detailForm.status"
                  active-text="启用"
                  inactive-text="停用"
                ></el-switch>
              </el-form-item>
            </el-col>
			<el-col :span="24">
              <el-form-item label="排序号" size="mini" prop="treeSort">
                <el-input v-model="detailForm.treeSort" size="mini"></el-input>
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
                <el-button type="primary" icon="el-icon-check" @click="saveDict">保存</el-button>
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
import { getDictData, saveDictData } from "@/api/system/dict";

export default {
  data() {
    return {
      detailForm: {
		id: "",
		dictId: "",
        key: "",
        value: "",
		isSys: 0,
		treeSort:"",
		remarks: "",
		status:true
      },
      rules: {
        // menuCode: [
        //   { required: true, message: "机构编码不能为空", trigger: "blur" }
        // ],
        // menuName: [
        //   { required: true, message: "机构名称不能为空", trigger: "blur" }
        // ],
        // treeSort: [
        //   { required: true, message: "排序号不能为空", trigger: "blur" },
        //   { type: "number", message: "排序号必须为数字值" }
        // ],
        // menuType: [
        //   { required: true, message: "菜单不能为空", trigger: "blur" }
        // ]
      }
    };
  },
  created() {
    let id = this.$route.query.id;
    if (id) {
      this.getDictDataInfo(id);
	} 
	let dictId = this.$route.query.dictId;
    if (dictId) {
      	this.detailForm.dictId=dictId;
    } 
  },
  methods: {
    getDictDataInfo(id) {
      getDictData(id).then(response => {
		this.detailForm = response.data;
		this.detailForm.status=(response.data.status==0)
      });
    },
    saveDict() {
	  var id=this.detailForm.id
	  var {
        id,
		dictId,
        key,
        value,
		isSys,
		treeSort,
		remarks,
		status
	  }=this.detailForm
	  var statusVal=status?0:1
      saveDictData({
        id,
		dictId,
        key,
        value,
		isSys,
		treeSort,
		remarks,
		status:statusVal
	  }).then(response => {
        var msg = id ? "更新成功" : "新增成功";
        this.$message({
          type: "success",
          message: msg
        });
        this.detailForm.id = response.data.id;
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
