<template>
  <div class="chart-container">
    <div class="kindsOfInput">
      <span>
        <el-radio v-model="radio" label="1">选项A</el-radio>
        <el-radio v-model="radio" label="2">选项B</el-radio>
      </span>
      <span>
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="复选框 A"></el-checkbox>
          <el-checkbox label="复选框 B"></el-checkbox>
          <el-checkbox label="复选框 C"></el-checkbox>
          <el-checkbox label="禁用" disabled></el-checkbox>
          <el-checkbox label="选中且禁用" disabled></el-checkbox>
        </el-checkbox-group>
      </span>
      <span>
        <el-input placeholder="请输入内容"></el-input>
      </span>
      <span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </span>
      <span>
        <el-input placeholder="请输入内容" :value="inputTreeValue" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="handleCreateTree"></el-button>
        </el-input>
      </span>
      <span>
        <el-time-picker
          is-range
          arrow-control
          v-model="value5"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围">
        </el-time-picker>
      </span>
    </div>
    <!-- 富文本 -->
    <div>
      <tinymce v-model="content" :height="300" />
    </div>
    <!-- 上传 -->
    <div class="editor-container">
      <dropzone id="myVueDropzone" url="https://httpbin.org/post" @dropzone-removedFile="dropzoneR" @dropzone-success="dropzoneS" />
    </div>
    <!-- 弹窗 -->
    <el-dialog :visible.sync="dialogFormVisible">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
      <el-tree
        :data="data2"
        show-checkbox
        default-expand-all
        :filter-node-method="filterNode"
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="getCheckedNodes">
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import Dropzone from '@/components/Dropzone'

export default {
  name: 'KeyboardChart',
  // components: { Chart }
  components: { Tinymce, Dropzone },
  data() {
    return {
      dialogFormVisible : false,
      content : '',
      filterText: '',
      inputTreeValue: '',
      radio: '1',
      checkList: ['选中且禁用','复选框 A'],
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        value5: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        data2: [{
          id: 1,
          pid: 1,
          label: '山东公司',
          children: [{
            id: 4,
            pid: 1,
            label: '济南分部',
            children: [{
              id: 9,
              label: '济南一部'
            }, {
              id: 10,
              label: '济南二部'
            }]
          }]
        }, {
          id: 2,
          pid: 2,
          label: '河北公司',
          children: [{
            id: 5,
            pid: 2,
            label: '石家庄分部'
          }, {
            id: 6,
            pid: 2,
            label: '秦皇岛分部'
          }]
        }, {
          id: 3,
          pid: 3,
          label: '黑龙江公司',
          children: [{
            id: 7,
            pid: 3,
            label: '哈尔滨分部'
          }, {
            id: 8,
            pid: 3,
            label: '大庆分部'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleCreateTree() {
      this.inputTreeValue = ''
      this.dialogFormVisible = true
    },
    dropzoneS(file) {
      console.log(file)
      this.$message({ message: 'Upload success', type: 'success' })
    },
    dropzoneR(file) {
      console.log(file)
      this.$message({ message: 'Delete success', type: 'success' })
    },
    getCheckedNodes() {
        var rad=''
        var ridsa = this.$refs.tree.getCheckedKeys().join(',')// 获取当前的选中的数据[数组] -id, 把数组转换成字符串
        var ridsb = this.$refs.tree.getCheckedNodes()// 获取当前的选中的数据{对象}
        ridsb.forEach(ids=>{//获取选中的所有的父级id
          rad+=','+ids.label
        })
        rad=rad.substr(1) // 删除字符串前面的','
        var rids=rad
        var arr=rids.split(',')//  把字符串转换成数组
        arr=[...new Set(arr)]; // 数组去重
        rids=arr.join(',')// 把数组转换成字符串
        console.log(rids)
        this.inputTreeValue = rids
        // console.log(ridsa)
        // console.log(ridsb)
        this.dialogFormVisible = false
      }
  }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 30px 20px;
  height: calc(100vh - 84px);
  margin-bottom: 20px;
}
.chart-container div{
  margin-bottom: 10px;
}
.kindsOfInput span{
  display: inline-block;
  width: 40%;
  margin-bottom: 10px;
}
.kindsOfInput span:nth-child(odd){
  margin-right: 19%;
}
</style>

