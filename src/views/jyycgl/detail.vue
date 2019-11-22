<template>
  <el-card class="detailsContainer">
    <el-row style="border-bottom: 1px solid #e6e6e6;margin-bottom: 20px;padding-bottom:10px;">
      <el-col :span="12">
        <a href="javascrip:;" style="color: #409EFF"><i class="el-icon-back" style="color: #409EFF;margin-right: 5px;c" />返 回</a> | <a href="javascript:;" @click="handleShow">{{ showTitle }}</a>
      </el-col>
      <el-col :span="12" style="text-align:right;">
          <el-button type="primary" size="mini" @click="saveAbnormalOperation" v-if="!prohibit" >保存</el-button>
      </el-col>
    </el-row>
    <!-- part1 -->
    <el-row :gutter="10">
      <el-col :span="24">
        <h5 class="dtl-title-line">基本信息</h5>
      </el-col>
    </el-row>
    <el-form 
      ref="detailForm" 
      :model="detailForm"
      label-width="110px" 
      size="mini" 
      :rules="rules">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="企业名称" prop="companyName">
            <el-input v-model="detailForm.companyName"  :readonly="prohibit"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="列入日期" prop="inclusionTime">
            <el-date-picker
              v-model="detailForm.inclusionTime"
              type="date"
              :readonly="prohibit"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="执行单位" prop="implementedBy">
            <el-input v-model="detailForm.implementedBy"  :readonly="prohibit"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="执行时间" prop="executionTime">
            <el-input v-model="detailForm.executionTime"  :readonly="prohibit"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="列入名录原因" prop="inclusionDirectoryReason">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4}"
              placeholder="请输入内容"
              v-model="detailForm.inclusionDirectoryReason"
               :readonly="prohibit">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="prohibit">
        <el-col :span="12">
          <el-form-item label="是否经营异常" prop="status">
              <el-radio v-model="detailForm.status" label="0" :disabled="prohibit">异常</el-radio>
              <el-radio v-model="detailForm.status" label="1" :disabled="prohibit">非异常</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="移出时间" prop="removeTime">
            <el-date-picker
              v-model="detailForm.removeTime"
              type="date"
              :readonly="prohibit"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="prohibit">
        <el-col :span="24">
          <el-form-item label="移出名录原因" prop="removeDirectoryReason">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4}"
              placeholder="请输入内容"
              v-model="detailForm.removeDirectoryReason"
               :readonly="prohibit">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
        
    <el-dialog :title="showTitle" :visible.sync="isShow" width="70%">
      <pop-tab />
    </el-dialog>
  </el-card>
</template>

<script>
import {getAbnormal,saveAbnormalOperation} from "@/api/jyycgl/input.js";

export default {
  data() {
    return {
      isShow: false,
      showTitle: '经营异常-新增',
      prohibit: false,
      detailForm: {
        id:'',
        companyName: '',
        inclusionTime: '',
        inclusionDirectoryReason:'',
        implementedBy:'',
        executionTime:'',
        removeDirectoryReason:'',
        removeTime:'',
        status:'',
      },
      rules: {
        companyName: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        inclusionTime: [
          { required: true, message: "不能为空" ,trigger: "blur" }
        ],
        inclusionDirectoryReason: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        implementedBy: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        executionTime: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        status: [
          { required: true, message: "不能为空", trigger: "blur" }
        ]
      },
    }
  },
  created() {
    let abnormalId=this.$route.query.id;
    if (abnormalId) {
      this.showTitle = "经营异常-编辑";
      this.getAbnormal(abnormalId);
    } else {
      this.showTitle = "经营异常-新增";
    }
    if(this.$route.query.readonly){
      this.rules={}
      this.prohibit=this.$route.query.readonly;
      this.showTitle='经营异常-查看详情';
    }
  },
  methods: {
    getAbnormal(abnormalId) {
      getAbnormal(abnormalId).then(response => {
        this.detailForm = response.data;
      });
    },
    saveAbnormalOperation(){
      this.$refs["detailForm"].validate(valid => {
        if (valid) {
          //数据校验成功
          saveAbnormalOperation(this.detailForm).then(response => {
            if (response.data) {
              //保存成功
              this.$message({
                type: "success",
                message: "保存成功"
              });
              this.$router.push({
                path: "/abnormal-operation-manage/abnormal-operation-query",query: {}
              });
            } else {
              //保存失败
              this.$message({
                type: "success",
                error: "保存失败"
              });
            }
          });
        } else {
          //校验失败
          this.$message({
            message: "请正确录入页面数据",
            type: "warning"
          });
        }
      });
    },

    handleShow() {
      this.isShow = true
    }
  }
}
</script>

<style scoped>
*{
  font-weight: normal;
}
.detailsContainer {
  margin: 0 10px;
}
.dtl-title-line {
  display: inline-block;
  border-left: 3px solid #409EFF;
  padding-left: 5px;
}

</style>
