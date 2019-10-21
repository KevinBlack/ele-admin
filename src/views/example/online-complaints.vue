<template>
  <div class="app-wrapper">
    <el-row>
      <el-col :span="24">
        <el-header class="header-throwsf">
          <el-row>
            <el-col :span="20">
              <img src="../../assets/img/logo.png" style="margin-top: 20px;" height="60"/>
            </el-col>
            <el-col :span="4">
              <el-row>
                <img src='../../assets/img/menology_n.png' style="vertical-align: middle;margin-right: 5px;" height="30" />
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
          <table>
            <tr>
              <th colspan="4">举报人信息(注意标有<b>*</b>的必须填写)</th>
            </tr>
            <tr>
              <td class="table_title">姓名</td>
              <td><el-input class="ipt_w" /></td>
              <td class="table_title">身份证号</td>
              <td><el-input class="ipt_w" /></td>
            </tr>
            <tr>
              <td class="table_title">联系方式</td>
              <td><el-input class="ipt_w" /></td>
              <td class="table_title">政治面貌</td>
              <td>
                <el-select class="ipt_w" v-model="value" clearable placeholder="请选择">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td class="table_title">现居住地址</td>
              <td><el-input class="ipt_w" /></td>
              <td class="table_title">级别</td>
              <td>
                <el-select class="ipt_w" v-model="value" clearable placeholder="请选择">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <th colspan="4">被举报人(单位)信息(注意标有<b>*</b>的必须填写)</th>
            </tr>
            <tr>
              <td class="table_title">被举报人姓名<b>*</b></td>
              <td><el-input class="ipt_w" /></td>
              <td class="table_title">单位<b>*</b></td>
              <td><el-input class="ipt_w" /></td>
            </tr>
            <tr>
              <td class="table_title">职务<b>*</b></td>
              <td><el-input class="ipt_w" /></td>
              <td class="table_title">所在地区<b>*</b></td>
              <td>北京市</td>
            </tr>
            <tr>
              <td class="table_title">级别</td>
              <td>
                <el-select class="ipt_w" v-model="value" clearable placeholder="请选择">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </td>
              <td class="table_title"></td>
              <td></td>
            </tr>
            <tr>
              <th colspan="4">举报正文(注意标有<b>*</b>的必须填写)</th>
            </tr>
            <tr>
              <td class="table_title">标题(最多50字)<b>*</b></td>
              <td colspan="3"><el-input class="ipt_l" /></td>
            </tr>
            <tr>
              <td class="table_title">问题类别<b>*</b></td>
              <td colspan="3">
                <el-select class="ipt_l" v-model="value" clearable placeholder="请选择">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td class="table_title">问题细类<b>*</b></td>
              <td colspan="3">
                <el-select class="ipt_l" v-model="value" clearable placeholder="请选择">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td class="table_title">主要问题<b>*</b></td>
              <td colspan="3">
                <el-input
                  type="textarea"
                  :rows="8"
                  class="ipt_l"
                  placeholder="请输入内容"
                  v-model="textarea">
                </el-input>
              </td>
            </tr>
            <tr>
              <th colspan="4">上传附件</th>
            </tr>
            <tr>
              <td class="table_title">附件</td>
              <td colspan="3">
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  action="/sys/jqSysFile/fileUpload"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList"
                  :auto-upload="false"
                  :headers="uploadHeaders"
                  :data="uploadData"
                  :multiple="true"
                  drag
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">
                    将文件拖到此处，或
                    <em>点击上传</em>
                  </div>
                  <div class="el-upload_tip" slot="tip">温馨提示：最多可同时上传5个文件，每个文件不超过2M。附件后缀名仅限.jpg、.png、.gif、.bmp、.tff的文件。禁止上传exe、bat等格式文件上传！</div>
                </el-upload>
              </td>
            </tr>
            <tr>
              <td class="table_title">验证码<b>*</b></td>
              <td colspan="3"></td>
            </tr>
          </table>
        </el-card>
      </el-col>
      <el-col>
        <el-footer class="footer-throwsf">
          <a href="javascrip:;">联系我们</a> | <a href="javascrip:;">声明</a>&nbsp;&nbsp;&nbsp;&nbsp;中国航空运输协会版权所有 | 京ICP备12001608号 | 京公网安备11010502034600号
        </el-footer>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options1: [{
        value: '选项1',
        label: '群众'
      }, {
        value: '选项2',
        label: '共青团团员'
      }, {
        value: '选项3',
        label: '共产党党员'
      }],
      value: '',
      textarea: '',
      fileList: []
    }
  },
  methods: {
    downloadFile() {
      downloadFile({ id: 1 }).then(response => {
        console.log(response.headers);
        var contentDisposition = response.headers["content-disposition"]; //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
        var patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*");
        var result = patt.exec(contentDisposition);
        console.log(contentDisposition);
        var fileName=decodeURIComponent(result[1]).trim();
        // var fileName="20190906~航协系统项目开发蓝图.xlsx"
        console.log(fileName);
        const blob = new Blob([response.data]);
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      });
    },
    submitUpload() {
      console.log("submitUpload");
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
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

  .reg-content {
    .reg-con-c {
      text-align: center;
      margin-bottom: 20px;
      h3 {
        border-bottom: 1px solid #bfbfc0;
        font-size: 30px;
        height: 60px;
        line-height: 10px;
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
  }
.detailsContainer {
  margin-bottom: 20px;
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
table tr th b, table tr td b {
  color: #F56C6C;
  font-size: 16px;
  font-weight: bolder;
}
.table_title {
  background-color: #f2f2f2;
  color: #555;
  width: 150px;
  text-align: center;
  padding: 0;
}
.ipt_w {
  width: 90%;
}
.ipt_l {
  width: 96%;
}
.el-upload_tip {
  color: #F56C6C;
}
</style>
