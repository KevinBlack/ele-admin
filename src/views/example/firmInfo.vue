<template>
  <div class="app-wrapper">
    <el-row>
      <el-col :span="24">
        <el-header class="header-throwsf">
          <el-row>
            <el-col :span="20">
              <img src="../../assets/img/logo.png" style="margin-top: 20px;" height="60">
            </el-col>
            <el-col :span="4">
              <el-row>
                <img src='../../assets/img/menology_n.png' style="vertical-align: middle;margin-right: 5px;" height="30">
                <div class="head_group">
                  <span class="head_group_day">2019年9月26日</span>
                  <span class="head_group_week">星期四&nbsp;&nbsp;&nbsp;&nbsp;<span class="head_group_time">14:44</span></span>
                </div>
              </el-row>
            </el-col>
          </el-row>
        </el-header>
      </el-col>
      <el-col :span="20" :offset="2">
        <el-card class="detailsContainer">
          <div class="comName">中国航空运输协会</div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="企业信息" name="firmInfo">
              <el-row :gutter="10">
                <el-col :span="6">
                  <p class="dtl-hint">内容为保证信息的准确性，确保与真实信息一致</p>
                </el-col>
                <el-col :span="6" :offset="12">
                  <el-tooltip placement="bottom" effect="light">
                    <div slot="content" class="pop-tip">{{ checkInfo }}</div>
                    <a :class="checkStatus=='审核通过'?'status-pass':'status-unpass'" @click="handleShow">当前状态：{{ checkStatus }}</a>
                  </el-tooltip>
                </el-col>
              </el-row>
              <table>
                <tr>
                  <th colspan="6">企业信息</th>
                </tr>
                <tr>
                  <td class="table_title">企业名称</td>
                  <td colspan="5">中国民航运输协会</td>
                </tr>
                <tr>
                  <td class="table_title">英文名称</td>
                  <td colspan="5">sdfhas;dfha;sdf</td>
                </tr>
                <tr>
                  <td class="table_title">经营地址</td>
                  <td colspan="5">北京市顺义区</td>
                </tr>
                <tr>
                  <td class="table_title">企业性质</td>
                  <td colspan="5">国有企业</td>
                </tr>
                <tr>
                  <td class="table_title">所属省份</td>
                  <td colspan="2">北京</td>
                  <td class="table_title">所属地区</td>
                  <td colspan="2">顺义</td>
                </tr>
                <tr>
                  <td class="table_title">统一社会信用代码</td>
                  <td colspan="2">0979687585707986J</td>
                  <td class="table_title">工商登记机关</td>
                  <td colspan="2">顺义管理局</td>
                </tr>
                <tr>
                  <td class="table_title">组织机构代码</td>
                  <td colspan="2">7898696</td>
                  <td class="table_title">代码证颁发机关</td>
                  <td colspan="2">顺义航空监督局</td>
                </tr>
                <tr>
                  <td class="table_title">旅行社经营许可证</td>
                  <td colspan="2">是</td>
                  <td class="table_title">营业执照号</td>
                  <td colspan="2">XXXXXXX</td>
                </tr>
                <tr>
                  <th colspan="6">法定代表人信息</th>
                </tr>
                <tr>
                  <td class="table_title">姓名</td>
                  <td colspan="2">张三</td>
                  <td class="table_title">性别</td>
                  <td colspan="2">男</td>
                </tr>
                <tr>
                  <td class="table_title">国籍</td>
                  <td colspan="2">中国</td>
                  <td class="table_title">学历</td>
                  <td colspan="2">大学本科</td>
                </tr>
                <tr>
                  <td class="table_title">身份证号/护照号</td>
                  <td colspan="5">110930303938484</td>
                </tr>
                <tr>
                  <th colspan="6">投资人信息</th>
                </tr>
                <tr>
                  <td class="table_title">投资人类型</td>
                  <td class="table_title">投资人名称</td>
                  <td class="table_title">证照/证件号码</td>
                  <td class="table_title">投资金额(万元)</td>
                  <td class="table_title">货币类型</td>
                  <td class="table_title">投资比例</td>
                </tr>
                <tr>
                  <td align="center">法人</td>
                  <td align="center">张三</td>
                  <td align="center">XXX</td>
                  <td align="center">50.25</td>
                  <td align="center">人民币</td>
                  <td align="center">40%</td>
                </tr>
                <tr>
                  <td align="center">自然人</td>
                  <td align="center">李四</td>
                  <td align="center">XXX</td>
                  <td align="center">50.25</td>
                  <td align="center">人民币</td>
                  <td align="center">40%</td>
                </tr>
                <tr>
                  <td align="center">自然人</td>
                  <td align="center">王五</td>
                  <td align="center">XXX</td>
                  <td align="center">50.25</td>
                  <td align="center">人民币</td>
                  <td align="center">40%</td>
                </tr>
                <tr>
                  <td align="center">自然人</td>
                  <td align="center">赵六</td>
                  <td align="center">XXX</td>
                  <td align="center">50.25</td>
                  <td align="center">人民币</td>
                  <td align="center">40%</td>
                </tr>
                <tr>
                  <th colspan="6">其他信息</th>
                </tr>
                <tr>
                  <td class="table_title">ITAT号码</td>
                  <td colspan="2"></td>
                  <td class="table_title">CDS号码</td>
                  <td colspan="2"></td>
                </tr>
                <tr>
                  <td class="table_title">中性货单结算号码</td>
                  <td colspan="2"></td>
                  <td></td>
                  <td colspan="2"></td>
                </tr>
              </table>
            </el-tab-pane>
            <el-tab-pane label="常用信息" name="commonInfo">
              <table>
                <tr>
                  <th colspan="4">联系信息</th>
                </tr>
                <tr>
                  <td class="table_title">公司邮箱</td>
                  <td colspan="3">zhangsan@136.com</td>
                </tr>
                <tr>
                  <td class="table_title">公司电话</td>
                  <td></td>
                  <td class="table_title">公司传真</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="table_title">日常邮寄地址</td>
                  <td></td>
                  <td class="table_title">日常联系人电话</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="table_title">分机号一</td>
                  <td></td>
                  <td class="table_title">分机号二</td>
                  <td></td>
                </tr>
                <tr>
                  <th colspan="4">银行信息</th>
                </tr>
                <tr>
                  <td class="table_title">开户银行</td>
                  <td></td>
                  <td class="table_title">开户账号</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="table_title">国籍</td>
                  <td></td>
                  <td class="table_title">学历</td>
                  <td></td>
                </tr>
                <tr>
                  <th colspan="4">负责人信息</th>
                </tr>
                <tr>
                  <td class="table_title">业务负责人姓名</td>
                  <td></td>
                  <td class="table_title">业务负责人性别</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="table_title">学历</td>
                  <td></td>
                  <td class="table_title">身份证号</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="table_title">手机号</td>
                  <td></td>
                  <td class="table_title">电话号</td>
                  <td></td>
                </tr>
                <tr>
                  <th colspan="4">从业人员信息</th>
                </tr>
                <tr>
                  <td class="table_title">从业人员总数</td>
                  <td></td>
                  <td class="table_title">懂英语人数</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="table_title">合格人数(国内)</td>
                  <td></td>
                  <td class="table_title">合格人数(国际)</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="table_title">女员工人数</td>
                  <td></td>
                  <td class="table_title">合同工数量</td>
                  <td></td>
                </tr>
                <tr>
                  <td class="table_title">派遣工数量</td>
                  <td></td>
                  <td class="table_title"></td>
                  <td></td>
                </tr>
              </table>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
      <el-col>
        <el-footer class="footer-throwsf">
          <a href="javascrip:;">联系我们</a> | <a href="javascrip:;">声明</a>&nbsp;&nbsp;&nbsp;&nbsp;中国航空运输协会版权所有 | 京ICP备12001608号 | 京公网安备11010502034600号
        </el-footer>
      </el-col>
    </el-row>
    <el-dialog :title="showTitle" :visible.sync="isShow" width="70%">
      <pop-check @popFn="handlepop" />
    </el-dialog>
  </div>
