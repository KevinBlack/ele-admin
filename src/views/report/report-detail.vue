<template>
  <el-card class="detailsContainer">
    <el-row>
      <!-- 年报信息录入 -->
      <el-row :gutter="10">
        <el-col :span="24">
          <h5 class="dtl-title-line bg-font-color">基本信息</h5>
        </el-col>
      </el-row>

      <el-form
        ref="ruleForm"
        :model="hxXdAnnualReportParam"
        label-width="135px"
        size="mini"
        :disabled="true"
      >
        <el-row :gutter="20">
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
          <el-col :span="6">
            <el-form-item label="企业性质" prop="enterpriseNature">
              <el-input v-model="hxXdAnnualReportParam.enterpriseNature" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="年报年份" prop="annual">
              <el-date-picker
                v-model="hxXdAnnualReportParam.annual"
                type="year"
                placeholder="请选择年份"
                format="yyyy"
                value-format="yyyy"
              >
              </el-date-picker>
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
        <el-row :gutter="10">
          <el-col :span="24">
            <h5 class="dtl-title-line bg-font-color">投资人信息</h5>
          </el-col>
        </el-row>
        <el-button
          style="margin-left: 10px;"
          type="primary"
          size="mini"
          icon="el-icon-plus"
          @click="addLine"
          >添加</el-button
        >
        <el-button
          style="margin-left: 10px;"
          type="primary"
          size="mini"
          icon="el-icon-edit"
          @click="handleDelete"
          >删除</el-button
        >
        <el-table
          ref="multipleTable"
          :data="reportInvestorList"
          style="width: 100%; margin-top: 20px;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50" />
          <el-table-column prop="investorType" label="投资人类型">
            <template slot-scope="scope">
              <el-input v-model="scope.row.investorType" class="edit-input" />
            </template>
          </el-table-column>
          <el-table-column prop="investorName" label="投资人名称">
            <template slot-scope="scope">
              <el-input v-model="scope.row.investorName" class="edit-input" />
            </template>
          </el-table-column>
          <el-table-column prop="certificateNum" label="证照/证件号码">
            <template slot-scope="scope">
              <el-input v-model="scope.row.certificateNum" class="edit-input" />
            </template>
          </el-table-column>
          <el-table-column prop="investmentAmount" label="投资金额（万元）">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.investmentAmount"
                class="edit-input"
              />
            </template>
          </el-table-column>
          <el-table-column prop="currencyType" label="货币类型">
            <template slot-scope="scope">
              <el-input v-model="scope.row.currencyType" class="edit-input" />
            </template>
          </el-table-column>
        </el-table>

        <!-- 代理航空公司信息 -->
        <el-row :gutter="10">
          <el-col :span="24">
            <h5 class="dtl-title-line bg-font-color">代理航空公司信息</h5>
          </el-col>
        </el-row>
        <el-button
          style="margin-left: 10px;"
          type="primary"
          size="mini"
          icon="el-icon-plus"
          @click="addLineAirLine"
          >添加</el-button
        >
        <el-button
          style="margin-left: 10px;"
          type="primary"
          size="mini"
          icon="el-icon-edit"
          @click="handleDeleteAirLine"
          >删除</el-button
        >
        <el-table
          ref="multipleTable"
          :data="agentAirLineList"
          style="width: 100%; margin-top: 20px;"
          @selection-change="handleSelectionChangeAirLine"
        >
          <el-table-column type="selection" width="50" />
          <el-table-column prop="airLineName" label="航空公司名称">
            <template slot-scope="scope">
              <el-input v-model="scope.row.airLineName" class="edit-input" />
            </template>
          </el-table-column>
          <el-table-column prop="airLineCode" label="航空公司二字码">
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.airLineCode" class="edit-input" /> -->
               <el-select
                    v-model="scope.row.airLineCode"
                    filterable
                    placeholder="请选择"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="item in airName"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
            </template>
          </el-table-column>
        </el-table>

        <!-- 从业人员信息 -->
        <el-row :gutter="10">
          <el-col :span="24">
            <h5 class="dtl-title-line bg-font-color">从业人员信息</h5>
          </el-col>
        </el-row>
        <el-row :gutter="20">
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
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="国内岗位技能证书" prop="homeSkillsCert1">
              <el-input
                class="double_ipt"
                v-model="hxXdAnnualReportParam.homeSkillsCert1"
                placeholder="客运/本"
              />
              <el-input
                class="double_ipt"
                v-model="hxXdAnnualReportParam.homeSkillsCert2"
                placeholder="货运/本"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="国际岗位技能证书" prop="interSkillsCert1">
              <el-input
                class="double_ipt"
                v-model="hxXdAnnualReportParam.interSkillsCert1"
                placeholder="客运/本"
              />
              <el-input
                class="double_ipt"
                v-model="hxXdAnnualReportParam.interSkillsCert2"
                placeholder="货运/本"
              />
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
            <h5 class="dtl-title-line bg-font-color">
              经营状况（万元/万张/万吨）
            </h5>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="国内客运" prop="homeTransNum">
              <el-input
                class="double_ipt"
                v-model="hxXdAnnualReportParam.homeTransNum"
                placeholder="客票张数/万张"
              />
              <el-input
                class="double_ipt"
                v-model="hxXdAnnualReportParam.homeTransMoney"
                placeholder="销售金额/万元"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="国际客运" prop="interTransNum">
              <el-input
                class="double_ipt"
                v-model="hxXdAnnualReportParam.interTransNum"
                placeholder="客票张数/万张"
              />
              <el-input
                class="double_ipt"
                v-model="hxXdAnnualReportParam.interTransMoney"
                placeholder="销售金额/万元"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="其中外航承运张数" prop="acceptCarrNum">
              <el-input
                class="double_ipt"
                v-model="hxXdAnnualReportParam.acceptCarrNum"
                placeholder="客票张数/万张"
              />
              <el-input
                class="double_ipt"
                v-model="hxXdAnnualReportParam.acceptCarrMoney"
                placeholder="销售金额/万元"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客运总计" prop="totalPassengerNum">
              <el-input
                class="double_ipt"
                v-model="hxXdAnnualReportParam.totalPassengerNum"
                placeholder="货运吨数/万吨"
              />
              <el-input
                class="double_ipt"
                v-model="hxXdAnnualReportParam.totalPassengerMoney"
                placeholder="销售金额/万元"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="国内货运" prop="homeFreightTon">
              <el-input
                class="double_ipt"
                v-model="hxXdAnnualReportParam.homeFreightTon"
                placeholder="货运吨数/万吨"
              />
              <el-input
                class="double_ipt"
                v-model="hxXdAnnualReportParam.homeFreightMoney"
                placeholder="销售金额/万元"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="国际货运" prop="interFreightTon">
              <el-input
                class="double_ipt"
                v-model="hxXdAnnualReportParam.interFreightTon"
                placeholder="货运吨数/万吨"
              />
              <el-input
                class="double_ipt"
                v-model="hxXdAnnualReportParam.interFreightMoney"
                placeholder="销售金额/万元"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="其中外航承运吨数" prop="carryTon">
              <el-input
                class="double_ipt"
                v-model="hxXdAnnualReportParam.carryTon"
                placeholder="货运吨数/万吨"
              />
              <el-input
                class="double_ipt"
                v-model="hxXdAnnualReportParam.carryMoney"
                placeholder="销售金额/万元"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="货运总计" prop="freightTon">
              <el-input
                class="double_ipt"
                v-model="hxXdAnnualReportParam.freightTon"
                placeholder="货运吨数/万吨"
              />
              <el-input
                class="double_ipt"
                v-model="hxXdAnnualReportParam.freightMoney"
                placeholder="销售金额/万元"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item
              label="已签订代理协议的航空公司二字代码"
              prop="airlineCode"
            >
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
        <el-row :gutter="20">
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
  name: "ReportDetail",
  data() {
    return {
       airName: [
        {
          value: "CA",
          label: "国际航空"
        },
        {
          value: "ZH",
          label: "深圳航空"
        },
        {
          value: "KY",
          label: "昆明航空"
        },
        {
          value: "TV",
          label: "山东航空"
        },
        {
          value: "MU",
          label: "西藏航空"
        }
      ],
      hxXdAnnualReportParam: {
        annual: "",
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
        totalProfit: "",
        hxXdReportInvestorParamList: [],
        hxXdAgentAirLineParamList: []
      },
      selectArr: [],
      reportInvestorList: [],
      agentAirLineList: [],
      selectArrAirLine: []
    };
  },
  created() {
    //初始化页面时
    let id = this.$route.query.id;
    if (id) {
      this.getReportInfoById(id);
    }
  },
  methods: {
    goback() {
      this.$router.push({
        path: "/agent/annual_report_query",
        query: { flag: "1" }
      });
    },
    //年报信息查询
    getReportInfoById(id) {
      this.hxXdAnnualReportParam.id = id;
      getReportInfoById(this.hxXdAnnualReportParam).then(response => {
        this.hxXdAnnualReportParam = response.data;
        this.reportInvestorList = this.hxXdAnnualReportParam.hxXdReportInvestorParamList;
        this.agentAirLineList = this.hxXdAnnualReportParam.hxXdAgentAirLineVOList;
      });
    },
    handleSelectionChange(val) {
      console.log(val);
      this.selectArr = val;
    },
    addLine() {
      // 添加行数
      const len = this.reportInvestorList.length - 1;
      const sum = len >= 0 ? this.reportInvestorList[len].id : 0;
      const result = sum + 1;
      var newValue = {
        companyInfoId: "",
        investorType: "",
        investorName: "",
        certificateNum: "",
        investmentAmount: "",
        editing: true
      };
      // 添加新的行数
      this.reportInvestorList.push(newValue);
    },
    handleDelete(index) {
      // 删除行数
      if (this.selectArr.length <= 0) {
        this.$notify({
          title: "提示",
          message: "请选择要删除的项",
          type: "warning",
          duration: 2000
        });
      } else {
        const delArr = [];
        for (var i = 0; i < this.reportInvestorList.length; i++) {
          if (this.selectArr.indexOf(this.reportInvestorList[i]) === -1) {
            delArr.push(this.reportInvestorList[i]);
          }
        }
        this.reportInvestorList = delArr;
        this.$notify({
          title: "成功",
          message: "删除成功",
          type: "success",
          duration: 2000
        });
      }
    },

    //以下为航空公司列表相关方法
    handleSelectionChangeAirLine(val) {
      console.log(val);
      this.selectArrAirLine = val;
    },
    addLineAirLine() {
      // 添加行数
      const len = this.agentAirLineList.length - 1;
      const sum = len >= 0 ? this.agentAirLineList[len].id : 0;
      const result = sum + 1;
      var newValue = {
        airLineName: "",
        airLineCode: "",
        annualReportId: ""
      };
      // 添加新的行数
      this.agentAirLineList.push(newValue);
    },
    handleDeleteAirLine(index) {
      // 删除行数
      if (this.selectArrAirLine.length <= 0) {
        this.$notify({
          title: "提示",
          message: "请选择要删除的项",
          type: "warning",
          duration: 2000
        });
      } else {
        const delArr = [];
        for (var i = 0; i < this.agentAirLineList.length; i++) {
          if (this.selectArrAirLine.indexOf(this.agentAirLineList[i]) === -1) {
            delArr.push(this.agentAirLineList[i]);
          }
        }
        this.agentAirLineList = delArr;
        this.$notify({
          title: "成功",
          message: "删除成功",
          type: "success",
          duration: 2000
        });
      }
    }
  }
};
</script>
<style lang="scss">
@import "~@/styles/hxxd.scss";
.double_ipt {
  display: inline-block;
  width: 48%;
}
</style>
