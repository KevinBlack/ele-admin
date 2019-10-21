<template>
  <div class="detailsContainer">
    <!-- part1 -->
    <el-form ref="ruleForm" size="mini" label-width="80px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="订单号" prop="number">
            <el-input :value="fdmsg" />
          </el-form-item>
        </el-col>
        <el-col :span="8" :offset="8" style="text-align: center;">
          <el-button type="primary" icon="el-icon-search" size="mini">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh-right" size="mini">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
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
    <el-row style="margin-top: 20px;text-align: center;">
      <el-col :span="8" :offset="16">
        <el-button type="primary" icon="el-icon-check" size="mini" @click="handleClose('saveBtn')">保存</el-button>
        <el-button type="primary" icon="el-icon-close" size="mini" @click="handleClose('canselBtn')">取消</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Modality',
  props: {
    fdmsg: {
      type: [String, Number],
      required: true,
      default: ''
    }
  },
  data() {
    return {
      activeName: 'princeInfo',
      fdshow: false,
      selectArr: [],
      chiledArr: [],
      tableData: [
        {
          date: '2016-05-03',
          name: '张三',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '李四',
          address: '北京市海淀区文慧园路甲 12 号'
        },
        {
          date: '2016-05-04',
          name: '王五',
          address: '天津市河东区卫国道 6 号'
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange(val) {
      // if (val.length >0) {
      //   const len = val.length
      //   for (let i = 0; i < len; i++) {
      //     this.selectSet.add(val[i].name)
      //   }
      //   console.log(this.selectSet)
      // }
      console.log(val)
      this.selectArr = val
    },
    handleClose(e) {
      if (e === 'saveBtn') {
        const len = this.selectArr.length
        for (let i = 0; i < len; i++) {
          this.chiledArr.push(this.selectArr[i].name)
        }
        this.$emit('closeDalog', this.chiledArr, this.fdshow)
        this.selectArr = []
        this.$refs.multipleTable.clearSelection() // 清空所有选择
      } else if (e === 'canselBtn') {
        this.$emit('closeDalog', '', this.fdshow)
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
  background: none;
  width: 100%;
  height: 100%;
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
