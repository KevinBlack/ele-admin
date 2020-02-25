<template>
  <el-card class="detailsContainer">
    <!-- 查询面板start -->
    <!-- label-width='65px' -->
    <el-form ref="formQuery" label-width="100px" :model="formQuery" :inline="true">
      <el-row class="area_bordes">
        <el-col :span="12">
          <el-form-item label="签约时间从" size="mini" prop="timeValue">
            <el-date-picker
              type="datetimerange"
              v-model="formQuery.timeValue"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="处罚类别" size="mini" prop="punishmentType">
            <el-select v-model="formQuery.punishmentType" filterable placeholder="请选择" size="mini"  >
              <el-option v-for="item in dict.punishmentType" :key="item.key" :label="item.value" :value="item.key" >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="处罚原因" size="mini" prop="punishmentReasons">
            <el-input v-model="formQuery.punishmentReasons" size="mini" style="width: 400px;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" style="padding-left: 100px;">
          <el-form-item size="mini">
            <el-button type="primary" size="mini" @click="search">查询</el-button>
            <el-button type="primary" size="mini" @click="resetForm('formQuery')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 查询面板end -->
    <!-- 按钮区 -->
    <el-row class="area_bordes">
      <el-col :span="24">
        <el-radio-group size="mini">
          <el-radio-button v-show="btnShow('100021101090')" v-if="btnDisplay('10')" type="primary" class="btn_line" @click.native.prevent="handleAdd()">新 增</el-radio-button>
          <el-radio-button v-show="btnShow('100021101020')" v-if="btnDisplay('10')" type="primary" class="btn_line" @click.native.prevent="handleEdit" >修 改</el-radio-button>
          <el-radio-button v-show="btnShow('100021101030')" v-if="btnDisplay('10')" type="primary" class="btn_line" @click.native.prevent="deleteBatch">删 除</el-radio-button>
          <el-radio-button v-show="btnShow('100021101040')" v-if="btnDisplay('10')" type="primary" class="btn_line" @click.native.prevent="handleCheck" >查 看</el-radio-button>
          <el-radio-button v-show="btnShow('100021101050')" v-if="btnDisplay('10')" type="primary" class="btn_line" @click.native.prevent="handlePublish" >发 布</el-radio-button>
          <el-radio-button v-show="btnShow('100021101060')" v-if="btnDisplay('10')" type="primary" class="btn_line" @click.native.prevent="handleCanclePublish" >取 消 发 布</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <!-- 按钮区end -->
      <!-- 表格区2 -->
      <el-table
        ref="companyTable"
        v-loading="tableLoading"
        :data="tableData"
        style="width:100%"
        :header-row-style="headRowStyle"
        :row-style="rowStyle"
        :header-cell-style="getCellStyle"
        border
        highlight-current-row
        @selection-change="selectionChange"
        class="table-hxxd"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-columnprop="businessCategory" label="业务类别" align="center" />
        <el-table-column prop="salesAgent" label="销售代理人" align="center" />
        <el-table-column prop="validityAgreement" label="协议有效期(天)" align="center" :show-overflow-tooltip="true" />
        <el-table-column prop="createTime" label="签约时间" align="center" :show-overflow-tooltip="true" />
        <el-table-column prop="releaseStatus" label="发布状态" align="center" :formatter="releaseStatus" />
        <el-table-column prop="punishmentType" label="处罚类别" align="center" :formatter="punishCategory" />
        <el-table-column prop="punishmentReasons" label="处罚原因" align="center" />
      </el-table>
      <!-- 表格区2end -->
      <el-row class="area_bordes">
        <el-col :span="24" style="text-align: right">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="formQuery.pageNo"
            :page-size.sync="formQuery.pageSize"
            :page-sizes="[15, 30, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageTotal"
          />
        </el-col>
      </el-row>
    <!-- 表格区end -->
  </el-card>
</template>

