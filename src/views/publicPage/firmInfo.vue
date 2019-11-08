<template>
  <div class="app-wrapper">
    <el-row>
      <el-col :span="24">
        <el-header class="header-throwsf">
          <el-row>
            <el-col :span="20">
              <img src="../../assets/img/logo.png" style="margin-top: 20px;" height="60" />
            </el-col>
            <el-col :span="4">
              <el-row>
                <img
                  src="../../assets/img/menology_n.png"
                  style="vertical-align: middle;margin-right: 5px;"
                  height="30"
                />
                <div class="head_group">
                  <span class="head_group_day">2019年9月26日</span>
                  <span class="head_group_week">
                    星期四&nbsp;&nbsp;&nbsp;&nbsp;
                    <span class="head_group_time">14:44</span>
                  </span>
                </div>
              </el-row>
            </el-col>
          </el-row>
        </el-header>
      </el-col>
      <el-col :span="24">
        <el-tabs v-model="activeName" >
          <el-tab-pane label="企业信息" name="first">
            <el-row>
              <!-- 企业信息 -->
              <el-row :gutter="10">
                <el-col :span="24">
                  <h5 class="dtl-title-line bg-font-color">企业信息</h5>
                </el-col>
              </el-row>

              <el-form
                ref="ruleForm"
                :model="hxXdCompanyInfoParam"
                :disabled="disabled"
                label-width="135px"
                size="mini"
              >
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="企业名称" prop="businessName">
                      <el-input v-model="hxXdCompanyInfoParam.businessName" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="英文名称" prop="businessNameEn">
                      <el-input v-model="hxXdCompanyInfoParam.businessNameEn" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="经营地址" prop="businessAddress">
                      <el-input v-model="hxXdCompanyInfoParam.businessAddress" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="企业性质" prop="enterpriseNature">
                      <el-input v-model="hxXdCompanyInfoParam.enterpriseNature" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="所属省份" prop="province">
                      <el-select
                        v-model="hxXdCompanyInfoParam.province"
                        filterable
                        placeholder="请选择"
                        size="mini"
                      >
                        <el-option
                          v-for="item in ceshiOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="所属地区" prop="area">
                      <el-select
                        v-model="hxXdCompanyInfoParam.area"
                        filterable
                        placeholder="请选择"
                        size="mini"
                      >
                        <el-option
                          v-for="item in ceshiOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="统一社会信用代码" prop="socialCode">
                      <el-input v-model="hxXdCompanyInfoParam.socialCode" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="工商登记机关" prop="bureauCommerce">
                      <el-input v-model="hxXdCompanyInfoParam.bureauCommerce" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="组织机构代码" prop="orgCode">
                      <el-input v-model="hxXdCompanyInfoParam.orgCode" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="代码证颁发机关" prop="codeCertiAuth">
                      <el-input v-model="hxXdCompanyInfoParam.codeCertiAuth" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="旅行社经营许可证" prop="travelLicense">
                      <el-input v-model="hxXdCompanyInfoParam.travelLicense" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="营业执照" prop="licenseNo">
                      <el-input v-model="hxXdCompanyInfoParam.licenseNo" />
                    </el-form-item>
                  </el-col>
                </el-row>

                <!-- 法定代表人信息 -->
                <el-row :gutter="10">
                  <el-col :span="24">
                    <h5 class="dtl-title-line bg-font-color">法定代表人信息</h5>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="6">
                    <el-form-item label="姓名" prop="name">
                      <el-input v-model="hxXdCompanyInfoParam.name" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="性别" prop="sex">
                      <el-select
                        v-model="hxXdCompanyInfoParam.sex"
                        filterable
                        placeholder="请选择"
                        size="mini"
                      >
                        <el-option
                          v-for="item in sexOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="国籍" prop="nationality">
                      <el-input v-model="hxXdCompanyInfoParam.nationality" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="学历" prop="educationalBackground">
                      <el-input v-model="hxXdCompanyInfoParam.educationalBackground" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="身份证号/护照号" prop="idNum">
                      <el-input v-model="hxXdCompanyInfoParam.idNum" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 投资人信息 -->
                <el-row :gutter="10">
                  <el-col :span="24">
                    <h5 class="dtl-title-line bg-font-color">投资人信息</h5>
                  </el-col>
                </el-row>
                <el-table>
                  <el-table-column type="selection" width="50" />
                  <el-table-column prop="investorType" label="投资人类型">
                    <template slot-scope="scope">
                      <template v-if="scope.row.editing">
                        <el-input v-model="scope.row.investorType" class="edit-input" />
                      </template>
                      <span v-else>{{ scope.row.investorType }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="investorName" label="投资人名称">
                    <template slot-scope="scope">
                      <template v-if="scope.row.editing">
                        <el-input v-model="scope.row.investorName" class="edit-input" />
                      </template>
                      <span v-else>{{ scope.row.investorName }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="certificateNum" label="证照/证件号码">
                    <template slot-scope="scope">
                      <template v-if="scope.row.editing">
                        <el-input v-model="scope.row.certificateNum" class="edit-input" />
                      </template>
                      <span v-else>{{ scope.row.certificateNum }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="investmentAmount" label="投资金额（万元）">
                    <template slot-scope="scope">
                      <template v-if="scope.row.editing">
                        <el-input v-model="scope.row.investmentAmount" class="edit-input" />
                      </template>
                      <span v-else>{{ scope.row.investmentAmount }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="currencyType" label="货币类型">
                    <template slot-scope="scope">
                      <template v-if="scope.row.editing">
                        <el-input v-model="scope.row.currencyType" class="edit-input" />
                      </template>
                      <span v-else>{{ scope.row.currencyType }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="currencyType" label="投资比例">
                    <template slot-scope="scope">
                      <template v-if="scope.row.editing">
                        <el-input v-model="scope.row.investmentsRatio" class="edit-input" />
                      </template>
                      <span v-else>{{ scope.row.investmentsRatio }}</span>
                    </template>
                  </el-table-column>
                </el-table>

                <!-- 其他信息 -->
                <el-row :gutter="10">
                  <el-col :span="24">
                    <h5 class="dtl-title-line bg-font-color">其它信息</h5>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="6">
                    <el-form-item label="IATA号码" prop="iataNum">
                      <el-input v-model="hxXdCompanyInfoParam.iataNum" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="CDS号码" prop="cdsNum">
                      <el-input v-model="hxXdCompanyInfoParam.cdsNum" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="中性货单结算号码" prop="neutralBillNum">
                      <el-input v-model="hxXdCompanyInfoParam.neutralBillNum" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="常用信息" name="second">
            <el-row>
              <!-- 联系信息 -->
              <el-row :gutter="10">
                <el-col :span="24">
                  <h5 class="dtl-title-line bg-font-color">联系信息</h5>
                </el-col>
              </el-row>
              <el-form
                ref="ruleForm2"
                :model="HxXdCompanyCommonInfoParam"
                :rules="rules2"
                :disabled="disabled"
                label-width="130px"
                size="mini"
              >
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="公司邮箱" prop="companyMail">
                      <el-input v-model="HxXdCompanyCommonInfoParam.companyMail" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="公司电话" prop="companyPhone">
                      <el-input v-model="HxXdCompanyCommonInfoParam.companyPhone" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="公司传真" prop="companyFax">
                      <el-input v-model="HxXdCompanyCommonInfoParam.companyFax" />
                    </el-form-item>
                  </el-col>
                </el-row>

                <!-- 银行信息 -->
                <el-row :gutter="10">
                  <el-col :span="24">
                    <h5 class="dtl-title-line bg-font-color">银行信息</h5>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="6">
                    <el-form-item label="开会银行" prop="bankName">
                      <el-input v-model="HxXdCompanyCommonInfoParam.bankName" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="开会账号" prop="openAccountNum">
                      <el-input v-model="HxXdCompanyCommonInfoParam.openAccountNum" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="国籍" prop="nationality">
                      <el-input v-model="HxXdCompanyCommonInfoParam.nationality" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="学历" prop="bankEducationalBackground">
                      <el-input v-model="HxXdCompanyCommonInfoParam.bankEducationalBackground" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 负责人信息 -->
                <el-row :gutter="10">
                  <el-col :span="24">
                    <h5 class="dtl-title-line bg-font-color">业务负责人信息</h5>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="6">
                    <el-form-item label="业务负责人姓名" prop="chargeName">
                      <el-input v-model="HxXdCompanyCommonInfoParam.chargeName" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="业务负责人性别" prop="chargeSex">
                      <el-select
                        v-model="HxXdCompanyCommonInfoParam.chargeSex"
                        filterable
                        placeholder="请选择"
                        size="mini"
                      >
                        <el-option
                          v-for="item in sexOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="学历" prop="chargeEducationalBackground">
                      <el-input v-model="HxXdCompanyCommonInfoParam.chargeEducationalBackground" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="身份证号" prop="idNum">
                      <el-input v-model="HxXdCompanyCommonInfoParam.idNum" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="手机号" prop="cellNum">
                      <el-input v-model="HxXdCompanyCommonInfoParam.cellNum" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="电话号" prop="phoneNum">
                      <el-input v-model="HxXdCompanyCommonInfoParam.phoneNum" />
                    </el-form-item>
                  </el-col>
                </el-row>

                <!-- 从业人员信息 -->
                <el-row :gutter="10">
                  <el-col :span="24">
                    <h5 class="dtl-title-line bg-font-color">从业人员信息</h5>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="6">
                    <el-form-item label="从业人员总数" prop="employeesNumber">
                      <el-input v-model.number="HxXdCompanyCommonInfoParam.employeesNumber" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="懂英语人数" prop="understandEnNum">
                      <el-input v-model.number="HxXdCompanyCommonInfoParam.understandEnNum" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="合格人数（国内）" prop="internalQualifiedNum">
                      <el-input v-model.number="HxXdCompanyCommonInfoParam.internalQualifiedNum" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="合格人员（国内）" prop="internationalQualifiedNum">
                      <el-input
                        v-model.number="HxXdCompanyCommonInfoParam.internationalQualifiedNum"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="女员工人数" prop="femaleEmployeesNum">
                      <el-input v-model.number="HxXdCompanyCommonInfoParam.femaleEmployeesNum" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="合同工数量" prop="contractsNumber">
                      <el-input v-model.number="HxXdCompanyCommonInfoParam.contractsNumber" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item label="派遣工数量" prop="dispatchWorker">
                      <el-input v-model.number="HxXdCompanyCommonInfoParam.dispatchWorker" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col>
        <el-footer class="footer-throwsf">
          <a href="javascrip:;">联系我们</a> |
          <a href="javascrip:;">声明</a>&nbsp;&nbsp;&nbsp;&nbsp;中国航空运输协会版权所有 | 京ICP备12001608号 | 京公网安备11010502034600号
        </el-footer>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getCompanyInfoById, getCommonById } from "@/api/hxxd/agent";
export default {
  data() {
    return {
      activeName: "first",
      disabled: true,
      sexOptions: [
        {
          value: "0",
          label: "男"
        },
        {
          value: "1",
          label: "女"
        }
      ],
      ceshiOptions: "",
      tabView: "info1",
      hxXdCompanyInfoParam: {
        id: "",
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
        sex: "",
        nationality: "",
        educationalBackground: "",
        idNum: "",
        iataNum: "",
        cdsNum: "",
        neutralBillNum: "",
        investmentAmount: "",
        currencyType: "",
        investmentsRatio: ""
      },
      HxXdCompanyCommonInfoParam: {
        id: "",
        companyInfoId: "",
        companyMail: "",
        companyPhone: "",
        companyFax: "",
        bankName: "",
        openAccountNum: "",
        nationality: "",
        bankEducationalBackground: "",
        chargeName: "",
        chargeSex: "",
        chargeEducationalBackground: "",
        idNum: "",
        cellNum: "",
        phoneNum: "",
        employeesNumber: "",
        understandEnNum: "",
        internalQualifiedNum: "",
        internationalQualifiedNum: "",
        contractsNumber: "",
        dispatchWorker: "",
        femaleEmployeesNum: ""
      }
    };
  },
  created() {
    //初始化页面时
    let id = this.$route.query.id;
    if (id) {
      this.getCompanyInfoById(id);
      this.getCommonById(id);
    }
  },
  methods: {
    getCompanyInfoById(id) {
      this.hxXdCompanyInfoParam.id = id;
      getCompanyInfoById(this.hxXdCompanyInfoParam).then(response => {
        this.hxXdCompanyInfoParam = response.data;
      });
    },
    //常用信息查询
    getCommonById(id) {
      this.HxXdCompanyCommonInfoParam.companyInfoId = id;
      getCommonById(this.HxXdCompanyCommonInfoParam).then(response => {
        this.HxXdCompanyCommonInfoParam = response.data;
        this.HxXdCompanyCommonInfoParam.companyInfoId = id;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  font-weight: normal;
  font-size: 14px;
}
.header-throwsf {
  width: 100%;
  // position: fixed;
  left: 0;
  height: 120px !important;
  line-height: 120px;
  background: url("../../assets/img/header_bg.png");
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: cover;
  padding-left: 120px;
  top: 0;
  color: #fff;
  z-index: 1002;
  .head_group {
    display: inline-block;
    position: absolute;
    width: 120px;
    top: -10px;
    span {
      display: inline-block;
      position: absolute;
      color: #000;
    }
    .head_group_week {
      top: 20px;
    }
  }
}

.footer-throwsf {
  width: 100%;
  // position: fixed;
  height: 120px !important;
  line-height: 120px;
  font-size: 20px;
  text-align: center;
  bottom: 0;
  color: #000;
  z-index: 1000;
  background: #e8f5fc;
  a {
    font-size: 20px;
  }
}
table {
  width: 100%;
  border: 1px solid #e6e6e6;
  border-collapse: collapse;
}
table tr {
  border-bottom: 1px solid #e6e6e6;
  height: 40px;
  line-height: 40px;
}
table tr th {
  text-align: left;
  color: #409eff;
  font-weight: bolder;
  padding-left: 1em;
}
table tr td {
  padding-left: 1em;
  border-right: 1px solid #e6e6e6;
}
.table_title {
  background-color: #f2f2f2;
  color: #555;
  width: 150px;
  text-align: center;
  padding: 0;
}

.bg-font-color {
  color: #3665ca;
  font-weight: bold;
}

* {
  font-weight: normal;
}
.dtl-title-line {
  display: inline-block;
  border-left: 3px solid #409eff;
  padding-left: 5px;
}
.el-table__fixed-right::before {
  background-color: none;
}
</style>