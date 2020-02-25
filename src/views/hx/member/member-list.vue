<template>
  <div>
    <el-card class="detailsContainer">
      <!-- 查询面板 -->
      <!-- label-width="65px" -->
      <el-form
        ref="formQuery"
        :model="formQuery"
        label-width="100px"
        size="mini"
      >
        <el-row :gutter="20" class="area_border">
          <el-col :span="6">
            <el-form-item label="申请编号" size="mini" prop="code">
              <el-input v-model="formQuery.code" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="会员名称" size="mini" prop="name">
              <el-input v-model="formQuery.name" size="mini"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="创建时间从" size="mini" prop="createDateFrom">
              <el-date-picker
                v-model="formQuery.createDateFrom"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                style="width:100%"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="到" size="mini" prop="createDateTo">
              <el-date-picker
                v-model="formQuery.createDateTo"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                style="width:100%"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="归属地区" size="mini" prop="region">
              <el-select
                v-model="formQuery.region"
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

          <el-col :span="6">
            <el-form-item label="所属省市" size="mini" prop="areas">
              <el-cascader
                :props="props.area"
                :options="options.area"
                v-model="formQuery.areas"
                clearable
                filterable
                size="mini"
                style="width:100%;"
                change-on-select
              ></el-cascader>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="身份标记" size="mini" prop="status">
              <el-select
                v-model="formQuery.identityMark"
                filterable
                placeholder="请选择"
                size="mini"
                style="width:100%"
              >
                <el-option
                  v-for="item in memberTypeOptions"
                  :key="item.key"
                  :label="item.value"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="会员状态" size="mini" prop="status">
              <el-select
                v-model="formQuery.status"
                size="mini"
                style="width:100%"
              >
                <el-option
                  v-for="item in options.status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24" style="text-align: center;margin: 10px 0;">
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              @click="search"
              >查询</el-button
            >
            <el-button
              icon="el-icon-refresh-right"
              @click="resetForm('formQuery')"
              size="mini"
              >重置</el-button
            >
          </el-col>
        </el-row>
      </el-form>
      <!-- 按钮区域 -->
      <el-row class="area_bordes">
        <el-col :span="24">
          <el-button-group size="mini">
            <el-button
              type="primary"
              icon="el-icon-upload2"
              size="mini"
              class="btn_line"
              @click="handleExport"
              v-show="btnShow('100020605040')"
              >批量导出</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-check"
              size="mini"
              class="btn_line"
              @click="handleRecovery"
              v-show="btnShow('100020605050')"
              >恢复</el-button
            >
          </el-button-group>
          <el-button-group size="mini">
            <el-button
              type="primary"
              icon="el-icon-zoom-in"
              size="mini"
              class="btn_line"
              @click="handleView"
              v-show="btnShow('100020605020')"
              >查看</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-zoom-in"
              size="mini"
              class="btn_line"
              @click="handleProcessLogView"
              v-show="btnShow('100020605030')"
              >流程日志</el-button
            >
          </el-button-group>
        </el-col>
      </el-row>
      <!-- 表格区 -->
      <el-card
        class="box-card"
        shadow="never"
        :body-style="{ minHeight: '600px' }"
      >
        <!-- 表格区 -->
        <el-table
          ref="tableData"
          :data="tableData"
          v-loading="tableLoading"
          border
          tooltip-effect="dark"
          style="width: 100%;margin-bottom:20px;"
          @selection-change="selectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column
            prop="code"
            label="申请编号"
            width="250"
            align="center"
          />
          <el-table-column
            prop="certificateNo"
            label="会员证书编号"
            width="250"
            align="center"
          />
          <el-table-column
            prop="name"
            label="会员名称"
            width="120"
            align="center"
          />
          <el-table-column
            prop="identityMark"
            label="身份标记"
            width="100"
            align="center"
          />

          <el-table-column label="地址" align="center">
            <el-table-column prop="region" label="大区" align="center" />
            <el-table-column prop="provinceName" label="省份" align="center" />
            <el-table-column prop="cityName" label="市" align="center" />
          </el-table-column>

          <el-table-column
            prop="status"
            label="状态"
            width="100"
            align="center"
            :formatter="statusFmt"
          />
          <el-table-column
            prop="expiryDate"
            label="过期时间"
            width="180"
            align="center"
          />
        </el-table>
        <el-col class="area_bordes">
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
        </el-col>
      </el-card>
    </el-card>
    <!-- 流程日志弹框 -->
    <el-dialog :visible.sync="processLog.show" title="流程日志查询" width="60%">
      <SysProcessLogDialog
        :dataId="processLog.dataId"
        :dataCode="processLog.dataCode"
        :isShow="processLog.show"
        tableName="HX_MEMBER"
        @closeDalog="closeProcessLogDialog"
      />
    </el-dialog>
  </div>
