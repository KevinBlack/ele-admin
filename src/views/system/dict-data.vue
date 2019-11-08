	<template>
	  <div>
		<el-card class="box-card" style="margin: 0 10px;">
			<!-- 查询面板 -->
			<el-card class="box-card" shadow="never">
			  <!-- label-width="65px" -->
			  <el-form ref="formQuery" :model="formQuery"  label-width="100px">
				<el-row>
				  <el-col :md="6" :lg="6" :xl="4">
					<el-form-item label="字典键" size="mini" prop="loginCode">
					  <el-input v-model="formQuery.key" size="mini"></el-input>
					</el-form-item>
				  </el-col>
				  <el-col :md="6" :lg="6" :xl="4">
					<el-form-item label="字典值" size="mini" prop="userName">
					  <el-input v-model="formQuery.value" size="mini"></el-input>
					</el-form-item>
				  </el-col>
				  <el-col :md="6" :lg="6" :xl="4">
					<el-form-item size="mini">
					  <el-button type="primary" size="mini" @click="search">查询</el-button>
					  <el-button size="mini" @click="resetForm('formQuery')">重置</el-button>
					</el-form-item>
				  </el-col>
				</el-row>
			  </el-form>
			</el-card>
			<!-- 表格区 -->
			<el-card class="box-card" shadow="never" :body-style="{ minHeight: '600px' }">
			  <!-- 按钮区 -->
			  <el-card
				shadow="never"
				style="padding:15px;border-radius:0px;"
				:body-style="{ padding: '0px' }"
			  >
				<el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd()">新建</el-button>
				<el-button type="primary" icon="el-icon-delete" size="mini" @click="batchDelete()">批量删除</el-button>
			  </el-card>
			  <!-- 表格区 -->
			  <el-table
				:data="tableData"
				style="width:100%"
				:header-row-style="headRowStyle"
				:row-style="rowStyle"
				:header-cell-style="getCellStyle"
				v-loading="tableLoading"
				border
				highlight-current-row
				@selection-change="selectionChange"
			  >
				<el-table-column type="selection" width="55" align="center"></el-table-column>
				<el-table-column prop="key" label="字典键" width="200" align="center"></el-table-column>
				<el-table-column prop="value" label="字典值" width="200" align="center"></el-table-column>
				<el-table-column
				  align="center"
				  prop="status"
				  width="150"
				  :formatter="statusFmt"
				  label="状态"
				></el-table-column>
				<el-table-column
				  align="center"
				  prop="isSys"
				  width="150"
				  :formatter="statusFmt"
				  label="系统字典"
				></el-table-column>
				<el-table-column prop="treeSort" label="排序" align="left" ></el-table-column>
				<el-table-column prop="remarks" label="备注" align="left" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column fixed="right" label="操作" width="200" align="center">
				  <template slot-scope="scope">
					<el-button @click="handleEdit(scope.row)" type="text" size="small">编辑</el-button>
				  </template>
				</el-table-column>
			  </el-table>
			  <el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page.sync="formQuery.pageNo"
				:page-size.sync="formQuery.pageSize"
				:page-sizes="[15, 30, 50, 100]"
				layout="total, sizes, prev, pager, next, jumper"
				:total="pageTotal"
			  ></el-pagination>
			</el-card>
		 </el-card>
	  </div>
	</template>

	<script>
	import {
	  getDictDataList,
	  deleteDictData
	} from "@/api/system/dict";

	export default {
	  data() {
		return {
		  treeData: [],
		  treeDefaultProps: {
			children: "childs",
			label: function(data, node) {
			  return data.officeName;
			}
		  },
		  pageTotal: 0,
		  formQuery: {
			key: "",
			value: "",
			dictId: "",
			pageNo:1,
			pageSize:15
		  },
		  tableLoading: false,
		  tableData: [],
		  tableMultiSelection: [],
		  isSysOptions: [
			{
			  value: "1",
			  label: "是"
			},
			{
			  value: "0",
			  label: "否"
			}
		  ]
		};
	  },
	  created() {
		let dictId = this.$route.query.dictId;
    	if (dictId) {
      		this.formQuery.dictId=dictId;
    	} 
		this.getTableList();
	  },
	  methods: {
		selectionChange(val) {
		  this.tableMultiSelection = val;
		},
		search() {
		  this.getTableList();
		},
		resetForm(formName) {
		  this.$nextTick(() => {
			this.$refs[formName].resetFields();
		  });
		},
		getTableList() {
		  this.tableLoading = true;
		  getDictDataList(this.formQuery).then(response => {
			this.tableData = response.data;
			this.pageTotal = response.page.total || 0;
			this.tableLoading = false;
		  });
		},
		handleSizeChange(val) {
		  this.getTableList();
		},
		handleCurrentChange(val) {
		  this.getTableList();
		},
		rowStyle(row, rowIndex) {
		  return "height:15px;font-size: 13px;color: #333;font-weight: normal; ";
		},
		headRowStyle(row, rowIndex) {
		  return "height:15px;";
		},
		getCellStyle({ row, column, rowIndex, columnIndex }) {
		  if (rowIndex === 0) {
			return "background: #F2F2F2;font-size: 13px;color: #333;font-weight: normal;";
		  } else {
			return "";
		  }
		},
		batchDelete() {
		  if (!this.tableMultiSelection) {
			this.$message({
			  type: "info",
			  message: "请选中要删除的数据!"
			});
			return;
		  }
		  let selectRows = this.tableMultiSelection;
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
			  var idArr = new Array();
			  Object.keys(selectRows).forEach(function(key) {
				if (selectRows[key].id) {
				  idArr.push(selectRows[key].id);
				}
			  });
			  if (idArr && idArr.length > 0) {
				var ids = idArr.join();
				deleteDictData(ids).then(response => {
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
		handleAdd() {
		  var dictId=this.formQuery.dictId;
		  this.$router.push({ path: "/system/dict-data-detail", query: { dictId:dictId } });
		},
		handleEdit(row) {
		  this.$router.push({
			path: "/system/dict-data-detail",
			query: { id: row.id }
		  });
		},		
		statusFmt(row, column, cellValue, index) {
		  let status = row.status;
		  if (status === 0) {
			return "正常";
		  } else if (status === 1) {
			return "删除";
		  } else if (status === 2) {
			return "停用";
		  } else {
			return row.status;
		  }
		}
	  }
	};
	</script>
	<style>
  /* el-select 比正常的框长 */
	.el-form-item .el-select {
	  width: 100%;
	}
	</style>
