<template>
  <div>
    <el-card class="detailsContainer">
      <el-row style="border-bottom: 1px solid #e6e6e6;margin-bottom: 20px;padding-bottom:10px;">
        <el-col :span="12">
          <a href="javascript:;">退会申请详情</a>
        </el-col>
        <el-col :span="12" style="text-align:right;">
          <el-button type="primary" size="mini" @click="save" v-show="btnShow('10002060305010')" v-if="btnDisplay('10,15')">保存</el-button>
          <el-button type="primary" size="mini" @click="submit" v-show="btnShow('10002060305020')" v-if="btnDisplay('10,15')">提交</el-button>
        </el-col>
      </el-row>

      <el-form
        ref="mainForm"
        :model="mainForm"
        label-width="110px"
        size="mini"
        :rules="mainFormRules"
      >
        <!-- 第一块分组 -->
        <el-row :gutter="10">
          <el-col :span="24">
            <h5 class="dtl-title-line">退会信息</h5>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="申请编号" size="mini" prop="code">
              <el-input v-model="mainForm.code" size="mini" :readonly="true"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="会员证书编号" size="mini" prop="memberCertNo">
              <el-input v-model="mainForm.memberCertNo" size="mini"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="退会原因类型" size="mini" prop="exitType">
              <el-select
                v-model="mainForm.exitType"
                filterable
                clearable
                placeholder="请选择"
                size="mini"
                style="width:100%"
              >
                <el-option
                  v-for="item in dict.exitType"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="状态" size="mini" prop="status">
              <el-select v-model="mainForm.status" size="mini" style="width:100%" :disabled="true">
                <el-option
                  v-for="item in mainFormOptions.status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="其他原因" size="mini" prop="exitReason">
              <el-input
                v-model="mainForm.exitReason"
                size="mini"
                type="textarea"
                :rows="4"
                maxlength="500"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="24">
            <h5 class="dtl-title-line">附件</h5>
          </el-col>
        </el-row>
        <!-- 按钮区域 -->
        <el-row class="area_bordes" v-if="btnDisplay('10,15')">
          <el-col :span="24">
            <el-button-group size="mini">
              <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleFileAdd" v-show="btnShow('10002060305030')" >新增</el-button>
              <el-button
                type="primary"
                icon="el-icon-delete"
                size="mini"
                @click="handleFileDelete"
                v-show="btnShow('10002060305040')"
              >删除</el-button>
            </el-button-group>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col>
            <el-card class="box-card" shadow="never" :body-style="{ minHeight: '300px' }">
              <el-table
                ref="attachTable"
                :data="attachTableData"
                border
                tooltip-effect="dark"
                style="width: 100%;margin-bottom:20px;"
                @selection-change="attachTableSelectChange"
              >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="fileName" label="文件名" align="center"></el-table-column>
                <el-table-column label="下载" align="center" width="150">
                  <template slot-scope="scope">
                    <el-button type="text" @click="downloadFile(scope.row.id)">下载</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
        </el-row>
      </el-form>
      <!-- 附件上传弹框 -->
      <el-dialog :visible.sync="fileUploadDialog.show" title="附件上传" width="50%">
        <SysFileUploadDialog
          :isShow="fileUploadDialog.show"
          :limit="fileUploadDialog.limit"
          @closeDalog="closeFileUploadDialog"
        />
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
// 引入axios
import {
  memberExitApply,
  submitMemberExit,
  getMemberExit,
  getMemberExitByType
} from "@/api/hxxd/memberExit";
import {
  getDictDataLists,
  listFile,
  downloadFile,
  getValidateCode
} from "@/api/system/comm/comm";
import { getDictName, strToArr, makeCode } from "@/utils/index.js";
import SysFileUploadDialog from "@/views/comm/sys-file-upload-dialog";

import { getToken } from "@/utils/auth";

