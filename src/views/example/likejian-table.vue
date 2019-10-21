<template>
  <el-card class="detailsContainer">
    <!-- part1 -->
    <el-form ref="ruleForm" :model="ruleForm" label-width="100px" size="mini">
      <el-row>
        <el-col :span="12">
          <el-form-item label="异常时间" size="mini" prop="createTime">
            <el-date-picker
              v-model="ruleForm.createTime"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              style="width:100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="性别" prop="sex">
            <el-select v-model="ruleForm.sex" filterable placeholder="请选择" size="mini">
              <el-option
                v-for="item in sexOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="账号" prop="zhanghao">
            <el-input v-model="ruleForm.zhanghao" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="系统字典" size="mini" prop="isSys">
            <el-radio-group v-model="ruleForm.isSys" size="mini">
              <el-radio label="0">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="账号" prop="zhanghao">
            <el-input v-model="ruleForm.zhanghao" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="账号" prop="zhanghao">
            <el-input v-model="ruleForm.zhanghao" size="mini"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24" style="text-align: center;margin: 10px 0;">
          <el-button type="primary" icon="el-icon-search" size="mini" @click="search">查询</el-button>
          <el-button
            type="primary"
            icon="el-icon-refresh-right"
            size="mini"
            @click="resetForm('ruleForm')"
          >重置</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row :gutter="20">
      <el-col :span="24">
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
         <el-button type="primary" icon="el-icon-delete" size="mini" @click="batchDelete">批量删除</el-button>
        <el-button type="primary" icon="el-icon-upload2" size="mini">导出</el-button>
        <el-button type="primary" icon="el-icon-download" size="mini">导入</el-button>
      </el-col>
    </el-row>
    <!-- part3 -->
    <el-row :gutter="10">
      <el-col :span="24">
        <div class="dtl-info-line">
          已选择{{ sum }}条
          <el-button type="text" style="margin-left: 20px;" @click="toggleSelection()">清空</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      tooltip-effect="dark"
      style="width: 100%;"
      @selection-change="handleSelectionChange"
    >
    	  <el-table-column type="selection" width="55" align="center"></el-table-column>
				<el-table-column prop="loginCode" label="登录账号" width="200" align="center"></el-table-column>
				<el-table-column prop="userName" label="用户名" width="200" align="center"></el-table-column>
				<el-table-column
				  align="center"
				  prop="status"
				  width="150"
				  :formatter="statusFmt"
				  label="状态"
				></el-table-column>
				<el-table-column prop="email" label="邮箱" width="200" align="center"></el-table-column>
        	<el-table-column prop="email" label="邮箱" width="200" align="center"></el-table-column>
				<el-table-column prop="mobile" label="手机" width="200" align="center"></el-table-column>
				<el-table-column prop="phone" label="电话" width="200" align="left"></el-table-column>
				<el-table-column prop="remarks" label="备注" align="left" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column fixed="right" label="操作" width="200" align="center">
				  <template slot-scope="scope">
					  <el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
				  </template>
				</el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24" style="text-align: right;margin-top: 20px;">
        <el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page.sync="ruleForm.pageNo"
				:page-size.sync="ruleForm.pageSize"
				:page-sizes="[15, 30, 50, 100]"
				layout="total, sizes, prev, pager, next, jumper"
				:total="pageTotal"
			  ></el-pagination>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>

	import {
	  getUser,
	  getUserList,
	  deleteUser,
	  stopUser,
	  startUser
  } from "@/api/system/user";
  

export default {
  data() {
    return {
      pageTotal:0,
      ruleForm: {
        zhanghao: "",
        sex: "1",
        createTime: [],
        isSys: "1",
        pageNo:0,
        pageSize:15
      },
      sexOptions: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      activeName: "princeInfo",
      sum: 0,
      added: 0,
      tableData: [],
      multipleSelection: []
    };
  },
  created() {
    //从后端获取，赋值 假设ajax
    var sexJson = [{ value: "0", label: "男" }, { value: "1", label: "女" }];
    this.sexOptions = sexJson;
    // 设置开始时间从，开始时间到
    var createTimeArr = new Array();
    var currDate = new Date();
    createTimeArr.push(currDate.getTime() - 3600 * 1000 * 24 * 7);
    createTimeArr.push(new Date());
    this.ruleForm.createTime = createTimeArr;
    //最终执行查询数据
    this.getTableList()
  },
  methods: {
    handleSizeChange(val) {
		  this.getTableList();
		},
		handleCurrentChange(val) {
		  this.getTableList();
		},
    batchDelete(){
		  if (!this.multipleSelection) {
			this.$message({
			  type: "info",
			  message: "请选中要删除的数据!"
			});
			return;
		  }
		  let selectRows = this.multipleSelection;
		  if (selectRows.length == 0) {
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
			  var userIdArr = new Array();
			  Object.keys(selectRows).forEach(function(key) {
				if (selectRows[key].userId) {
				  userIdArr.push(selectRows[key].userId);
				}
			  });
			  if (userIdArr && userIdArr.length > 0) {
        var userIds = userIdArr.join();
        this.$message({
					type: "success",
					message: "删除成功!"
				  });
          this.getTableList();
				// deleteUser(userIds).then(response => {
				//   this.$message({
				// 	type: "success",
				// 	message: "删除成功!"
				//   });
				//   this.getTableList();
				// });
			  }
			})
			.catch(() => {
			  // 取消时执行此处
			});
    },
    handleAdd(){
      console.log("新增")
    },
    handleEdit(row){
      console.log(row.userId)
    },
    search(){
      this.getTableList();
    },
    statusFmt(row, column, cellValue, index) {
		  let status = row.status;
		  if (status === "0") {
			return "正常";
		  } else if (status === "1") {
			return "删除";
		  } else if (status === "2") {
			return "停用";
		  } else {
			return row.status;
		  }
		},
    getTableList(){
        //从后台拉去数据，并且设置到tableData
       getUserList({}).then(response => {
          this.tableData = response.data;
          this.pageTotal = response.page.total || 0;
      });
    },
    resetForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      if (val.length !== 0) {
        this.added = val.length;
        this.sum = this.added;
      } else if (val.length === 0) {
        this.sum -= this.added;
      }
    }
  }
};
</script>

<style scoped>
* {
  font-weight: normal;
}
.detailsContainer {
  margin: 0 10px;
}
.dtl-title-line {
  display: inline-block;
  border-left: 5px solid #409eff;
  padding-left: 5px;
}
.el-table__fixed-right::before {
  background-color: none;
}
.dtl-info-line {
  height: 40px;
  line-height: 40px;
  margin: 10px auto;
  border-radius: 3px;
  font-size: 12px;
  box-sizing: border-box;
  padding-left: 10px;
  color: #000;
  background-color: #dcecfd;
}
.el-table > th {
  background-color: #eee !important;
}
</style>
