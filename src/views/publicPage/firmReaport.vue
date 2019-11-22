<template>
<div class="app-wrapper">
  <header-reload />
  <div class="contont-main" v-bind:style="{minHeight: Height+'px'}">
      <el-card class="detailsContainer">
        <el-row>
          <el-col>
            <h1>2018年报</h1>
            <p style="text-align: right;">填报日期:2018-01-12</p>
            <table class="table_firmInfo">
              <tr>
                <th rowspan="9" width="100">基本信息</th>
                <th width="200">企业名称</th>
                <td colspan="3">{{ businessName }}</td>
              </tr>
              <tr>
                <th>法定代表人</th>
                <td>{{ name }}</td>
                <th>企业性质</th>
                <td>{{ enterpriseNature }}</td>
              </tr>
              <tr>
                <th>地址</th>
                <td colspan="3">{{ businessAddress }}</td>
              </tr>
              <tr>
                <th>企业网址</th>
                <td colspan="3">{{ enterpriseWeb }}</td>
              </tr>
              <tr>
                <th>工商注册号</th>
                <td>{{ businessRegistNum }}</td>
                <th>工商登记机关</th>
                <td>{{ bureauCommerce }}</td>
              </tr>
              <tr>
                <th>组织机构代码	</th>
                <td>{{ orgCode }}</td>
                <th>代码证颁发机关</th>
                <td>{{ codeCertiAuth }}</td>
              </tr>
              <tr>
                <th>注册资本（万元）</th>
                <td>{{ registeredCapital }}</td>
                <th>业务负责人</th>
                <td>{{ businessHead }}</td>
              </tr>
              <tr>
                <th>公司电话</th>
                <td>{{ companyPhone }}</td>
                <th>公司传真</th>
                <td>{{ companyFax }}</td>
              </tr>
              <tr>
                <th>一类office号</th>
                <td>{{ officeClass1 }}</td>
                <th>二类office号	</th>
                <td>{{ officeClass2 }}</td>
              </tr>
            </table>
            <table class="table_firmInfo">
              <tr>
                <th rowspan="2" width="100">投资人信息</th>
                <th width="200">投资人类型</th>
                <th>投资人名称</th>
                <th>证照/证件号码</th>
                <th>投资金额(万元)</th>
                <th>货币类型</th>
                <th>投资比例</th>
              </tr>
              <tr>
                <td>{{ investorType }}</td>
                <td>{{ investorName }}</td>
                <td>{{ certificateNum }}</td>
                <td>{{ investmentAmount }}</td>
                <td>{{ currencyType }}</td>
                <td>{{ investmentsRatio }}</td>
              </tr>
            </table>
            <el-table class="table_firmInfo" :data="hxXdReportRecognitionParamList">
              <el-table-column label="资质认可信息" width="100"></el-table-column>
              <el-table-column>
                <el-table-column prop="industryType" width="200" label="资质认可号" align="center"></el-table-column>
                <el-table-column prop="industryType" label="资质类别" align="center"></el-table-column>
                <el-table-column prop="industryType" colspan="2" label="有效期起止" align="center"></el-table-column>
                <el-table-column prop="industryType" label="状态" align="center"></el-table-column>
              </el-table-column>
            </el-table>
            <table class="table_firmInfo">
              <tr>
                <th rowspan="7" width="100">从业人员信息</th>
                <th width="200">从业人员总数</th>
                <td colspan="2">{{ totalNumber }}</td>
                <th>女员工人数</th>
                <td colspan="2">{{ femaleEmployeesNum }}</td>
              </tr>
              <tr>
                <th>合同工人数</th>
                <td colspan="2">{{ contractWorkersNum }}</td>
                <th>派遣工人数</th>
                <td colspan="2">{{ dispatchedWorkersNum }}</td>
              </tr>
              <tr>
                <th>懂外语人数</th>
                <td colspan="2">{{ foreignLangNum }}</td>
                <th>持有岗位证书人数</th>
                <td colspan="2">{{ postCertNum }}</td>
              </tr>
              <tr>
                <th rowspan="4">学历构成</th>
                <th>高中以下</th>
                <td>{{ belowHighNum }}</td>
                <th rowspan="4">年龄构成</th>
                <th>20-30岁</th>
                <td>{{ age20to30Num }}</td>
              </tr>
              <tr>
                <th>专科</th>
                <td>{{ juniorCollegeNum }}</td>
                <th>30-40岁</th>
                <td>{{ age30to40Num }}</td>
              </tr>
              <tr>
                <th>本科</th>
                <td>{{ undergraduateNum }}</td>
                <th>40-50岁</th>
                <td>{{ age40to50Num }}</td>
              </tr>
              <tr>
                <th>硕士及以上</th>
                <td>{{ aboveMasterNum }}</td>
                <th>50岁以上</th>
                <td>{{ ageAbove50Num }}</td>
              </tr>
            </table>
            <table class="table_firmInfo">
              <tr>
                <th rowspan="3" width="100">岗位证书信息</th>
                <th width="200">国内岗位技能证书1</th>
                <td>{{ homeSkillsCert1 }}</td>
                <th>国内岗位技能证书2</th>
                <td>{{ homeSkillsCert2 }}</td>
                <th>国际岗位技能证书1</th>
                <td>{{ interSkillsCert1 }}</td>
                <th>国际岗位技能证书2</th>
                <td>{{ interSkillsCert2 }}</td>
              </tr>
              <tr>
                <th>危险品运输证书</th>
                <td colspan="3">{{ dangerGoodsCert }}</td>
                <th>安保培训证书</th>
                <td colspan="3">{{ securityTrainCert }}</td>
              </tr>
              <tr>
                <th>其他证书</th>
                <td colspan="9">{{ otherCert }}</td>
              </tr>
            </table>
            <table class="table_firmInfo">
              <tr>
                <th rowspan="9" width="100">经营情况<br />（万元/万张/万吨）</th>
                <th width="200">国内客运</th>
                <th>客票张数</th>
                <td>{{ homeTransNum }}</td>
                <th>销售金额</th>
                <td>{{ homeTransMoney }}</td>
              </tr>
              <tr>
                <th rowspan="2">国际客运</th>
                <th>客票张数</th>
                <td>{{ interTransNum }}</td>
                <th>销售金额</th>
                <td>{{ interTransMoney }}</td>
              </tr>
              <tr>
                <th>其中外航承运张数</th>
                <td>{{ acceptCarrNum }}</td>
                <th>销售金额</th>
                <td>{{ acceptCarrMoney }}</td>
              </tr>
              <tr>
                <th>客运总计</th>
                <th>客票张数</th>
                <td>{{ totalPassengerNum }}</td>
                <th>销售金额</th>
                <td>{{ totalPassengerMoney }}</td>
              </tr>
              <tr>
                <th>国内货运</th>
                <th>货运吨数</th>
                <td>{{ homeFreightTon }}</td>
                <th>销售金额</th>
                <td>{{ homeFreightMoney }}</td>
              </tr>
              <tr>
                <th rowspan="2">国际货运</th>
                <th>货运吨数</th>
                <td>{{ interFreightTon }}</td>
                <th>销售金额</th>
                <td>{{ interFreightMoney }}</td>
              </tr>
              <tr>
                <th>其中外航承运吨数</th>
                <td>{{ carryTon }}</td>
                <th>销售金额</th>
                <td>{{ carryMoney }}</td>
              </tr>
              <tr>
                <th>货运总计</th>
                <th>货运吨数</th>
                <td>{{ freightTon }}</td>
                <th>销售金额</th>
                <td>{{ freightMoney }}</td>
              </tr>
              <tr>
                <th colspan="2">已签订代理协议的航空公司二字代码</th>
                <td colspan="4">{{ airlineCode }}</td>
              </tr>
            </table>
            <table class="table_firmInfo">
              <tr>
                <th rowspan="4" width="100">财务情况<br />（万元）</th>
                <th width="200">资产总额</th>
                <td>{{ generalAssets }}</td>
              </tr>
              <tr>
                <th>负债总额</th>
                <td>{{ totalIndebt }}</td>
              </tr>
              <tr>
                <th>所有者权益</th>
                <td>{{ ownerEquity }}</td>
              </tr>
              <tr>
                <th>利润总额</th>
                <td>{{ totalProfit }}</td>
              </tr>
            </table>
            <p style="text-align: left;">
              <b>备注：1、此信息以企业年报年度12月31日的数据为准进行填报；</b><br />
              <b>2、此信息为该企业的最新年报数据；</b><br />
              <b>3、此信息由该企业提供，企业对其公示信息的真实性、合法性负责。</b>
            </p>
          </el-col>
        </el-row>
      </el-card>
  </div>
  <footer-reload />
