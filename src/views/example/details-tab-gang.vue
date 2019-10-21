<template>
  <el-card class="detailsContainer">
    <el-row style="border-bottom: 1px solid #e6e6e6;margin-bottom: 20px;padding-bottom:10px;">
      <el-col :span="12">
        <a href="javascrip:;" style="color: #409EFF"><i class="el-icon-back" style="color: #409EFF;margin-right: 5px;c" />返 回</a> | <a href="javascript:;" @click="handleShow">{{ showTitle }}</a>
      </el-col>
      <el-col :span="12" style="text-align:right;">
          <el-button type="primary" size="mini">保存</el-button>
          <el-button type="primary" size="mini">取消</el-button>
      </el-col>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="princeInfo">
        <!-- part1 -->
        <el-row :gutter="10">
          <el-col :span="24">
            <h5 class="dtl-title-line">公共信息</h5>
          </el-col>
        </el-row>
        <el-form ref="ruleForm" label-width="100px" size="mini">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="信息编号" prop="number">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="业务人员" prop="number">
                <el-select v-model="value" placeholder="请选择" style="width: 100%;">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="公司" prop="number">
                <el-input />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- part2 -->
        <el-row :gutter="10">
          <el-col :span="12">
            <h5 class="dtl-title-line">基本信息</h5>
          </el-col>
          <el-col :span="12" style="text-align:right;margin-top:20px;">
            <el-button type="success" icon="el-icon-edit" size="mini">按钮1</el-button>
            <el-button type="success" icon="el-icon-share" size="mini">刷新</el-button>
          </el-col>
        </el-row>
        <el-form ref="ruleForm" label-width="100px" size="mini">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="客户" prop="number">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所在地区" prop="number">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="联系人" prop="number">
                <el-input />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="报价日期" prop="number">
                <el-time-picker
                  is-range
                  arrow-control
                  v-model="value5"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  placeholder="选择时间范围"
                  style="width: 100%;"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="有效日期" prop="number">
                <el-checkbox-group v-model="checkList">
                  <el-checkbox label="一周"></el-checkbox>
                  <el-checkbox label="一月"></el-checkbox>
                  <el-checkbox label="一年"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否缩写" prop="number">
                <el-switch
                  v-model="value3"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  style="width: 100%;"
                />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="拼音大写">
                <el-input />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="币种" prop="number">
                <el-radio v-model="radio" label="1">人民币</el-radio>
                <el-radio v-model="radio" label="2">欧元</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="汇率" prop="number">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="价格条件" prop="number">
                <el-input />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="付款日期" prop="number">
                <el-date-picker
                  v-model="value2"
                  type="daterange"
                  align="right"
                  unlink-panels
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注" prop="number">
                <el-input />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- part3 -->
        <el-row :gutter="10">
          <el-col :span="24">
            <h5 class="dtl-title-line">公共信息</h5>
          </el-col>
        </el-row>
        <el-table
          :data="tableData"
          border
          style="width: 100%;"
          height="250"
        >
          <el-table-column
            fixed
            prop="date"
            label="日期"
          />
          <el-table-column
            prop="name"
            label="姓名"
          />
          <el-table-column
            prop="province"
            label="省份"
          />
          <el-table-column
            prop="city"
            label="市区"
          />
          <el-table-column
            prop="address"
            label="地址"
          />
          <el-table-column
            prop="zip"
            label="邮编"
          />
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="princeList">报价单</el-tab-pane>
    </el-tabs>
    <el-dialog :title="showTitle" :visible.sync="isShow" width="70%">
      <pop-tab />
    </el-dialog>
  </el-card>
</template>

<script>
import PopTab from "./detail-layout/components/pop-tab-gang";

export default {
  components: { PopTab },
  data() {
    return {
      isShow: false,
      showTitle: '新增会员',
      activeName: 'princeInfo',
      checkList: ['一周'],
      radio: '1',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value1: '',
      value2: '',
      value3: true,
      value5: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      options: [{
        value: '选项1',
        label: '张三'
      }, {
        value: '选项2',
        label: '李四'
      }, {
        value: '选项3',
        label: '王五'
      }, {
        value: '选项4',
        label: '赵六'
      }, {
        value: '选项5',
        label: '刘七'
      }],
      value: '',
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      },
      {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleShow() {
      this.isShow = true
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
  border-left: 3px solid #409EFF;
  padding-left: 5px;
}
.el-table__fixed-right::before {
  background-color: none;
}
</style>
