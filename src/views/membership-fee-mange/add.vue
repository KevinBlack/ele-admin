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
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="showSelect()"
              />
            </el-input>
          </el-form-item>
          <el-dialog title="选择缴费会员" :visible.sync="isShowSelect">
            <add-member-modality
              :fdmsg="memberForm"
              :fdshow3="isShowSelect"
              v-show="btnShow('10002150107010')"
              @closeDalogPay="closeSelect"
            />
          </el-dialog>
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
          <el-form-item label="会员类别" prop="memberType">
            <el-select
              v-model="addForm.memberType"
              placeholder="请选择"
              style="width: 100%;"
              @change="selectGet"
              :disabled="true"
            >
              <el-option
                v-for="item in dict.memberType"
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
              :readonly="true"
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
            v-if="btnDisplay('20')"
            v-show="btnShow('10002150107020')"
            >新增</el-button
          >
          <el-button
            class="btn_line"
            type="primary"
            size="mini"
            style="cursor: pointer;"
            @click="batchDelete()"
            v-if="btnDisplay('20')"
            v-show="btnShow('10002150107030')"
            >删除</el-button
          >
        </el-button-group>
        <el-dialog title="新增" :visible.sync="isShow" width="90%">
          <add-modality
            :fdmsg="addForm"
            :fdshow2="isShow"
            @closeDalog="closeBox"
            style="height:500px;"
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
        rules="rulesCurrentPayment"
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
          v-if="btnDisplay('20')"
          @click="saveMemberPay"
          v-show="btnShow('10002150107040')"
          >保存</el-button
        >
        <el-button
          type="primary"
          size="mini"
          @click="reload()"
          v-if="btnDisplay('20')"
          >刷新</el-button
        >
        <el-button
          type="primary"
          size="mini"
          v-if="btnDisplay('20')"
          @click="submitState"
          v-show="btnShow('10002150107050')"
          >提交</el-button
        >
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import {
  getFeeInfoByCode,
  saveMemberPay,
  deleteMember,
  saveSp,
  getAdminHfInfoById
} from "@/api/hxxd/membership-fee-mange";
import {
  getMemberPayInfoList,
  getAdminHfInfo,
  getMemberPaysByAdminId,
  deleteMemberPay
} from "@/api/hxxd/memberPay";
import { saveCheck } from "@/api/hxxd/financial";
import AddMemberModality from "./add_member_modality";
import AddModality from "./add_modality";
import { getDictDataLists } from "@/api/system/comm/comm";
import { getDictName } from "@/utils/index.js";

