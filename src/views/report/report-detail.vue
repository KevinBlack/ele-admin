<template>
  <el-card class="detailsContainer">
    <el-row>
      <!-- 年报信息录入 -->
      <el-row :gutter="10">
        <el-col :span="24">
          <h5 class="dtl-title-line">基本信息</h5>
        </el-col>
      </el-row>

      <el-form
        ref="ruleForm"
        :model="hxXdAnnualReportParam"
        label-width="135px"
        size="mini"
        :disabled="true"
      >
        <el-row class='line_bottom'>
          <el-col :span="12">
            <el-form-item label="企业名称" prop="businessName">
              <el-input v-model="hxXdAnnualReportParam.businessName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="英文名称" prop="businessNameEn">
              <el-input v-model="hxXdAnnualReportParam.businessNameEn" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="经营地址" prop="businessAddress">
              <el-input v-model="hxXdAnnualReportParam.businessAddress" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="企业性质" prop="enterpriseNature">
              <el-input v-model="hxXdAnnualReportParam.enterpriseNature" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业网址" prop="enterpriseWeb">
              <el-input v-model="hxXdAnnualReportParam.enterpriseWeb" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="工商登记机关" prop="bureauCommerce">
              <el-input v-model="hxXdAnnualReportParam.bureauCommerce" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="工商注册号" prop="businessRegistNum">
              <el-input v-model="hxXdAnnualReportParam.businessRegistNum" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="组织机构代码" prop="orgCode">
              <el-input v-model="hxXdAnnualReportParam.orgCode" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="代码证颁发机关" prop="codeCertAuth">
              <el-input v-model="hxXdAnnualReportParam.codeCertAuth" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="注册资本" prop="registeredCapital">
              <el-input v-model="hxXdAnnualReportParam.registeredCapital" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="业务负责人" prop="businessHead">
              <el-input v-model="hxXdAnnualReportParam.businessHead" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="公司电话" prop="companyPhone">
              <el-input v-model="hxXdAnnualReportParam.companyPhone" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="公司传真" prop="companyFax">
              <el-input v-model="hxXdAnnualReportParam.companyFax" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="法定代表人" prop="legalRepresentative">
              <el-input v-model="hxXdAnnualReportParam.legalRepresentative" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="一类office号" prop="officeClass1">
              <el-input v-model="hxXdAnnualReportParam.officeClass1" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="二类office号" prop="officeClass2">
              <el-input v-model="hxXdAnnualReportParam.officeClass2" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 投资人信息 -->
        <el-row class='line_bottom'>
          <el-col :span="24">
            <h5 class="dtl-title-line bg-font-color">投资人信息</h5>
          </el-col>
        </el-row>
        <!-- 资质认可信息 -->
        <el-row class='line_bottom'>
          <el-col :span="24">
            <h5 class="dtl-title-line bg-font-color">资质认可信息</h5>
          </el-col>
        </el-row>
        <!-- 从业人员信息 -->
        <el-row :gutter="10">
          <el-col :span="24">
            <h5 class="dtl-title-line bg-font-color">从业人员信息</h5>
          </el-col>
        </el-row>
        <el-row class='line_bottom'>
          <el-col :span="6">
            <el-form-item label="从业人员总数" prop="totalNumber">
              <el-input v-model="hxXdAnnualReportParam.totalNumber" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="女员工人数" prop="femaleEmployeesNum">
              <el-input v-model="hxXdAnnualReportParam.femaleEmployeesNum" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="合同工人数" prop="contractWorkersNum">
              <el-input v-model="hxXdAnnualReportParam.contractWorkersNum" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="派遣工人数" prop="dispatchedWorkersNum">
              <el-input v-model="hxXdAnnualReportParam.dispatchedWorkersNum" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="懂外语人数" prop="foreignLangNum">
              <el-input v-model="hxXdAnnualReportParam.foreignLangNum" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="持有岗位证书人数" prop="postCertNum">
              <el-input v-model="hxXdAnnualReportParam.postCertNum" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="高中以下" prop="belowHighNum">
              <el-input v-model="hxXdAnnualReportParam.belowHighNum" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="专科" prop="juniorCollegeNum">
              <el-input v-model="hxXdAnnualReportParam.juniorCollegeNum" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="本科" prop="undergraduateNum">
              <el-input v-model="hxXdAnnualReportParam.undergraduateNum" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="硕士及以上" prop="aboveMasterNum">
              <el-input v-model="hxXdAnnualReportParam.aboveMasterNum" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="20-30岁" prop="age20to30Num">
              <el-input v-model="hxXdAnnualReportParam.age20to30Num" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="30-40岁" prop="age30to40Num">
              <el-input v-model="hxXdAnnualReportParam.age30to40Num" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="40-50岁" prop="age40to50Num">
              <el-input v-model="hxXdAnnualReportParam.age40to50Num" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="50岁以上" prop="ageAbove50Num">
              <el-input v-model="hxXdAnnualReportParam.ageAbove50Num" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 岗位证书信息 -->
        <el-row :gutter="10">
          <el-col :span="24">
            <h5 class="dtl-title-line bg-font-color">岗位证书信息</h5>
          </el-col>
        </el-row>
        <el-row class='line_bottom'>
          <el-col :span="6">
            <el-form-item label="国内岗位技能证书" prop="homeSkillsCert1">
              <el-input v-model="hxXdAnnualReportParam.homeSkillsCert1" />
              <el-input v-model="hxXdAnnualReportParam.homeSkillsCert2" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="国际岗位技能证书" prop="interSkillsCert1">
              <el-input v-model="hxXdAnnualReportParam.interSkillsCert1" />
              <el-input v-model="hxXdAnnualReportParam.interSkillsCert2" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="危险品运输证书" prop="dangerGoodsCert">
              <el-input v-model="hxXdAnnualReportParam.dangerGoodsCert" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="安保培训证书" prop="securityTrainCert">
              <el-input v-model="hxXdAnnualReportParam.securityTrainCert" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="其他证书" prop="otherCert">
              <el-input v-model="hxXdAnnualReportParam.otherCert" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 经营状况（万元/万张/万吨） -->
        <el-row :gutter="10">
          <el-col :span="24">
            <h5 class="dtl-title-line bg-font-color">经营状况（万元/万张/万吨）</h5>
          </el-col>
        </el-row>
        <el-row class='line_bottom'>
          <el-col :span="6">
            <el-form-item label="国内客运" prop="homeTransNum">
              <el-input v-model="hxXdAnnualReportParam.homeTransNum" />
              <el-input v-model="hxXdAnnualReportParam.homeTransMoney" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="国际客运" prop="interTransNum">
              <el-input v-model="hxXdAnnualReportParam.interTransNum" />
              <el-input v-model="hxXdAnnualReportParam.interTransMoney" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="其中外航承运张数" prop="acceptCarrNum">
              <el-input v-model="hxXdAnnualReportParam.acceptCarrNum" />
              <el-input v-model="hxXdAnnualReportParam.acceptCarrMoney" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客运总计" prop="totalPassengerNum">
              <el-input v-model="hxXdAnnualReportParam.totalPassengerNum" />
              <el-input v-model="hxXdAnnualReportParam.totalPassengerMoney" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="国内货运" prop="homeFreightTon">
              <el-input v-model="hxXdAnnualReportParam.homeFreightTon" />
              <el-input v-model="hxXdAnnualReportParam.homeFreightMoney" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="国际货运" prop="interFreightTon">
              <el-input v-model="hxXdAnnualReportParam.interFreightTon" />
              <el-input v-model="hxXdAnnualReportParam.interFreightMoney" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="其中外航承运吨数" prop="carryTon">
              <el-input v-model="hxXdAnnualReportParam.carryTon" />
              <el-input v-model="hxXdAnnualReportParam.carryMoney" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="货运总计" prop="freightTon">
              <el-input v-model="hxXdAnnualReportParam.freightTon" />
              <el-input v-model="hxXdAnnualReportParam.freightMoney" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="已签订代理协议得航空公司二字代码" prop="airlineCode">
              <el-input v-model="hxXdAnnualReportParam.airlineCode" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 财务状况（万元） -->
        <el-row :gutter="10">
          <el-col :span="24">
            <h5 class="dtl-title-line bg-font-color">财务状况（万元）</h5>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="资产总额" prop="generalAssets">
              <el-input v-model="hxXdAnnualReportParam.generalAssets" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="负债总额" prop="totalIndebt">
              <el-input v-model="hxXdAnnualReportParam.totalIndebt" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所有者权益" prop="ownerEquity">
              <el-input v-model="hxXdAnnualReportParam.ownerEquity" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="利润总额" prop="totalProfit">
              <el-input v-model="hxXdAnnualReportParam.totalProfit" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 按钮区 -->
      <!-- <el-row :gutter="10">
        <el-col :span="22" style="text-align:right;margin-top:20px;">
          <el-button type="primary" size="mini" @click="goback">返回列表</el-button>
        </el-col>
      </el-row> -->
    </el-row>
  </el-card>
