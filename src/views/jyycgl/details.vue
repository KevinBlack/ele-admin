<template>
  <el-card class="detailsContainer">
    <!-- part1 -->
    <el-form ref="formQuery" :model="formQuery" label-width="100px" size="mini">
      <el-row :gutter="20" class="area_border">
        <el-col :span="10">
          <el-form-item label="签约时间从" size="mini" prop="timeValue">
            <el-date-picker
              type="datetimerange"
              v-model="formQuery.timeValue"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              unlink-panels
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="企业名称" size="mini" prop="companyName">
            <el-input v-model="formQuery.companyName" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="是否经营异常"  size="mini" prop="status">
            <el-select
                v-model="formQuery.status"
                filterable
                placeholder="请选择"
                style="width:100%">
              <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4" style="text-align: left;padding-left: 1.3em;">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="getTableList">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh-right" @click="resetForm('formQuery')" size="mini">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="area_bordes">
      <el-col :span="24">
        <el-radio-group  size="mini">
          <el-radio-button type="primary" class="btn_line" @click.native.prevent="delData">删 除</el-radio-button>
          <el-radio-button type="primary" @click.native.prevent="handleCreate">移 出</el-radio-button>
        </el-radio-group>
        <el-radio-group size="mini" style="margin-left: 20px;">
          <el-radio-button type="primary" class="btn_line" @click.native.prevent="handleSee">查 看</el-radio-button>
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
      style="width: 100%;margin-bottom:20px;"
      @selection-change="selectionChange"
    >
      <el-table-column type="selection" width="55" align="center"/>
      <el-table-column type="index" width="55" label="序号" align="center"></el-table-column>
      <el-table-column prop="companyName" label="企业名称" align="center"></el-table-column>
      <el-table-column prop="inclusionDirectoryReason" label="列入名录原因" align="center"></el-table-column>
      <el-table-column prop="implementedBy" label="执行单位" align="center"></el-table-column>
      <el-table-column prop="executionTime" label="执行时间" align="center"></el-table-column>
      <el-table-column prop="inclusionTime" label="列入日期" align="center"></el-table-column>
      <el-table-column prop="removeDirectoryReason" label="移出名录原因" align="center"></el-table-column>
      <el-table-column prop="removeTime" label="移出时间" align="center"></el-table-column>
      <el-table-column prop="statusName" label="是否经营异常" align="center" :show-overflow-tooltip="true"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row class="area_bordes">
      <el-col :span="24" style="text-align: right;">
        <el-pagination
          background
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next"
          :total="pageTotal"
        />
      </el-col>
    </el-row>
    <!-- 弹框 -->
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px">
          <el-form-item label="移出名录原因" prop="removeDirectoryReason">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4}"
              placeholder="请输入内容"
              v-model="temp.removeDirectoryReason">
            </el-input>
          </el-form-item>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="moveData()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </el-card>
  
</template>

<script>
  import { getAbnormalOperationList,deleteAbnormal,moveData} from "@/api/jyycgl/input.js";
export default { 
  data() {
    return {
      pageTotal: 0,
      tableLoading: false,
      tableData: [],
      tableMultiSelection: [],
      formQuery: {
        companyName: "",
        timeValue: "",
        status: "",
        pageNo: 1,
        pageSize: 5,
        orderBy: ""
      },
      temp: {
        id: undefined,
        removeDirectoryReason: ''
      },
      dialogFormVisible: false,
      rules: {
        removeDirectoryReason: [{ required: true, message: '不能为空', trigger: 'change' }],
      },
      dialogStatus : '移出',
      statusOptions: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "异常"
        },
        {
          value: "1",
          label: "非异常"
        }
      ]
    }
  },
  created() {
    this.getTableList();
  },
  methods: {
    handleSee() {
       if (this.tableMultiSelection.length==0) {
        this.$message({
          type: "info",
          message: "请选中要查看的数据!"
        });
        return;
      }
      if (this.tableMultiSelection.length!=1) {
        this.$message({
          type: "info",
          message: "请选中要一条需要查看的数据!"
        });
        return;
      }
       this.$router.push({
        path: "/jyycgl/abnormalSee",query: {readonly:true,id:this.tableMultiSelection[0].id}
      });
    },
    delData() {
      let selectRows = this.tableMultiSelection;
      if (selectRows.length==0) {
        this.$message({
          type: "info",
          message: "请选中要删除的数据!"
        });
        return;
      }
      this.$confirm("是否执行删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var abnormalIdArr = selectRows.map(selectRow => selectRow.id);
          if (abnormalIdArr && abnormalIdArr.length > 0) {
            var abnormalIds = abnormalIdArr.join();
            deleteAbnormal(abnormalIds).then(response => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getTableList();
            });
          }
        })
        .catch(() => {
          // 取消时执行此处
        });
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        removeDirectoryReason: ''
      }
    },
    handleCreate(){
      if (this.tableMultiSelection.length==0) {
        this.$message({
          type: "info",
          message: "请选中要查看的数据!"
        });
        return;
      }
      if (this.tableMultiSelection.length!=1) {
        this.$message({
          type: "info",
          message: "请选中要一条需要查看的数据!"
        });
        return;
      }
      if (this.tableMultiSelection[0].status!=0) {
        this.$message({
          type: "info",
          message: "请选中状态是异常状态的数据!"
        });
        return;
      }
      this.resetTemp();
      this.temp.id=this.tableMultiSelection[0].id;
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    moveData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          moveData(this.temp).then(response => {
            if (response.data) {
              //移出成功
              this.getTableList();
              this.dialogFormVisible = false
              this.$message({
                type: "success",
                message: "移出成功"
              });
            } else {
              //移出失败
              this.$message({
                type: "success",
                error: "移出失败"
              });
            }
          })
        }
      })
    },
    getTableList() {
      this.tableLoading = true;
      if (this.formQuery.timeValue.length >= 0) {
        this.formQuery.beginTime = this.formQuery.timeValue[0];
        this.formQuery.endTime = this.formQuery.timeValue[1];
      }
      getAbnormalOperationList(this.formQuery).then(response => {
        this.tableData = response.data;
        for(var i=0;i<response.data.length;i++){
          var data=response.data[i];
          if(data.status=="0"){
            this.tableData[i].statusName="异常";
          }else if(data.status=="1"){
            this.tableData[i].statusName="非异常";
          }
        }
        
        this.pageTotal = response.page.total;
        this.tableLoading = false;
      });
    },
   resetForm(formQuery) {
      this.$nextTick(() => {
        this.$refs[formQuery].resetFields();
      });
    },
    selectionChange(val) {
      this.tableMultiSelection = val;
    },
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
.area_border, .area_bordes {
  box-sizing: border-box;
  border: 1px solid #e6e6e6;
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding: 10px 0 0 0;
  margin-bottom: 20px;
  overflow: hidden;
}
.area_bordes {
  padding: 10px;
}
.btn_line {
  margin-right: 2px;
}
</style>