</template>

<script>
import { getMemberList, memberRecovery } from "@/api/hxxd/member";
import { getDictDataLists, getAreaTree } from "@/api/system/comm/comm";
import { getDictName } from "@/utils/index.js";
import SysProcessLogDialog from "@/views/comm/sys-process-log-dialog";

export default {
  name: "MemberList",
  components: { SysProcessLogDialog },
  data() {
    return {
      memberTypeOptions: [],
      downloadLoading: false,
      pageTotal: 0,
      formQuery: {
        code: "",
        name: "",
        createDateFrom: "",
        createDateTo: "",
        areas: [],
        pageNo: 1,
        pageSize: 15,
        orderBy: "",
        status: [],
        identityMark: "",
        region: ""
      },
      areaOptions: [
        {
          value: "华东地区",
          label: "华东地区"
        },
        {
          value: "华南地区",
          label: "华南地区"
        },
        {
          value: "华中地区",
          label: "华中地区"
        },
        {
          value: "华北地区",
          label: "华北地区"
        },
        {
          value: "西北地区",
          label: "西北地区"
        },
        {
          value: "西南地区",
          label: "西南地区"
        },
        {
          value: "东北地区",
          label: "东北地区"
        }
      ],
      tableLoading: false,
      tableData: [],
      tableMultiSelection: [],
      //流程日志弹框
      processLog: {
        show: false,
        dataId: "",
        dataCode: "",
        system: "hxxd"
      },
      options: {
        status: [
          { value: "10", label: "生效" },
          { value: "30", label: "已退会" }
        ],
        area: []
      },
      //表单el标签属性
      props: {
        area: {
          multiple: false,
          checkStrictly: true,
          showAllLevels: true,
          value: "id",
          label: "name",
          children: "childs"
        }
      },
      btns: this.$store.getters.btns["1000206050"]
    };
  },
  created() {
    this.beforeLoading();
    this.getTableList();
  },
  methods: {
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "status") {
            return this.parseStatus(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    parseStatus(value) {
      if (value == "10") {
        return "生效";
      } else if (value == "30") {
        return "失效";
      }
    },
    handleExport() {
      var selectedRows = this.tableMultiSelection;
      if (!selectedRows || selectedRows.length === 0) {
        this.$message({
          type: "info",
          message: "请选中要导出的数据!"
        });
        return;
      }
      this.downloadLoading = true;
      // 引入Excel导出js文件
      import("@/vendor/Export2Excel").then(excel => {
        // excel 列标题
        const tHeader = [
          "会员证书编号",
          "会员名称",
          "身份标记",
          "省份名称",
          "城市名称",
          "中国大区",
          "状态",
          "过期时间"
        ];
        //  excel 每行的数据（如果想导出所有数据，发送ajax，从服务端获取数据）
        const list = selectedRows;
        // excel 数据对应的字段
        const filterVal = [
          "certificateNo",
          "name",
          "identityMark",
          "provinceName",
          "cityName",
          "region",
          "status",
          "expiryDate"
        ];
        // 从list 中去出值
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          // excel 列标题
          header: tHeader,
          // excel 数据
          data,
          // excel 文件名
          filename: "用户管理表",
          // excel 是否自动宽度
          autoWidth: true,
          // excel 文件后缀 ['xlsx', 'csv', 'txt']
          bookType: "xlsx"
        });
        this.downloadLoading = false;
      });
    },
    handleRecovery() {
      let selectRows = this.tableMultiSelection;
      if (!selectRows || selectRows.length === 0) {
        this.$message({
          type: "info",
          message: "请选中要恢复的数据!"
        });
        return;
      }
      var ids = new Array();
      Object.keys(selectRows).forEach(function(key) {
        if (selectRows[key].status == "10") {
          this.$message({
            type: "info",
            message: "当前数据已生效，请选中要恢复的数据!"
          });
          return;
        }
        if (selectRows[key].id) {
          ids.push(selectRows[key].id);
        }
      });
      var userIds = ids.join();
      memberRecovery(userIds).then(response => {
        this.$message({
          type: "success",
          message: "会员恢复成功!"
        });
      });
    },
    beforeLoading() {
      getAreaTree().then(response => {
        this.options.area = response.data;
      });
      // getDictDataLists("97001005").then(response => {
      //   this.dict.system = response.data.jq97001005;
      // });
      getDictDataLists("97001014").then(response => {
        this.memberTypeOptions = response.data.jq97001014;
      });
    },
    handleProcessLogView() {
      if (!this.tableMultiSelection) {
        this.$message({
          type: "info",
          message: "请选中查看流程日志的数据!"
        });
        return;
      }
      const selectRows = this.tableMultiSelection;
      if (selectRows.length === 0 || selectRows.length > 1) {
        var msg =
          selectRows.length == 0
            ? "请选中查看流程日志的数据"
            : "只能选择一条数据进行查看";
        this.$message({
          type: "info",
          message: msg
        });
        return;
      }
      //数据id
      this.processLog.dataId = selectRows[0].id;
      this.processLog.show = true;
    },
    //关闭流程日志框
    closeProcessLogDialog() {
      this.processLog.show = false;
    },
    handleView() {
      if (!this.tableMultiSelection) {
        this.$message({
          type: "info",
          message: "请选中查看的数据!"
        });
        return;
      }
      const selectRows = this.tableMultiSelection;
      if (selectRows.length === 0 || selectRows.length > 1) {
        var msg =
          selectRows.length == 0
            ? "请选中要查看的数据"
            : "只能选择一条数据进行查看";
        this.$message({
          type: "info",
          message: msg
        });
        return;
      }
      const id = selectRows[0].id;
      if (id) {
        this.$router.push({
          path: "/membership-manage/member-detail",
          query: { id: id }
        });
      }
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
      var formQuery = Object.assign({}, this.formQuery);
      var areas = formQuery.areas;
      if (areas) {
        var tempArr = new Array();
        for (var i = 0; i < areas.length; i++) {
          tempArr.push(areas[i]);
        }
        formQuery.areas = tempArr.join(",");
      }
      getMemberList(formQuery).then(response => {
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
    batchDelete() {
      // if (!this.tableMultiSelection) {
      //   this.$message({
      //     type: "info",
      //     message: "请选中要删除的数据!"
      //   });
      //   return;
      // }
      // let selectRows = this.tableMultiSelection;
      // if (selectRows.length == 0) {
      //   this.$message({
      //     type: "info",
      //     message: "请选中要删除的数据!"
      //   });
      //   return;
      // }
      // this.$confirm("是否执行删除操作?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(() => {
      //     var userIdArr = new Array();
      //     Object.keys(selectRows).forEach(function(key) {
      //       if (selectRows[key].userId) {
      //         userIdArr.push(selectRows[key].userId);
      //       }
      //     });
      //     if (userIdArr && userIdArr.length > 0) {
      //       var userIds = userIdArr.join();
      //       deleteUser(userIds).then(response => {
      //         this.$message({
      //           type: "success",
      //           message: "删除成功!"
      //         });
      //         this.getTableList();
      //       });
      //     }
      //   })
      //   .catch(() => {
      //     // 取消时执行此处
      //   });
    },
    // handleAdd() {
    //   this.$router.push({
    //     path: "/member-manage/member-apply-detail",
    //     query: {}
    //   });
    // },
    statusFmt(row, column, cellValue, index) {
      let status = row.status.trim();
      if (status === "10") {
        return "生效";
      } else if (status === "30") {
        return "已退会";
      }
    },
    //data中这个不能少：
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
    }
    //, systemFmt(row, column, cellValue, index) {
    //   return getDictName(this.dict.system, row.system);
    // }
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