export default {
  name: "Add",
  components: { AddModality, AddMemberModality },
  data() {
    return {
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
      // btns:["100021505010", "100021505020", "100021501030", "100021501040", "100021501050"],
      btns: this.$store.getters.btns['100021501070'],
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
        memberType: []
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
      if(this.type){ 
      let sum = 0;
      this.tableData.forEach(item => {
        //遍历paymentAmount这个字段，并累加
        let tempVal = parseFloat(item.currentPayment).toFixed(10);
        let balance = parseFloat(item.balance)
        var realVal = tempVal.substring(0, tempVal.length - 8)
        if(balance > parseFloat(realVal)) {
          sum += parseFloat(realVal);
        } else {
          item.currentPayment = item.balance;
          sum += parseFloat(item.balance);
        }
      });
      //返回

      this.addForm.paymentAmount = sum.toFixed(2);
      this.type = false;
       }
    },
    tableData: function(val, oldVal) {
      // 将改变的值赋值给addForm中对应的字段
      let sum = 0;
      this.tableData.forEach(item => {
        //遍历paymentAmount这个字段，并累加
        let tempVal = parseFloat(item.currentPayment).toFixed(10);
        let balance = parseFloat(item.balance)
        var realVal = tempVal.substring(0, tempVal.length - 8)
         if(balance > parseFloat(realVal)) {
          sum += parseFloat(realVal);
        } else {
          item.currentPayment = item.balance;
          sum += parseFloat(item.balance);
        }
      });
      //返回

      //  var regExp = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
      //  var res = regExp.exec(sum)
      this.addForm.paymentAmount = sum.toFixed(2);
    },
    deep: true
  },
  methods: {
    //制保留2位小数，如：2，会在2后面补上00.即2.00  
     toDecimal(x) {  
        var f = parseFloat(x);  
        if (isNaN(f)) {  
            return false;  
        }  
        var f = Math.round(x*100)/100;  
        var s = f.toString();  
        var rs = s.indexOf('.');  
        if (rs < 0) {  
            rs = s.length;  
            s += '.';  
        }  
        while (s.length <= rs + 2) {  
            s += '0';  
        }  
        return s;  
    },
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
        let num = parseInt(this.addForm.spState)
        let currentNum = parseInt(status)
        if (num < currentNum) {
          return true;
        }else if(this.addForm.spState === '25') {
          return true;
        }
        return false;
      },
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
      getDictDataLists("97001014").then(response => {
        this.dict.memberType = response.data.jq97001014;
      });
    },
    loseFocus(type, e) {
      // console.log(this.type)
      // console.log(type)
      e.target.value = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null;
      //  console.log("e.target.value "+ e.target.value )
      this.type = type;
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
      e.target.value = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0] || null;
      var keyCode = e.keyCode || e.which || e.charCode;
      if (keyCode === 13) {
        // 当按键为回车时
        this.type = true;
        this.$refs[row.id].blur(); // 当前行失去焦点
        
        if (Object.keys(this.$refs).length - 2 === index) {
          // index = -1;
          this.$message({
            type: "info",
            message: "到底儿了!"
          });
          this.$refs[row.id].blur();
          this.type = true;
          return;
        }
        this.$refs[Object.keys(this.$refs)[index + 1]].focus();
        
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
      if (!this.addForm.memberType) {
        this.$message({
          title: "提示",
          message: "请选择会员类别",
          type: "warning"
        });
        return;
      }
     
      let nums =
        parseFloat(this.addForm.paymentAmount) * 1 -
        parseFloat(this.addForm.amountRequired) * 1;
      const memberPayInfos = JSON.stringify(this.tableData);
      //封装 多个对象 到saveDate 传参
      const saveData = Object.assign({}, this.addForm, {
        memberPayInfos,
        memberPayInfos
      });
       //实缴金额 - 需缴金额 > 0 = 缴费已超出需缴金额
      if (nums > 0) {
        //保存成功
        this.$message({
          type: "warning",
          message: "缴费已超出需缴金额！"
        });
        return;
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
        getMemberPayInfoList(this.addForm.memberId, "0").then(response => {
          this.tableData = response.data;
        });
      }else if(this.addForm.id) {
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
        this.addForm.memberType = response.data.memberType;
        // this.addForm.memberTypeCode = code
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
    showSelect() {
      this.isShowSelect = true;
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
    closeSelect(chiledArr, fdshow) {
      if (chiledArr.length <= 0) {
        this.$message({
          title: "提示",
          message: "请选择数据",
          type: "warning"
        });
      } else {
        this.addForm.id = chiledArr.id;
        this.addForm.memberName = chiledArr.name;
        this.addForm.memberId = chiledArr.code;
        this.addForm.memberTypeCode = chiledArr.memberTypeCode;
        this.getFeeInfoByCode(this.addForm.memberTypeCode);
        this.getAdminHfInfo();
      }
      this.isShowSelect = fdshow;
    },
    async  getAdminHfInfo() {
      await getAdminHfInfo(this.addForm).then(response => {
        var AdminHfInfoDate = [];
        AdminHfInfoDate = response.data;
        if (AdminHfInfoDate.length > 0 && AdminHfInfoDate != "") {
          let count = 0;
             for (var i = 0; i < AdminHfInfoDate.length; i++) {
            if (AdminHfInfoDate[i].spState === "30") {
              let tempVal = parseFloat(AdminHfInfoDate[i].paymentAmount).toFixed(10);
              var realVal = tempVal.substring(0, tempVal.length - 8) 
              count += Number(realVal);
            }
          };
          //获取已交金额 amountPaid
          this.addForm.amountPaid = count.toFixed(2);
          // let amountDue = parseFloat(this.addForm.amountDue.match(/^\d+(?:\.\d{0,2})?/));
          let amountDue = this.toDecimal(AdminHfInfoDate[0].amountDue);
          let num = this.toDecimal(amountDue - count);
          this.addForm.amountRequired = num.toString();
          if (num <= 0) {
            this.$message({
              title: "提示",
              message: "费用已缴清",
              type: "success"
            });
            this.addForm.spState = "40"
          }
        } else {
          this.addForm.amountRequired = this.addForm.amountDue;
          this.addForm.amountPaid ="0.00";
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
