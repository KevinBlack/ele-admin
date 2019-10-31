  <template>
  <el-card class="detailsContainer">
    <!-- part1 -->
    <el-form ref="formQuery" :model="formQuery" label-width="100px" size="mini">
      <el-row :gutter="20" class="area_border">
        <el-col :span="10">
          <el-form-item label="生成时间从" size="mini" prop="createDate">
            <el-date-picker
              v-model="createDate"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              style="width:100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否已读" size="mini" prop="isRead">
            <el-input v-model="formQuery.isRead" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="关键字搜索" size="mini" prop="header">
            <el-input v-model="formQuery.header" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="公司名称" size="mini" prop="companyBel">
            <el-input v-model="formQuery.companyBel" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5" style="text-align: center;">
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

    <!-- 增删改查按钮 -->
    <el-row class="area_bordes">
      <el-col :span="24">
        <el-radio-group size="mini">
          <el-radio-button type="primary" class="btn_line" @click.native.prevent="handleAdd">新 增</el-radio-button>
          <el-radio-button
            type="primary"
            class="btn_line"
            @click.native.prevent="handleEdit('update')"
          >修 改</el-radio-button>
          <el-radio-button type="primary" class="btn_line" @click.native.prevent="deleteBatch">删 除</el-radio-button>
        </el-radio-group>
        <el-radio-group size="mini" style="margin-left: 20px;">
          <el-radio-button
            type="primary"
            class="btn_line"
            @click.native.prevent="handleEdit('show')"
          >查 看</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>

    <!-- part3 -->
    <el-row :gutter="10">
      <el-col :span="24">
        <div class="dtl-info-line">
          已选择{{ sum }}条
          <el-button type="text" style="margin-left: 20px;" @click="toggleSelection()">清空</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      v-loading="tableLoading"
      tooltip-effect="dark"
      style="width: 100%;"
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
      <el-table-column prop="header" label="标题" width="325" align="center"></el-table-column>
      <el-table-column prop="time" label="发布时间" width="250" align="center"></el-table-column>
      <el-table-column prop="content" label="通知内容" width="250" align="center"></el-table-column>
      <el-table-column prop="isRead" label="是否已读" width="250" align="center"></el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      style="text-align: margin-top: 20px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="formQuery.pageNo"
      :page-size.sync="formQuery.pageSize"
      :page-sizes="[5, 30, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageTotal"
    ></el-pagination>
  </el-card>
</template>

<script>
import { getSysNoticeList, sysNoticeDeleteBatch } from "@/api/hxxd/agent";
import { parseTime } from "@/utils/index.js";
export default {
  data() {
    return {
      param: {
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
        companyBel: "",
        header: "",
        isRead: "",
        beginTime: "",
        endTime: "",
        pageNo: 1,
        pageSize: 5,
        orderBy: ""
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
    handleAdd() {
      debugger;
      this.$router.push({
        path: "/agent/sys-notice-edit"
      });
    },
    deleteBatch() {
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
        this.param.idList = idList;
        sysNoticeDeleteBatch(this.param).then(response => {
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
    handleEdit(type) {
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
            path: "/agent/sys-notice-detail",
            query: { id: id, type: type }
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
      getSysNoticeList(this.formQuery).then(response => {
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
    }
  }
};
</script>
<style>
.area_border,
.area_bordes {
  box-sizing: border-box;
  border: 1px solid #e6e6e6;
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding: 10px 0 0 0;
  margin-bottom: 20px;
  overflow: hidden;
}
.area_bordes {
  padding: 10px;
}
* {
  font-weight: normal;
}
.detailsContainer {
  margin: 0 10px;
}
.dtl-title-line {
  display: inline-block;
  border-left: 5px solid #409eff;
  padding-left: 5px;
}
.el-table__fixed-right::before {
  background-color: none;
}
.dtl-info-line {
  height: 40px;
  line-height: 40px;
  margin: 10px auto;
  border-radius: 3px;
  font-size: 12px;
  box-sizing: border-box;
  padding-left: 10px;
  color: #000;
  background-color: #dcecfd;
}
.el-table > th {
  background-color: #eee !important;
}
</style>
