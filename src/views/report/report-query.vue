  <template>
  <el-card class="detailsContainer">
    <!-- part1 -->
    <el-form ref="formQuery" :model="formQuery" label-width="100px" size="mini">
      <el-row :gutter="20" class="area_border">
        <el-col :span="6">
          <el-form-item label="年份查询" size="mini" prop="createDate">
            <el-input size="mini" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="上报状态" size="mini" prop="createDate">
            <el-select v-model="value" size="mini" style="width: 60%" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="text-align: center;"  >
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
    <el-row :gutter="20" class="area_bordes">
      <el-col :span="24">
        <el-radio-group size="mini">
          <el-radio-button type="primary" class="btn_line" @click.native.prevent="handleEdit">查看信息</el-radio-button>
          <el-radio-button type="primary" class="btn_line" @click.native.prevent="deleteBatch">删除信息</el-radio-button>
        </el-radio-group>
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
      <el-table-column prop="reportYear" label="上报年份" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="businessName" label="企业名称" width="250" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="reportTime" label="上报时间" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="reporter" label="上报人" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="status" label="上报状态" align="center" :show-overflow-tooltip="true"></el-table-column>
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
import { getReportInfoList,annualReportDeleteBatch } from "@/api/hxxd/agent";
import { parseTime } from "@/utils/index.js";
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
        beginTime: "",
        endTime: "",
        pageNo: 1,
        pageSize: 5,
        orderBy: ""
      },
      options: [{
          value: '选项1',
          label: '已上报'
        }, {
          value: '选项2',
          label: '未上报'
        }],
        value: '选项1'
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
        annualReportDeleteBatch(this.param).then(response => {
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
    getCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background: #F2F2F2;font-size: 13px;color: #333;font-weight: normal'
      } else {
        return ''
      }
    },
    handleEdit() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: "请选择数据",
          type: "warning"
        });
      } else if (this.multipleSelection.length === 1) {
        let id = this.multipleSelection[0].id;
        if (id) {
          this.$router.push({
            path: '/annual-report/annual-report-detail',
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
      this.formQuery.beginTime = this.createDate[0];
      this.formQuery.endTime = this.createDate[1];
      getReportInfoList(this.formQuery).then(response => {
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
@import '~@/styles/hxxd.scss';
</style>
