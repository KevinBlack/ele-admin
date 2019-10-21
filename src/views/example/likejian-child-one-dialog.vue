<template>
  <div class="detailsContainer">
    <el-form ref="mainForm" :model="mainForm" label-width="100px" size="mini">
      <el-row :gutter="10">
        <el-col :span="24">
          <h5 class="dtl-title-line">基本信息</h5>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <!-- 写好一个col其他的知己复制粘贴 -->
        <el-col :span="24">
          <el-form-item label="备注" size="mini" prop="remark">
            <el-input
              v-model="mainForm.remark"
              size="mini"
              type="textarea"
              placeholder="请输入内容"
              maxlength="30"
              :rows="4"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" icon="el-icon-check" size="mini" @click="handleClose('ok')">保存</el-button>
      <el-button type="primary" icon="el-icon-close" size="mini" @click="handleClose('close')">取消</el-button>
    </div>
  </div>
</template>

<script>
import { createVId } from "@/utils/index.js";

export default {
  name: "ChildOneDialog",
  props: {
    // 传入对象，使用时和使用data对象里面的参数一样
    isShow: {
      type: [Boolean],
      required: true
    },
    saveMode: {
      type: [String],
      required: true,
      default: "add"
    },
    mid: {
      type: [Number, String],
      required: true
    },
    data: {
      type: [Object],
      required: false
    }
  },
  created() {
    this.initForm();
  },
  watch: {
    'isShow': function(val, oldVal) {
      if (val) {
        this.initForm();
      }
    }
  },
  data() {
    return {
      //表单初始值
      mainForm: {
        id: "",
        mid: "",
        vId: "",
        remark: ""
      }
    };
  },
  methods: {
    initForm() {
       if (this.saveMode == "add") {
          console.log("add");
          this.mainForm.id = "";
          this.mainForm.remark = "";
          this.mainForm.mid = Number(this.mid);
          this.mainForm.vId = createVId();
        } else {
          console.log("update");
          console.log(JSON.parse(JSON.stringify(this.data)))
          this.mainForm = JSON.parse(JSON.stringify(this.data));
        }
    },
    handleClose(command) {
      //将数据传递给外部的@closeDalog对应的函数
      this.$emit(
        "closeDalog",
        command,
        JSON.parse(JSON.stringify(this.mainForm))
      );
    }
  }
};
</script>

<style scoped>
* {
  font-weight: normal;
}
.detailsContainer {
  margin: 0;
}
.dtl-title-line {
  display: inline-block;
  border-left: 3px solid #409eff;
  padding-left: 5px;
}
.el-table__fixed-right::before {
  background-color: none;
}
.dialog-footer {
  border-top: 1px solid #e6e6e6;
  margin-top: 30px;
  padding-top: 10px;
  text-align: right;
}
</style>
