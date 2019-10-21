<template>
  <el-card class="detailsContainer">
    <!-- part1 -->
    <el-form ref="ruleForm" label-width="50px" size="mini">
      <el-row :gutter="20" class="area_border">
        <el-col :span="5">
          <el-form-item label="账号" prop="number">
            <el-input />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="性别" prop="number">
            <el-input />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="邮箱" prop="number">
            <el-input />
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="手机" prop="number">
            <el-input />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="地区" prop="number">
            <el-input />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="区号" prop="number">
            <el-input />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="邮编" prop="number">
            <el-input />
          </el-form-item>
        </el-col>
        <el-col :span="9" style="text-align: left;padding-left: 1.3em;">
          <el-button type="primary" icon="el-icon-search" size="mini">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh-right" size="mini">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="area_bordes">
      <el-col :span="24">
        <el-radio-group v-model="labelPosition" size="mini">
          <el-radio-button type="primary" class="btn_line">新 增</el-radio-button>
          <el-radio-button type="primary" class="btn_line">修 改</el-radio-button>
          <el-radio-button type="primary" class="btn_line">删 除</el-radio-button>
          <el-radio-button type="primary">提 交</el-radio-button>
        </el-radio-group>
        <el-radio-group v-model="labelPosition" size="mini" style="margin-left: 20px;">
          <el-radio-button type="primary" class="btn_line">查 看</el-radio-button>
          <el-radio-button type="primary">导 出</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <!-- part3 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      tooltip-effect="dark"
      style="width: 100%;margin-bottom:20px;"
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
    <el-row class="area_bordes">
      <el-col :span="24" style="text-align: right;">
        <el-pagination
          background
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next"
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
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-07',
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
.area_border, .area_bordes {
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
.btn_line {
  margin-right: 2px;
}
</style>
