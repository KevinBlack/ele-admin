<template>
  <el-card class="detailsContainer">
    <el-row>
      <el-col :span="12">
        <h3><i class="el-icon-tickets" style="color: #67C23A;margin-right: 5px;" />登记信息</h3>
      </el-col>
    </el-row>
        <!-- part1 -->
        <el-row :gutter="10">
          <el-col :span="24">
              <h5 class="dtl-title-line">会费登记新增单据</h5>
          </el-col>
        </el-row>
        <el-form ref="ruleForm" label-width="100px" size="mini">
          <el-row >
             <el-col :span="6">
              <el-form-item label="缴费会员" prop="memberName">
               <el-input v-model="addForm.memberName" style="width: 100%;">
                  <el-button slot="append" icon="el-icon-search" @click="showSelect()" />
               </el-input>
              </el-form-item>
                <!-- <el-dialog title="选择缴费会员" :visible.sync="isShowSelect">
                  <add_member_modality :fdmsg="memberForm" :fdshow3="isShowSelect" @closeDalogPay="closeSelect" />
                </el-dialog> -->
            </el-col>
            <el-col :span="6">
               <el-form-item label="会员ID" prop="memberId">
                <el-input v-model="addForm.memberId" style="width: 100%;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="缴费年度" prop="paymentYear">
                <el-select v-model="addForm.paymentYear" placeholder="请选择" style="width: 100%;">
                  <el-option
                    v-for="item in yearOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
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
                <el-select v-model="addForm.memberTypeCode" placeholder="请选择" style="width: 100%;" @change="selectGet">
                  <el-option
                    v-for="item in hyTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
             <el-col :span="6">
              <el-form-item label="会员等级" prop="memberGrade">
                <el-input v-model="addForm.memberGrade" style="width: 100%;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="等级金额" prop="contributionStandard">
                <el-input v-model="addForm.contributionStandard" style="width: 100%;"></el-input>
               </el-form-item>
             </el-col>
            <el-col :span="6">
              <el-form-item label="折扣" prop="discount">
                <el-input v-model="addForm.discount" style="width: 100%;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="等级应缴金额" prop="amountDue">
                <el-input v-model="addForm.amountDue" style="width: 100%;"></el-input>
               </el-form-item>
             </el-col>
            <el-col :span="6">
              <el-form-item label="已缴金额" prop="amountPaid">
                <el-input v-model="addForm.amountPaid" style="width: 100%;"></el-input>
               </el-form-item>
             </el-col>
            <el-col :span="6">
              <el-form-item label="需缴金额" prop="amountRequired">
                <el-input v-model="addForm.amountRequired" style="width: 100%;"></el-input>
               </el-form-item>
             </el-col>
            <el-col :span="6">
              <el-form-item label="实缴金额" prop="paymentAmount">
                <el-input v-model="addForm.paymentAmount" style="width: 100%;"></el-input>
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
        <el-table
          :data="tableData"
          :header-row-style="headRowStyle"
          :row-style="rowStyle"
          :header-cell-style="getCellStyle"
          border
          style="width: 100%;"
          height="250"
        >
            <el-table-column type="selection" width="55" align="center" v-if='show' />
            <el-table-column prop="id" label="ID" width="" align="center" v-if='show' />
            <el-table-column prop="saleDate" label="交易时间" width="" align="center" />
            <el-table-column prop="saleNum" label="交易流水号" width="" align="center" />
            <el-table-column prop="creditAmount" label="贷方发生额" width="" align="center" />
            <el-table-column prop="remarks" label="摘要" width="" align="center" />
            <el-table-column prop="payerAccount" label="对方账号" width="" align="center" />
            <el-table-column prop="payeeAccountName" label="对方账号名称" align="center" :show-overflow-tooltip="true" />
            <el-table-column prop="payerBank" label="对方开户行" align="center" :show-overflow-tooltip="true" />
        </el-table>
  </el-card>
</template>

