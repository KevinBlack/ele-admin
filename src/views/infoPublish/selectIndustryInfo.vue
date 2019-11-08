  <template>
  <el-card class="detailsContainer">
    <!-- part1 -->
    <el-form ref="formQuery" :model="formQuery" label-width="100px" size="mini">
      <el-row :gutter="20" class="area_bordes">
        <el-col :span="24">
          <el-form-item label="信息类别" size="mini" prop="header">
            <el-button size="mini" :type="xdfh" ref="xdfh" @click="handleStatud(1)">消代分会</el-button>
            <el-button size="mini" :type="hsfh" ref="hsfh" @click="handleStatud(2)">航食分会</el-button>
            <el-button size="mini" :type="qtfh" ref="qtfh" @click="handleStatud(3)">其他分会</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="内容标题" size="mini" prop="header">
            <el-input v-model="formQuery.industryTitle" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="内容描述" size="mini" prop="companyBel">
            <el-input v-model="formQuery.industryContent" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="getTableList">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 增删改查按钮 -->
    <el-row class="area_bordes">
      <el-col :span="24">
        <el-radio-group size="mini">
          <el-radio-button type="primary" class="btn_line" @click.native.prevent="handleAdd">新 增</el-radio-button>
          <el-radio-button
            type="primary"
            class="btn_line"
            @click.native.prevent="handleEdit"
          >修 改</el-radio-button>
          <el-radio-button type="primary" class="btn_line" @click.native.prevent="deleteBatch">删 除</el-radio-button>
          <el-radio-button
            type="primary"
            class="btn_line"
            @click.native.prevent="handleCheck"
          >查 看</el-radio-button>
        </el-radio-group>
        <el-radio-group size="mini">
          <el-radio-button type="primary" class="btn_line" @click.native.prevent="handlePublish('send')">发 布</el-radio-button>
          <el-radio-button type="primary" class="btn_line" @click.native.prevent="handlePublish('cancle')">取消发布</el-radio-button>
        </el-radio-group>
      </el-col>
    </el-row>
    <!-- part3 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      v-loading="tableLoading"
      tooltip-effect="dark"
      :header-cell-style="getCellStyle"
      highlight-current-row
      @selection-change="handleSelectionChange"
      class="table-hxxd"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column prop="industryTitle" label="内容标题" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="industryContent" label="内容描述" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="modifyTime" label="发布时间" align="center"></el-table-column>
      <el-table-column prop="industryType" label="发布状态" width="100" align="center"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row class="area_bordes">
      <el-col :span="24" style="text-align: right">
        <el-pagination
          :current-page.sync="formQuery.pageNo"
          :page-size.sync="formQuery.pageSize"
          :page-sizes="[5, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotal"
        />
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import {
  selectIndustry,
  deleteIndustryByIds,
  industryInfoPublish,
  cancleIndustryInfoPublish,
  selectIndustryById
} from '@/api/hxxd/industryInfoPublish';
import { parseTime } from '@/utils/index.js';

export default {
  name: 'SysMessageQuery',
  data() {
    return {
      param:{
        idList: []
      },
      sum: 0,
      added: 0,
      xdfh: '',
      hsfh: '',
      qtfh: '',
      multipleSelection: [],
      pageTotal: 0,
      tableLoading: false,
      tableData: [],
      createDate: [],
      formQuery: {
        industryType: '',
        industryTitle: '',
        industryContent: '',
        modifyTime: ''
      }
    }
  },
  created() {
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
    handleStatud(val) {
      this.formQuery.industryType = val
      if (val === 1) {
        this.xdfh = 'primary'
        this.hsfh = ''
        this.qtfh = ''
      } else if (val === 2) {
        this.xdfh = ''
        this.hsfh = 'primary'
        this.qtfh = ''
      } else if (val === 3) {
        this.xdfh = ''
        this.hsfh = ''
        this.qtfh = 'primary'
      }
    },
    handleAdd(){
      this.$router.push({
        name: 'IndustryInfoEdit',
      })
    },
    deleteBatch() {
      var idList = []
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: '请选择数据',
          type: 'warning'
        })
      } else {
        this.multipleSelection.forEach(i => {
          idList.push(i.id)
        })
        // 批量删除
        this.param.idList=idList
        deleteIndustryByIds(this.param).then(response => {
          if (response.status == 200) {
            // 删除成功
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            // 更新列表
            this.getTableList()
          }
        })
      }
    },
    handleEdit(type) {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择数据',
          type: 'warning'
        })
      } else if (this.multipleSelection.length === 1) {
        var id = this.multipleSelection[0].id
        if (id) {
          this.$router.push({
            name: 'UpdateIndustryInfo',
            query: {
              id: id,
              industryType: this.formQuery.industryType,
              industryTitle: this.formQuery.industryTitle,
              industryContent: this.formQuery.industryContent
            }
          })
        }
      } else if (this.multipleSelection.length > 1) {
        this.$message({
          message: '请选择单条数据',
          type: 'warning'
        })
      }
    },
    handleCheck() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择数据',
          type: 'warning'
        })
      } else if (this.multipleSelection.length === 1) {
        var id = this.multipleSelection[0].id
        if (id) {
          this.$router.push({
            name: 'IndustryInfoDetail',
            query: { id: id }
          })
        }
      } else if (this.multipleSelection.length > 1) {
        this.$message({
          message: '请选择单条数据',
          type: 'warning'
        })
      }
    },
    handlePublish(val) {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择数据',
          type: 'warning'
        })
      } else if (this.multipleSelection.length === 1) {
        var id = this.multipleSelection[0].id
        if (id) {
          if (val === 'send') {
            industryInfoPublish(id).then(response => {
              if (response.status === 200) {
                this.$message({
                  type: 'success',
                  message: response.message
                })
                this.getTableList()
              } else {
                this.$message({
                  type: 'success',
                  error: msg
                })
              }
            })
          } else if (val === 'cancle') {
            cancleIndustryInfoPublish(id).then(response => {
              if (response.status === 200) {
                this.$message({
                  type: 'success',
                  message: response.message
                })
                this.getTableList()
              } else {
                this.$message({
                  type: 'success',
                  error: msg
                })
              }
            })
          }
        }
      } else if (this.multipleSelection.length > 1) {
        this.$message({
          message: '请选择单条数据',
          type: 'warning'
        })
      }
    },
    getTableList() {
      this.tableLoading = true
      selectIndustry(this.formQuery).then(response => {
        for (const k in response.data) {
          if (response.data[k].industryType === 1) {
            response.data[k].industryType = '已发布'
          } else {
            response.data[k].industryType = '未发布'
          }
        }
        // if (response.data.industryType === 1) {
        //   this.sendType = '已发布'
        // } else {
        //   this.sendType = '未发布'
        // }
        this.tableData = response.data
        this.pageTotal = response.page.total
        this.tableLoading = false
      })
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields()
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      if (val.length > 1) {
        this.$message({
          message: '只能选择单条',
          type: 'warning'
        })
      }
      if (val.length !== 0) {
        this.added = val.length
        this.sum = this.added
      } else if (val.length === 0) {
        this.sum -= this.added
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    }
  }
}
</script>
<style>
@import '../../styles/hxxd.scss';
</style>
