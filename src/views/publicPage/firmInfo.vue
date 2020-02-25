<template>
  <div class="app-wrapper">
    <header-reload />
    <div class="contont-main" v-bind:style="{minHeight: Height+'px'}">
      <el-card class="detailsContainer">
        <el-row :gutter="20" class="area_border">
          <el-col :span="4"><img src="../../assets/img/yyzz.jpg" height="100px"></el-col>
          <el-col :span="20" class="basic_info">
            <h1>{{ hxXdCompanyInfoParam.businessName }}</h1>
            <p><b>统一社会信用代码：</b>{{ hxXdCompanyInfoParam.socialCode }}</p>
            <p><b>法定代表人：</b>{{ hxXdCompanyInfoParam.name }}</p>
            <p><b>登记机关：</b>{{ hxXdCompanyInfoParam.bureauCommerce }}</p>
          </el-col>
        </el-row>
        <el-tabs v-model="activeName" type="border-card" :v-if="tabShow">
          <el-tab-pane label="基础信息" name="first">
            <el-row>
              <el-col :span="24">
                <h5 class="dtl-title-line">企业信息</h5>
              </el-col>
              <el-col :span="24"> 
                <table class="table_firmInfo" styele="table-layout: fixed;">
                  <tr>
                    <th width="100">企业名称</th>
                    <td colspan="3" width="300">
                      {{ hxXdCompanyInfoParam.businessName }}
                    </td>
                    <th width="120">英文名称</th>
                    <td colspan="2">
                      {{ hxXdCompanyInfoParam.businessNameEn }}
                    </td>
                  </tr>
                  <tr>
                    <th>经营地址</th>
                    <td colspan="3">
                      {{ hxXdCompanyInfoParam.businessAddress }}
                    </td>
                    <th>法人</th>
                    <td colspan="2">
                      {{ hxXdCompanyInfoParam.name }}
                    </td>
                  </tr>
                   <tr>
                    <th>代码证颁发机关</th>
                    <td colspan="3">
                     {{ hxXdCompanyInfoParam.codeCertiAuth }}
                    </td>
                    <th>工商登记机关</th>
                    <td colspan="2">
                      {{ hxXdCompanyInfoParam.bureauCommerce }}
                    </td>
                  </tr>
                   <tr>
                    <th width="140">统一社会信用代码</th>
                     <td colspan="3">
                      {{ hxXdCompanyInfoParam.socialCode }}
                    </td>
                   <th>旅行社经营许可证</th>
                     <td colspan="3">
                      {{ hxXdCompanyInfoParam.travelLicense }}
                    </td>
                  </tr>
                  <tr>
                    <th width="110">所属地区</th>
                    <td width="150">
                      {{ hxXdCompanyInfoParam.area }}
                    </td>
                    <th >所属省份</th>
                    <td width="150">
                      {{ hxXdCompanyInfoParam.province }}
                    </td>
                    <th >经营模式</th>
                    <td>
                      {{ hxXdCompanyInfoParam.manageModel }}
                    </td> 
                     
                  </tr>
                  <tr>
                    <th>组织机构代码</th>
                    <td style="white-space:nowrap;">
                      {{ hxXdCompanyInfoParam.orgCode }}
                    </td>
                    <th>企业性质</th>
                    <td >
                      {{ hxXdCompanyInfoParam.enterpriseNature }}
                    </td>
                    <th>营业执照</th>
                    <td>
                      {{ hxXdCompanyInfoParam.licenseNo }}
                    </td>
                  </tr>
                  <tr>
                    <th>投资金额</th>
                    <td>
                      {{ hxXdCompanyInfoParam.investmentAmount }}
                    </td>
                    <th>货币类型</th>
                    <td>
                      {{ hxXdCompanyInfoParam.currencyType }}
                    </td>
                    <th>投资比例</th>
                    <td>
                      {{ hxXdCompanyInfoParam.investmentsRatio }}
                    </td>
                  </tr>
                </table>
              </el-col>
              <el-col :span="24" style="margin-bottom: 20px;">
                <h5 class="dtl-title-line">发起人及出资信息</h5>
              </el-col>
              <el-col :span="24">
                <el-table
                  ref="multipleTable"
                  :data="tableData"
                  border
                  tooltip-effect="dark"
                  :header-cell-style="getCellStyle"
                  highlight-current-row
                  class="table-hxxd"
                >
                  <el-table-column prop="investorType" label="投资人类型" align="center"></el-table-column>
                  <el-table-column prop="investorName" label="投资人名称" align="center" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column prop="certificateNum" label="证照/证件号码" align="center" :show-overflow-tooltip="true"></el-table-column>
                  <el-table-column prop="investmentAmount" label="投资金额（万元）" align="center"></el-table-column>
                  <el-table-column prop="currencyType" label="货币类型" align="center"></el-table-column>
                  <el-table-column prop="investmentsRatio" label="投资比例" align="center"></el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="投诉信息" name="second">
            <el-table
              ref="complaintTable"
              :data="complaintList"
              border
              tooltip-effect="dark"
              style="width: 100%;"
              :header-cell-style="getCellStyle"
              class="table-hxxd"
            >
              <el-table-column prop="complaintTheme" label="投诉主题" width="155" align="center" />
              <!-- <el-table-column prop="complainant" label="投诉人" width="100" align="center" /> -->
              <el-table-column prop="complaintName" label="投诉公司" width="200" align="center" :show-overflow-tooltip="true" />
              <el-table-column prop="complaintsContents" label="投诉内容" width="550" align="center" :show-overflow-tooltip="true" />
              <el-table-column prop="status" label="状态" :formatter="status" width="100" align="center" />
              <el-table-column label="查看详情" align="center" width="100">
                  <template slot-scope="scope" >
                      <el-button type="text" >
                        <a @click="handleCheck(scope.row)" style="color: #1890ff;">查看详情</a>
                        </el-button>
                   </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="安全事件" name="third">
            <el-table
              ref="securityTable"
              :data="securityIncidentList"
              border
              tooltip-effect="dark"
              style="width: 100%;"
              :header-cell-style="getCellStyle"
              class="table-hxxd"
            >
              <el-table-column prop="salesAgentId" label="代理人社会信用代码" width="200" align="center" :show-overflow-tooltip="true" />
              <el-table-column prop="salesAgent" label="代理人公司名称" width="200" align="center" :show-overflow-tooltip="true"  />
              <el-table-column prop="airlineCompany" label="航空公司名称" width="100" align="center" :show-overflow-tooltip="true" />
              <el-table-column prop="businessCategory" label="业务类别" width="100" align="center" :formatter="releaseStatus" />
              <el-table-column prop="validityAgreement" label="协议有效期" width="100" align="center" />
              <el-table-column prop="punishmentType" label="处罚类型" width="100" align="center" :formatter="punishCategory" />
              <el-table-column prop="signAirlinesTwoWordCord" label="签约航空公司两字代码" width="100" align="center" />
              <el-table-column prop="punishmentReasons" label="处罚原因" width="206" align="center" :show-overflow-tooltip="true" />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="经营异常" name="fourth">
            <el-table
              ref="abnormalTable"
              :data="abnormalOperationList"
              border
              tooltip-effect="dark"
              style="width: 100%;"
              :header-cell-style="getCellStyle"
              class="table-hxxd"
            >
              <el-table-column prop="inclusionDirectoryReason" label="列入名录原因" align="center" :show-overflow-tooltip="true" />
              <el-table-column prop="inclusionTime" label="列入日期" align="center" />
              <el-table-column prop="removeDirectoryReason" label="移出名录原因" :show-overflow-tooltip="true" align="center" />
              <el-table-column prop="removeTime" label="移出日期" align="center" />
              <el-table-column prop="implementedBy" label="执行单位" align="center" />
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="年报公示" name="fifth">
            <el-table
              ref="reportTable"
              :data="annualReportList"
              border
              tooltip-effect="dark"
              style="width: 100%;"
              :header-cell-style="getCellStyle"
              class="table-hxxd"
            >
              <el-table-column prop="businessName" label="企业名称" align="center"/>
              <el-table-column prop="annual" label="上报年份" align="center" />
              <el-table-column prop="enterpriseNature" label="企业性质" align="center" />
              <el-table-column prop="submitDate" label="填报时间" align="center"/>
              <el-table-column label="查看详情" align="center" >
                  <el-button type="text">
                    <a @click="handleReaport" style="color: #1890ff;">查看详情</a>
                  </el-button>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="签约信息" name="sixth">
            <el-table
              ref="signTable"
              :data="signList"
              border
              tooltip-effect="dark"
              style="width: 100%;"
              :header-cell-style="getCellStyle"
              class="table-hxxd"
            >
              <el-table-column type="index" label="序号" align="center"/>
              <el-table-column prop="signAirLine" label="航空公司名称" align="center"/>
              <el-table-column prop="businessType" label="业务类别" align="center"/>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <footer-reload />
  </div>
