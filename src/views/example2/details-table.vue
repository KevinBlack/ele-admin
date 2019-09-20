<template>
  <el-card class="detailsContainer">
    <!-- part1 -->
    <el-form ref="ruleForm" label-width="100px" size="mini">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="账号" prop="number">
            <el-input />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性别" prop="number">
            <el-input />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="邮箱" prop="number">
            <el-input />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="手机" prop="number">
            <el-input />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="所在地区" prop="number">
            <el-input />
          </el-form-item>
        </el-col>
        <el-col :span="24" style="text-align: center;margin: 10px 0;">
          <el-button type="primary" icon="el-icon-search" size="mini">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh-right" size="mini">重置</el-button>
        </el-col>
        <el-col :span="24">
          <el-button type="primary" icon="el-icon-upload2" size="mini">导出</el-button>
          <el-button type="primary" icon="el-icon-download" size="mini">导入</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- part3 -->
    <el-row :gutter="10">
      <el-col :span="24">
        <div class="dtl-info-line">已选择{{ sum }}条<el-button type="text" style="margin-left: 20px;" @click="toggleSelection()">清空</el-button></div>
      </el-col>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      tooltip-effect="dark"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        label="日期"
        width="120"
      >
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120"
      />
      <el-table-column
        prop="address"
        label="地址"
        show-overflow-tooltip
      />
    </el-table>
    <el-row>
      <el-col :span="24" style="text-align: right;margin-top: 20px;">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="100"
        />
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'princeInfo',
      sum: 0,
      added: 0,
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      if (val.length !== 0) {
        this.added = val.length
        console.log(val)
        console.log(this.added)
        this.sum = this.added
        console.log(this.sum)
      } else if (val.length === 0) {
        this.sum -= this.added
      }
    }
  }
}
</script>

<style scoped>
*{
  font-weight: normal;
}
.detailsContainer {
  margin: 0 10px;
}
.dtl-title-line {
  display: inline-block;
  border-left: 5px solid #409EFF;
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
.el-table>th {
  background-color: #eee !important;
}
</style>
