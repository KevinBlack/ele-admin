
<template>
<el-card style="margin: 0 10px;">
  <div class="TestWorld">
    <el-button style="margin-left: 10px;" type="primary" size="mini" icon="el-icon-plus" @click="addLine">添加</el-button>
    <el-button style="margin-left: 10px;" type="primary" size="mini" icon="el-icon-check" @click="savemodify">保存</el-button>
    <el-button style="margin-left: 10px;" type="primary" size="mini" icon="el-icon-edit" @click="handleDelete">删除</el-button>
    <el-table
      ref="multipleTable"
      :data="modifyData"
      style="width: 100%; margin-top: 20px;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="40"
      />
      <el-table-column prop="bookname" label="书名">
        <template slot-scope="scope">
          <template v-if="scope.row.editing">
            <el-input class="edit-input" v-model="scope.row.bookname"  placeholder="书名" />
          </template>
          <span v-else>{{ scope.row.bookname }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="bookvolume" label="册数">
        <template slot-scope="scope">
          <template v-if="scope.row.editing">
            <el-input class="edit-input" v-model="scope.row.bookvolume" placeholder="册数" />
          </template>
          <span v-else>{{ scope.row.bookvolume}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="bookbuyer" label="购买者">
        <template slot-scope="scope">
          <template v-if="scope.row.editing">
            <el-input class="edit-input" v-model="scope.row.bookbuyer"  placeholder="购买者" />
          </template>
          <span v-else>{{scope.row.bookbuyer}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="bookborrower" label="借阅者">
        <template slot-scope="scope">
          <template v-if="scope.row.editing">
            <el-input class="edit-input" v-model="scope.row.bookborrower"  placeholder="借阅者" />
          </template>
          <span v-else>{{scope.row.bookborrower}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="bookbuytime" label="购买日期">
        <template slot-scope="scope">
          <template v-if="scope.row.editing">
            <el-date-picker
              v-model="scope.row.bookbuytime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="购买日期">
            </el-date-picker>
          </template>
          <span v-else>{{scope.row.bookbuytime}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="editing" label="操作">
        <template slot-scope="scope">
          <el-button
            type="danger"
            v-if="!scope.row.editing"
            icon="el-icon-edit"
            size="mini"
            v-model="scope.$index"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            v-else
            type="danger"
            icon="el-icon-circle-close"
            size="mini"
            v-model="scope.$index"
            @click="handleCancle(scope.$index, scope.row)">取消
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</el-card>
</template>

<script>
import { fetchList, createTable, updateTable } from '@/api/table'

export default {
  name: 'TestWorld',
  data() {
    return {
      // modifyData: [
      //   {
      //     bookid: 1,
      //     bookname: '笑傲江湖',
      //     bookbuytime: '2016-05-04',
      //     bookbuyer: '李晓月',
      //     bookborrower: '王小虎',
      //     bookvolume: '1',
      //     editing: false
      //   },
      //   {
      //     bookid: 2,
      //     bookname: '天龙八部',
      //     bookbuytime: '2016-05-04',
      //     bookbuyer: '李晓月',
      //     bookborrower: '李小虎',
      //     bookvolume: '1',
      //     editing: false
      //   },
      //   {
      //     bookid: 3,
      //     bookname: '神雕侠侣',
      //     bookbuytime: '2017-12-04',
      //     bookbuyer: '张晓月',
      //     bookborrower: '王而虎',
      //     bookvolume: '1',
      //     editing: false
      //   }
      // ],
      modifyData: [],
      listQuery: {
        bookid: NaN,
        bookname: '',
        bookbuytime: '',
        bookbuyer: '',
        bookborrower: '',
        bookvolume: '',
        editing: false
      },
      prevValue: {},
      currentRow: [],
      selectItem: new Set()
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList().then(response => {
        this.modifyData = response.data.items
        setTimeout(() => {
          this.listLoading = false
        }, 1000)
      }).catch(error => {
        console.log(error)
      })
    },
    handleSelectionChange(val) {
      if (val.length !== 0) {
        for (let i = 0; i < val.length; i++) {
          this.selectItem.add(val[i].bookid)
        }
        this.multipleSelection = val
        console.log(this.selectItem)
        return this.selectItem
      }
    },
    addLine() { // 添加行数
      const len = this.modifyData.length - 1
      const sum = this.modifyData[len].bookid
      const result = sum + 1
      var newValue = {
        bookid: result,
        bookname: '',
        bookbuytime: '',
        bookbuyer: '',
        bookborrower: '',
        bookvolume: ''
      }
      // 添加新的行数
      this.modifyData.push(newValue)
      this.modifyData[(this.modifyData.length - 1)].editing = true
    },
    handleDelete(index) { // 删除行数
      const selectArr = Array.from(this.selectItem)
      for (let i = 0; i < selectArr.length; i++) {
        this.modifyData = this.modifyData.filter(ele => !selectArr.includes(ele.bookid))
      }
      this.$notify({
        title: 'Success',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
    },
    handleEdit(index, row) { // 编辑
      row.editing = true
      this.currentRow.push(row)
      this.prevValue = JSON.parse(JSON.stringify(row))
    },
    handleCancle(index, row) { // 取消
      row.editing = false
      const prevContent = this.prevValue.bookname
      this.$set(row, 'bookname', prevContent)
    },
    savemodify() {
      if (this.currentRow.length !== 0) {
        this.currentRow.forEach(ele => {
          ele.editing = false
        })
      } else {
        // this.modifyData = this.modifyData.forEach(ele => {
        //   ele.editing = false
        // });
        this.modifyData[this.modifyData.length - 1].editing = false
        console.log(this.modifyData)
        return this.modifyData
      }
    }
  }

}
</script>

<style>

</style>