</template>

<script>
import PopCheck from './detail-layout/components/pop-check'

export default {
  components: { PopCheck },
  data() {
    return {
      isShow: false,
      showTitle: '审 核',
      checkStatus: '未通过',
      checkInfo: '审核状态',
      activeName: 'firmInfo'
    }
  },
  methods: {
    handleClick() {

    },
    handleShow() {
      this.isShow = true
    },
    handlepop(popH, popV, popT) {
      this.isShow = popH
      this.checkStatus = popV
      this.checkInfo = popT
    }
  }
}
</script>

<style lang="scss" scoped>
*{
  font-weight: normal;
  font-size: 14px;
}
.header-throwsf {
    width: 100%;
    // position: fixed;
    left: 0;
    height: 120px !important;
    line-height: 120px;
    background: url('../../assets/img/header_bg.png');
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

  .newlog {
    .nl_l {
      box-sizing: border-box;
      padding-right: 10px;
      ul {
        border: 1px solid #007aad;
        background-color: #e2f5ff;
        margin-bottom: 10px;
        padding: 0 19px 19px 19px;
        li {
          margin-bottom: 10px;
          h2 {
            height: 88px;
            line-height: 88px;
            border-bottom: 1px solid #999;
            background: url('../../assets/img/login.png') left center no-repeat;
            padding-left: 60px;
            color: #000;
            font-size: 25px;
            span {
              font-size: 18px;
              color: #666;
            }
          }
          .ipt_login {
            display: inline-block;
            width: 49%;
          }
          .btn_login {
            width: 100%;
            height: 60px;
            line-height: 60px;
            text-align: center;
            color: #fff;
            font-size: 24px;
          }
        }
        li:last-child {
          text-align: center;
          margin-top: 30px;
          color: #008dff;
        }
      }
      .nl_l_btn {
        display: block;
        background-color: #008dff;
        margin-bottom: 10px;
        height: 100px;
        width: 100%;
        line-height: 100px;
        color: #fff;
        font-size: 30px;
        text-align: center;
        img {
          vertical-align: middle;
          margin-right: 5px;
        }
      }
    }

    .nl_r_list {
      border: 1px solid #e5e5e5;
      margin-bottom: 10px;
      h5 {
        background-color: #008dff;
        padding-left: 20px;
        color: #fff;
        height: 46px;
        line-height: 46px;
        font-size: 16px;
        position: relative;
        a {
          display: inline-block;
          position: absolute;
          right: 20px;
          top: 0px;
        }
      }
      ul {
        padding: 0 20px;
        background-color: #fff;
        height: 250px;
      }
      ul li {
        line-height: 38px;
        border-bottom: 1px dashed #e5e5e5;
        position: relative;
        b {
          display: inline-block;
          vertical-align: middle;
          margin-right: 10px;
          width: 5px;
          height: 5px !important;
          background-color: #000;
        }
        span {
          position: absolute;
          right: 5px;;
        }
      }
      ul li:last-child {
        border: none;
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
.detailsContainer {
  position: relative;
  margin-bottom: 20px;
}
.comName {
  position: absolute;
  text-align: right;
  right: 50px;
  top: 35px;
  color: #409EFF;
}
.pop-tip {
  width: 200px;
  overflow: hidden;
}
.dtl-hint {
  border-radius: 3px;
  text-align: center;
  background-color: #eef5fe;
}
.dtl-hint, .status-pass, .status-unpass {
  height: 40px;
  line-height: 40px;
}
.status-pass, .status-unpass {
  display: inline-block;
  box-sizing: border-box;
  padding-top: 15px;
}
.dtl-hint, .status-pass {
  color: #67C23A;
}
.status-unpass {
  color: #F56C6C;
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
  color: #409EFF;
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
</style>
