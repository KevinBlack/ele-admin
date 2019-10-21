<template>
  <el-card class="tsfDlg">
    <div class="app-container">
      <div class="filter-container">
        <el-form :inline="true" label-width="80px">
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
            新增
          </el-button>
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleDelete">
            删除
          </el-button>
        </el-form>
      </div>
      <!-- 表格 -->
      <el-table
        ref="multipleTable"
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border
        height="450"
        fit
        highlight-current-row
        style="width: 100%;"
        @sort-change="sortChange"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="40"
        />
        <el-table-column label="序号" prop="id" sortable="custom" align="center" width="80" :class-name="getSortClass('id')">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色名称" width="110px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <el-table-column label="角色编码" width="80px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.importance }}</span>
          </template>
        </el-table-column>
        <el-table-column label="排序号" align="center" width="95">
          <template slot-scope="{row}">
            <span>{{ row.pageviews }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间" width="150px" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注信息" min-width="150px">
          <template slot-scope="{row}">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" class-name="status-col" width="100">
          <template slot-scope="{row}">
            <el-tag :type="row.status | statusFilter">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row}">
            <el-tooltip class="item" effect="dark" content="编辑角色" placement="top-start">
              <el-button circle type="primary" icon="el-icon-edit" size="mini" @click="handleUpdate(row)" />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="停用角色" placement="top-start">
              <el-button circle type="info" icon="el-icon-remove-outline" size="mini" @click="handleModifyStatus(row,'禁用')" />
            </el-tooltip>
            <!-- <el-tooltip class="item" effect="dark" content="删除角色" placement="top-start">
              <el-button circle type="danger"  icon="el-icon-delete" size="mini" @click="handleModifyStatus(row,'删除')"></el-button>
            </el-tooltip> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" style="text-align: right;" @pagination="getList" />
      <!-- 弹框 -->
      <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
        <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
          <el-form-item label="角色" prop="author">
            <el-input v-model="temp.author" class="filter-item" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="时间" prop="timestamp">
            <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="Please pick a date" />
          </el-form-item>
          <el-form-item label="备注" prop="title">
            <el-input v-model="temp.title" type="textarea" placeholder="Please input" />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="temp.status" class="filter-item" placeholder="请选择">
              <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
          <el-form-item label="编码">
            <el-input v-model="temp.importance" class="filter-item" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="序号">
            <el-input v-model="temp.pageviews" class="filter-item" placeholder="请输入" />
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click="dialogStatus==='添加'?createData():updateData()">
            确定
          </el-button>
        </div>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
// import { fetchList, createArticle, updateArticle } from '@/api/system/article'
import { createArticle, updateArticle } from '@/api/system/article'
import { getRoleList } from '@/api/system/role'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        '正常': 'success',
        '禁用': 'info'
        // deleted: 'danger'
      }
      return statusMap[status]
    }
    // typeFilter(type) {
    //   return calendarTypeKeyValue[type]
    // }
  },
  data() {
    return {
      multipleSelection: [],
      selectItem: new Set(),
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      // calendarTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      statusOptions: ['正常', '禁用'],
      // showReviewer: false,
      temp: {
        id: undefined,
        importance: 1,
        author: '',
        timestamp: new Date(),
        title: '',
        type: '',
        status: '正常'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      // textMap: {
      //   update: '编辑',
      //   create: '添加'
      // },
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleSelectionChange(val) {
      for (let i = 0; i < val.length; i++) {
        this.selectItem.add(val[i].id)
      }
      this.multipleSelection = val
      console.log(this.selectItem)
      return this.selectItem
    },
    getList() {
      this.listLoading = true
      getRoleList(this.listQuery).then(response => {
        this.list = response.data.items
        // console.log(this.list)
        this.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      console.log(data)
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        importance: 1,
        author: '',
        timestamp: new Date(),
        title: '',
        status: '正常',
        type: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = '添加'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '添加成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = '编辑'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete() {
      const selectArr = Array.from(this.selectItem)
      for (let i = 0; i < selectArr.length; i++) {
        this.list = this.list.filter(ele => !selectArr.includes(ele.id))
      }
      this.$notify({
        title: 'Success',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      // const index = this.list.indexOf(row)
      // this.list.splice(index, 1)
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}`
        ? 'ascending'
        : sort === `-${key}`
          ? 'descending'
          : ''
    }
  }
}
</script>
<style scoped>
.tsfDlg{
  margin: 0 10px;
}
</style>
