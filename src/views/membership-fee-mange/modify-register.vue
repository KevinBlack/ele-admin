<template>
  <el-card class="detailsContainer">
    <!-- part1 -->
    <el-row :gutter="10">
      <el-col :span="24">
        <h5 class="dtl-title-line">会费登记新增单据</h5>
      </el-col>
    </el-row>
    <el-form ref="ruleForm" label-width="100px" size="mini">
      <el-row>
        <el-col :span="6">
          <el-form-item label="缴费会员" prop="memberName">
            <el-input v-model="addForm.memberName" style="width: 100%;">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="会员ID" prop="memberId">
            <el-input
              v-model="addForm.memberId"
              style="width: 100%;"
              :readonly="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="缴费年度" prop="paymentYear">
            <el-select
              v-model="addForm.paymentYear"
              placeholder="请选择"
              style="width: 100%;"
            >
              <el-option
                v-for="item in yearOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态" size="mini" prop="spState">
            <el-select
              v-model="addForm.spState"
              size="mini"
              style="width:100%"
              :disabled="true"
            >
              <el-option
                v-for="item in mainFormOptions.status"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <el-form-item label="会员类别" prop="memberTypeCode">
            <el-select
              v-model="addForm.memberTypeCode"
              placeholder="请选择"
              style="width: 100%;"
              @change="selectGet"
            >
              <el-option
                v-for="item in dict.memberTypeCode"
                :key="item.key"
                :label="item.value"
                :value="item.key"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="会员等级" prop="memberGrade">
            <el-input
              v-model="addForm.memberGrade"
              style="width: 100%;"
              :readonly="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="等级金额" prop="contributionStandard">
            <el-input
              v-model="addForm.contributionStandard"
              style="width: 100%;"
              :readonly="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="折扣" prop="discount">
            <el-input
              v-model="addForm.discount"
              style="width: 100%;"
              :readonly="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="等级应缴金额" prop="amountDue">
            <el-input
              v-model="addForm.amountDue"
              style="width: 100%;"
              :readonly="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="已缴金额" prop="amountPaid">
            <el-input
              v-model="addForm.amountPaid"
              style="width: 100%;"
              :readonly="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="需缴金额" prop="amountRequired">
            <el-input
              v-model="addForm.amountRequired"
              style="width: 100%;"
              :readonly="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="实缴金额" prop="paymentAmount">
            <el-input
              v-model="addForm.paymentAmount"
              style="width: 100%;"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- part1 end -->
    <!-- part3 -->
    <el-row :gutter="10">
      <el-col :span="24">
        <h5 class="dtl-title-line">缴费信息</h5>
      </el-col>
    </el-row>
    <el-row class="area_bordes">
      <el-col :span="24">
        <el-button-group size="mini">
          <el-button
            class="btn_line"
            type="primary"
            size="mini"
            style="cursor: pointer;"
            @click="showBox()"
            v-if="btnDisplay('10')"
            >新增</el-button
          >
          <el-button
            class="btn_line"
            type="primary"
            size="mini"
            style="cursor: pointer;"
            @click="batchDelete()"
            v-if="btnDisplay('10')"
            >删除</el-button
          >
        </el-button-group>
        <el-dialog title="新增" :visible.sync="isShow" width="70%">
          <add-modality
            :fdmsg="addForm"
            :fdshow2="isShow"
            @closeDalog="closeBox"
            style="height:300px;"
          />
        </el-dialog>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      :header-row-style="headRowStyle"
      :row-style="rowStyle"
      :header-cell-style="getCellStyle"
      border
      style="width: 100%;"
      height="250"
      @selection-change="selectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column prop="id" label="ID" width align="center" v-if="show" />
      <el-table-column prop="saleDate" label="交易时间" width align="center" />
      <el-table-column
        prop="saleNum"
        label="交易流水号"
        width
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="creditAmount"
        label="贷方发生额"
        width
        align="center"
      />
      <el-table-column prop="remarks" label="摘要" width align="center" />
      <el-table-column
        prop="payerAccount"
        label="对方账号"
        width
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="oppositeAccountName"
        label="对方账号名称"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="payerBank"
        label="对方开户行"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="balance"
        label="余额"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column
        prop="currentPayment"
        label="本次缴费金额"
        align="center"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <template v-if="true">
            <el-input
              v-model="scope.row.currentPayment"
              type="number"
              :ref="scope.row.id"
              autocomplete="off"
              @keyup.enter.native="nextRowEdit(scope.$index, scope.row, $event)"
              @blur="loseFocus(true, $event)"
              @focus="loseFocus(false, $event)"
              class="edit-input"
              placeholder="本次缴费金额"
            />
          </template>
          <span v-else>{{ scope.row.currentPayment }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-row class="btn_bottom">
      <el-col :span="24">
        <el-button
          type="primary"
          size="mini"
          v-if="btnDisplay('10')"
          @click="saveMemberPay"
          >保存</el-button
        >
        <el-button
          type="primary"
          size="mini"
          @click="reload()"
          v-if="btnDisplay('10')"
          >刷新</el-button
        >
        <el-button
          type="primary"
          size="mini"
          v-if="subBtnDisplay('10')"
          @click="submitState"
          >提交</el-button
        >
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import {
  getDjInfoList,
  getFeeInfoByCode,
  saveMemberPay,
  deleteMember,
  saveSp,
  getAdminHfInfoById
} from "@/api/hxxd/membership-fee-mange";
import {
  getMemberPayInfoList,
  getMemberPaysByAdminId,
  getAdminHfInfo,
  deleteMemberPay
} from "@/api/hxxd/memberPay";
import { saveCheck } from "@/api/hxxd/financial";
import AddModality from "./add_modality";
import { getDictDataLists } from "@/api/system/comm/comm";
import { getDictName } from "@/utils/index.js";

export default {
  name: "Modality",
  components: { AddModality },
  data() {
    return {
      btnDisplay(status) {
        //根据具体业务数据控制
        if (this.addForm.spState == status) {
          return true;
        }
        return false;
      },
      subBtnDisplay(status) {
        //根据具体业务数据控制
        if (this.addForm.spState === status) {
          return true;
        }
        return false;
      },
      //表单对应下拉字典
      mainFormOptions: {
        status: [
          { value: "10", label: "未提交" },
          { value: "20", label: "待审核" },
          { value: "25", label: "审核驳回" },
          { value: "30", label: "审核通过" },
          { value: "00", label: "制单中" }
        ]
      },
      tableMultiSelection: [],
      memberForm: {
        id: "",
        memberName: "",
        memberId: ""
      },
      selectId: 0,
      readonly: false,
      show: false,
      isShowSelect: false,
      isShow: false,
      addForm: {
        id: "",
        memberName: "",
        paymentAmount: "",
        amountDue: "",
        discount: "",
        memberGrade: "",
        memberId: "",
        paymentYear: "2019",
        spState: "00",
        memberTypeCode: "",
        memberType: "",
        contributionStandard: "",
        amountRequired: "",
        amountPaid: "0"
      },
      yearOptions: [
        {
          value: "2019",
          label: "2019"
        },
        {
          value: "2020",
          label: "2020"
        },
        {
          value: "2021",
          label: "2021"
        },
        {
          value: "2022",
          label: "2022"
        }
      ],
      dict: {
        memberTypeCode: []
      },
      tableData: [],
      prevValue: {},
      currentRow: [],
      selectArr: [],
      disabled: false,
      type: false,
      currentPayment: ""
    };
  },
   created() {
    //加载字典
    this.beforeLoading();
     this.addForm.id = this.$route.query.selectId
    if (this.addForm.id) {
      this.getModifyList()
    }
  },
  watch: {
    //监控传入对象变化（类似于监听）
    type: function() {
      let sum = 0;
      this.tableData.forEach(item => {
        //遍历paymentAmount这个字段，并累加
        // sum += parseInt(item.creditAmount);
        sum += Number(item.currentPayment);
      });
      //返回
      this.addForm.paymentAmount = sum.toString();
    },
    tableData: function(val, oldVal) {
      // 将改变的值赋值给addForm中对应的字段
      let sum = 0;
      this.tableData.forEach(item => {
        //遍历paymentAmount这个字段，并累加
        // sum += parseInt(item.creditAmount);
        sum += Number(item.currentPayment);
      });
      //返回
      this.addForm.paymentAmount = sum.toString();
    },
    deep: true
  },
  methods: {
     getModifyList() {
      getAdminHfInfoById(this.addForm.id).then(response => {
        this.addForm.memberName = response.data.memberName
        this.addForm.paymentAmount = response.data.paymentAmount
        this.addForm.memberId = response.data.memberId
        this.addForm.amountDue = response.data.amountDue
        this.addForm.discount = response.data.discount
        this.addForm.memberGrade = response.data.memberGrade
        this.addForm.paymentYear = response.data.paymentYear
        this.addForm.memberType = response.data.memberType
        this.addForm.memberTypeCode = response.data.memberTypeCode
        this.addForm.spState = response.data.spState
        this.addForm.contributionStandard = response.data.contributionStandard
        this.addForm.amountRequired = response.data.amountRequired
        this.addForm.amountPaid = response.data.amountPaid
      }).then(() => {
        getMemberPaysByAdminId(this.addForm.id, '1').then(response => {
          this.tableData = response.data
        })
      })
    },
      beforeLoading() {
      getDictDataLists("97001009").then(response => {
        this.dict.memberTypeCode = response.data.jq97001009;
      });
    },
    loseFocus(type, e) {
      this.type = type;
      const val = e.target.value;
    },
    getIds() {
      if (!this.tableData) {
        this.$message({
          type: "info",
          message: "请选中要操作的缴费记录!"
        });
        return;
      }
      var idArr = [];
      this.tableData.forEach(item => {
        idArr.push(item.id);
      });
      if (idArr && idArr.length > 0) {
        var ids = idArr.join();
        return ids;
      }
    },
    nextRowEdit(index, row, e) {
      // (index+1).focus()
      const val = e.target.value;
      var keyCode = e.keyCode || e.which || e.charCode;
      if (keyCode === 13) {
        // 当按键为回车时
        this.$refs[row.id].blur(); // 当前行失去焦点
        this.type = true;
        if (Object.keys(this.$refs).length - 2 === index) {
          // index = -1;
          this.$message({
            type: "info",
            message: "到底儿了!"
          });
          return;
        }
        this.$refs[Object.keys(this.$refs)[index + 1]].focus();
        this.type = false;
      }
    },
    batchDelete() {
      if (!this.tableMultiSelection) {
        this.$message({
          type: "info",
          message: "请选中要删除的数据!"
        });
        return;
      }
      const selectRows = this.tableMultiSelection;
      if (selectRows.length === 0) {
        this.$message({
          type: "info",
          message: "请选中要删除的数据!"
        });
        return;
      }
      this.$confirm("是否执行删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var idArr = [];
          Object.keys(selectRows).forEach(function(key) {
            if (selectRows[key].id) {
              idArr.push(selectRows[key].id);
            }
          });
          if (idArr && idArr.length > 0) {
            var ids = idArr.join();
            deleteMemberPay(ids).then(response => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getTableList();
            });
          }
        })
        .catch(() => {
          // 取消时执行此处
        });
    },
    saveMemberPay() {
      if (!this.addForm.memberName) {
        this.$message({
          title: "提示",
          message: "请选择缴费会员",
          type: "warning"
        });
        return;
      }
      if (!this.addForm.memberTypeCode) {
        this.$message({
          title: "提示",
          message: "请选择会员类别",
          type: "warning"
        });
        return;
      }
      let nums =
        Number(this.addForm.paymentAmount) -
        Number(this.addForm.amountRequired);
      const memberPayInfos = JSON.stringify(this.tableData);
      const saveData = Object.assign({}, this.addForm, {
        memberPayInfos,
        memberPayInfos
      });
      if (nums > 0) {
        this.$confirm("缴费超出需缴金额,是否执行保存操作?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            saveMemberPay(saveData).then(response => {
              this.addForm = response.data;
              if (response.status === 200) {
                //保存成功
                this.$message({
                  type: "success",
                  message: "保存成功!"
                });
              } else {
                //保存失败
                this.$message({
                  type: "error",
                  error: "保存失败!"
                });
              }
            });
          })
          .catch(() => {
            return;
          });
      } else {
        saveMemberPay(saveData).then(response => {
          this.addForm = response.data;
          if (response.status === 200) {
            //保存成功
            this.$message({
              type: "success",
              message: "保存成功!"
            });
          } else {
            //保存失败
            this.$message({
              type: "error",
              error: "保存失败!"
            });
          }
        });
      }
    },
    submitState() {
      if (this.addForm.spState === "10") {
        var idArr = [];
        idArr.push(this.addForm.id);
        var ids = idArr.join();
        saveSp(ids, "20").then(response => {
          var success = response.data;
          if (success) {
            this.addForm.spState = "20";
            //保存成功
            this.$message({
              type: "success",
              message: "提交成功!"
            });
          } else {
            //保存失败
            this.$message({
              type: "error",
              error: "提交失败!"
            });
          }
        });
      } else {
        this.$message({
          title: "提示",
          message: "只能操作未提交数据",
          type: "warning",
          duration: 2000
        });
      }
    },
    reload() {
      this.$router.go(0);
    },
    getTableList() {
      if (this.addForm.memberId) {
        getMemberPaysByAdminId(this.addForm.id, "1").then(response => {
          this.tableData = response.data;
        });
      }
    },
    headRowStyle(row, rowIndex) {
      return "height:15px";
    },
    rowStyle(row, rowIndex) {
      return "height:15pxfont-size:13pxcolor:#333font-weight:normal ";
    },
    getCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background:#F2F2F2font-size:13pxcolor:#333font-weight:normal";
      } else {
        return "";
      }
    },
    selectionChange(val) {
      this.tableMultiSelection = val;
    },
    selectGet(key) {
      this.getFeeInfoByCode(key);
    },
    getFeeInfoByCode(code) {
      getFeeInfoByCode(code).then(response => {
        this.addForm.memberGrade = response.data.memberDj;
        this.addForm.discount = response.data.memberZk;
        this.addForm.contributionStandard = response.data.memberFeeBz;
        this.addForm.amountDue = response.data.amountPay;
        this.addForm.paymentAmount = response.data.actualPay;
      });
    },
    // 模态框 start
    showBox() {
      if (!this.addForm.memberName) {
        this.$message({
          title: "提示",
          message: "请选择缴费会员",
          type: "warning"
        });
      } else {
        this.isShow = true;
      }
    },
    closeBox(commmand, selectRows) {
      this.isShow = false;
      if (commmand == "saveBtn") {
        var idArr = [];
        Object.keys(selectRows).forEach(function(key) {
          if (selectRows[key].id) {
            idArr.push(selectRows[key].id);
          }
        });
        if (idArr && idArr.length > 0) {
          var Ids = idArr.join();
          saveCheck(Ids, this.addForm.memberId).then(response => {
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.getTableList();
          });
        }
      }
    },
    getAdminHfInfo() {
      getAdminHfInfo(this.addForm).then(response => {
        var AdminHfInfoDate = [];
        AdminHfInfoDate = response.data;
        if (AdminHfInfoDate.length > 0 && AdminHfInfoDate != "") {
          let count = 0;
          Object.keys(AdminHfInfoDate).forEach(function(key) {
            //获取已交金额 amountPaid
            if (AdminHfInfoDate[key].spState === "30") {
              var paymentAmount = parseInt(AdminHfInfoDate[key].paymentAmount);
              count += paymentAmount;
            }
          });
          let amountDue = parseInt(this.addForm.amountDue);
          let num = amountDue - count;
          if (num <= 0) {
            this.addForm.spState = "费用已缴清";
          }
          this.addForm.amountRequired = num.toString();
          this.addForm.amountPaid = count.toString();
        } else {
          this.addForm.amountRequired = this.addForm.amountDue;
        }
      });
    }
    // 模态框 end
  }
};
</script>

<style scoped>
@import "~@/styles/hxxd.scss";
</style>