</template>

<script>
import { getReportInfoById } from "@/api/hxxd/agent";
export default {
  name: 'ReportDetail',
  data() {
    return {
      hxXdAnnualReportParam: {
        businessName: "",
        businessNameEn: "",
        businessAddress: "",
        enterpriseNature: "",
        enterpriseWeb: "",
        bureauCommerce: "",
        businessRegistNum: "",
        orgCode: "",
        codeCertAuth: "",
        registeredCapital: "",
        businessHead: "",
        companyPhone: "",
        companyFax: "",
        legalRepresentative: "",
        officeClass1: "",
        officeClass2: "",
        totalNumber: "",
        femaleEmployeesNum: "",
        contractWorkersNum: "",
        dispatchedWorkersNum: "",
        foreignLangNum: "",
        postCertNum: "",
        belowHighNum: "",
        juniorCollegeNum: "",
        undergraduateNum: "",
        aboveMasterNum: "",
        age20to30Num: "",
        age30to40Num: "",
        age40to50Num: "",
        ageAbove50Num: "",
        homeSkillsCert1: "",
        homeSkillsCert2: "",
        interSkillsCert1: "",
        interSkillsCert2: "",
        dangerGoodsCert: "",
        securityTrainCert: "",
        otherCert: "",
        homeTransNum: "",
        homeTransMoney: "",
        interTransNum: "",
        interTransMoney: "",
        acceptCarrNum: "",
        acceptCarrMoney: "",
        totalPassengerNum: "",
        totalPassengerMoney: "",
        homeFreightTon: "",
        homeFreightMoney: "",
        interFreightTon: "",
        interFreightMoney: "",
        carryTon: "",
        carryMoney: "",
        freightTon: "",
        freightMoney: "",
        airlineCode: "",
        generalAssets: "",
        totalIndebt: "",
        ownerEquity: "",
        totalProfit: ""
      }
    };
  },
  created() {
    //初始化页面时
    // 参数传递 router.push({ path: 'register', query: { plan: 'private' }})
    // 参数接受 let id = this.$route.query.jId;
    let id = this.$route.query.id;
    debugger;
    if (id) {
      this.getReportInfoById(id);
   }
  },
  methods: {
    goback(){
      this.$router.push({
            path: "/agent/annual_report_query",
            query: { flag: "1" }
          });
    },
    //年报信息保存
    getReportInfoById(id) {
       this.hxXdAnnualReportParam.id=id;
      getReportInfoById(this.hxXdAnnualReportParam).then(response => {
        debugger;
      debugger;
        this.hxXdAnnualReportParam = response.data;
      });
    }
  }
};
</script>
<style>
 @import '../../styles/hxxd.scss';
</style>
