<template>
  <!-- part1 -->
  <el-card class="box-card" style="margin: 0 10px;">
    <!-- 查询面板 -->
    <el-card class="box-card" shadow="never">
      <!-- label-width="65px" -->
      <el-form ref="formQuery" :model="formQuery" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="行业类型" size="mini" prop="industryType">
              <el-select v-model="formQuery.industryType" filterable placeholder="请选择" size="mini">
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  style="width:100%"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发布内容" size="mini" prop="industryContent">
              <el-input v-model="formQuery.industryContent" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item size="mini" label-width="25px">
              <el-button type="primary" size="mini" @click="search">查询</el-button>
              <el-button size="mini" @click="resetForm('formQuery')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row class="area_bordes">
        <el-col :span="24">
          <el-radio-group size="mini">
            <el-button type="primary" size="mini" class="btn_line" @click="handleAdd">新 增</el-button>
            <el-button type="primary" size="mini" class="btn_line" @click="handleSave">保 存</el-button>
            <el-button type="primary" size="mini" class="btn_line" @click="handleUpdate">修 改</el-button>
            <el-button type="primary" size="mini" class="btn_line" @click="deleteByIds">删 除</el-button>
            <el-button type="primary" size="mini" class="btn_line" @click="handlePublish">发 布</el-button>
            <el-button
              type="primary"
              size="mini"
              class="btn_line"
              @click="handleCanclePublish"
            >取 消 发 布</el-button>
          </el-radio-group>
        </el-col>
      </el-row>
    </el-card>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      tooltip-effect="dark"
      style="width: 100%;"
      @selection-change="selectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="industryContent" label="发布内容">
        <template slot-scope="scope">
          <template v-if="scope.row.editing">
            <el-input v-model="scope.row.industryContent" class="edit-input" placeholder="请填写发布内容" />
          </template>
          <span v-else>{{ scope.row.industryContent }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="industryType" :formatter="industryType" label="行业类型">
        <template slot-scope="scope">
          <template v-if="scope.row.editing">
            <el-select
              v-model="scope.row.industryType"
              filterable
              placeholder="请填写行业类型"
              size="mini"
              style="width:100%"
            >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                style="width:100%"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
          <span v-else>{{ scope.row.industryType }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="publishStatus" :formatter="publishStatus" label="发布状态"></el-table-column>
    </el-table>
    <!-- 表格区2end -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="formQuery.pageNo"
      :page-size.sync="formQuery.pageSize"
      :page-sizes="[15, 30, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageTotal"
    ></el-pagination>
  </el-card>
</template>
<script>
import {
  selectIndustry,
  deleteIndustryByIds,
  updateIndustryInfo,
  addIndustryInfo,
  industryInfoPublish,
  cancleIndustryInfoPublish
} from "@/api/hxxd/industryInfoPublish";
import { parseTime } from "@/utils/index.js";
export default {
  data() {
    return {
      show: false,
      treeData: [],
      addData: [],
      params: {},
      treeDefaultProps: {
        children: "childs",
        label: function(data, node) {
          return data.complainant;
        }
      },
      formQuery: {
        industryContent: "",
        industryType: "",
        publishStatus: "",
        pageNo: 1,
        pageSize: 15
      },
      pageTotal: 0,
      tableLoading: false,
      tableData: [],
      tableMultiSelection: [],
      statusOptions: [
        {
          value: 1,
          label: "消代分会"
        },
        {
          value: 2,
          label: "航食分会"
        }
      ]
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    getTableList() {
      this.tableLoading = true;
      selectIndustry(this.formQuery).then(response => {
        this.tableData = response.data;
        this.tableData.forEach(item => {
          if (item.industryType === 1) {
            item.industryType = "销代分会";
          } else if (item.industryType === 2) {
            item.industryType = "航食分会";
          }
        });
        this.pageTotal = response.page.total;
        this.tableLoading = false;
      });
    },
    handleAdd() {
      const len = this.tableData.length - 1;
      var newValue = {
        industryContent: "",
        industryType: "",
        publishStatus: 0,
        editing: true
      };
      this.tableData.push(newValue);
      this.addData.push(newValue);
    },
    handleSave() {
      this.addData.forEach(item => {
        item.editing = false;
        if (item.industryContent == "" || item.industryType == "") {
          this.$notify({
            title: "提示",
            message: "请完善数据",
            type: "warning",
            duration: 2000
          });
        } else {
          this.params = {
            industryInfo: JSON.stringify(this.addData)
          };
        }
      });
      addIndustryInfo(this.params).then(response => {
        this.getTableList();
        this.tableLoading = false;
      });
    },
    handleUpdate() {
      if (!this.tableMultiSelection) {
        this.$message({
          type: "info",
          message: "请选中要修改的数据!"
        });
        return;
      }
      let selectRows = this.tableMultiSelection;
      if (selectRows.length == 0) {
        this.$message({
          type: "info",
          message: "请选中要修改的数据!"
        });

        return;
      } else if (selectRows.length >= 2) {
        this.$message({
          type: "info",
          message: "请选中单条数据!"
        });
        return;
      }
      this.$router.push({
        path: "/infoPublish/updateIndustryInfo",
        query: { id: selectRows[0].id }
      });
    },
    deleteByIds() {
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
          var ids = [];
          Object.keys(selectRows).forEach(function(key) {
            if (selectRows[key].id) {
              ids.push(selectRows[key].id);
            }
          });
          if (ids && ids.length > 0) {
            var ids = ids.join();
            deleteIndustryByIds(ids).then(response => {
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
    },
    handlePublish() {
      if (!this.tableMultiSelection) {
        this.$message({
          type: "info",
          message: "请选中要发布的数据!"
        });
        return;
      }
      let selectRows = this.tableMultiSelection;
      if (selectRows.length == 0) {
        this.$message({
          type: "info",
          message: "请选中要发布的数据!"
        });
        return;
      } else if (selectRows[0].publishStatus === 1) {
        this.$message({
          type: "info",
          message: "该数据已发布，请重新选择!"
        });
        return;
      }
      var idsArr = [];
      selectRows.forEach(item => {
        idsArr.push(item.id);
      });
      var ids = idsArr.join(",");
      industryInfoPublish(ids).then(response => {
        this.$message({
          type: "success",
          message: "发布成功",
          path: "./complaintInfo/complaintInfo"
        });
        this.getTableList();
      });
    },
    handleCanclePublish() {
      if (!this.tableMultiSelection) {
        this.$message({
          type: "info",
          message: "请选中要发布的数据!"
        });
        return;
      }
      let selectRows = this.tableMultiSelection;
      if (selectRows.length == 0) {
        this.$message({
          type: "info",
          message: "请选中要发布的数据!"
        });
        return;
      } else if (selectRows[0].publishStatus === 0) {
        this.$message({
          type: "info",
          message: "该数据未发布，请重新选择!"
        });
        return;
      }
      // var ids = selectRows[0].id;
      var idsArr = [];
      selectRows.forEach(item => {
        idsArr.push(item.id);
      });
      var ids = idsArr.join(",");
      cancleIndustryInfoPublish(ids).then(response => {
        this.$message({
          type: "success",
          message: "已取消发布",
          path: "./complaintInfo/complaintInfo"
        });
        this.getTableList();
      });
    },
    industryType(row, column, cellValue, index) {
      const status = row.industryType;
      if (status === 1) {
        return "销代分会";
      } else if (status === 2) {
        return "航食分会";
      } else {
        return row.status;
      }
    },
    publishStatus(row, column, cellValue, index) {
      const status = row.publishStatus;
      if (status === 0) {
        return "未发布";
      } else if (status === 1) {
        return "已发布";
      } else {
        return row.status;
      }
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    search() {
      this.getTableList();
    },
    selectionChange(val) {
      this.tableMultiSelection = val;
    },
    handleSizeChange() {
      this.getTableList();
    },
    handleCurrentChange() {
      this.getTableList();
    }
  }
};
</script>

<style scoped>
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
.tsfDlg {
  margin: 0 10px;
}
</style>
