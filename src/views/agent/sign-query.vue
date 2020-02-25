  <template>
  <el-card class="detailsContainer">
    <!-- part1 -->
    <el-form ref="formQuery" :model="formQuery" label-width="100px" size="mini">
      <el-row :gutter="20" class="area_border">
        <el-col :span="10">
          <el-form-item label="签约时间" size="mini" prop="createDate">
             <el-date-picker
              v-model="createDate"
              type="datetimerange"
              value-format= "yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              style="width:100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="企业名称" size="mini" prop="businessName">
            <el-input v-model="formQuery.businessName" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="协议有效期" size="mini" prop="businessName">
            <el-input v-model="formQuery.agreementDuration" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="业务类别" size="mini" prop="businessName">
            <el-input v-model="formQuery.businessType" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8" style="text-align: left;" >
          <el-button type="primary" icon="el-icon-search" size="mini" @click="getTableList">查询</el-button>
          <el-button
            type="primary"
            icon="el-icon-refresh-right"
            @click="resetForm('formQuery')"
            size="mini"
          >重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- part2 -->
    <el-row class="area_border">
      <el-col style="margin-left: 10px;width: 27%;">
        <el-button-group size="mini">
          <el-button size="small" type="primary" v-show="btnShow('1000208040')" class="btn_line" @click.native.prevent="handleDownload">模板下载</el-button>
          <el-button size="small" type="primary" v-show="btnShow('1000208030')" class="btn_line" @click="pubOrCancelSign(true)">门户发布</el-button>
          <el-button size="small" type="primary" v-show="btnShow('1000208030')" class="btn_line"  @click="pubOrCancelSign(false)">门户撤回</el-button>
          <el-button size="small" type="primary" v-show="btnShow('1000208020')" class="btn_line" @click.native.prevent="deleteBatch" >删除</el-button>
        </el-button-group>
      </el-col>
      <el-col style="width: 50%;margin-bottom: 15px;margin-left: 10px;">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="/zuul/hxxd/hxXdSignContract/batchUpload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
          :headers="uploadHeaders"
          :multiple="true"
        >
            <el-button slot="trigger" size="small" type="primary" class="btn_line" >选取文件</el-button>
            <el-button
              size="small"
              class="btn_line"
              type="primary"
              v-show="btnShow('1000208010')"
              @click="submitUpload"
            >上传到服务器</el-button>

        </el-upload>
      </el-col>
    </el-row>
    <!-- part3 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      v-loading="tableLoading"
      tooltip-effect="dark"
      highlight-current-row
      :header-cell-style="getCellStyle"
      @selection-change="handleSelectionChange"
      class="table-hxxd"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
      <el-table-column prop="businessType" label="业务类别" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="socialCode" label="统一社会信用代码" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="businessName" label="企业名称" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="agreementDuration" label="协议有效期" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="signAirLine" label="签约航空公司" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="isPub" label="发布状态" align="center" :formatter="statusPub" :show-overflow-tooltip="true"></el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-row class="area_bordes">
      <el-col :span="24" style="text-align: right;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="formQuery.pageNo"
          :page-size.sync="formQuery.pageSize"
          :page-sizes="[5, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotal"
        />
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { getSignInfoList ,signInfoDeleteBatch,pubOrCancelSign} from "@/api/hxxd/agent";
import { parseTime } from "@/utils/index.js";
import { getToken } from "@/utils/auth";
import { downloadTemplate } from '@/api/hxxd/financialManage'
export default {
  data() {
    return {
      //发布状态
      statusPub(row, column, cellValue, index) {
      let isPub = row.isPub;
      if (isPub === "0") {
        return "未发布";
      } else if (isPub === "1") {
        return "已发布";
      } else if (isPub === "2") {
        return "取消发布";
      } else {
        return row.isPub;
      }
    },
       //获取有权限的按钮
      btns: this.$store.getters.btns['10002080'],
      downloadQuery: {
        fileCatalog: 'sign_template',
        belongId: 63
      },
       param:{
        idList: []
      },
      sum: 0,
      added: 0,
      multipleSelection: [],
      pageTotal: 0,
      tableLoading: false,
      tableData: [],
      createDate: [],
      formQuery: {
        businessName: "",
        businessType: "",
        agreementDuration: "",
        beginTime: "",
        endTime: "",
        pageNo: 1,
        pageSize: 5,
        orderBy: ""
      },
      //文件上传
      fileList: [],
      uploadHeaders: {
        "X-Token": getToken(),
      },
       uploadData: {
        id: 22
      }
    };
  },
  created() {
    //初始化页面时
    // 参数传递 router.push({ path: 'register', query: { plan: 'private' }})
    // 参数接受 let id = this.$route.query.jId;
    // let flag = this.$route.query.flag;
    // if (flag) {
    this.getTableList();
    this.formQuery.endTime = parseTime(new Date());
    // }
  },
  methods: {
    //发布或者取消发布
    pubOrCancelSign(pubOrCancel) {
      var idList = [];
      var rows = this.multipleSelection;
      if (!rows || rows.length == 0) {
        this.$message({
          type: "info",
          message: "请选择要操作的数据!"
        });
        return;
      }
      var illegalNameArr = new Array();
      Object.keys(rows).forEach(function(key) {
        idList.push( rows[key].id);
        if (pubOrCancel) {
          if ( rows[key].isPub === "1") {
            //未发布的可以发布
            illegalNameArr.push(
              rows[key].businessName + "-" + rows[key].signAirLine
            );
          }
        } else {
          if (rows[key].isPub !== "1") {
            //已发的可以取消
            illegalNameArr.push(
              rows[key].businessName + "-" + rows[key].signAirLine
            );
          }
        }
      });

      if (illegalNameArr.length > 0) {
        var msg =
          "选择的数据状态非法，企业名称-签约航空公司：" + illegalNameArr.join(",");
        this.$message({
          type: "info",
          message: msg
        });
        return;
      }
      this.param.idList = idList;
      this.param.pubOrCancel = pubOrCancel;
      pubOrCancelSign(this.param).then(response => {
        if (response.data) {
          var message = pubOrCancel ? "发布成功" : "取消发布成功"; //操作成功
          this.$message({
            type: "success",
            message: message
          });
          //更新列表
          this.getTableList();
        } else {
          var message = pubOrCancel ? "发布失败" : "取消发布失败"; //操作失败
          this.$message({
            type: "false",
            message: message
          });
        }
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
     handleDownload() {
      downloadTemplate(this.downloadQuery.belongId,this.downloadQuery.fileCatalog).then(response => {
        var contentDisposition = response.headers["content-disposition"]; //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
        console.log('contentDisposition',contentDisposition)
        var patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*")
        var result = patt.exec(contentDisposition)
        var fileName = decodeURIComponent(result[1]).trim()
        const blob = new Blob([response.data])
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a")
          elink.download = fileName
          elink.style.display = "none"
          elink.href = URL.createObjectURL(blob)
          console.log(elink.href)
          document.body.appendChild(elink)
          elink.click()
          URL.revokeObjectURL(elink.href) // 释放URL 对象
          document.body.removeChild(elink)
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName)
        }
      })
    },
    getCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background: #F2F2F2;font-size: 13px;color: #333;font-weight: normal'
      } else {
        return ''
      }
    },
     deleteBatch() {
      var rows = this.multipleSelection;
      var idList = [];
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "请选择数据",
          type: "warning"
        });
      } else {
        var illegalNameArr = new Array();
      Object.keys(rows).forEach(function(key) {
        idList.push( rows[key].id);
          if ( rows[key].isPub === "1") {
            //未发布的可以删除
            illegalNameArr.push(
              rows[key].businessName + "-" + rows[key].signAirLine
            );
          }
      });

      if (illegalNameArr.length > 0) {
        var msg =
          "请选择未发布的数据进行删除，企业名称-签约航空公司：" + illegalNameArr.join(",");
        this.$message({
          type: "info",
          message: msg
        });
        return;
      }
        this.multipleSelection.forEach(i => {
          idList.push(i.id);
        });
        //批量删除
        this.param.idList=idList;
        signInfoDeleteBatch(this.param).then(response => {
          if (response.status == 200) {
            //删除成功
            this.$message({
              type: "success",
              message: "删除成功"
            });
            //更新列表
             this.getTableList();
          }
        });
      }
    },
    handleEdit() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "请选择数据",
          type: "warning"
        });
      } else if (this.multipleSelection.length == 1) {

        var id = this.multipleSelection[0].id;
        if (id) {
          this.$router.push({
            path: "/agent/info-detail",
            query: { id: id }
          });
        }
      } else if (this.multipleSelection.length > 1) {
        this.$message({
          message: "请选择单条数据",
          type: "warning"
        });
      }
    },
    handleSizeChange(val) {
      this.getTableList();
    },
    handleCurrentChange(val) {
      this.getTableList();
    },
    getTableList() {
      this.tableLoading = true;
      this.formQuery.beginTime =  this.createDate[0];
      this.formQuery.endTime =  this.createDate[1];
      getSignInfoList(this.formQuery).then(response => {
        this.tableData = response.data;
        this.pageTotal = response.page.total;
        this.tableLoading = false;
      });
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    }, //文件上传相关方法
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
};
</script>
<style>
 @import '~@/styles/hxxd.scss';
 .aa {
   border-radius: 5px 5px 0 0;
 }
</style>
