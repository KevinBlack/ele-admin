	<template>
  <div>
    <el-card class="detailsContainer">
      <el-form ref="formQuery" :model="formQuery" label-width="100px">
        <el-row>
          <el-col :md="12" :lg="12" :xl="8">
            <el-form-item label="异常时间" size="mini" prop="userName">
              <el-date-picker
                v-model="formQuery.createTime"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                style="width:100%"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :md="6" :lg="6" :xl="4">
            <el-form-item label="分属系统" size="mini" prop="loginCode">
              <el-input v-model="formQuery.systemSource" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="6" :lg="6" :xl="4">
            <el-form-item label="异常方法" size="mini" prop="userName">
              <el-input v-model="formQuery.exceptionMethod" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="6" :lg="6" :xl="4">
            <el-form-item label="异常内容" size="mini" prop="userName">
              <el-input v-model="formQuery.exceptionContent" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="6" :lg="6" :xl="4">
            <el-form-item size="mini">
              <el-button type="primary" size="mini" @click="search">查询</el-button>
              <el-button size="mini" @click="resetForm('formQuery')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <!-- 按钮区域 -->
      <el-row class="area_bordes">
        <el-col :span="24">
          <el-button-group size="mini">
            <el-button type="primary" icon="el-icon-delete" size="mini" @click="batchDelete">批量删除</el-button>
          </el-button-group>
        </el-col>
      </el-row>

      <el-table
        :data="tableData"
        v-loading="tableLoading"
        border
        tooltip-effect="dark"
        style="width: 100%;margin-bottom:20px;"
        @selection-change="selectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="createTime" label="异常时间" width="200" align="center"></el-table-column>
        <el-table-column prop="systemSource" label="分属系统" width="150" align="center"></el-table-column>
        <el-table-column
          prop="exceptionMethod"
          label="异常方法"
          align="left"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button @click="handleView(scope.row)" type="text" size="small">异常明细</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="area_bordes">
        <el-col :span="24" style="text-align: right;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="formQuery.pageNo"
            :page-size.sync="formQuery.pageSize"
            :page-sizes="[15, 30, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageTotal"
          ></el-pagination>
        </el-col>
      </el-row>
    </el-card>
    <!-- 详情页弹框 -->
    <el-dialog title="异常明细" :visible.sync="dialogVisible" width="50%">
      <!-- <span>错误信息详细</span> -->
      <el-input type="textarea" :rows="20" v-model="dialogMsg"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

	<script>
import { getExceptionList, deleteException } from "@/api/system/exception";
import { parseTime } from "@/utils/index.js";

export default {
  name:'Exception',
  data() {
    return {
      dialogVisible: false,
      dialogMsg: "",
      treeData: [],
      treeDefaultProps: {
        children: "childs",
        label: function(data, node) {
          return data.officeName;
        }
      },
      pageTotal: 0,
      formQuery: {
        systemSource: "",
        exceptionMethod: "",
        exceptionContent: "",
        createTime: [],
        pageNo: 1,
        pageSize: 15,
        orderBy: ""
      },
      tableLoading: false,
      tableData: [],
      tableMultiSelection: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              console.log(picker);
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  created() {
    // 设置查询时间从
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
    this.formQuery.createTime = [parseTime(start), parseTime(end)];
    this.getTableList();
  },
  methods: {
    handleView(row) {
      this.dialogVisible = true;
      this.dialogMsg = row.exceptionContent;
    },
    selectionChange(val) {
      this.tableMultiSelection = val;
    },
    search() {
      this.getTableList();
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    getTableList() {
      this.tableLoading = true;
      var {
        systemSource,
        exceptionMethod,
        exceptionContent,
        createTime,
        pageNo,
        pageSize,
        orderBy
      } = this.formQuery;
      var startTime = "";
      var endTime = "";
      if (createTime.length >= 0) {
        startTime = createTime[0];
        endTime = createTime[1];
      }
      getExceptionList({
        systemSource,
        exceptionMethod,
        exceptionContent,
        startTime,
        endTime,
        pageNo,
        pageSize,
        orderBy
      }).then(response => {
        this.tableData = response.data;
        this.pageTotal = response.page.total || 0;
        this.tableLoading = false;
      });
    },
    handleSizeChange(val) {
      this.getTableList();
    },
    handleCurrentChange(val) {
      this.getTableList();
    },
    rowStyle(row, rowIndex) {
      return "height:15px;font-size: 13px;color: #333;font-weight: normal; ";
    },
    headRowStyle(row, rowIndex) {
      return "height:15px;";
    },
    getCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background: #F2F2F2;font-size: 13px;color: #333;font-weight: normal;";
      } else {
        return "";
      }
    },
    batchDelete() {
      if (!this.tableMultiSelection) {
        this.$message({
          type: "info",
          message: "请选中要删除的数据!"
        });
        return;
      }
      let selectRows = this.tableMultiSelection;
      if (selectRows.length == 0) {
        this.$message({
          type: "info",
          message: "请选中要删除的数据!"
        });
        return;
      }
      this.$confirm("是否执行删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var idArr = new Array();
          Object.keys(selectRows).forEach(function(key) {
            if (selectRows[key].id) {
              idArr.push(selectRows[key].id);
            }
          });
          if (idArr && idArr.length > 0) {
            var ids = idArr.join();
            deleteException(ids).then(response => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getTableList();
            });
          }
        })
        .catch(() => {
          // 取消时执行此处
        });
    }
  }
};
</script>
	<style>
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
</style>
