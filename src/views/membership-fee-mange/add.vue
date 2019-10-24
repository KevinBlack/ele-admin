<template>
  <el-card class="detailsContainer">
    <el-row>
      <el-col :span="12">
        <h3><i class="el-icon-tickets" style="color: #67C23A;margin-right: 5px;" />新增登记信息</h3>
      </el-col>
      <el-col :span="12" style="text-align:right;">
        <el-button-group>
          <el-button icon="el-icon-edit"   size="mini" @click="saveMemberPay">保存</el-button>
          <el-button icon="el-icon-share"  size="mini" @click="reload()">刷新</el-button>
          <el-button icon="el-icon-delete" size="mini">删除</el-button>
          <el-button icon="el-icon-check"  size="mini">提交</el-button>
        </el-button-group>
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
                <el-dialog :visible.sync="isShowSelect">
                  <add_member_modality :fdmsg="memberForm" :fdshow3="isShowSelect" @closeDalog="closeSelect" />
                </el-dialog>
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
              <el-form-item label="会员类别" prop="memberType">
                <el-select v-model="addForm.memberType" placeholder="请选择" style="width: 100%;" @change="selectGet">
                  <el-option
                    v-for="item in hyTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>  
             <el-col :span="6">
              <el-form-item label="会员等级" prop="memberGrade">
                <el-input v-model="addForm.memberGrade" style="width: 100%;"></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="6">
              <el-form-item label="折扣" prop="discount">
                <el-input v-model="addForm.discount" style="width: 100%;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="应缴金额" prop="amountDue">
                <el-input v-model="addForm.amountDue" style="width: 100%;"></el-input>
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
        <el-card
            shadow="never"
            style="padding:15px;border-radius:0px;"
            :body-style="{ padding: '0px' }"
           >
             <el-button-group  size="mini">
                <el-button class="btn_line" type="primary" size="mini" style="cursor: pointer;" @click="showBox()">新增</el-button>
                <el-button class="btn_line" type="primary" size="mini" style="cursor: pointer;" @click="handleDelete()">删除</el-button>
              </el-button-group>
              <el-dialog title="新增" :visible.sync="isShow" width="70%">
                  <add_modality :fdmsg="addForm" :fdshow2="isShow" @closeDalog="closeBox" style="height:300px;"/>
               </el-dialog>
           </el-card>
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
            <el-table-column prop="id" label="ID" width="" align="center" v-if='show' />
            <el-table-column prop="saleDate" label="交易时间" width="" align="center" />
            <el-table-column prop="saleNum" label="交易流水号" width="" align="center" />
            <el-table-column prop="creditAmount" label="贷方发生额" width="" align="center" />
            <el-table-column prop="remarks" label="摘要" width="" align="center" />
            <el-table-column prop="payerAccount" label="对方账号" width="" align="center" />
            <el-table-column prop="payeeAccountName" label="对方账号名称" align="center" :show-overflow-tooltip="true" />
            <el-table-column prop="payerBank" label="对方开户行" align="center" :show-overflow-tooltip="true" />
            <el-table-column prop="paymentAmount" label="实缴金额" align="center" :show-overflow-tooltip="true" />
        </el-table>
  </el-card>
</template>

<script>
import {
  getDjInfoList,
  getFeeInfoByCode,
  saveMemberPay,
  deleteMember
} from '@/api/hxxd/membership-fee-mange'
import add_member_modality from './add_member_modality'
import add_modality from './add_modality'

export default {
  name: 'Add',
  components: { add_modality, add_member_modality },
  data() {
    return {
      memberForm:{
      id:"",
      memberName: "",
      memberId: "",
      },
      show: true,
      isShowSelect:false,
      isShow: false,
      tableMultiSelection: [],
      addForm: {
                id:"",
        memberName: "",
        paymentAmount: "",
        amountDue: "",
        discount: "",
        memberGrade: "",
        memberId: "",
        paymentYear: "2019",
        memberType: ""
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
      tableData: []
    }
  },
  methods: {
    saveMemberPay(){
       saveMemberPay(this.addForm).then(response => {
           if (response.status == 200) {
              //保存成功
              this.$message({
                type: "success",
                message: '保存成功!'
              });
            } else {
              //保存失败
              this.$message({
                type: "success",
                error: '保存失败!'
              });
            }
          })
    },
    reload () {
      this.$router.go(0);
    }  ,
     handleAdd() {
      // this.$router.push({ path: '/membership-fee-mange/add', query: {}})
    },
    getTableList() {
      // getMemberPayInfoList(this.formQuery).then(response => {
      //   this.tableData = response.data
      // })
    },
    handleClick(tab, event) {
      
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
    },
    selectionChange(val) {
      this.tableMultiSelection = val
    },
    selectGet(val) {
      let obj = {};
      obj = this.hyTypeOptions.find((item)=>{
          return item.value === val;//筛选出匹配数据
          });
       getFeeInfoByCode(obj.value).then(response => {
            this.addForm.memberGrade = response.data.memberDj
            this.addForm.discount = response.data.memberZk
            this.addForm.amountDue = response.data.amountPay
            this.addForm.paymentAmount = response.data.actualPay
          this.$message({
            type: 'success',
            message: '操作成功!'
             })
          })
    },
      // 模态框 start
    showBox() {
      if (!this.addForm.memberName) {
        this.$notify({
          title: '提示',
          message: '请选择缴费会员',
          type: 'warning',
          duration: 2000
        })
      }else{
        this.isShow = true
      }
    },
    showSelect() {
        this.isShowSelect = true
    },
    closeBox(chiledArr, fdshow) {
      if (chiledArr.length > 0) {
        for (let i = 0; i < chiledArr.length; i++) {
          this.input3 += chiledArr[i]
        }
      } 
      this.isShow = fdshow
    },
    closeSelect(chiledArr, fdshow) {
      if (chiledArr.length <= 0) {
        this.$notify({
          title: '提示',
          message: '请选择数据',
          type: 'warning',
          duration: 2000
        })
      } else {
          this.addForm.id =chiledArr.id
          this.addForm.memberName =chiledArr.name
          this.addForm.memberId =chiledArr.code
      }
      this.isShowSelect = fdshow
    }
    // 模态框 end
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
.btn_line {
  margin-right: 2px;
}
</style>
