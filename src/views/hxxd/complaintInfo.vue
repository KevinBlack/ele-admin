<template>
  <el-card class="detailsContainer">
    <!-- 查询面板start -->
    <el-form ref="formQuery" :model="formQuery" label-width="100px" :inline="true">
      <el-row :gutter="20" class="area_border">
        <el-col :span="12">
          <el-form-item label="查询时间" size="mini" prop="timeValue">
            <el-date-picker
              type="datetimerange"
              v-model="formQuery.timeValue"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              unlink-panels
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="投诉状态" size="mini" prop="status">
            <el-select v-model="formQuery.status" filterable placeholder="请选择" size="mini">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5" style="text-align: left">
          <el-form-item size="mini">
            <el-button type="primary" size="mini" @click="search">查询</el-button>
            <el-button size="mini" @click="resetForm('formQuery')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 查询面板end -->
    <!-- 按钮区 -->
    <el-row class="area_bordes">
      <el-col :span="24">
        <el-button-group size="mini">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleAdd(scope.row)">投诉处理</el-button>
            <el-button type="primary" size="mini" @click="handleDetails(scope.row)">查看详情</el-button>
          </template>
        </el-button-group>
      </el-col>
    </el-row>
    <!-- 表格区 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      :header-cell-style="getCellStyle"
      tooltip-effect="dark"
      style="width: 100%margin-bottom:20px"
      @selection-change="selectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column prop="id" label="ID" align="center" v-if="show" />
      <el-table-column prop="complaintsContents" label="投诉内容" align="center" />
      <el-table-column prop="complainant" label="投诉人" align="center" />
      <el-table-column
        prop="complaintType"
        label="投诉公司"
        :formatter="releaseStatus"
        align="center"
      />
      <el-table-column
        prop="handlePerson"
        label="处理人"
        align="center"
        :show-overflow-tooltip="true"
      />
      <el-table-column align="center" prop="status" :formatter="statusFmt" label="状态" />
      <el-table-column prop="remarks" label="备注" align="center" :show-overflow-tooltip="true" />
    </el-table>
    <!-- 表格区2end -->
    <el-row class="area_bordes" style="margin-top:20px">
      <el-col :span="24" style="text-align: right">
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
    <!-- 表格区end -->
  </el-card>
</template>

<script>
import { selectComplainInfoAndProcessing } from '@/api/hxxd/complaintInfo'
import { parseTime } from '@/utils/index.js'
export default {
  name: 'ComplaintInfo',
  props: {
    pageCode: {
      type: String,
      default: ''
    }
  },
  // data 开始
  data() {
    return {
      show: false,
      treeData: [],
      treeDefaultProps: {
        children: 'childs',
        label: function(data, node) {
          return data.complainant
        }
      },
      pageTotal: 0,
      formQuery: {
        complaintProfessingId: '',
        complaintsContents: '',
        complainant: '',
        status: '',
        remark: '',
        complaintType: '',
        handlePerson: '',
        pageNo: 1,
        pageSize: 15,
        startTime: '',
        endTime: '',
        timeValue: []
      },
      statusOptions: [
        {
          value: 0,
          label: '未处理'
        },
        {
          value: 1,
          label: '已处理'
        }
      ],
      tableLoading: false,
      tableData: [],
      tableMultiSelection: []
    }
  },
  // data 结束
  created() {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
    this.formQuery.timeValue = [parseTime(start), parseTime(end)]
    this.formQuery.startTime = this.formQuery.timeValue[0]
    this.formQuery.endTime = this.formQuery.timeValue[1]
    this.getTableList()
  },
  methods: {
    getCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background: #F2F2F2;font-size: 13px;color: #333;font-weight: normal'
      } else {
        return ''
      }
    },
    releaseStatus(row, column, cellValue, index) {
      const complaintType = row.complaintType
      if (complaintType === 1) {
        return '携程'
      } else if (complaintType === 2) {
        return '美团'
      } else if (complaintType === 3) {
        return '销代分会'
      } else {
        return row.complaintType
      }
    },
    handleDetails() {
      if (!this.tableMultiSelection) {
        this.$message({
          type: 'info',
          message: '请选中要查看的数据!'
        })
        return
      }
      const selectRows = this.tableMultiSelection
      if (selectRows.length === 0) {
        this.$message({
          type: 'info',
          message: '请选中要查看的数据!'
        })
        return
      } else if (selectRows.length >= 2) {
        this.$message({
          type: 'info',
          message: '请选中查看数据!'
        })
        return
      }
      var id = selectRows[0].id
      this.$router.push({
        path: '/hxxd/complainDetails',
        query: { id: id }
      })
    },
    handleAdd() {
      if (!this.tableMultiSelection) {
        this.$message({
          type: 'info',
          message: '请选中要处理的数据!'
        })
        return
      }
      const selectRows = this.tableMultiSelection
      if (selectRows.length === 0) {
        this.$message({
          type: 'info',
          message: '请选中要处理的数据!'
        })
        return
      } else if (selectRows.length >= 2) {
        this.$message({
          type: 'info',
          message: '请选中单条数据!'
        })
        return
      } else if (selectRows[0].complaintProfessingId) {
        this.$message({
          type: 'info',
          message: '该数据已处理，请重新选择!'
        })
        return
      }
      var id = selectRows[0].id
      this.$router.push({
        path: '/complaintInfo/saveComplainProcessing',
        query: { id: id }
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
      // var startTime = ''
      // var endTime = ''
      if (this.formQuery.timeValue.length >= 0) {
        this.formQuery.startTime = this.formQuery.timeValue[0]
        this.formQuery.endTime = this.formQuery.timeValue[1]
      }
      this.tableLoading = true
      selectComplainInfoAndProcessing(this.formQuery).then(response => {
        console.log(response)
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
    statusFmt(row, column, cellValue, index) {
      const spState = row.status
      if (spState === 0) {
        return '未处理'
      } else if (spState === 1) {
        return '已处理'
      } else {
        return row.status
      }
    }
  }
}
</script>
<style>
 @import '../../styles/hxxd.scss';
</style>
