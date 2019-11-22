<template>
  <el-card class="detailsContainer">
    <el-row>
      <!-- 系统消息录入 -->
      <el-row :gutter="10">
        <el-col :span="24">
          <h5 class="dtl-title-line">会员规则添加</h5>
        </el-col>
      </el-row>

      <el-form
        ref="formQuery"
        :model="formQuery"
        label-width="135px"
        size="mini"
        :rules="rules1"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="会员类别" prop="memberType">
               <el-select v-model="formQuery.memberType" filterable placeholder="请选择" size="mini" style="width:100%">
                  <el-option
                    v-for="item in memberTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="会员折扣(折)" prop="memberZk">
              <el-input v-model="formQuery.memberZk" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="会员等级" size="mini" prop="memberDj">
               <el-select v-model="formQuery.memberDj" filterable placeholder="请选择" size="mini" style="width:100%">
                  <el-option
                    v-for="item in memberDjOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="会员费用标准(元)" prop="memberFeeBz">
              <el-input v-model="formQuery.memberFeeBz" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 按钮区 -->
      <el-row :gutter="10">
        <el-col :span="24" class="btn_bottom">
          <el-button type="primary" size="mini" @click="save">保存</el-button>
          <el-button type="primary" size="mini" @click="resetForm('formQuery')">重置</el-button>
        </el-col>
      </el-row>
    </el-row>
  </el-card>
</template>

<script>
import { insertMemberFeeInfo } from "@/api/hxxd/membership-fee-mange";
export default {
  data() {
    return {
      formQuery: {
        memberType: "",
        memberDj: "",
        memberZk: "",
        memberFeeBz: "",
      },
      memberTypeOptions: [
        {
          value: '1',
          label: '航空公司'
        },
        {
          value: '2',
          label: '销售代理人'
        }
      ],
      memberDjOptions: [
        {
          value: '1',
          label: '一级会员'
        },
        {
          value: '2',
          label: '二级会员'
        }
      ],
      rules1: {
        memberType: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        memberDj: [{ required: true, message: "不能为空" }],
        memberZk: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        memberFeeBz: [
          { required: true, message: "不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //系统信息保存
    save() {
      this.$refs["formQuery"].validate(valid => {
        if (!valid) {
          this.$message({
            type: "failure",
            message: "请按照要求填写相关内容 !"
          });
          return false;
        }
      //数据校验成功
      insertMemberFeeInfo(this.formQuery).then(response => {
        var msg = response.status == 200 ? "保存成功" : "保存失败";
        if (response.status == 200) {
          //保存成功
          this.$message({
            type: "success",
            message: msg
          });
        } else {
          //保存失败
          this.$message({
            message: msg
          });
          console.log(response.message);
        }
      });
      });
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
  }
};
</script>
<style>
 @import '~@/styles/hxxd.scss';
</style>
