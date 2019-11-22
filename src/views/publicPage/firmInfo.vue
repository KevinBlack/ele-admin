<template>
  <div class="app-wrapper">
    <header-reload />
    <div class="contont-main" v-bind:style="{minHeight: Height+'px'}">
      <el-card class="detailsContainer">
        <el-row :gutter="20" class="area_border">
          <el-col :span="4"><img src="../../assets/img/yyzz.jpg" height="100px"></el-col>
          <el-col :span="20" class="basic_info">
            <h1>{{ businessName }}</h1>
            <p><b>统一社会信用代码：</b>{{ socialCode }}</p>
            <p><b>法定代表人：</b>{{ legalName }}</p>
            <p><b>登记机关：</b>{{ bureauCommerce }}</p>
          </el-col>
        </el-row>
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="基础信息" name="first">
            <el-row>
              <el-col :span="24">
                <h5 class="dtl-title-line">企业信息</h5>
              </el-col>
              <el-col :span="24">
                <table class="table_firmInfo">
                  <tr>
                    <th width="120">企业名称</th>
                    <td colspan="3">
                      {{ hxXdCompanyInfoParam.businessName }}
                    </td>
                    <th width="150">英文名称</th>
                    <td>
                      {{ hxXdCompanyInfoParam.businessNameEn }}
                    </td>
                    <th width="120">经营模式</th>
                    <td>
                      {{ hxXdCompanyInfoParam.manageModel }}
                    </td>
                  </tr>
                  <tr>
                    <th>经营地址</th>
                    <td colspan="3">
                      {{ hxXdCompanyInfoParam.businessAddress }}
                    </td>
                    <th>企业性质</th>
                    <td colspan="3">
                      {{ hxXdCompanyInfoParam.enterpriseNature }}
                    </td>
                  </tr>
                  <tr>
                    <th width="80">所属省份</th>
                    <td>
                      {{ hxXdCompanyInfoParam.province }}
                    </td>
                    <th>所属地区</th>
                    <td>
                      {{ hxXdCompanyInfoParam.area }}
                    </td>
                    <th>统一社会信用代码</th>
                    <td>
                      {{ hxXdCompanyInfoParam.socialCode }}
                    </td>
                    <th>工商登记机关</th>
                    <td>
                      {{ hxXdCompanyInfoParam.bureauCommerce }}
                    </td>
                  </tr>
                  <tr>
                    <th>组织机构代码</th>
                    <td>
                      {{ hxXdCompanyInfoParam.orgCode }}
                    </td>
                    <th>代码证颁发机关</th>
                    <td>
                      {{ hxXdCompanyInfoParam.codeCertiAuth }}
                    </td>
                    <th>旅行社经营许可证</th>
                    <td>
                      {{ hxXdCompanyInfoParam.travelLicense }}
                    </td>
                    <th>营业执照</th>
                    <td>
                      {{ hxXdCompanyInfoParam.licenseNo }}
                    </td>
                  </tr>
                  <tr>
                    <th>法人</th>
                    <td>
                      {{ hxXdCompanyInfoParam.name }}
                    </td>
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
            <el-row>
              <el-table
                ref="complaintTable"
                :data="complaintList"
                border
                tooltip-effect="dark"
                style="width: 100%;"
                :header-cell-style="getCellStyle"
                class="table-hxxd"
              >
                <el-table-column prop="complaintsContents" label="投诉内容" width="350" align="center" :show-overflow-tooltip="true" />
                <el-table-column prop="complainant" label="投诉人" width="100" align="center" />
                <el-table-column prop="status" label="状态" :formatter="status" width="100" align="center" />
                <el-table-column prop="remark" label="备注" width="255" align="center" :show-overflow-tooltip="true" />
                <el-table-column prop="handlePerson" label="处理人" width="100" align="center" />
                <el-table-column prop="complaintType" label="投诉公司" width="200" align="center" :show-overflow-tooltip="true" />
              </el-table>
            </el-row>
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
              <el-table-column prop="salesAgentId" label="代理人社会信用代码" align="center" :show-overflow-tooltip="true" />
              <el-table-column prop="salesAgent" label="代理人公司名称" align="center" />
              <el-table-column prop="releaseStatus" label="发布状态" align="center":formatter="releaseStatus" />
              <el-table-column prop="airlineCompany" label="航空公司名称" align="center" :show-overflow-tooltip="true" />
              <el-table-column prop="businessCategory" label="业务类型" align="center" :formatter="businessCategory" />
              <el-table-column prop="unifiedCreditCode" label="统一社会信用代码" align="center" :show-overflow-tooltip="true" />
              <el-table-column prop="validityAgreement" label="协议有效期" align="center" />
              <el-table-column prop="punishmentType" label="处罚类型" align="center" :formatter="punishmentType" />
              <el-table-column prop="punishmentReasons" label="处罚原因" align="center" :show-overflow-tooltip="true" />
              <el-table-column prop="signAirlinesTwoWordCord" label="签约航空公司两字代码" align="center" />
              <el-table-column prop="airlineCompanyId" label="航空公司社会信用代码" align="center" :show-overflow-tooltip="true" />
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
              <el-table-column prop="reportYear" label="上报年份" align="center" />
              <el-table-column prop="enterpriseNature" label="企业性质" align="center" />
              <el-table-column prop="reportTime" label="填报时间" align="center"/>
              <el-table-column label="查看详情" align="center" >
                <template slot-scope="scope">
                  <el-button type="text" @click="handleReaport">查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <footer-reload />
    </el-row>
  </div>