export default {
  name: "MembershipExitApplyDetail",
  components: { SysFileUploadDialog },
  data() {
    return {
      fileUploadDialog: {
        show: false,
        limit: 3
      },
      //表单对应下拉字典
      mainFormOptions: {
        exitType: [
          { value: "1", label: "韧性" },
          { value: "0", label: "就是想退会" }
        ],
        status: [
          { value: "10", label: "未提交" },
          { value: "15", label: "审核驳回" },
          { value: "20", label: "待审核" },
          { value: "30", label: "审核通过" }
        ]
      },
      //表单el标签属性
      mainFormProps: {},
      //主表form
      mainForm: {
        //退会类型
        exitType: "",
        //退会原因
        exitReason: "",
        status: "10",
        //会员证书编号
        memberCertNo: "",
        //申请编号
        code: "",
        attachIds: ""
      },
      //附件
      attachTableData: [],
      attachTableSelect: [],
      mainFormRules: {
        exitType: [
          { required: true, message: "请选择退会类型", trigger: "blur" }
        ],
        exitReason: [
          { required: true, message: "请输入退会原因", trigger: "blur" }
        ],
        memberCertNo: [
          { required: true, message: "请输入会员证书编号", trigger: "blur" }
        ]
      },
      dict: {
        exitType: []
      },
      btns: this.$store.getters.btns["100020603050"]
    };
  },
  created() {
    // 初始化查询表单
    this.initForm(this.$route.query.id);
  },
  methods: {
    async initForm(id) {
      // 生成申请编号
      this.mainForm.code = makeCode("HXXDE");
      getDictDataLists("97001007").then(response => {
        this.dict.exitType = response.data.jq97001007;
      });
      if (!id) {
        this.mainForm.status = "10";
      } else {
        var attachIds;
        await getMemberExit(id).then(response => {
          Object.assign(this.mainForm, response.data);
          attachIds = response.data.attachIds;
        });
        if (attachIds) {
          var validateCode;
          // 获取验证码
          await getValidateCode("").then(response => {
            if (response.data) {
              validateCode = response.data.validateCode;
              if (!validateCode) {
                this.$message({
                  type: "error",
                  message: "获取验证码失败!"
                });
                return;
              }
              validateCode = this.$encruption(validateCode);
            }
          });
          // 加载附件
          await listFile(attachIds, validateCode).then(response => {
            if (response.data) {
              this.attachTableData = response.data;
            }
          });
        }
      }
    },
    save() {
      this.$refs["mainForm"].validate(valid => {
        if (valid) {
          //做数据拷贝，防止影响双向绑定的数据
          var mainData = JSON.parse(JSON.stringify(this.mainForm));
          //收集附件id集合
          var attachIdArr = new Array();
          var attachTableData = this.attachTableData;
          if (attachTableData) {
            for (var attach of attachTableData) {
              attachIdArr.push(attach.id);
            }
          }
          mainData.attachIds = attachIdArr.join(",");
          memberExitApply(mainData).then(response => {
            this.mainForm.id = response.data.id;
            var msg = this.mainForm.id ? "保存成功" : "保存失败";
            this.$message({
              type: "success",
              message: msg
            });
          });
        }
      });
    },
    submit() {
      this.$confirm("是否执行提交操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var id = this.mainForm.id;
          //校验
          if (!id) {
            this.$message({
              type: "success",
              message: "请先保存数据"
            });
            return;
          }
          //提交
          submitMemberExit(id).then(response => {
            this.$message({
              type: "success",
              message: "提交成功"
            });
            // 重新加载数据
            this.initForm(id)
          });
        })
        .catch(() => {
          // 取消时执行此处
        });
    },
    cancel() {
      this.$nextTick(() => {
        this.$refs["mainForm"].resetFields();
      });
    },
    async downloadFile(id) {
      //获取验证码
      var key;
      await getValidateCode("").then(response => {
        if (response.data) {
          var validateCode = response.data.validateCode;
          if (!validateCode) {
            this.$message({
              type: "error",
              message: "获取验证码失败!"
            });
            return;
          }
          key = this.$encruption(validateCode);
        }
      });
      await downloadFile(id, key).then(response => {
        console.log(response.headers);
        var contentDisposition = response.headers["content-disposition"];
        var patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
        var result = patt.exec(contentDisposition);
        var fileName = decodeURIComponent(result[1]).trim();
        const blob = new Blob([response.data]);
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      });
    },
    //关闭流程日志框
    closeFileUploadDialog(command, fileList) {
      this.fileUploadDialog.show = false;
      console.log(command, fileList);
      if (command === "ok") {
        // 此处特殊处理
        if (fileList && fileList.length > 0) {
          this.attachTableData = this.attachTableData.concat(fileList);
        }
      }
    },
    attachTableSelectChange(val) {
      this.attachTableSelect = val;
    },
    //附件新增
    handleFileAdd() {
      //打开附件上传弹框
      this.fileUploadDialog.show = true;
    },
    //附件删除
    handleFileDelete() {
      if (!this.attachTableSelect) {
        this.$message({
          type: "info",
          message: "请选中要删除的文件!"
        });
        return;
      }
      let selectRows = this.attachTableSelect;
      if (selectRows.length == 0) {
        this.$message({
          type: "info",
          message: "请选中要删除的文件!"
        });
        return;
      }
      var idArr = new Array();
      Object.keys(selectRows).forEach(function(key) {
        if (selectRows[key].id) {
          idArr.push(selectRows[key].id);
        }
      });
      this.$confirm("是否执行删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //将选中的行删除
          var tempTableData = new Array();
          for (var data of this.attachTableData) {
            if (idArr.indexOf(data.id) < 0) {
              tempTableData.push(data);
            }
          }
          this.attachTableData = tempTableData;
        })
        .catch(() => {
          // 取消时执行此处
        });
    }, 
    btnShow(menuCode) {
      //根据用户所具有的菜单项控制
      var btns = this.btns;
      if (btns && btns.length > 0) {
        for (var i = 0; i < btns.length; i++) {
          if (menuCode === this.btns[i]) {
            return true;
          }
        }
      }
      return false;
    },
    btnDisplay(multiStatus) {
      //根据具体业务数据控制
      var statusArr = strToArr(multiStatus, ",");
      if (!statusArr) {
        return false;
      } else {
        for (var i = 0; i <= statusArr.length; i++) {
          if (this.mainForm.status == statusArr[i]) {
            return true;
          }
        }
      }
      return false;
    }
  }
};
</script>

<style scoped>
* {
  font-weight: normal;
}
.dtl-title-line {
  display: inline-block;
  border-left: 3px solid #409eff;
  padding-left: 5px;
}
.title {
  color: #409eff;
  border-bottom: 1px solid #409eff;
  padding-bottom: 10px;
  font-size: 20px;
  text-align: center;
}
/* 标题下线和 保存取消上部线 样式 */
.dialog-footer {
  border-top: 1px solid #e6e6e6;
  margin-top: 30px;
  padding-top: 10px;
  text-align: right;
}
/* 标题下线和 保存取消上部线 样式 */
.dialog-footer {
  border-top: 1px solid #e6e6e6;
  margin-top: 30px;
  padding-top: 10px;
  text-align: right;
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
}
</style>