</template>
<script>
import { selectComponyRelevent , confirmMembershipBySocialCreditCode} from "@/api/hxxd/agent";
import HeaderReload from '@/components/HeaderReload'
import FooterReload from '@/components/FooterReload'

export default {
  components: { FooterReload, HeaderReload },
  data() {
    return {
      tabShow:'false',
      Height: 0,
      activeName: "first",
      businessName: '',
      componyCode: '',
      tableData: [],
      abnormalOperationList: [],
      annualReportList: [],
      signList: [],
      socialCode: '',
      legalName: '',
      bureauCommerce: '',
      disabled: true,
      ceshiOptions: "",
      tabView: "info1",
      hxXdCompanyInfoParam: {
        businessName: "",
        businessNameEn: "",
        businessAddress: "",
        enterpriseNature: "",
        province: "",
        area: "",
        socialCode: "",
        bureauCommerce: "",
        orgCode: "",
        codeCertiAuth: "",
        travelLicense: "",
        licenseNo: "",
        name: "",
        investmentAmount: "",
        currencyType: "",
        investmentsRatio: "",
        manageModel: ''
      },
      fileList: [],
      complaintList: [],
      securityIncidentList: []
    };
  },
  created() {
    //初始化页面时
    var socialCode = this.$route.query.socialCreditCode
    if (socialCode) {
      //isMember判断是否为会员，是会员则显示页面 tabShow 为 true isMember(socialCode); tabs 加:v-if="tabShow"
      this.isMember(socialCode);
      
     
    }
  },
  mounted() {
    this.Height = document.documentElement.clientHeight - 194;
    if (this.Height < 520) {
      this.Height = 520
    }
　　//监听浏览器窗口变化
    window.onresize = ()=> {this.Height = document.documentElement.clientHeight -194}
  },
  methods: {
      isMember(socialCode) {
        confirmMembershipBySocialCreditCode(socialCode).then(response => {
        this.tabShow = response.data
        if(this.tabShow){
          this.getList(socialCode)
        }else{
          this.$message({
          type: "info",
          message: "暂无法提供非会员信息!"
        });
        }
      })
    },
    releaseStatus(row, column, cellValue, index) {
      let status = row.businessCategory
      if (status === '1') {
        return '业务类别1'
      } else if (status === '2') {
        return '业务类别2'
      } else {
        return row.businessCategory
      }
    },
    punishCategory(row, column, cellValue, index) {
      const punishmentType = row.punishmentType
      if (punishmentType === '1') {
        return '警告'
      } else if (punishmentType === '2') {
        return '罚款'
      } else {
        return row.punishmentType
      }
    },
    getCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background: #f8fbff;font-size: 13px;color: #333;font-weight: normal'
      } else {
        return ''
      }
    },
    handleReaport() {
      this.$router.push({ path: '/anonw/firmReaport', query: {  id: this.componyCode  }})
      // let routeData = this.$router.resolve({ path: '/firmReaport', query: { id: this.componyCode }})
      // window.open(routeData.href, '_blank');
    },
    handleCheck(row){
     const id= row.id
      this.$router.push({ path: '/anonw/firstComplaintDetails', query: {  id: id }})
    },
    status(row, column, cellValue, index) {
      const spState = row.status
      if (spState === 0) {
        return '未处理'
      } else if (spState === 1) {
        return '已处理'
      } else {
        return row.status
      }
    },
    businessCategory(row, column, cellValue, index) {
      const spState = row.businessCategory
      if (spState === 0) {
        return '未处理'
      } else if (spState === 1) {
        return '已处理'
      } else {
        return row.businessCategory
      }
    },
    punishmentType(row, column, cellValue, index) {
      const spState = row.punishmentType
      if (spState === 0) {
        return '未处理'
      } else if (spState === 1) {
        return '已处理'
      } else {
        return row.punishmentType
      }
    },
    getList(socialCode) {
      selectComponyRelevent(socialCode).then(response => {
        this.hxXdCompanyInfoParam = response.data
        this.tableData = response.data.hxXdInvestorInfoVOList
        this.abnormalOperationList = response.data.abnormalOperationList
        this.annualReportList = response.data.annualReportList
        this.signList = response.data.signList
        this.complaintList = response.data.complaintList
        this.securityIncidentList = response.data.securityIncidentList
        this.businessName = response.data.businessName
        this.socialCode = response.data.socialCode
        this.legalName = response.data.legalName
        this.bureauCommerce = response.data.bureauCommerce
        if(this.annualReportList !=null){
          this.componyCode = this.annualReportList[0].id
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~@/styles/register.scss';
@import '~@/styles/hxxd.scss';

.detailsContainer {
  *[data-v-5e85d00e] {
    font-weight: normal;
    color:#606266;
}
    .table_firmInfo tr th[data-v-5e85d00e] {
    font-weight: normal;
}
  .table_firmInfo tr td[data-v-5e85d00e] {
    color: #606266
}
  .basic_info {
    text-align: left;
    margin-bottom: 15px;
    h1 {
      font-weight: bolder;
      line-height: 35px;
      font-size: 25px;
    }
    p {
      font-size: 14px;
      line-height: 20px;
      color: #979797;
      b {
        font-size: 14px;
        font-weight: bolder;
        color: #3f3f3f;
      }
    }
  }
  .el-form-item__content {
    text-align: left !important;
  }
}

</style>