<script>
import { selectSecurityIncident,deleteSecurityIncident , publishSecurityIncident, cancalPublishSecurityIncident} from "@/api/hxxd/complaintInfo";
import { getDictDataLists } from "@/api/system/comm/comm";
import { parseTime } from "@/utils/index.js";
export default {
  props: {
    pageCode: {
      type: String,
      default: ''
    }
  },
  // data 开始
  data() {
    return {
      btns: this.$store.getters.btns['1000211010'],
      show: false,
      treeData: [],
      treeDefaultProps: {
        children: 'childs',
        label: function(data, node) {
          return data.complainant
        }
      },
      dict: {
        punishmentType: []
      },
      multipleSelection: [],
      pageTotal: 0,
      formQuery: {
        punishmentType: '1',
        punishmentReasons: "",
        pageNo: 1,
        pageSize: 15,
        startTime: '',
        endTime: '',
        timeValue: []
      },
      tableLoading: false,
      tableData: [],
      tableMultiSelection: []
    }
  },
  // data 结束
  created() {
    //加载字典
    this.beforeLoading();
    this.formQuery.startTime = this.formQuery.timeValue[0]
    this.formQuery.endTime = this.formQuery.timeValue[1]
    this.getTableList()
  },
  methods: {
    //data中这个不能少：btns: this.$store.getters.btns['100010'],
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
    btnDisplay(status) {
      //根据具体业务数据控制 
      if (status == "10") {
        return true;
      }
      return false;
    },
    beforeLoading() {
      getDictDataLists("97001013").then(response => {
        this.dict.punishmentType = response.data.jq97001013;
      });
    }, 
    handleAdd() {
       this.$router.push({
        name: 'SecurityIncidentAdd',
        query: {}
      })
    },
    handleEdit(type) {
      if (this.tableMultiSelection.length === 0) {
        this.$message({
          message: '请选择数据',
          type: 'warning'
        })
      } else if (this.tableMultiSelection.length === 1) {
        var id = this.tableMultiSelection[0].id
        if (id) {
          this.$router.push({
            name: 'SecurityIncidentEdit',
            query: {id: id}
          })
        }
      } else if (this.tableMultiSelection.length > 1) {
        this.$message({
          message: '请选择单条数据',
          type: 'warning'
        })
      }
    },
    handleCheck(type) {
      if (this.tableMultiSelection.length === 0) {
        this.$message({
          message: '请选择数据',
          type: 'warning'
        })
      } else if (this.tableMultiSelection.length === 1) {
        var id = this.tableMultiSelection[0].id
        if (id) {
          this.$router.push({
            name: 'SecurityIncidentCheck',
            query: {id: id}
          })
        }
      } else if (this.tableMultiSelection.length > 1) {
        this.$message({
          message: '请选择单条数据',
          type: 'warning'
        })
      }
    },
    handlePublish(){
      if (!this.tableMultiSelection) {
        this.$message({
          type: 'info',
          message: '请选中要发布的数据!'
        })
        return
      }
      let selectRows = this.tableMultiSelection
      if (selectRows.length == 0) {
        this.$message({
          type: 'info',
          message: '请选中要发布的数据!'
        })
        return
      }
      this.$confirm('确认发布?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var ids = []
        Object.keys(selectRows).forEach(function (key) {
          if (selectRows[key].id) {
            ids.push(selectRows[key].id)
          }
        })
        if (ids && ids.length > 0) {
          var ids = ids.join()
          console.log(ids)
          publishSecurityIncident(ids).then(response => {
            if(response.status == 200){
              this.$message({
              type: 'success',
              message: '发布成功!'
            })
            }
            this.getTableList()
          })
        }
      })
      .catch(() => {
        // 取消时执行此处
      })
    },
    handleCanclePublish(){
      if (!this.tableMultiSelection) {
        this.$message({
          type: 'info',
          message: '请选中要取消的数据!'
        })
        return
      }
      let selectRows = this.tableMultiSelection
      if (selectRows.length == 0) {
        this.$message({
          type: 'info',
          message: '请选中要取消的数据!'
        })
        return
      }
      this.$confirm('确认取消发布?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var ids = []
        Object.keys(selectRows).forEach(function (key) {
          if (selectRows[key].id) {
            ids.push(selectRows[key].id)
          }
        })
        if (ids && ids.length > 0) {
          var ids = ids.join()
          console.log(ids)
          cancalPublishSecurityIncident(ids).then(response => {
            if(response.status == 200){
              this.$message({
              type: 'success',
              message: '取消发布成功!'
            })
            }
            this.getTableList()
          })
        }
      })
      .catch(() => {
        // 取消时执行此处
      })
    },
    deleteBatch() {
      if (!this.tableMultiSelection) {
        this.$message({
          type: 'info',
          message: '请选中要删除的数据!'
        })
        return
      }
      let selectRows = this.tableMultiSelection
      if (selectRows.length == 0) {
        this.$message({
          type: 'info',
          message: '请选中要删除的数据!'
        })
        return
      }
      this.$confirm('是否执行删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var ids = []
        Object.keys(selectRows).forEach(function (key) {
          if (selectRows[key].id) {
            ids.push(selectRows[key].id)
          }
        })
        if (ids && ids.length > 0) {
          var ids = ids.join()
          deleteSecurityIncident(ids).then(response => {
            if(response.status == 200){
              this.$message({
              type: 'success',
              message: '删除成功!'
            })
            }
            this.getTableList()
          })
        }
      })
      .catch(() => {
        // 取消时执行此处
      })
    },
    selectionChange(val) {
      this.tableMultiSelection = val
    },
    search() {
      this.getTableList()
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
      })
    },
    getTableList() {
      if (this.formQuery.timeValue.length >= 0) {
        this.formQuery.startTime = this.formQuery.timeValue[0]
        this.formQuery.endTime = this.formQuery.timeValue[1]
      }
      this.tableLoading = true
      selectSecurityIncident(this.formQuery).then(response => {
        this.tableData = response.data
        this.pageTotal = response.page.total
        this.tableLoading = false
      })
    },
    handleSizeChange() {
      this.getTableList()
    },
    handleCurrentChange() {
      this.getTableList()
    },
    rowStyle(row, rowIndex) {
      return 'height:15pxfont-size: 13pxcolor: #333font-weight: normal '
    },
    headRowStyle(row, rowIndex) {
      return 'height:15px'
    },
    getCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background: #F2F2F2;font-size: 13px;color: #333;font-weight: normal'
      } else {
        return ''
      }
    },
    releaseStatus(row, column, cellValue, index) {
      let status = row.releaseStatus
      if (status === '0') {
        return '未发布'
      } else if (status === '1') {
        return '已发布'
      } else {
        return row.status
      }
    },
    punishCategory(row, column, cellValue, index) {
      const punishmentType = row.punishmentType
      if (punishmentType === '1') {
        return '警告'
      } else if (punishmentType === '2') {
        return '罚款'
      } else {
        return row.punishmentType
      }
    }
  }
}
</script>
<style>
@import "~@/styles/hxxd.scss";
</style>