</template>
<script>
import { selectComponyRelevent } from "@/api/hxxd/agent";
import HeaderReload from '@/components/HeaderReload'
import FooterReload from '@/components/FooterReload'

export default {
  components: { FooterReload, HeaderReload },
  data() {
    return {
      Height: 0,
      activeName: "first",
      businessName: '',
      componyCode: '',
      tableData: [],
      abnormalOperationList: [],
      annualReportList: [],
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
      complaintList: [{
        complaintsContents: '',
        complainant: '',
        status: 0,
        remark: '',
        handlePerson: '',
        complaintType: ''
      }],
      securityIncidentList: {
        salesAgentId: "",
        salesAgent: "",
        airlineCompanyId: 0,
        airlineCompany: "",
        businessCategory: "",
        unifiedCreditCode: "",
        validityAgreement: "",
        signAirlinesTwoWordCord: "",
        punishmentType: "",
        punishmentReasons: "",
        releaseStatus: ""
      }
    };
  },
  created() {
    //初始化页面时
    var socialCode = this.$route.query.socialCreditCode
    console.log(this.$route.query.socialCreditCode)
    if (socialCode) {
      this.getList(socialCode)
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
    getCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background: #F2F2F2;font-size: 13px;color: #333;font-weight: normal'
      } else {
        return ''
      }
    },
    handleReaport() {
      let routeData = this.$router.resolve({ path: '/firmReaport', query: { id: this.componyCode }})
      window.open(routeData.href, '_blank');
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
    releaseStatus(row, column, cellValue, index) {
      const spState = row.releaseStatus
      if (spState === 0) {
        return '未处理'
      } else if (spState === 1) {
        return '已处理'
      } else {
        return row.releaseStatus
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
    handleClick(tab, event) {
      console.log(tab, event)
    },
    getList(socialCode) {
      selectComponyRelevent(socialCode).then(response => {
        console.log(response)
        this.hxXdCompanyInfoParam = response.data
        this.tableData = response.data.hxXdInvestorInfoVOList
        this.abnormalOperationList = response.data.abnormalOperationList
        this.annualReportList = response.data.annualReportList
        this.complaintList = response.data.complaintList
        this.securityIncidentList = response.data.securityIncidentList
        this.businessName = response.data.businessName
        this.socialCode = response.data.socialCode
        this.legalName = response.data.legalName
        this.bureauCommerce = response.data.bureauCommerce
        this.componyCode = this.annualReportList[0].id
        console.log(this.componyCode)
      })
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~@/styles/register.scss';
@import '~@/styles/hxxd.scss';

.detailsContainer {
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
