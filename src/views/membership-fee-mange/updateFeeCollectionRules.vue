<template>
  <el-card class="detailsContainer">
    <el-row>
      <!-- 系统消息录入 -->
      <el-row :gutter="10">
        <el-col :span="24">
          <h5 class="dtl-title-line">会员规则修改</h5>
        </el-col>
      </el-row>

      <el-form ref="formQuery" :model="formQuery" label-width="135px" size="mini" :rules="rules1" >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="会员类别" prop="memberType">
               <el-select v-model="formQuery.memberType" filterable placeholder="请选择" size="mini" style="width:100%">
                  <el-option
                    v-for="item in memberTypeOptions"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
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
                    :key="item.key"
                    :label="item.value"
                    :value="item.key"
                  ></el-option>
                </el-select>
              </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="会员费用标椎(元)" prop="memberFeeBz">
              <el-input v-model="formQuery.memberFeeBz" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 按钮区 -->
      <el-row :gutter="10">
        <el-col :span="24" class="btn_bottom">
          <el-button type="primary" size="mini" @click="update">保存</el-button>
        </el-col>
      </el-row>
    </el-row>
  </el-card>
</template>

<script>
import { getFeeInfoById,updateMemberFeeInfo } from "@/api/hxxd/membership-fee-mange";
import { getDictDataLists, getDictDataList } from "@/api/system/comm/comm";
import { getDictName } from "@/utils/index.js";
export default {
  data() {
    return {
      formQuery: {
        memberType: "",
        memberDj: "",
        memberZk: "",
        memberFeeBz: "",
      },
      memberTypeOptions: [],
      memberDjOptions: [],
      rules1: {
        memberType: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        memberDj: [{ required: true, message: "不能为空" }],
        memberZk: [
          { required: true, pattern: /^([0-9](\.[0-9]+)?|10)$/ , message: "请输入正确的值", trigger: "blur" }
        ],
        memberFeeBz: [
          { required: true, pattern: /^[-+]?\d*[.]?\d{2}$/, message: "请输入数字", trigger:["blur", "change"] }
        ]
      }
    };
  },
  created(){
    let id = this.$route.query.id;
    console.log(id)
    if (id) {
      this.getMessageById(id);
    }
  //加载字典
    this.beforeLoading();
  },
  methods: {
    beforeLoading() {
      getDictDataLists("97001014").then(response => {
        this.memberTypeOptions = response.data.jq97001014;
      });
      getDictDataLists("97001015").then(response => {
        this.memberDjOptions = response.data.jq97001015;
      });
    },
    //系统信息保存
    update() {
      this.$refs["formQuery"].validate(valid => {
        if (!valid) {
          this.$message({
            type: "failure",
            message: "请按照要求填写相关内容 !"
          });
          return false;
        }
      updateMemberFeeInfo(this.formQuery).then(response => {
        var msg = response.status == 200 ? "修改成功" : "修改失败";
        if (response.status == 200) {
          //保存成功
          this.$message({
            type: "success",
            message: msg
          });
          this.$router.push({ path: "/membership-fee-manage/fee-collection-rules-manage",query: {} });
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
    //系统消息查询
    getMessageById(id) {
      var id = id;
      getFeeInfoById(id).then(response => {
        this.formQuery = response.data;
      });
    }
  }
};
</script>
<style>
@import '~@/styles/hxxd.scss';
</style>
