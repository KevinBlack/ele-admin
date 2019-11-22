<template>

   <el-card class="detailsContainer">
    <el-row>
      <!-- 系统消息录入 -->
      <el-row :gutter="10">
        <el-col :span="24">
          <h5 class="dtl-title-line">投诉复审</h5>
        </el-col>
      </el-row>
      <el-form ref="formQuery" :model="formQuery" label-width="100px"  size="mini" >
        <el-row :gutter="20">
          <el-col :span="4">&nbsp;</el-col>
          <el-col :span="16">
            <el-row>
              <el-col>
                <el-form-item label="审核状态" prop="examineStatus">
                  <el-select v-model="formQuery.examineStatus" filterable placeholder="请选择" size="mini" style="width:100%">
                    <el-option
                      v-for="item in statusOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col>
                <el-form-item label="审核描述" prop="complaintsContents">
                  <el-input type="textarea" :rows="4" v-model="formQuery.auditReason" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4">&nbsp;</el-col>
          <el-col class="btn_bottom">
              <el-button type="primary" icon="el-icon-check" @click="saveComplainExamine">提 交</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
  </el-card>
</template>

<script>
import { examine ,selectComplainInfoAndProcessingById} from "@/api/hxxd/complaintInfo";
export default {
  data() {
    return {
      formQuery: {
        id: "",
        examineStatus: "",
        auditReason: ""
      },
       statusOptions: [
        {
          value: '30',
          label: "审核通过"
        },
        {
          value: '15',
          label: "驳回"
        }
      ]
    }
  },
  created(){
    this.formQuery.id = this.$route.query.id
  },
  methods: {
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
      })
    },
    saveComplainExamine(){
      examine(this.formQuery).then(response => {
        if(response.data){
            this.$message({
                    message: "复审成功"
             });
        }else {
            this.$message({
                    message: "复审失败"
             });
        }

      })
    }
  }
};
</script>
<style>
@import '~@/styles/hxxd.scss';
</style>
