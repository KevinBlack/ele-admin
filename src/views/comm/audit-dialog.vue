<template>
  <div class="detailsContainer">
    <!-- part1 -->
    <el-form
      ref="auditForm"
      :model="auditForm"
      label-width="80px"
      size="mini"
      :rules="auditFormRules"
    >
      <el-row :gutter="20" class="area_border">
        <el-col :span="24">
          <el-form-item label="审核类型" size="mini" prop="status">
            <el-select
              v-model="auditForm.auditType"
              size="mini"
              style="width:100%"
              :disabled="true"
            >
              <el-option
                v-for="item in auditFormOptions.auditType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="审核原因" size="mini" prop="auditReason">
            <el-input
              v-model="auditForm.auditReason"
              size="mini"
              type="textarea"
              :rows="6"
              maxlength="500"
              show-word-limit
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
export default {
  name: "AuditDialog",
  props: {
    // 传入对象，使用时和使用data对象里面的参数一样
    isShow: {
      type: [Boolean],
      required: true
    },
    auditType: {
      // 1 审核通过 2 审核不通过
      type: [String],
      required: true,
      default: ""
    }
  },
  watch: {
    isShow: function(val, oldVal) {
      this.initForm();
    }
  },
  created() {
    this.initForm();
  },
  data() {
    return {
      //表单参数
      auditForm: {
        auditType: "1",
        auditReason: ""
      },
      auditFormOptions: {
        auditType: [
          { value: "1", label: "审核通过" },
          { value: "2", label: "审核不通过" }
        ]
      },
      auditFormRules: {
        auditReason: [
          {
            required: false,
            message: "请填写审核原因",
            trigger: ["change"]
          }
        ]
      }
    };
  },
  methods: {
    initForm() {
      //清空审核原因，防止数据缓存
      this.auditForm.auditType = this.auditType;
      this.auditForm.auditReason = "";
      if (this.auditType === "1") {
        this.auditFormRules.auditReason[0].required = false;
      } else if (this.auditType === "2") {
        this.auditFormRules.auditReason[0].required = true;
      }
    },
    handleClose(command) {
      var goNext = false;
      if (command == "ok") {
        this.$refs["auditForm"].validate(valid => {
          if (valid) {
            goNext = true;
            return true;
          } else {
            return false;
          }
        });
      } else {
        goNext = true;
      }
      if (goNext) {
        var data = JSON.parse(JSON.stringify(this.auditForm));
        this.$emit("callBack", command, data);
      }
    }
  }
};
</script>

<style scoped>
* {
  font-weight: normal;
}
.detailsContainer {
  margin: 0 10px;
}
.dtl-title-line {
  display: inline-block;
  border-left: 5px solid #409eff;
  padding-left: 5px;
}
.el-table__fixed-right::before {
  background-color: none;
}
.dtl-info-line {
  height: 40px;
  line-height: 40px;
  margin: 10px auto;
  border-radius: 3px;
  font-size: 12px;
  box-sizing: border-box;
  padding-left: 10px;
  color: #000;
  background-color: #dcecfd;
}
.el-table > th {
  background-color: #eee !important;
}
.area_border,
.area_bordes {
  box-sizing: border-box;
  border: 1px solid #e6e6e6;
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding: 10px 0 0 0;
  margin-bottom: 20px;
  overflow: hidden;
}
.area_bordes {
  padding: 10px;
  margin-top: 15px;
}
/* 标题下线和 保存取消上部线 样式 */
.dialog-footer {
  border-top: 1px solid #e6e6e6;
  margin-top: 30px;
  padding-top: 10px;
  text-align: right;
}
</style>
