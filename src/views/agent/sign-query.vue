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
        <el-radio-group size="mini">
          <el-radio-button size="small" type="primary" class="btn_line" @click.native.prevent="downloadFile">模板下载</el-radio-button>
          <el-radio-button size="small" type="primary" class="btn_line">门户发布</el-radio-button>
          <el-radio-button size="small" type="primary" class="btn_line">门户撤回</el-radio-button>
          <el-radio-button size="small" type="primary" class="btn_line" @click.native.prevent="deleteBatch" >删除</el-radio-button>
        </el-radio-group>
      </el-col>
      <el-col style="width: 50%;margin-bottom: 15px;">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="/hxxd/hxXdSignContract/batchUpload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :auto-upload="false"
          :headers="uploadHeaders"
          :data="uploadData"
          :multiple="true"
        >

            <el-button slot="trigger" size="mini" type="primary" style="border-radius: 5px 0 0 5px;">选取文件</el-button>
            <el-button
              style="margin-left: -4px;border-radius:0 5px 5px 0;"
              size="mini"
              type="primary"
              @click="submitUpload"
            >上传到服务器</el-button>

        </el-upload>
      </el-col>
    </el-row>
    <!-- part3 -->
    <!-- <el-row :gutter="10">
      <el-col :span="24">
        <div class="dtl-info-line">
          已选择{{ sum }}条
          <el-button type="text" style="margin-left: 20px;" @click="toggleSelection()">清空</el-button>
        </div>
      </el-col>
    </el-row> -->
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
import { downloadFile } from "@/api/system/comm/comm";
import { getSignInfoList ,signInfoDeleteBatch} from "@/api/hxxd/agent";
import { parseTime } from "@/utils/index.js";
import { getToken } from "@/utils/auth";
export default {
  data() {
    return {
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
        beginTime: "",
        endTime: "",
        pageNo: 1,
        pageSize: 5,
        orderBy: ""
      },
      //文件上传
      fileList: [],
      uploadHeaders: {
        "X-Token": getToken()
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
    downloadFile() {
      downloadFile({ id: 1 }).then(response => {
        console.log(response.headers)
        var contentDisposition = response.headers["content-disposition"]; //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
        var patt = new RegExp("filename=([^;]+\\.[^\\.;]+);*")
        var result = patt.exec(contentDisposition)
        console.log(contentDisposition)
        var fileName=decodeURIComponent(result[1]).trim()
        // var fileName="20190906~航协系统项目开发蓝图.xlsx"
        console.log(fileName);
        const blob = new Blob([response.data])
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a")
          elink.download = fileName
          elink.style.display = "none"
          elink.href = URL.createObjectURL(blob)
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
      debugger;
      var idList = [];
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "请选择数据",
          type: "warning"
        });
      } else {
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
      debugger;
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "请选择数据",
          type: "warning"
        });
      } else if (this.multipleSelection.length == 1) {
        debugger;

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
      if (val.length > 1) {
        this.$message({
          message: "只能选择单条",
          type: "warning"
        });
      }
      if (val.length !== 0) {
        this.added = val.length;
        this.sum = this.added;
      } else if (val.length === 0) {
        this.sum -= this.added;
      }
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
