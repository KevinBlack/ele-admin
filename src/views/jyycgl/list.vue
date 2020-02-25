<template>
  <el-card class="detailsContainer">
    <!-- part1 -->
    <el-form ref="formQuery" :model="formQuery" label-width="100px" size="mini">
      <el-row :gutter="20" class="area_border">
        <el-col :span="8">
          <el-form-item label="列入日期从" size="mini" prop="timeValue">
            <el-date-picker
              type="datetimerange"
              v-model="formQuery.timeValue"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              unlink-panels
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              style="width: 250px;"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="企业名称" size="mini" prop="companyName">
            <el-input v-model="formQuery.companyName" size="mini" style="width: 80%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
            <el-form-item label="归属地区" size="mini" prop="areas">
              <el-cascader
                :props="props.area"
                :options="dict.area"
                v-model="formQuery.areas"
                clearable
                filterable
                size="mini"
                style="width:100%;"
                change-on-select
              ></el-cascader>
            </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="移出状态"  size="mini" prop="status">
            <el-select
                v-model="formQuery.status"
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
        <el-col :span="8">
          <el-form-item label="发布状态"  size="mini" prop="publishStatus">
            <el-select
                v-model="formQuery.publishStatus"
                filterable
                placeholder="请选择"
                style="width:80%">
              <el-option
                  v-for="item in dict.publishStatusOptions"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="getTableList">查询</el-button>
          <el-button type="primary" icon="el-icon-refresh-right" @click="resetForm('formQuery')" size="mini">重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row class="area_bordes">
      <el-col :span="24">
        <el-radio-group  size="mini">
          <el-radio-button v-show="btnShow('100020201010')" v-if="btnDisplay('10')" type="primary" class="btn_line" @click.native.prevent="addData">新 增</el-radio-button>
          <el-radio-button v-show="btnShow('100020201040')" v-if="btnDisplay('10')" type="primary" class="btn_line" @click.native.prevent="updData">修 改</el-radio-button>
          <el-radio-button v-show="btnShow('100020201020')" v-if="btnDisplay('10')" type="primary" class="btn_line" @click.native.prevent="delData">删 除</el-radio-button>
          <el-radio-button v-show="btnShow('100020201050')" v-if="btnDisplay('10')" type="primary" @click.native.prevent="handleCreate">移 出</el-radio-button>
        </el-radio-group>
        <el-radio-group size="mini" style="margin-left: 20px;">
          <el-radio-button v-show="btnShow('100020201030')" v-if="btnDisplay('10')" type="primary" class="btn_line" @click.native.prevent="handleSee">查 看</el-radio-button>
        </el-radio-group>
        <el-radio-group size="mini" style="margin-left: 20px;">
          <el-radio-button v-show="btnShow('100020201060')" v-if="btnDisplay('10')" type="primary" class="btn_line" @click.native.prevent="pubData">发 布</el-radio-button>
          <el-radio-button v-show="btnShow('100020201070')" v-if="btnDisplay('10')" type="primary" class="btn_line" @click.native.prevent="noPubData">取消发布</el-radio-button>
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
      <el-table-column prop="statusName" label="移出状态" align="center" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="publishStatus" label="发布状态" align="center" :show-overflow-tooltip="true" :formatter="publishStatusFmt"></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row class="area_bordes">
      <el-col :span="24" style="text-align: right;">
        <el-pagination
          background
          style="text-align: margin-top: 20px;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="formQuery.pageNo"
          :page-size.sync="formQuery.pageSize"
          :page-sizes="[5, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageTotal"
        ></el-pagination>
      </el-col>
    </el-row>
    <!-- 弹框 -->
    <el-dialog :title="dialogStatus" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="120px">
          <el-form-item label="移出名录原因" prop="removeDirectoryReason">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4}"
              placeholder="请输入移出名录原因"
              maxlength="100"
              show-word-limit
              v-model="temp.removeDirectoryReason">
            </el-input>
          </el-form-item>
          <el-form-item label="移出备注" prop="removeRemark">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4}"
              placeholder="请输入移出备注"
              maxlength="200"
              show-word-limit
              v-model="temp.removeRemark">
            </el-input> 
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
  import { getAbnormalOperationList,deleteAbnormal,moveData,pubData} from "@/api/jyycgl/input.js";
  import { getDictDataLists, getAreaTree } from "@/api/system/comm/comm";
  import { getDictName } from "@/utils/index.js";
  export default {
    data() {
      return {
        btns: this.$store.getters.btns['1000202010'],
        pageTotal: 0,
        tableLoading: false,
        tableData: [],
        tableMultiSelection: [],
        formQuery: {
          pageNo: 1,
          pageSize: 5,
          companyName: "",
          timeValue: "",
          status: "",
          publishStatus: "",
          orderBy: "",
          areas: "",
        },
        temp: {
          ids: undefined,
          removeDirectoryReason: '',
          removeRemark: ''
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
            value: 0,
            label: "异常"
          },
          {
            value: 1,
            label: "移出"
          }
        ],
        dict: {
          publishStatusOptions: [],
          area: []
        },
        //表单el标签属性
        props: {
          area: {
            multiple: false,
            checkStrictly: true,
            showAllLevels: true,
            value: "id",
            label: "name",
            children: "childs"
          }
        },
      }
    },
    created() {
      //加载字典
      this.beforeLoading();
      this.getTableList();
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
        getDictDataLists("97001010").then(response => {
          this.dict.publishStatusOptions = response.data.jq97001010;
        });
        getAreaTree().then(response => {
          this.dict.area = response.data;
        });
      },
      getCellStyle({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'background: #F2F2F2;font-size: 13px;color: #333;font-weight: normal'
        } else {
          return ''
        }
      },
      addData() {
        this.$router.push({
          path: "/abnormal-operation-manage/abnormal-add",query: {}
        });
      },
      updData() {
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
        if (this.tableMultiSelection[0].publishStatus!="0") {
            this.$message({
              type: "info",
              message: "请选中状态是未发布的数据!"
            });
            return;
        }
        this.$router.push({
          path: "/abnormal-operation-manage/abnormal-upd",query: {id:this.tableMultiSelection[0].id}
        });
      },
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
          path: "/abnormal-operation-manage/abnormal-see",query: {readonly:true,id:this.tableMultiSelection[0].id}
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
        for(var i =0;i < selectRows.length; i++){
          if (this.tableMultiSelection[i].publishStatus!="0") {
            this.$message({
              type: "info",
              message: "请选中状态是未发布的数据!"
            });
            return;
          }
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
          removeDirectoryReason: '',
          removeRemark: '',
        }
      },
      handleCreate(){
        let query=this.tableMultiSelection;
        if (query.length==0) {
          this.$message({
            type: "info",
            message: "请选中要移出的数据!"
          });
          return;
        }
        for(var i =0;i < query.length; i++){
          if (this.tableMultiSelection[i].status!="0") {
            this.$message({
              type: "info",
              message: "请选中状态是异常状态的数据!"
            });
            return;
          }
        }
        this.resetTemp();
        var abnormalIdArr=query.map(selectRow => selectRow.id);
        if (abnormalIdArr && abnormalIdArr.length > 0) {
          this.temp.ids = abnormalIdArr.join();
        }
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
      noPubData() {
        let query=this.tableMultiSelection;
        if (query.length==0) {
          this.$message({
            type: "info",
            message: "请选中要取消发布的数据!"
          });
          return;
        }
        for(var i =0;i < query.length; i++){
          if (this.tableMultiSelection[i].publishStatus!="1") {
            this.$message({
              type: "info",
              message: "请选中状态是发布的数据!"
            });
            return;
          }
        }
        this.resetTemp();
        var abnormalIdArr=query.map(selectRow => selectRow.id);
        if (abnormalIdArr && abnormalIdArr.length > 0) {
          this.temp.ids = abnormalIdArr.join();
        }
        pubData(this.temp).then(response => {
          if (response.data) {
            //发布成功
            this.getTableList();
            this.$message({
              type: "success",
              message: "取消发布成功"
            });
          } else {
            //发布失败
            this.$message({
              type: "success",
              error: "取消发布失败"
            });
          }
        })
      },
      pubData() {
        let query=this.tableMultiSelection;
        if (query.length==0) {
          this.$message({
            type: "info",
            message: "请选中要发布的数据!"
          });
          return;
        }
        for(var i =0;i < query.length; i++){
          if (this.tableMultiSelection[i].publishStatus!="0") {
            this.$message({
              type: "info",
              message: "请选中状态是未发布的数据!"
            });
            return;
          }
        }
        this.resetTemp();
        var abnormalIdArr=query.map(selectRow => selectRow.id);
        if (abnormalIdArr && abnormalIdArr.length > 0) {
          this.temp.ids = abnormalIdArr.join();
        }
        pubData(this.temp).then(response => {
              if (response.data) {
                //发布成功
                this.getTableList();
                this.$message({
                  type: "success",
                  message: "发布成功"
                });
              } else {
                //发布失败
                this.$message({
                  type: "success",
                  error: "发布失败"
                });
              }
            })
      },
      publishStatusFmt(row, column, cellValue, index) {
        return getDictName(this.dict.publishStatusOptions, row.publishStatus);
      },
      handleSizeChange(val) {
        this.getTableList();
      },
      handleCurrentChange(val) {
        this.getTableList();
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
            this.tableData[i].statusName = data.status==0 ? "异常":"移出"
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
@import '~@/styles/hxxd.scss';
</style>