<script>
import {
  getAdminHfInfo,
  getMemberPayInfoList
} from '@/api/hxxd/memberPay'

export default {
  data() {
    return {
        btnDisplay(status) {
      //根据具体业务数据控制 
      if (this.addForm.spState == status  ) {
        return true;
      }
      else if (this.addForm.spState == '0'  ) {
        return true;
      }
      else if (this.addForm.spState == '00'  ) {
        return true;
      }
      else if (this.addForm.spState == '20'  ) {
        return true;
      }
      return false;
    },
      //表单对应下拉字典
      mainFormOptions: {
        status: [
          {'value':'10',label:'未提交'},
          {'value':'1',label:'审核驳回'},
          {'value':'2',label:'待审核'},
          {'value':'3',label:'审核通过'},
          {'value':'00',label:'制单中'}
        ]
      },
      yearOptions:[
      {
        value: '2019',
        label: '2019'
      }, {
        value: '2020',
        label: '2020'
      }, {
        value: '2021',
        label: '2021'
      }, {
        value: '2022',
        label: '2022'
      }
      ],
      hyTypeOptions:[
      {
        value: 'A101',
        label: '航空公司'
      }, {
        value: '2020',
        label: '2020'
      }, {
        value: '2021',
        label: '2021'
      }, {
        value: '2022',
        label: '2022'
      }
      ],
      tableMultiSelection: [],
      show: true,
      isShow: false,
       addForm: {
        id:"",
        memberName: "",
        paymentAmount: "",
        amountDue: "",
        discount: "",
        memberGrade: "",
        memberId: "",
        paymentYear: "2019",
        spState: "00",
        memberTypeCode: "",
        contributionStandard: "",
        amountRequired: "",
        amountPaid: "0"
      },
      tableData:[],
      selectId: 0
    }
  },
   created() {
    // 参数传递 router.push({ path: 'register', query: { plan: 'private' }})
    // 参数接受 let id = this.$route.query.jId;
    // this.selfId = this.$route.query.id;
    this.getTableList()
  },
  methods: {
    selectGet(val) {
      let obj = {};
      obj = this.hyTypeOptions.find((item)=>{
          return item.value === val;//筛选出匹配数据
          });
      this.getFeeInfoByCode(obj.value)
    },
     handleAdd() {
      // this.$router.push({ path: '/membership-fee-mange/add', query: {}})
    },
    getTableList() {
      this.addForm.id = this.$route.query.selectId
      getAdminHfInfo(this.addForm.id).then(response => {
         this.addForm.memberName = response.data[0].memberName
         this.addForm.paymentAmount = response.data[0].paymentAmount
         this.addForm.memberId = response.data[0].memberId
         this.addForm.amountDue = response.data[0].amountDue
         this.addForm.discount = response.data[0].discount
         this.addForm.memberGrade = response.data[0].memberGrade
         this.addForm.paymentYear = response.data[0].paymentYear
         this.addForm.memberTypeCode = response.data[0].memberTypeCode
         this.addForm.spState = response.data[0].spState
         this.addForm.contributionStandard = response.data[0].contributionStandard
         this.addForm.amountRequired = response.data[0].amountRequired
         this.addForm.amountPaid = response.data[0].amountPaid 
      })
      getMemberPayInfoList(this.addForm.memberId).then(response => {
        this.tableData = response.data
      })
    },
    headRowStyle(row, rowIndex) {
      return "height:15px;";
    },
    rowStyle(row, rowIndex) {
      return "height:15px;font-size:13px;color:#333;font-weight:normal; ";
    },
    getCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background:#F2F2F2;font-size:13px;color:#333;font-weight:normal;";
      } else {
        return "";
      }
    }
  }
}
</script>

<style scoped>
*{
  font-weight: normal;
}
.detailsContainer {
  margin: 0 10px;
}
.dtl-title-line {
  display: inline-block;
  border-left: 3px solid #409EFF;
  padding-left: 5px;
}
.el-table__fixed-right::before {
  background-color: none;
}
</style>
