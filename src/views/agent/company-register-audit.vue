<template>
  <el-card class="detailsContainer">
    <!-- part1 -->
    <el-form ref="formQuery" :model="formQuery" label-width="100px" size="mini">
      <el-row :gutter="20" class="area_border">
        <el-col :span="12">
          <el-form-item label="创建时间" size="mini" prop="createDate">
            <el-date-picker
              v-model="createDate"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              style="width:100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="企业名称" size="mini" prop="businessName">
            <el-input v-model="formQuery.businessName" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="省份" size="mini" prop="businessName">
            <el-select
              v-model="formQuery.province"
              filterable
              placeholder="请选择"
              style="width: 100%;"
            >
              <el-option
                v-for="item in provinceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="地区" size="mini" prop="businessName">
            <el-select
              v-model="formQuery.area"
              filterable
              placeholder="请选择"
              style="width: 100%;"
            >
              <el-option
                v-for="item in areaOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="是否经营异常" size="mini" prop="status">
            <el-select
              v-model="formQuery.status"
              filterable
              placeholder="请选择"
              size="mini"
              style="width: 100%;"
            >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" style="text-align: left;">
          <el-button
            type="primary"
            icon="el-icon-search"
            v-show="btnShow('1000201080')"
            size="mini"
            @click="getTableList"
            >查询</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-refresh-right"
            @click="resetForm('formQuery')"
            size="mini"
            >重置</el-button
          >
        </el-col>
      </el-row>
    </el-form>
    <!-- 增删改查按钮 -->
    <el-row class="area_bordes">
      <el-col :span="24">
        <el-radio-group size="mini">
          <el-radio-button
            type="primary"
            class="btn_line"
            v-show="btnShow('1000201060')"
            @click.native.prevent="handleAdd"
            >审核通过</el-radio-button
          >
          <el-radio-button
            type="primary"
            class="btn_line"
            v-show="btnShow('1000201070')"
            @click.native.prevent="handleEdit('show')"
            >审核驳回</el-radio-button
          >
          <el-radio-button
            type="primary"
            class="btn_line"
            v-show="btnShow('1000201040')"
            @click.native.prevent="handleEdit('update')"
            >流程日志</el-radio-button
          >
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
      highlight-current-row
      :header-cell-style="getCellStyle"
      @selection-change="handleSelectionChange"
      class="table-hxxd"
    >
      <el-table-column type="selection" width="55"  align="center" />
      <el-table-column
        type="index"
        width="55"
        label="序号"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="businessName"
        label="企业名称"
        width="240"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="province"
        label="省份"
        width="80"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="area"
        label="地区"
        width="80"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="socialCode"
        label="社会信用代码"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="licenseNo"
        label="工商营业执照"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="是否经营异常"
         width="110"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        prop="createDate"
        label="创建日期"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-row class="area_bordes">
      <el-col :span="24" style="text-align: right;">
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
import { getCompanyInfoList, deleteBatch } from "@/api/hxxd/agent";
import { parseTime } from "@/utils/index.js";
export default {
  data() {
    return {
      btns: this.$store.getters.btns["1000201030"],
      param: {
        idList: []
      },
      dialogVisible: false,
      sum: 0,
      added: 0,
      multipleSelection: [],
      pageTotal: 0,
      tableLoading: false,
      tableData: [],
      createDate: [],
      formQuery: {
        area: "",
        province: "",
        businessName: "",
        beginTime: "",
        endTime: "",
        status: "",
        pageNo: 1,
        pageSize: 5,
        orderBy: ""
      },
      statusOptions: [
        {
          value: "0",
          label: "异常"
        },
        {
          value: "1",
          label: "非异常"
        }
      ],
      areaOptions: [
        {
          value: "华东地区",
          label: "华东地区"
        },
        {
          value: "华南地区",
          label: "华南地区"
        },
        {
          value: "华中地区",
          label: "华中地区"
        },
        {
          value: "3",
          label: "华北地区"
        },
        {
          value: "4",
          label: "西北地区"
        },
        {
          value: "5",
          label: "西南地区"
        },
        {
          value: "6",
          label: "东北地区"
        }
      ],
      provinceOptions: [
        {
          value: "0",
          label: "北京市"
        },
        {
          value: "1",
          label: "天津市"
        },
        {
          value: "2",
          label: "上海市"
        },
        {
          value: "3",
          label: "重庆市"
        },
        {
          value: "4",
          label: "河北省"
        },
        {
          value: "5",
          label: "山西省"
        },
        {
          value: "6",
          label: "辽宁省"
        },
        {
          value: "7",
          label: "吉林省"
        },
        {
          value: "8",
          label: "黑龙江省"
        },
        {
          value: "9",
          label: "江苏省"
        },
        {
          value: "10",
          label: "浙江省"
        },
        {
          value: "11",
          label: "安徽省"
        },
        {
          value: "12",
          label: "福建省"
        },
        {
          value: "13",
          label: "江西省"
        },
        {
          value: "14",
          label: "山东省"
        },
        {
          value: "15",
          label: "河南省"
        },
        {
          value: "16",
          label: "湖北省"
        },
        {
          value: "17",
          label: "湖南省"
        },
        {
          value: "18",
          label: "广东省"
        },
        {
          value: "19",
          label: "海南省"
        },
        {
          value: "20",
          label: "四川省"
        },
        {
          value: "21",
          label: "贵州省"
        },
        {
          value: "22",
          label: "云南省"
        },
        {
          value: "23",
          label: "陕西省"
        },
        {
          value: "24",
          label: "甘肃省"
        },
        {
          value: "25",
          label: "测试二"
        },
        {
          value: "26",
          label: "青海省"
        },
        {
          value: "27",
          label: "台湾省"
        },
        {
          value: "28",
          label: "内蒙古自治区"
        },
        {
          value: "29",
          label: "广西壮族自治区"
        },
        {
          value: "30",
          label: "西藏自治区"
        },
        {
          value: "31",
          label: "宁夏回族自治区"
        },
        {
          value: "32",
          label: "新疆维吾尔自治区"
        },
        {
          value: "33",
          label: "香港特别行政区"
        },
        {
          value: "34",
          label: "澳门特别行政区"
        }
      ]
    };
  },
  created() {
    //初始化页面时
    // 参数传递 router.push({ path: 'register', query: { plan: 'private' }})
    // 参数接受 let id = this.$route.query.jId;
    // let flag = this.$route.query.flag;
    // if (flag) {
    this.getTableList();
    this.formQuery.endTime = parseTime(new Date());
    // }
  },
  methods: {
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
    getCellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background: #F2F2F2;font-size: 13px;color: #333;font-weight: normal";
      } else {
        return "";
      }
    },
    handleAdd() {
      this.$router.push({
        path: "/sales-agent-manage/comp-info-maintain"
      });
    },
    handleEdit(type) {
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "请选择数据",
          type: "warning"
        });
      } else if (this.multipleSelection.length == 1) {
        var id = this.multipleSelection[0].id;
        if (id) {
          this.$router.push({
            path: "/sales-agent-manage/sales-agent-info-detail",
            query: { id: id, type: type }
          });
        }
      } else if (this.multipleSelection.length > 1) {
        this.$message({
          message: "请选择单条数据",
          type: "warning"
        });
      }
    },
    deleteBatch() {
      var idList = [];
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "请选择数据",
          type: "warning"
        });
      } else {
        this.multipleSelection.forEach(i => {
          idList.push(i.id);
        });
        //批量删除
        this.param.idList = idList;
        deleteBatch(this.param).then(response => {
          if (response.status == 200) {
            //删除成功
            this.$message({
              type: "success",
              message: "删除成功"
            });
            //更新列表
            this.getTableList();
          }
        });
      }
    },
    handleSizeChange(val) {
      this.getTableList();
    },
    handleCurrentChange(val) {
      this.getTableList();
    },
    getTableList() {
      this.tableLoading = true;
      this.formQuery.beginTime = this.createDate[0];
      this.formQuery.endTime = this.createDate[1];
      getCompanyInfoList(this.formQuery).then(response => {
        this.tableData = response.data;
        this.pageTotal = response.page.total;
        this.tableLoading = false;
      });
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // if (val.length > 1) {
      //   this.$message({da
      //     message: "只能选择单条",
      //     type: "warning"
      //   });
      // }
      if (val.length !== 0) {
        this.added = val.length;
        this.sum = this.added;
      } else if (val.length === 0) {
        this.sum -= this.added;
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    }
  }
};
</script>
<style>
@import "~@/styles/hxxd.scss";
</style>
