
<template>
  <el-card style="margin: 0 10px;">
    <div class="TestWorld">
      <el-button style="margin-left: 10px;" type="primary" size="mini" icon="el-icon-plus" :disabled="disabled" @click="addLine">添加</el-button>
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
          width="50"
        />
        <el-table-column prop="bookname" label="书名">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.bookname" class="edit-input" placeholder="书名" />
            </template>
            <span v-else>{{ scope.row.bookname }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="bookvolume" label="册数">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.bookvolume" class="edit-input" placeholder="册数" />
            </template>
            <span v-else>{{ scope.row.bookvolume }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="bookbuyer" label="购买者">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.bookbuyer" class="edit-input" placeholder="购买者" />
            </template>
            <span v-else>{{ scope.row.bookbuyer }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="bookborrower" label="借阅者">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-input v-model="scope.row.bookborrower" class="edit-input" placeholder="借阅者" />
            </template>
            <span v-else>{{ scope.row.bookborrower }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="bookbuytime" label="购买日期">
          <template slot-scope="scope">
            <template v-if="scope.row.editing">
              <el-date-picker
                v-model="scope.row.bookbuytime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="购买日期"
              />
            </template>
            <span v-else>{{ scope.row.bookbuytime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="editing" label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="!scope.row.editing"
              v-model="scope.$index"
              type="danger"
              icon="el-icon-edit"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >
              编辑
            </el-button>
            <el-button
              v-else
              v-model="scope.$index"
              type="danger"
              icon="el-icon-circle-close"
              size="mini"
              @click="handleCancle(scope.$index, scope.row)"
            >
              取消
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'TestWorld',
  data() {
    return {
      modifyData: [
        {
          bookid: 1,
          bookname: '笑傲江湖',
          bookbuytime: '2016-05-04',
          bookbuyer: '李晓月',
          bookborrower: '王小虎',
          bookvolume: '1',
          editing: false
        },
        {
          bookid: 2,
          bookname: '天龙八部',
          bookbuytime: '2016-05-04',
          bookbuyer: '李晓月',
          bookborrower: '李小虎',
          bookvolume: '1',
          editing: false
        },
        {
          bookid: 3,
          bookname: '神雕侠侣',
          bookbuytime: '2017-12-04',
          bookbuyer: '张晓月',
          bookborrower: '王而虎',
          bookvolume: '1',
          editing: false
        }
      ],
      listQuery: {
        bookid: 0,
        bookname: '',
        bookbuytime: '',
        bookbuyer: '',
        bookborrower: '',
        bookvolume: '',
        editing: false
      },
      prevValue: {},
      currentRow: [],
      selectArr: [],
      disabled: false
    }
  },
  methods: {
    handleSelectionChange(val) {
      console.log(val)
      this.selectArr = val
    },
    addLine() { // 添加行数
      // this.disabled = true
      const len = this.modifyData.length - 1
      const sum = (len >= 0) ? this.modifyData[len].bookid : 0
      const result = sum + 1
      var newValue = {
        bookid: result,
        bookname: '',
        bookbuytime: '',
        bookbuyer: '',
        bookborrower: '',
        bookvolume: '',
        editing: true
      }
      // 添加新的行数
      this.modifyData.push(newValue)
    },
    handleDelete(index) { // 删除行数
      if (this.selectArr.length <= 0) {
        this.$notify({
          title: '提示',
          message: '请选择要删除的项',
          type: 'warning',
          duration: 2000
        })
      } else {
        const delArr = []
        for (var i = 0; i < this.modifyData.length; i++) {
          if (this.selectArr.indexOf(this.modifyData[i]) === -1) {
            delArr.push(this.modifyData[i])
          }
        }
        this.modifyData = delArr
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      }
    },
    handleEdit(index, row) { // 编辑
      row.editing = true
      this.currentRow.push(row)
      this.prevValue = JSON.parse(JSON.stringify(row))
    },
    handleCancle(index, row) { // 取消
      if (row.bookname !== '' && row.bookbuytime !== '' && row.bookbuyer !== '' && row.bookborrower !== '' && row.bookvolume !== '') {
        row.editing = false
        const prevContent = this.prevValue.bookname
        this.$set(row, 'bookname', prevContent)
      } else {
        this.modifyData.pop()
        this.disabled = false
      }
    },
    savemodify() { // 保存
      if (this.currentRow.length !== 0) {
        this.currentRow.forEach(ele => {
          ele.editing = false
        })
        console.log(1)
        this.currentRow = []
      } else {
        const len = this.modifyData.length - 1
        const row = this.modifyData[len]
        if (row.bookname !== '' && row.bookbuytime !== '' && row.bookbuyer !== '' && row.bookborrower !== '' && row.bookvolume !== '') {
          const lastChild = this.modifyData[this.modifyData.length - 1]
          console.log(2)
          lastChild.editing = false
          this.disabled = false
          return this.modifyData
        } else {
          this.$notify({
            title: '提示',
            message: '请完善数据',
            type: 'warning',
            duration: 2000
          })
          const lastChild = this.modifyData[this.modifyData.length - 1]
          console.log(3)
          lastChild.editing = true
          return this.modifyData
        }
      }
    }
  }

}
</script>

<style>

</style>
