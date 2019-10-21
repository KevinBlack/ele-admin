<template>
  <div>
    <el-card style="width: 90%;margin: auto;padding: 20px 0;">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="文本校验" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="数字校验" prop="number">
              <el-input v-model.number="ruleForm.number"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="下拉校验" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择子项">
                <el-option label="子项一" value="shanghai"></el-option>
                <el-option label="子项二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="时间校验" required>
              <el-col :span="11">
                <el-form-item prop="date1">
                  <el-date-picker
                    type="date"
                    placeholder="选择日期"
                    v-model="ruleForm.date1"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" style="padding-left: 18px;" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="date2">
                  <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="复选校验" prop="type">
              <el-checkbox-group v-model="ruleForm.type">
                <el-checkbox label="选项一" name="type"></el-checkbox>
                <el-checkbox label="选项二" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单选校验" prop="resource">
              <el-radio-group v-model="ruleForm.resource" @change="checkReq">
                <el-radio label="选项A"></el-radio>
                <el-radio label="选项B"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="邮箱校验" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话校验" prop="phone">
              <el-input v-model.number="ruleForm.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="段落校验" prop="desc">
              <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="正则校验" prop="regVali">
              <el-input type="textarea" v-model="ruleForm.regVali"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item size="mini">
              <el-button
                type="primary"
                @click="submitForm('ruleForm')"
                v-show="btnShow('100010')"
                v-if="btnDisplay('10')"
              >btn显示控制</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { isvalidPhone } from "@/utils/validate";

var validPhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入电话号码"));
  } else if (!isvalidPhone(value)) {
    callback(new Error("请输入正确的11位手机号码"));
  } else {
    callback();
  }
};
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        number: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        regVali: ""
      },
      //btns: this.$store.getters.btns['100010'],
      btns: ["100010", "100020"],
      rules: {
        name: [
          { required: true, message: "请输入", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        number: [
          { required: true, message: "不能为空" },
          { type: "number", message: "必须为数字值" }
        ],
        region: [{ required: true, message: "请选择", trigger: "change" }],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择一个", trigger: "change" }
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phone: [{ required: true, trigger: "blur", validator: validPhone }],
        desc: [{ required: true, message: "请填写", trigger: "blur" }],
        regVali: [
          {
            pattern: /^[a-zA-Z0-9_-]{4,16}$/,
            message: "格式不正确",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  created() {},
  methods: {
    //data中这个不能少：btns: this.$store.getters.btns['100010'],
    btnShow(menuCode) {
      //根据用户所具有的菜单项控制
      for (var i = 0; i < this.btns.length; i++) {
        if (menuCode === this.btns[i]) {
          return true;
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
    checkReq(value) {
      if (value === "选项A") {
        this.rules.phone[0].required = false;
      } else if (value === "选项B") {
        this.rules.phone[0].required = true;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("提交成功!");
        } else {
          console.log("提交失败!");
          return false;
        }
      });
    },
    handleOperate(formName) {
      this.$refs[formName].resetFields();
    },
    query() {
      console.log("333");
    }
  }
};
</script>

<style>
</style>
