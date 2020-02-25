<template>
  <!-- part1 -->
  <el-card class="detailsContainer">
    <!-- 查询面板 -->
    <el-form ref="formQuery" :model="formQuery" :inline="true" label-width="100px">
      <el-row :gutter="20" class="area_border">
        <el-col :span="8">
          <el-form-item label="会员类别" size="mini" prop="memberType">
            <el-select v-model="formQuery.memberType" filterable placeholder="请选择" size="mini">
              <el-option v-for="item in memberTypeOptions" :key="item.key" :label="item.value" :value="item.key"  style="width:100%"
                ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="会员等级" size="mini" prop="memberDj">
            <el-select v-model="formQuery.memberDj" filterable placeholder="请选择" size="mini">
              <el-option v-for="item in memberDjOptions" :key="item.key" :label="item.value" :value="item.key"  style="width:100%"
                ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item size="mini" label-width="15px">
            <el-button type="primary" size="mini" @click="search">查询</el-button>
            <el-button size="mini" @click="resetForm('formQuery')">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="area_bordes">
      <el-col :span="24">
        <el-button-group size="mini">
          <el-button v-show="btnShow('100021503010')" v-if="btnDisplay('10')" type="primary" size="mini" class="btn_line" @click="handleCreate()">新 增</el-button>
          <el-button v-show="btnShow('100021503020')" v-if="btnDisplay('10')" type="primary" size="mini" class="btn_line" @click="handleUpdate()">修 改</el-button>
          <el-button v-show="btnShow('100021503030')" v-if="btnDisplay('10')" type="primary" size="mini" class="btn_line" @click="deleteByIds()">删 除</el-button>
        </el-button-group>
      </el-col>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      tooltip-effect="dark"
      :header-cell-style="getCellStyle"
      @selection-change="selectionChange"
      class="table-hxxd"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="memberType" width="200" label="会员类别" align="center" />
      <el-table-column prop="memberDj"  label="会员等级" align="center" />
      <el-table-column prop="memberZk" label="会员折扣（折）" align="center" />
      <el-table-column prop="memberFeeBz" label="会员费用标椎（元）" align="center" />
    </el-table>
    <!-- 表格区2end -->
    <el-row class="area_bordes" style="margin-top:20px">
      <el-col :span="24" style="text-align: right;">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page.sync="formQuery.pageNo" :page-size.sync="formQuery.pageSize" :page-sizes="[15, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper" :total="pageTotal"></el-pagination>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import {
  selectMemberFeeInfo,
  deleteMemberFeeInfo,
  insertMemberFeeInfo,
  updateMemberFeeInfo
} from '@/api/hxxd/membership-fee-mange';
import { getDictDataLists, getDictDataList } from "@/api/system/comm/comm";
import {
  parseTime
} from '@/utils/index.js';
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
      btns: this.$store.getters.btns['1000215030'],
      // btns: ["100021503010", "100021503020"],
      show: false,
      treeData: [],
      treeDefaultProps: {
        children: 'childs',
        label: function (data, node) {
          return data.complainant
        }
      },
      memberTypeOptions: [],
      memberDjOptions: [],
      pageTotal: 0,
      formQuery: {
        id: '',
        memberType: '',
        memberDj: '',
        memberZk: '',
        memberFeeBz: '',
        pageNo: 1,
        pageSize: 15
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
      getDictDataLists("97001014").then(response => {
        this.memberTypeOptions = response.data.jq97001014;
      });
      getDictDataLists("97001015").then(response => {
        this.memberDjOptions = response.data.jq97001015;
      });
    },
    getCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background: #F2F2F2;font-size: 13px;color: #333;font-weight: normal'
      } else {
        return ''
      }
    },
    getTableList() {
      this.tableLoading = true
      selectMemberFeeInfo(this.formQuery).then(response => {
        this.tableData = response.data
        for (const key in this.tableData) {
          getDictDataList('97001015','',this.tableData[key].memberDj,false,'','').then(response => {
          this.tableData[key].memberDj=response.data[0].value
         });
          getDictDataList('97001014','',this.tableData[key].memberType,false,'','').then(response => {
          this.tableData[key].memberType=response.data[0].value
         });
        }
        this.pageTotal = response.page.total
        this.tableLoading = false
      })
    },
    handleCreate() {
      this.$router.push({
        path: '/membership-fee-manage/addFeeCollectionRules',
        query: {}
      })

    },
    handleUpdate(row) {
      if (!this.tableMultiSelection) {
        this.$message({
          type: 'info',
          message: '请选中要修改的数据!'
        })
        return
      }
      let selectRows = this.tableMultiSelection
      if (selectRows.length == 0) {
        this.$message({
          type: 'info',
          message: '请选中要修改的数据!'
        })
        return
      } else if (selectRows.length >= 2) {
        this.$message({
          type: 'info',
          message: '请选中单条数据!'
        })
        return
      }
      var row = selectRows[0]
      var id = row.id
      this.$router.push({
        path: '/membership-fee-manage/updateFeeCollectionRules',
        query: {
          id: id
        }
      })
    },
    deleteByIds() {
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
          deleteMemberFeeInfo(ids).then(response => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
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
    }
  }
}
</script>
<style scoped>
  @import '~@/styles/hxxd.scss';
</style>
