<template>
  <el-card class="detailsContainer">
    <el-tabs v-model="tabView">
      <el-tab-pane label="企业信息" name="info1">
        <el-row>
          <!-- 企业信息 -->
          <el-row>
            <el-col :span="24">
              <h5 class="dtl-title-line">企业信息</h5>
            </el-col>
          </el-row>

          <el-form
            ref="hxXdCompanyInfoParam"
            :model="hxXdCompanyInfoParam"
            label-width="150px"
            size="mini"
            :rules="rules1"
          >
            <el-row class="line_bottom">
              <el-col :span="12">
                <el-form-item label="企业名称" prop="businessName">
                  <el-input v-model="hxXdCompanyInfoParam.businessName" :readonly="true" />
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
                  <el-select
                    v-model="hxXdCompanyInfoParam.enterpriseNature"
                    filterable
                    placeholder="请选择"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="item in enterpriseNatureOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="所属省份" prop="province">
                  <el-select
                    v-model="hxXdCompanyInfoParam.province"
                    filterable
                    placeholder="请选择"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="item in provinceOptions"
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
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="item in areaOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12"> 
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
              <el-col :span="12">
                <el-form-item label="统一社会信用代码" prop="socialCode">
                  <el-input
                    v-model="hxXdCompanyInfoParam.socialCode"
                    :readonly="true"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="旅行社经营许可证" prop="travelLicense">
                  <el-select
                    v-model="hxXdCompanyInfoParam.travelLicense"
                    filterable
                    placeholder="请选择"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="item in travelLicenseOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="快递经营许可" prop="express">
                  <el-select
                    v-model="hxXdCompanyInfoParam.express"
                    filterable
                    placeholder="请选择"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="item in travelLicenseOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="营业执照" prop="licenseNo">
                  <el-input v-model="hxXdCompanyInfoParam.licenseNo" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="附件选择" prop="expvmFiles">
                  <el-upload
                    class="upload-demo"
                    action
                    ref="upload"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :before-upload="handleUpload"
                    :headers="uploadHeaders"
                    v-show="btnShow('100020109030')"
                    multiple
                    :auto-upload="false"
                  >
                    <el-button
                      type="primary"
                      v-show="btnShow('100020109030')"
                      size="small"
                      >选择</el-button
                    >
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>

            <!-- 法定代表人信息 -->
            <el-row :gutter="10">
              <el-col :span="24">
                <h5 class="dtl-title-line">法定代表人信息</h5>
              </el-col>
            </el-row>
            <el-row class="line_bottom">
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
                    style="width: 100%;"
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
                  <el-select
                    v-model="hxXdCompanyInfoParam.educationalBackground"
                    filterable
                    placeholder="请选择"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="item in educationalBackgroundOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份证号/护照号" prop="idNum">
                  <el-input v-model="hxXdCompanyInfoParam.idNum" />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 投资人信息 -->
            <el-row :gutter="10">
              <el-col :span="24">
                <h5 class="dtl-title-line">投资人信息</h5>
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
              :data="investorList"
              border
              style="width: 100%; margin-top: 20px;"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="50" />
              <el-table-column prop="investorType" label="投资人类型">
                <template slot-scope="scope">
                  <!-- <el-input
                    v-model="scope.row.investorType"
                    class="edit-input"
                  /> -->
                   <el-select v-model="scope.row.investorType" filterable placeholder="请选择" size="mini" style="width:100%">
                  <el-option
                    v-for="item in investorTypeOptions"
                    :key="item.key" :label="item.value" :value="item.key"
                  ></el-option>
                </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="investorName" label="投资人名称">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.investorName"
                    class="edit-input"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="certificateNum" label="证照/证件号码">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.certificateNum"
                    class="edit-input"
                  />
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
                  <el-input
                    v-model="scope.row.currencyType"
                    class="edit-input"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="currencyType" label="投资比例">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.investmentsRatio"
                    class="edit-input"
                  />
                </template>
              </el-table-column>
            </el-table>

 <!-- 分支机构信息 -->
            <el-row :gutter="10">
              <el-col :span="24">
                <h5 class="dtl-title-line">分支机构信息</h5>
              </el-col>
            </el-row>
            <el-button
              style="margin-left: 10px;"
              type="primary"
              size="mini"
              icon="el-icon-plus"
              @click="subsidAddLine"
              >添加</el-button
            >
            <el-button
              style="margin-left: 10px;"
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="subsidHandleDelete"
              >删除</el-button
            >
            <el-table
              ref="multipleTable"
              :data="subsidiaryList"
              border
              style="width: 100%; margin-top: 20px;"
              @selection-change="subsidHandleSelectionChange"
            >
              <el-table-column type="selection" width="50" />
              <el-table-column prop="subsidiaryName" label="名称">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.subsidiaryName"
                    class="edit-input"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="subsidiaryAddr" label="地址">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.subsidiaryAddr"
                    class="edit-input"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="subsidiaryLinkman" label="联系人">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.subsidiaryLinkman"
                    class="edit-input"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="subsidiaryPhone" label="电话">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.subsidiaryPhone"
                    class="edit-input"
                  />
                </template>
              </el-table-column>
            </el-table>

            <!-- 其他信息 -->
            <el-row :gutter="10">
              <el-col :span="24">
                <h5 class="dtl-title-line">其它信息</h5>
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
              <el-col :span="6">
                <el-form-item label="OFFICE号码" prop="officeNo">
                  <el-input v-model="hxXdCompanyInfoParam.officeNo" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="常用信息" name="info2">
        <el-row>
          <el-form
            ref="HxXdCompanyCommonInfoParam"
            :model="HxXdCompanyCommonInfoParam"
            :rules="rules2"
            label-width="105px"
            size="mini"
          >
            <!-- 银行信息 -->
            <el-row>
              <el-col :span="24">
                <h5 class="dtl-title-line">银行信息</h5>
              </el-col>
            </el-row>
            <el-row class="line_bottom">
              <el-col :span="8">
                <el-form-item label="开户银行" prop="bankName">
                  <el-input v-model="HxXdCompanyCommonInfoParam.bankName" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="开户账号" prop="openAccountNum">
                  <el-input
                    v-model="HxXdCompanyCommonInfoParam.openAccountNum"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="国籍" prop="nationality">
                  <el-input v-model="HxXdCompanyCommonInfoParam.nationality" />
                </el-form-item>
              </el-col>
              <!-- <el-col :span="6">
                <el-form-item label="学历" prop="bankEducationalBackground">
                  <el-select
                    v-model="
                      HxXdCompanyCommonInfoParam.bankEducationalBackground
                    "
                    filterable
                    placeholder="请选择"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="item in educationalBackgroundOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col> -->
              <el-col :span="24">
                <el-form-item label="备注" prop="bankRemarks">
                  <el-input
                    type="textarea"
                    maxlength="60"
                    :autosize="{ minRows: 6, maxRows: 8 }"
                    show-word-limit
                    v-model="HxXdCompanyCommonInfoParam.bankRemarks"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 负责人信息 -->
            <el-row>
              <el-col :span="24">
                <h5 class="dtl-title-line">业务负责人信息</h5>
              </el-col>
            </el-row>
            <el-row class="line_bottom">
              <el-col :span="6">
                <el-form-item label="姓名" prop="chargeName">
                  <el-input v-model="HxXdCompanyCommonInfoParam.chargeName" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="性别" prop="chargeSex">
                  <el-select
                    v-model="HxXdCompanyCommonInfoParam.chargeSex"
                    filterable
                    placeholder="请选择"
                    style="width: 100%;"
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
                  <el-select
                    v-model="
                      HxXdCompanyCommonInfoParam.chargeEducationalBackground
                    "
                    filterable
                    placeholder="请选择"
                    style="width: 100%;"
                  >
                    <el-option
                      v-for="item in educationalBackgroundOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
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

              <el-col :span="6">
                <el-form-item label="电子邮箱" prop="chargeMail">
                  <el-input v-model="HxXdCompanyCommonInfoParam.chargeMail" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="快递地址" prop="chargeExpAddr">
                  <el-input
                    v-model="HxXdCompanyCommonInfoParam.chargeExpAddr"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="传真" prop="chargeFax">
                  <el-input v-model="HxXdCompanyCommonInfoParam.chargeFax" />
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 从业人员信息 -->
            <el-row>
              <el-col :span="24">
                <h5 class="dtl-title-line">从业人员信息</h5>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="从业人员（总数）" prop="employeesNumber">
                  <el-input
                    v-model.number="HxXdCompanyCommonInfoParam.employeesNumber"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="懂英语人数" prop="understandEnNum">
                  <el-input
                    v-model.number="HxXdCompanyCommonInfoParam.understandEnNum"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="合格人数（国内）"
                  prop="internalQualifiedNum"
                >
                  <el-input
                    v-model.number="
                      HxXdCompanyCommonInfoParam.internalQualifiedNum
                    "
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="合格人员（国内）"
                  prop="internationalQualifiedNum"
                >
                  <el-input
                    v-model.number="
                      HxXdCompanyCommonInfoParam.internationalQualifiedNum
                    "
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="女员工人数" prop="femaleEmployeesNum">
                  <el-input
                    v-model.number="
                      HxXdCompanyCommonInfoParam.femaleEmployeesNum
                    "
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="合同工数量" prop="contractsNumber">
                  <el-input
                    v-model.number="HxXdCompanyCommonInfoParam.contractsNumber"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="派遣工数量" prop="dispatchWorker">
                  <el-input
                    v-model.number="HxXdCompanyCommonInfoParam.dispatchWorker"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <el-row>
      <!-- <el-col :span='12'>
        <a href='javascrip:;' style='color: #409EFF'>
          <i class='el-icon-back' style='color: #409EFF;margin-right: 5px;c' />返 回
        </a>
      </el-col>-->
      <el-col :span="24" class="btn_bottom">
        <el-button
          type="primary"
          size="mini"
          v-show="btnShow('100020109010')"
          @click.native.prevent="companyInfoSave()"
          >保存</el-button
        >
        <el-button type="primary" size="mini" @click="companyInfoSave()"
          >取消</el-button
        >
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { companySave, commonSave, initCompanyInfo, getCommonById } from "@/api/hxxd/agent";
import { isvalidPhone } from "@/utils/validate";
import { getToken } from "@/utils/auth";
import { getDictDataLists, getDictDataList } from "@/api/system/comm/comm";
//电话号码校验
var validPhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error("请输入电话号码"));
  } else if (!isvalidPhone(value)) {
    callback(new Error("请输入正确的11位手机号码"));
  } else {
    callback();
  }
};
export default {
  data() {
    return {
      //获取有权限的按钮
      btns: this.$store.getters.btns["10002010901212"],
      uploadHeaders: {
        "X-Token": getToken()
      },
      formData: new FormData(),
      investorTypeOptions: [],
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
      educationalBackgroundOptions: [
        {
          value: "小学",
          label: "小学"
        },
        {
          value: "初中",
          label: "初中"
        },
        {
          value: "高中",
          label: "高中"
        },
        {
          value: "专科",
          label: "专科"
        },
        {
          value: "大专",
          label: "大专"
        },
        {
          value: "本科",
          label: "本科"
        },
        {
          value: "学士",
          label: "学士"
        },
        {
          value: "硕士",
          label: "硕士"
        },
        {
          value: "博士",
          label: "博士"
        },
        {
          value: "其他",
          label: "其他"
        }
      ],
      areaOptions: [
        {
          value: "0",
          label: "华东地区"
        },
        {
          value: "1",
          label: "华南地区"
        },
        {
          value: "2",
          label: "华中地区"
        },
        {
          value: "3",
          label: "华北地区"
        },
        {
          value: "4",
          label: "西北地区"
        },
        {
          value: "5",
          label: "西南地区"
        },
        {
          value: "6",
          label: "东北地区"
        }
      ],
      travelLicenseOptions: [
        {
          value: "0",
          label: "是"
        },
        {
          value: "1",
          label: "否"
        }
      ],
      provinceOptions: [
        {
          value: "0",
          label: "北京市"
        },
        {
          value: "1",
          label: "天津市"
        },
        {
          value: "2",
          label: "上海市"
        },
        {
          value: "3",
          label: "重庆市"
        },
        {
          value: "4",
          label: "河北省"
        },
        {
          value: "5",
          label: "山西省"
        },
        {
          value: "6",
          label: "辽宁省"
        },
        {
          value: "7",
          label: "吉林省"
        },
        {
          value: "8",
          label: "黑龙江省"
        },
        {
          value: "9",
          label: "江苏省"
        },
        {
          value: "10",
          label: "浙江省"
        },
        {
          value: "11",
          label: "安徽省"
        },
        {
          value: "12",
          label: "福建省"
        },
        {
          value: "13",
          label: "江西省"
        },
        {
          value: "14",
          label: "山东省"
        },
        {
          value: "15",
          label: "河南省"
        },
        {
          value: "16",
          label: "湖北省"
        },
        {
          value: "17",
          label: "湖南省"
        },
        {
          value: "18",
          label: "广东省"
        },
        {
          value: "19",
          label: "海南省"
        },
        {
          value: "20",
          label: "四川省"
        },
        {
          value: "21",
          label: "贵州省"
        },
        {
          value: "22",
          label: "云南省"
        },
        {
          value: "23",
          label: "陕西省"
        },
        {
          value: "24",
          label: "甘肃省"
        },
        {
          value: "25",
          label: "测试二"
        },
        {
          value: "26",
          label: "青海省"
        },
        {
          value: "27",
          label: "台湾省"
        },
        {
          value: "28",
          label: "内蒙古自治区"
        },
        {
          value: "29",
          label: "广西壮族自治区"
        },
        {
          value: "30",
          label: "西藏自治区"
        },
        {
          value: "31",
          label: "宁夏回族自治区"
        },
        {
          value: "32",
          label: "新疆维吾尔自治区"
        },
        {
          value: "33",
          label: "香港特别行政区"
        },
        {
          value: "34",
          label: "澳门特别行政区"
        }
      ],
      enterpriseNatureOptions: [
        {
          value: "0",
          label: "有限责任公司"
        },
        {
          value: "1",
          label: "国有企业"
        },
        {
          value: "2",
          label: "私营企业"
        },
        {
          value: "3",
          label: "个人独资企业"
        },
        {
          value: "4",
          label: "外商投资企业"
        },
        {
          value: "5",
          label: "其他"
        }
      ],
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
        travelLicense: "1",
        express: "1",
        licenseNo: "",
        name: "",
        sex: "",
        nationality: "",
        educationalBackground: "",
        idNum: "",
        iataNum: "",
        cdsNum: "",
        officeNo: "",
        neutralBillNum: "",
        investmentAmount: "",
        currencyType: "",
        investmentsRatio: "",
        hxXdInvestorInfoParamList: [],
        hxXdSubsidiaryParamList: []
      },
      
      HxXdCompanyCommonInfoParam: {
        companyInfoId: "",
        chargeFax: "",
        chargeExpAddr: "",
        chargeMail: "",
        bankName: "",
        bankRemarks: "",
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
      },
      investorList: [],
      selectArr: [],
       // 分支机构信息
      subsidiaryList: [],
      subsidSelectArr: [],
      rules1: {
        businessName: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        socialCode: [
          { required: true, message: "不能为空", trigger: "change" }
        ],
        bureauCommerce: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        idNum: [
          { required: true, message: "不能为空", trigger: "blur" },
          {
            pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            message: "身份证号格式不正确",
            trigger: ["blur", "change"]
          }
        ],
        businessAddress: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        enterpriseNature: [ { required: true, message: "不能为空", trigger: "change" } ],
        province: [  { required: true, message: "不能为空", trigger: "change" }],
        area: [{ required: true, message: "不能为空", trigger: "change" }],
        orgCode: [{ required: true, message: "不能为空", trigger: "blur" }],
        codeCertiAuth: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        licenseNo: [{ required: true, message: "不能为空", trigger: "blur" }],
        sex: [{ required: true, message: "不能为空", trigger: "change" }],
        nationality: [{ required: true, message: "不能为空", trigger: "blur" }],
        educationalBackground: [
          { required: true, message: "不能为空", trigger: "change" }
        ]
      },
      rules2: {
        chargeExpAddr: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        chargeMail: [
          { required: true, message: "不能为空", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        cellNum: [{ required: true, trigger: "blur", validator: validPhone }],
        employeesNumber: [
          { required: true, message: "不能为空" },
          {
            pattern: /^(0|\+?[1-9][0-9]*)$/,
            message: "大于等于零的整数",
            trigger: ["blur", "change"]
          }
        ],
        understandEnNum: [
          { required: true, message: "不能为空" },
          {
            pattern: /^(0|\+?[1-9][0-9]*)$/,
            message: "大于等于零的整数",
            trigger: ["blur", "change"]
          }
        ],
        internalQualifiedNum: [
          { required: true, message: "不能为空" },
          {
            pattern: /^(0|\+?[1-9][0-9]*)$/,
            message: "大于等于零的整数",
            trigger: ["blur", "change"]
          }
        ],
        internationalQualifiedNum: [
          { required: true, message: "不能为空" },
          {
            pattern: /^(0|\+?[1-9][0-9]*)$/,
            message: "大于等于零的整数",
            trigger: ["blur", "change"]
          }
        ],
        contractsNumber: [
          { required: true, message: "不能为空" },
          {
            pattern: /^(0|\+?[1-9][0-9]*)$/,
            message: "大于等于零的整数",
            trigger: ["blur", "change"]
          }
        ],
        dispatchWorker: [
          { required: true, message: "不能为空" },
          {
            pattern: /^(0|\+?[1-9][0-9]*)$/,
            message: "大于等于零的整数",
            trigger: ["blur", "change"]
          }
        ],
        femaleEmployeesNum: [
          { required: true, message: "不能为空" },
          {
            pattern: /^(0|\+?[1-9][0-9]*)$/,
            message: "大于等于零的整数",
            trigger: ["blur", "change"]
          }
        ],
        idNum: [
          { required: true, message: "不能为空" },
          {
            pattern: /^(0|\+?[1-9][0-9]*)$/,
            message: "格式不正确",
            trigger: ["blur", "change"]
          }
        ],
        bankName: [{ required: true, message: "不能为空", trigger: "blur" }],
        openAccountNum: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        nationality: [{ required: true, message: "不能为空", trigger: "blur" }],
        bankEducationalBackground: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        chargeName: [{ required: true, message: "不能为空", trigger: "blur" }],
        chargeSex: [{ required: true, message: "不能为空", trigger: "change" }],
        chargeEducationalBackground: [
          { required: true, message: "不能为空", trigger: "change" }
        ],
        phoneNum: [{ required: true, message: "不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    //初始化页面时
    this.initCompanyInfo();
    //加载字典
    this.beforeLoading();
  },
  methods: {
     beforeLoading() {
      getDictDataLists("97001018").then(response => {
        this.investorTypeOptions = response.data.jq97001018;
        console.log(this.investorTypeOptions)
      });
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
    //初始化数据
    initCompanyInfo() {
      initCompanyInfo().then(response => {
        var msg = response.status == 200 ? "初始成功" : "初始化失败";
        if (response.status == 200) {
          //保存成功
          this.hxXdCompanyInfoParam = response.data;

        } else {
          //保存失败
          this.$message({
            type: "success",
            error: msg
          });
        }
      });
    },
    //文件上传方法
    handleUpload(file) {
      this.formData.append("fileList", file); // 附件文件导入
      return false;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    //企业信息保存
    companyInfoSave() {
      this.$refs["HxXdCompanyCommonInfoParam"].validate(valid => {
        if (valid) {
          this.$refs["hxXdCompanyInfoParam"].validate(valid => {
            if (valid) {
              const arr = this.investorList;
              for (const item of arr) {
                for (const p in item) {
                  if (item[p] === "") {
                    this.$message({
                      type: "error",
                      message: "请完善投资人数据"
                    });
                    return;
                  } else {
                    //数据校验成功
                    this.hxXdCompanyInfoParam.hxXdInvestorInfoParamList = this.investorList;
                  }
                }
              }
               //分公司信息
              const subsidiaryArr = this.subsidiaryList;
              for (const item of subsidiaryArr) {
                for (const p in item) {
                  if (item[p] === "") {
                    this.$message({
                      type: "success",
                      message: "请完善投资人数据"
                    });
                    return;
                  } else {
                    //数据校验成功
                    this.hxXdCompanyInfoParam.hxXdSubsidiaryParamList = this.subsidiaryList;
                  }
                }
              }

              var hxXdCompanyInfoParamStr = JSON.stringify(
                this.hxXdCompanyInfoParam
              );
              var hxXdCompanyCommonInfoParamStr = JSON.stringify(
                this.HxXdCompanyCommonInfoParam
              );

              this.formData.append(
                "hxXdCompanyInfoParamStr",
                hxXdCompanyInfoParamStr
              );
              this.formData.append(
                "hxXdCompanyCommonInfoParamStr",
                hxXdCompanyCommonInfoParamStr
              );
              this.$refs.upload.submit(); // 附件文件上传
              companySave(this.formData).then(response => {
                var msg = response.status == 200 ? "保存成功" : "保存失败";
                if (response.status == 200) {
                  //保存成功
                  this.$message({
                    type: "success",
                    message: msg
                  });
                } else {
                  //保存失败
                  this.$message({
                    type: "error",
                    error: msg
                  });
                  console.log(response.message);
                }
              });
            } else {
              //校验失败
              this.$message({
                message: "请正确录入企业信息页面数据",
                type: "warning"
              });
            }
          });
        } else {
          //校验失败
          this.$message({
            message: "请正确录入企业基本信息页面数据",
            type: "warning"
          });
        }
      });
    },
    handleSelectionChange(val) {
      console.log(val);
      this.selectArr = val;
    },
    addLine() {
      // 添加行数
      var newValue = {
        investorType: "",
        investorName: "",
        certificateNum: "",
        investmentAmount: "",
        currencyType: "",
        investmentsRatio: "",
        editing: true
      };
      // 添加新的行数
      this.investorList.push(newValue);
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
        for (var i = 0; i < this.investorList.length; i++) {
          if (this.selectArr.indexOf(this.investorList[i]) === -1) {
            delArr.push(this.investorList[i]);
          }
        }
        this.investorList = delArr;
        this.$notify({
          title: "成功",
          message: "删除成功",
          type: "success",
          duration: 2000
        });
      }
      },
    // 分支机构相关信息
    subsidHandleSelectionChange(val) {
      console.log(val);
      this.subsidSelectArr = val;
    },
    subsidAddLine() {
      // 添加行数
      var newValue = {
        subsidiaryName: "",
        subsidiaryAddr: "",
        subsidiaryLinkman: "",
        subsidiaryPhone: ""
      };
      // 添加新的行数
      this.subsidiaryList.push(newValue);
    },
    subsidHandleDelete(index) {
      // 删除行数
      if (this.subsidSelectArr.length <= 0) {
        this.$notify({
          title: "提示",
          message: "请选择要删除的项",
          type: "warning",
          duration: 2000
        });
      } else {
        const delArr = [];
        for (var i = 0; i < this.subsidiaryList.length; i++) {
          if (this.subsidSelectArr.indexOf(this.subsidiaryList[i]) === -1) {
            delArr.push(this.subsidiaryList[i]);
          }
        }
        this.subsidiaryList = delArr;
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
</style>
