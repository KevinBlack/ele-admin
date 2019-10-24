<template>
  <el-card class="detailsContainer">
    <!-- part1 -->
    <el-form ref="ruleForm" label-width="100px" size="mini">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="账号" prop="number">
            <el-input v-model="value" />
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
    <el-row><el-col :span="24">&nbsp;</el-col></el-row>
    <!-- part3 -->
    <el-row :gutter="10">
      <el-col :span="24">
        <!-- <div class="dtl-info-line">已选择{{ sum }}条<el-button type="text" style="margin-left: 20px;" @click="toggleSelection()">清空</el-button></div> -->
        <div v-show="isShow" class="dtl-info-line">
          <ul>
            <li>
              <el-tag
                v-for="tag in this.multipleSelection"
                :key="tag.data"
                closable
                type=""
                @close="handleClose(tag)"
                style="margin-right: 10px;">
                {{tag.date}}
              </el-tag>
            </li>
          </ul>
        </div>
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
        label="系统名"
        width="120"
      >
        <template slot-scope="scope">
          <router-link :to="scope.row.url">{{ scope.row.date }}</router-link>
        </template>
        <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
      </el-table-column>
      <el-table-column
        prop="name"
        label="手机"
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
      value: '',
      // sum: 0,
      added: 0,
      tableData: [
        {
          id: 0,
          url: './',
          date: '民航系统',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 1,
          url: './',
          date: '去哪儿网',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 2,
          url: './',
          date: '携程网',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 3,
          url: './',
          date: '马蜂窝',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 4,
          url: './',
          date: '美团网',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          id: 5,
          url: './',
          date: '电话热线',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      isShow: false,
      multipleSelection: [],
      middleSelection: []
    }
  },
  methods: {
    handleClose(tag) {
      this.multipleSelection.splice(this.multipleSelection.findIndex(item => item.date === tag.date), 1)
      console.log(tag.id)
      this.$refs.multipleTable.toggleRowSelection(this.tableData[tag.id], false)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.added = this.multipleSelection.length
      if (this.added) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }
  }
}
</script>

<style scoped>
*{
  font-weight: normal;
}
ul, li {
  list-style: none;
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
  margin: 10px auto;
  font-size: 12px;
  box-sizing: border-box;
  color: #000;
  border: 1px solid #dedede;
}
.dtl-info-line ul {
  padding-left: 10px !important;
}
.dtl-info-line ul li {
  line-height: 40px;
}
.el-table>th {
  background-color: #eee !important;
}
</style>
