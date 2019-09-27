<template>
  <el-card class="detailsContainer">
    <el-row>
      <el-col :span="12">
        <h3><i class="el-icon-tickets" style="color: #67C23A;margin-right: 5px;" />新增登记信息</h3>
      </el-col>
      <el-col :span="12" style="text-align:right;">
        <el-button-group>
          <el-button icon="el-icon-edit" size="mini">保存</el-button>
          <el-button icon="el-icon-share" size="mini">刷新</el-button>
          <el-button icon="el-icon-delete" size="mini">删除</el-button>
          <el-button icon="el-icon-check" size="mini">提交</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="handleClick">
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
                <el-input v-model="addForm.memberName" style="width: 100%;"></el-input>
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
              <el-form-item label="会员ID" prop="memberId">
               <el-input v-model="addForm.memberId" style="width: 100%;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="会员类别" prop="memberType">
                <el-select v-model="addForm.memberType" placeholder="请选择" style="width: 100%;">
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
           <el-popover
                placement="right"
                width="1000"
                trigger="click"
                :ref="'popover-1'">
                <el-card>
                  <el-button type="primary" icon="el-icon-right" size="mini" @click="pSubmit()">选择</el-button> 
                  <el-button type="primary" icon="el-icon-close" size="mini" @click="pCancel()">关闭</el-button> 
                </el-card>
                <el-table :data="gridData"
                  @selection-change="selectionChange"
                  style="width:100%"
                  :header-row-style="headRowStyle"
                  :row-style="rowStyle"
                  :header-cell-style="getCellStyle"
                  border
                  highlight-current-row
                 >
                  <el-table-column type="selection" width="55" align="center" />
                  <el-table-column width="" property="date" label="日期"></el-table-column>
                  <el-table-column width="" property="name" label="姓名"></el-table-column>
                  <el-table-column width="" property="address" label="地址"></el-table-column>
                </el-table>
                <el-tag id = "addBtn" type="success" slot="reference" size="mini" style="cursor: pointer;" @click="handleAdd()">新增</el-tag>
             </el-popover>
           <el-tag type="danger" size="mini"  style="cursor: pointer;" @click="handleDelete()">删除</el-tag>
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
            <el-table-column type="selection" width="55" align="left" />
            <el-table-column prop="id" label="ID" width="" align="left" v-if='show' />
             <el-table-column prop="saleDate" label="交易时间" width="" align="center" />
            <el-table-column prop="saleNum" label="交易流水号" width="" align="center" />
            <el-table-column prop="creditAmount" label="贷方发生额" width="" align="center" />
            <el-table-column prop="remarks" label="摘要" width="" align="center" />
            <el-table-column prop="payerAccount" label="对方账号" width="" align="center" />
            <el-table-column prop="payeeAccountName" label="对方账号名称" align="left" :show-overflow-tooltip="true" />
            <el-table-column prop="payerBank" label="对方开户行" align="left" :show-overflow-tooltip="true" />
            <el-table-column prop="paymentAmount" label="实缴金额" align="left" :show-overflow-tooltip="true" />
        </el-table>
    </el-tabs>
  </el-card>
</template>

<script>
import {
  getDjInfoList,
  deleteMember
} from '@/api/hxxd/membership-fee-mange'

export default {
  data() {
    return {
      tableMultiSelection: [],
      gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
      addForm: {
        memberName: "",
        paymentAmount: "",
        amountDue: "",
        discount: "",
        memberGrade: "",
        memberId: "",
        paymentYear: "",
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
      options: [{
        value: '选项1',
        label: '张三'
      }, {
        value: '选项2',
        label: '李四'
      }, {
        value: '选项3',
        label: '王五'
      }, {
        value: '选项4',
        label: '赵六'
      }, {
        value: '选项5',
        label: '刘七'
      }],
      tableData: []
    }
  },
  methods: {
     handleAdd() {
      // this.$router.push({ path: '/membership-fee-mange/add', query: {}})
    },
    getTableList() {
      // getMemberPayInfoList(this.formQuery).then(response => {
      //   this.tableData = response.data
      // })
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    headRowStyle(row, rowIndex) {
      return "height:15px;";
    },
    headRowStyle(row, rowIndex) {
      return 'height:15px'
    },
    getCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background: #F2F2F2font-size: 13pxcolor: #333font-weight: normal'
      } else {
        return ''
      }
    },
    rowStyle(row, rowIndex) {
      return "height:15px;font-size: 13px;color: #333;font-weight: normal; ";
    },
    getCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background: #F2F2F2;font-size: 13px;color: #333;font-weight: normal;";
      } else {
        return "";
      }
    },
    selectionChange(val) {
      this.tableMultiSelection = val
    },
          pSubmit() {
        // store.postData(apiUrl.unbind_front_user_api,{
          // user_id:row.id
        // }).then((res)=>{
          // if(res.body.code==1){
            this.pClose()
            // this.fetchData()
          // }
        // })
      },
      pCancel() {
        this.pClose()
      },
      pClose() {
        this.$refs[`popover-1`].doClose()
      },
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