</div>
</template>

<script>
import HeaderReload from '@/components/HeaderReload'
import FooterReload from '@/components/FooterReload'
import { query } from "@/api/hxxd/agent";

export default {
  components: { FooterReload, HeaderReload },
  data() {
    return {
      Height: 0,
      reportQuery: {
        aboveMasterNum: '',
        acceptCarrMoney: '',
        acceptCarrNum: '',
        age20to30Num: '',
        age30to40Num: '',
        age40to50Num: '',
        ageAbove50Num: '',
        airlineCode: '',
        belowHighNum: '',
        bureauCommerce: '',
        businessAddress: '',
        businessHead: '',
        businessName: '',
        businessNameEn: '',
        businessRegistNum: '',
        carryMoney: '',
        carryTon: '',
        codeCertAuth: '',
        companyFax: '',
        companyPhone: '',
        contractWorkersNum: '',
        createBy: '',
        createDate: '',
        dangerGoodsCert: '',
        dispatchedWorkersNum: '',
        enterpriseNature: '',
        enterpriseWeb: '',
        femaleEmployeesNum: '',
        foreignLangNum: '',
        freightMoney: '',
        freightTon: '',
        generalAssets: '',
        homeFreightMoney: '',
        homeFreightTon: '',
        homeSkillsCert1: '',
        homeSkillsCert2: '',
        homeTransMoney: '',
        homeTransNum: '',
        hxXdReportInvestorParamList: [],
        hxXdReportRecognitionParamList: [],
        id: '',
        interFreightMoney: '',
        interFreightTon: '',
        interSkillsCert1: '',
        interSkillsCert2: '',
        interTransMoney: '',
        interTransNum: '',
        isDelete: '',
        isPub: '',
        juniorCollegeNum: '',
        legalRepresentative: '',
        officeClass1: '',
        officeClass2: '',
        orgCode: '',
        otherCert: '',
        ownerEquity: '',
        postCertNum: '',
        registeredCapital: '',
        securityTrainCert: '',
        totalIndebt: '',
        totalNumber: '',
        totalPassengerMoney: '',
        totalPassengerNum: '',
        totalProfit: '',
        undergraduateNum: '',
        updateBy: '',
        updateDate: '',
      }
    }
  },
  created() {
    //初始化页面时
    const id = this.$route.query.id
    if (id) {
      this.getList(id)
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
    getList(id) {
      query(id).then(response => {
        console.log(response.data)
        this.reportQuery = response.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/register.scss';
@import '~@/styles/hxxd.scss';
.detailsContainer {
  h1 {
    font-weight: bolder;
    font-size: 30px;
    line-height: 60px;
  }
  p {
    b {
      line-height: 30px;
      color: #c75151;
    }
  }
}
</style>
