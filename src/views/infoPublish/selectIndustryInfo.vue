  <template>
  <el-card class="detailsContainer">
    <!-- part1 -->
    <el-form ref="formQuery" :model="formQuery" label-width="100px" size="mini">
      <el-row :gutter="20" class="area_bordes">
        <el-col :span="24">
          <el-form-item label="信息类别" size="mini" prop="header">
            <el-button size="mini" :type="xdfh" ref="xdfh" @click="handleStatud(1)">站内新闻</el-button>
            <el-button size="mini" :type="hsfh" ref="hsfh" @click="handleStatud(2)">公示信息</el-button>
            <el-button size="mini" :type="qtfh" ref="qtfh" @click="handleStatud(3)">最新动态</el-button>
            <el-button size="mini" :type="qbfh" ref="qbfh" @click="handleStatud('')">全部信息</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="内容标题" size="mini" prop="header">
            <el-input v-model="formQuery.industryTitle" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="内容描述" size="mini" prop="companyBel">
            <el-input v-model="formQuery.industryContent" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="发布状态" size="mini" prop="publishStatus">
            <el-select
                v-model="formQuery.publishStatus"
                filterable
                placeholder="请选择"
                style="width:80%">
              <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
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
      <el-table-column prop="industryType" width="100" label="信息类别" align="center"></el-table-column>
      <el-table-column prop="industryTitle" label="内容标题" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="industryContent" label="内容描述" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="publishTime" width="200" label="发布时间" align="center"></el-table-column>
      <el-table-column prop="publishStatus" label="发布状态" width="100" align="center"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row class="area_bordes">
      <el-col :span="24" style="text-align: right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
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
      statusOptions: [
        {
          value: 1,
          label: "已发布"
        },
        {
          value: 0,
          label: "未发布"
        }
      ],
      sum: 0,
      added: 0,
      xdfh: '',
      hsfh: '',
      qtfh: '',
      qbfh: 'primary',
      multipleSelection: [],
      pageTotal: 0,
      tableLoading: false,
      tableData: [],
      createDate: [],
      formQuery: {
        industryType: '',
        industryTitle: '',
        industryContent: '',
        publishTime: '',
        publishStatus: 1,
        pageNo: 1,
        pageSize: 5
      },
      idList: ''
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
    handleSizeChange(val) {
      this.getTableList();
    },
    handleCurrentChange(val) {
      this.getTableList();
    },
    handleStatud(val) {
      this.formQuery.industryType = val
      if (val === 1) {
        this.xdfh = 'primary'
        this.hsfh = ''
        this.qtfh = ''
        this.qbfh = ''
      } else if (val === 2) {
        this.xdfh = ''
        this.hsfh = 'primary'
        this.qtfh = ''
        this.qbfh = ''
      } else if (val === 3) {
        this.xdfh = ''
        this.hsfh = ''
        this.qtfh = 'primary'
        this.qbfh = ''
      } else if (val === '') {
        this.xdfh = ''
        this.hsfh = ''
        this.qtfh = ''
        this.qbfh = 'primary'
      }
    },
    handleAdd(){
      this.$router.push({
        name: 'IndustryInfoEdit',
      })
    },
    deleteBatch() {
      var idList = new Array();
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: '请选择数据',
          type: 'warning'
        })
      } else {
        let selectRows = this.multipleSelection;
        Object.keys(selectRows).forEach(function(key) {
          if (selectRows[key].id) {
            idList.push(selectRows[key].id);
          }
          });
        // 批量删除
        if (idList && idList.length > 0) {
            var idsList = idList.join();
            this.idList=idsList
        deleteIndustryByIds(this.idList).then(response => {
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
          if (response.data[k].publishStatus === 1) {
            response.data[k].publishStatus = '已发布'
          } else {
            response.data[k].publishStatus = '未发布'
          }
          if (response.data[k].industryType === 1) {
            response.data[k].industryType = '站内新闻'
          } else if (response.data[k].industryType === 2) {
            response.data[k].industryType = '公示信息'
          } else if (response.data[k].industryType === 3) {
            response.data[k].industryType = '最新动态'
          }
        }
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
    }
  }
}
</script>
<style>
@import '~@/styles/hxxd.scss';
</style>
