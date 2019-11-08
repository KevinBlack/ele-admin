<template>

   <el-card class="detailsContainer">
    <el-row>
      <!-- 系统消息录入 -->
      <el-row :gutter="10">
        <el-col :span="24">
          <h5 class="dtl-title-line">投诉详情查看</h5>
        </el-col>
      </el-row>
      <el-form ref="formQuery" :model="formQuery" label-width="100px" disabled size="mini" >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="投诉内容" prop="complaintsContents">
              <el-input v-model="formQuery.complaintsContents" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="投诉人" prop="complainant">
              <el-input v-model="formQuery.complainant" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="投诉公司" prop="complaintType">
              <el-input v-model="formQuery.complaintType" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="处理人" prop="handlePerson">
              <el-input v-model="formQuery.handlePerson" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-select v-model="formQuery.status" filterable placeholder="请选择" size="mini" style="width:100%">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="remarks">
              <el-input v-model="formQuery.remarks" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
  </el-card>
</template>

<script>
import { selectComplainInfoAndProcessingById } from "@/api/hxxd/complaintInfo";
export default {
  data() {
    return {
      formQuery: {
        complaintsContents: "",
        complainant: "",
        status: "",
        remark: "",
        complaintType: "",
        handlePerson: ""
      },
       statusOptions: [
        {
          value: 0,
          label: "未处理"
        },
        {
          value: 1,
          label: "已处理"
        }
      ]
    }
  },
  created(){
    let id = this.$route.query.id
    console.log(id)
    if (id) {
      this.getMessageById(id)
    }
  },
  methods: {
    //系统消息查询
    getMessageById(id) {
      var id = id;
      selectComplainInfoAndProcessingById(id).then(response => {
        console.log(response)
        this.formQuery = response.data
      })
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
      })
    },
  }
};
</script>
<style>
@import '../../styles/hxxd.scss';
</style>
