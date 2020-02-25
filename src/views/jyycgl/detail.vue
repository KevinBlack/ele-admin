<template>
  <el-card class="detailsContainer">
    <!-- part1 -->
    <el-row :gutter="10">
      <el-col :span="24">
        <h5 class="dtl-title-line">基本信息</h5>
      </el-col>
    </el-row>
    <el-form 
      ref="detailForm" 
      :model="detailForm"
      label-width="130px" 
      size="mini" 
      :rules="rules">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="企业名称" prop="companyName" :readonly="true">
            <el-input v-model="detailForm.companyName" filterable placeholder="请选择" :readonly="true">
              <el-button slot="append" icon="el-icon-search" @click="showSelect()" v-if="!prohibit"/>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="企业统一信用代码" prop="companyCode" :readonly="true">
            <el-input v-model="detailForm.companyCode" :readonly="true">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="执行单位" prop="implementedBy">
            <el-input v-model="detailForm.implementedBy"  :readonly="prohibit"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="执行时间" prop="executionTime">
            <el-date-picker
              v-model="detailForm.executionTime"
              type="date"
              :readonly="prohibit"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
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
        <el-col :span="24">
          <el-form-item label="列入名录原因" prop="inclusionDirectoryReason">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4}"
              placeholder="请输入列入名录原因"
              v-model="detailForm.inclusionDirectoryReason"
              maxlength="100"
              show-word-limit
               :readonly="prohibit">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="列入备注" prop="inclusionRemark">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4}"
              placeholder="请输入备注"
              v-model="detailForm.inclusionRemark"
               :readonly="prohibit"
              show-word-limit
              maxlength="200">
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
      <el-row :gutter="20" v-if="prohibit">
        <el-col :span="24">
          <el-form-item label="移出备注" prop="removeRemark">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4}"
              placeholder="请输入备注"
              v-model="detailForm.removeRemark"
               :readonly="prohibit"
              show-word-limit
              maxlength="200">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row>
      <el-col :span='24' class="btn_bottom">
        <el-button v-show="btnShow('10002020108010')" v-if="!prohibit" type="primary" size="mini" @click="saveAbnormalOperation" >保存</el-button>
      </el-col>
    </el-row>  
     <!-- 弹框区 -->
  <el-dialog title="选择企业" :visible.sync="isShowSelect">
    <company-query 
    :fdmsg="memberForm"
    :fdshow3="isShowSelect"
    @closeDalogPay="closeSelect" />
  </el-dialog>  
  </el-card>
</template>

<script>
import {getAbnormal,saveAbnormalOperation} from "@/api/jyycgl/input.js";
import CompanyQuery from "./company-query"
export default {
  components: { CompanyQuery },
  data() {
    return {
      btns: this.$store.getters.btns['100020201080'],
      isShow: false,
      showTitle: '经营异常-新增',
      prohibit: false,
      detailForm: {
        id:'',
        companyName: '',
        inclusionTime: new Date(),
        companyCode: '',
        inclusionDirectoryReason:'',
        implementedBy:'中国航空运输协会',
        executionTime:'',
        removeDirectoryReason:'',
        removeTime:'',
        status:'',
        inclusionRemark:'',
        removeRemark:'',
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
      isShowSelect: false,
      memberForm: '',
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
    //data中这个不能少：btns: this.$store.getters.btns['100010'],
    btnShow(menuCode) {
      //根据用户所具有的菜单项控制
      var btns = this.btns;
      if (btns && btns.length > 0) {
        for (var i = 0; i < btns.length; i++) {
          if (menuCode === btns[i]) {
            return true;
          }
        }
      }
      return false;
    },
    btnDisplay(status) {
      //根据具体业务数据控制 
      if (status == "10") {
        return true;
      }
      return false;
    },
    showSelect() {
      this.isShowSelect = true
    },
    closeSelect(chiledArr, fdshow) {
      if (chiledArr.length <= 0) {
        this.$notify({
          title: '提示',
          message: '请选择数据',
          type: 'warning',
          duration: 2000
        })
      } else {
        this.detailForm.companyName = chiledArr.businessName
        this.detailForm.companyCode = chiledArr.socialCode
      }
      this.isShowSelect = fdshow
    },
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
