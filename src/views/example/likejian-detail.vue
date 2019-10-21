<template>
  <div>
    <el-card class="detailsContainer">
      <el-row style="border-bottom: 1px solid #e6e6e6;margin-bottom: 20px;padding-bottom:10px;">
        <el-col :span="12">
          <!-- <a href="javascrip:;" style="color: #409EFF"><i class="el-icon-back" style="color: #409EFF;margin-right: 5px;c" />返回</a> | <a href="javascript:;" @click="handleShow">{{ showTitle }}</a> -->
          <el-page-header @back="goBack" content="李科建详情页面"></el-page-header>
        </el-col>
        <el-col :span="12" style="text-align:right;">
          <el-button type="primary" size="mini" @click="saveMain">保存</el-button>
          <el-button type="primary" size="mini">取消</el-button>
        </el-col>
      </el-row>
      <el-tabs v-model="activeTabName" @tab-click="handleClick">
        <el-tab-pane label="用户管理">
          <el-form ref="mainForm" :model="mainForm" label-width="100px" size="mini">
            <!-- 第一块分组 -->
            <el-row :gutter="10">
              <el-col :span="24">
                <h5 class="dtl-title-line">公共信息</h5>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <!-- 写好一个col其他的知己复制粘贴 -->
              <el-col :span="6">
                <el-form-item label="xxxx编号" size="mini" prop="code">
                  <el-input v-model="mainForm.code" size="mini" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="状态" size="mini" prop="status">
                  <el-select
                    v-model="mainForm.status"
                    filterable
                    placeholder="请选择"
                    size="mini"
                    style="width:100%"
                  >
                    <el-option
                      v-for="item in mainFormOptions.statusOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="制单时间" size="mini" prop="createDate">
                  <el-date-picker
                    v-model="mainForm.createDate"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    style="width:100%"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="提交时间" size="mini" prop="submitTime">
                  <el-input v-model="mainForm.submitTime" size="mini" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <h5 class="dtl-title-line">重要信息</h5>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="性别" size="mini" prop="sex">
                  <el-select
                    v-model="mainForm.sex"
                    filterable
                    placeholder="请选择"
                    size="mini"
                    style="width:100%"
                  >
                    <el-option
                      v-for="item in mainFormOptions.sexOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="价格" size="mini" prop="price">
                  <el-input v-model.number="mainForm.price" size="mini" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="爱好" size="mini" prop="hobby">
                  <el-checkbox-group v-model="mainForm.hobby">
                    <el-checkbox label="1">羽毛球</el-checkbox>
                    <el-checkbox label="2">羽毛球</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="公司名称" size="mini" prop="compName">
                  <el-input v-model="mainForm.compName" size="mini" :disabled="true">
                    <el-button slot="append" icon="el-icon-search" @click="showCompanyDialog" />
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="已选机构" size="mini" prop="officeIds">
                  <el-cascader
                    :props="mainFormProps.officeProps"
                    :show-all-levels="false"
                    :options="mainFormOptions.officeCascaderOptions"
                    v-model="mainForm.officeIds"
                    clearable
                    filterable
                    size="mini"
                    style="width:100%;"
                  ></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="音量2" size="mini" prop="volume">
                  <el-slider v-model="mainForm.volume" size="mini"></el-slider>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="24">
                <h5 class="dtl-title-line">其他信息</h5>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="邮箱" size="mini" prop="email">
                  <el-input v-model="mainForm.email" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="电话" size="mini" prop="phone">
                  <el-input v-model="mainForm.phone" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="手机号" size="mini" prop="tel">
                  <el-input v-model="mainForm.tel" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="角色" size="mini" prop="roleIds">
                  <el-select
                    v-model="mainForm.roleIds"
                    multiple
                    placeholder="请选择"
                    size="mini"
                    style="width:100%"
                  >
                    <el-option
                      v-for="item in mainFormProps.roleOptions"
                      :key="item.roleId"
                      :label="item.roleName"
                      :value="item.roleId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="10">
              <el-col :span="24">
                <h5 class="dtl-title-line">审核信息(管理员显示)</h5>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="审核状态" size="mini" prop="checkStatus">
                  <el-input v-model="mainForm.checkStatus" size="mini" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="审核原因" size="mini" prop="checkReason">
                  <el-input v-model="mainForm.checkReason" size="mini" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="审核人ID" size="mini" prop="checkBy">
                  <el-input v-model="mainForm.checkBy" size="mini" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="审核人姓名" size="mini" prop="checkUserName">
                  <el-input v-model="mainForm.checkUserName" size="mini" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-row :gutter="10">
            <el-col :span="24">
              <h5 class="dtl-title-line">子表1数据</h5>
            </el-col>
          </el-row>
          <el-row :gutter="10" class="area_bordes">
            <el-col :span="24">
              <el-button-group size="mini" style="margin-left: 20px;">
                <el-button
                  type="primary"
                  class="btn_line"
                  icon="el-icon-plus"
                  size="mini"
                  @click="handleChildOneAdd()"
                >新增</el-button>
                <el-button
                  type="primary"
                  icon="el-icon-delete"
                  size="mini"
                  @click="handleChildOneDelete()"
                >删除</el-button>
                <el-button
                  type="primary"
                  icon="el-icon-delete"
                  size="mini"
                  @click="handleChildOneEdit"
                >编辑</el-button>
              </el-button-group>
            </el-col>
          </el-row>
          <el-table
            :data="childOneTableData"
            border
            style="width: 100%;"
            height="250"
            size="mini"
            @selection-change="handleChildOneSelectionChange"
          >
            <el-table-column type="selection" width="50" />
            <el-table-column prop="vId" label="VID" />
            <el-table-column prop="id" label="ID" />
            <el-table-column prop="mid" label="MID" />
            <el-table-column prop="remark" label="备注" />
          </el-table>
          <el-row :gutter="10">
            <el-col :span="24">
              <h5 class="dtl-title-line">子表2数据</h5>
            </el-col>
          </el-row>
          <el-row :gutter="10" class="area_bordes">
            <el-col :span="24">
              <el-button-group size="mini" style="margin-left: 20px;">
                <el-button
                  type="primary"
                  class="btn_line"
                  icon="el-icon-plus"
                  size="mini"
                  :disabled="childTwoAddBtnDisabled"
                  @click="handleChildTwoAdd"
                >新增</el-button>
                <el-button
                  type="primary"
                  icon="el-icon-delete"
                  size="mini"
                  @click="handleChildTwoDelete"
                >删除</el-button>
              </el-button-group>
            </el-col>
          </el-row>
          <!-- 表格区域 -->
          <el-table
            :data="childTwoTableData"
            border
            style="width: 100%;"
            height="250"
            size="mini"
            @selection-change="handleChildTwoSelectionChange"
          >
            <el-table-column type="selection" width="50" />
            <el-table-column prop="id" label="ID" width="200" align="center"></el-table-column>
            <el-table-column prop="vId" label="VID" width="200" align="center"></el-table-column>
            <el-table-column prop="mid" label="MID" width="200" align="center"></el-table-column>
            <el-table-column prop="fldOne" label="第一个参数">
              <template slot-scope="scope">
                <!-- 文字编辑 -->
                <template v-if="scope.row.editable">
                  <el-input
                    v-model="scope.row.fldOne"
                    class="edit-input"
                    placeholder="第一个参数"
                    size="mini"
                  />
                </template>
                <!-- 文字展示 -->
                <span v-else>{{ scope.row.fldOne }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="fldTwo" label="第二个参数">
              <template slot-scope="scope">
                <template v-if="scope.row.editable">
                  <el-input
                    v-model="scope.row.fldTwo"
                    class="edit-input"
                    placeholder="第二个参数"
                    size="mini"
                  />
                </template>
                <span v-else>{{ scope.row.fldTwo }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="fldThree" label="第三个参数">
              <template slot-scope="scope">
                <template v-if="scope.row.editable">
                  <el-input
                    v-model="scope.row.fldThree"
                    class="edit-input"
                    placeholder="第三个参数"
                    size="mini"
                  />
                </template>
                <span v-else>{{ scope.row.fldThree }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注">
              <template slot-scope="scope">
                <template v-if="scope.row.editable">
                  <el-input
                    v-model="scope.row.remark"
                    class="edit-input"
                    placeholder="备注"
                    size="mini"
                  />
                </template>
                <span v-else>{{ scope.row.remark }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="制单日期" width="250">
              <template slot-scope="scope">
                <template v-if="scope.row.editable">
                  <el-date-picker
                    v-model="scope.row.createTime"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="制单日期"
                    size="mini"
                  />
                </template>
                <span v-else>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="editable" label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  v-if="!scope.row.editable"
                  type="danger"
                  icon="el-icon-edit"
                  size="mini"
                  @click="handleChildTwoEdit(scope.row)"
                >编辑</el-button>
                <el-button
                  v-else
                  type="danger"
                  icon="el-icon-check"
                  size="mini"
                  @click="handleChildTwoOk(scope.row)"
                >确认</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="princeList">吧相应的模块放到这个标签内部</el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 公司搜索弹框 -->
    <el-dialog :visible.sync="companyDialogShow" title="查询公司">
      <SysCompanyDialog
        :companyName="mainForm.compName"
        companyCode="xx"
        :isShow="companyDialogShow"
        @closeDalog="closeCompanyDialog"
      />
    </el-dialog>
    <!-- 子表1录入输入框 -->
    <el-dialog :visible.sync="childOneDialogShow" title="录入子表1数据">
      <ChildOneDialog
        :mid="mainForm.id"
        :saveMode="childOneSaveMode"
        :data="childOneCurrRow"
        :isShow="childOneDialogShow"
        @closeDalog="closeChildOneDialog"
      />
    </el-dialog>
  </div>
</template>

<script>
// 引入弹框
import SysCompanyDialog from "@/views/comm/sys-company-dialog";
import ChildOneDialog from "@/views/example2/likejian-child-one-dialog.vue";
// 引入axios
import { getOfficeTree } from "@/api/system/office";
import { getRoleList } from "@/api/system/role";
import {
  addDemo,
  modifyDemo,
  getByTableName,
  listByMId
} from "@/api/system/demo";
// 引入工具类js
import {
  createVId,
  strToArr,
  strTo2Arr,
  strArrToIntArr,
  arr2ToStr,
  arr2LastItemToStr,
  setRowHasChange,
  setRowsHasChange,
  getRowsHasChange,
  setRowsEditable
} from "@/utils/index.js";

export default {
  components: { SysCompanyDialog, ChildOneDialog },
  data() {
    return {
      //表单对应下拉字典
      mainFormOptions: {
        statusOptions: [
          { value: "10", label: "制单" },
          { value: "20", label: "提交" }
        ],
        sexOptions: [{ value: 1, label: "男" }, { value: 0, label: "女" }],
        officeCascaderOptions: []
      },
      //表单el标签属性
      mainFormProps: {
        officeProps: {
          multiple: true,
          checkStrictly: true,
          showAllLevels: true,
          value: "id",
          label: "officeName",
          children: "childs"
        },
        roleOptions: []
      },
      //主表form
      mainFormChangeCount: 0,
      mainForm: {
        id: "",
        code: "",
        username: "",
        status: "10",
        compId: "",
        compName: "",
        officeIds: [],
        sex: 1,
        remarks: "",
        price: "",
        hobby: [],
        volume: 50,
        submitTime: "",
        email: "",
        phone: "",
        tel: "",
        roleIds: [],
        checkStatus: "",
        checkReason: "",
        checkBy: "",
        createDate: "",
        checkUserName: "",
        updateBy: "",
        updateDate: ""
      },
      // 第一个子表数据
      childOneTableDataChangeCount: 0,
      childOneTableData: [],
      childOneDialogShow: false,
      //  第一个子表当前被选中的行
      childOneSelectRows: [],
      //  第一个子表当前行
      childOneCurrRow: {},
      childOneSaveMode: "add",
      // 第二个子表数据
      childTwoTableData: [],
      // 当前被选中的行
      childTwoSelectRows: [],
      childTwoAddBtnDisabled: false,
      childTwoEditRow: {},
      //当前被打开的面板名
      activeTabName: "",
      // 公司弹框显示与隐藏
      companyDialogShow: false
    };
  },
  created() {
    // 初始化查询表单
    this.initFormOptions();
    //根据id加载数据
    this.loadData(this.$route.query.id);
  },
  watch: {
    //表单是否被修改
    mainForm: {
      handler: function(val, oldVal) {
        this.mainFormChangeCount += 1;
        console.log("mainForm发生变化", this.mainFormChangeCount);
      },
      deep: true
    }
  },
  methods: {
    loadData(id) {
      if (!id) {
        return;
      }
      // 加载主表数据
      getByTableName("JQ_SYS_DEMO_MAIN", id).then(response => {
        //input输入框字段回显
        this.mainForm.id = response.data.id;
        this.mainForm.code = response.data.code;
        this.mainForm.username = response.data.username;
        this.mainForm.price = response.data.price;
        this.mainForm.volume = response.data.volume;
        this.mainForm.submitTime = response.data.submitTime;
        this.mainForm.email = response.data.email;
        this.mainForm.phone = response.data.phone;
        this.mainForm.tel = response.data.tel;
        this.mainForm.checkStatus = response.data.checkStatus;
        this.mainForm.checkReason = response.data.checkReason;
        this.mainForm.checkBy = response.data.checkBy;
        this.mainForm.checkUserName = response.data.checkUserName;
        this.mainForm.createBy = response.data.createBy;
        this.mainForm.updateBy = response.data.updateBy;
        // 时间格式回显 yyyy-MM-dd HH:mm:ss 直接赋值
        this.mainForm.updateDate = response.data.updateDate;
        this.mainForm.createDate = response.data.createDate;
        // 下拉框回显
        this.mainForm.status = response.data.status;
        this.mainForm.sex = response.data.sex;
        // 多选复选框回显
        var hobby = response.data.hobby;
        if (hobby) {
          this.mainForm.hobby = strToArr(hobby, ",");
        }
        // Cascader 级联选择器回显
        var officeFullPaths = response.data.officeFullPaths;
        if (officeFullPaths) {
          this.mainForm.officeIds = strTo2Arr(officeFullPaths);
        }
        // 角色回显
        var roleIds = response.data.roleIds;
        if (roleIds) {
          this.mainForm.roleIds = strArrToIntArr(roleIds.split(","));
        }
      });
      //加载相应的子表数据1
      listByMId("JQ_SYS_DEMO_CHILD_ONE", id, 1, 15).then(response => {
        this.childTwoTableData = setRowsHasChange(response.data,false)
      });
      //加载相应的子表数据2
      listByMId("JQ_SYS_DEMO_CHILD_TWO", id, 1, 15).then(response => {
        var data=response.data;
        data=setRowsHasChange(data,false)
        data=setRowsEditable(data,false)
        this.childOneTableData = data
      });
    },
    //保存所有数据
    saveMain() {
      //获取表单数据
      var mainData = JSON.parse(JSON.stringify(this.mainForm));
      //保存时特殊字段处理
      if (mainData) {
        //多选复选框
        if (mainData.hobby) {
          mainData.hobby = mainData.hobby.join(",");
        }
        // cascader
        if (mainData.officeIds) {
          var officeIds = mainData.officeIds;
          mainData.officeIds = arr2LastItemToStr(officeIds);
          mainData.officeFullPaths = arr2ToStr(officeIds, ".0.", ".");
        }
        // 下拉处理
        if (mainData.roleIds) {
          mainData.roleIds = mainData.roleIds.join(",");
        }
      }
      //获取第一个列表的数据
      console.log('before',this.childOneTableData)
      var childOneTableData = getRowsHasChange(this.childOneTableData)
      console.log('after',childOneTableData)
      //获取第二个列表的数据
      console.log('before',this.childTwoTableData)
      var childTwoTableData = getRowsHasChange(this.childTwoTableData)
      console.log('after',childTwoTableData)
      var saveData = Object.assign(
        {},
        {
          mainData: mainData,
          childOneList: childTwoTableData,
          childTwoList: childOneTableData
        }
      );
      // if(mainData.id=='' || mainData.id==0){
      addDemo(saveData).then(response => {
        var data = response.data;
        var mid = data.id;
        var childOneRela = data.childOne;
        var childTwoRela = data.childTwo;
        //主表主键会写
        this.mainForm.id = mid;
        //子表1虚拟主键会写
        if (childTwoRela.length > 0) {
          var childOneTableData = this.childOneTableData;
          // 设置已经修改为false
          setRowHasChange(childOneTableData,false)
          for (let i = 0; i < childOneTableData.length; i++) {
              var vIdI = childOneTableData[i].vId;
              for (let j = 0; j < childTwoRela.length; j++) {
                var vIdJ = childTwoRela[j].vid;
                if (vIdI == vIdJ) {
                  //虚拟主键置空，主键赋值
                  console.log("2222",mid)
                  childOneTableData[i].mid = mid;
                  childOneTableData[i].vId = "";
                  childOneTableData[i].id = childTwoRela[j].id;
                  break;
                }
              }
          }
        }
        //子表2虚拟主键会写
        if (childOneRela.length > 0) {
          var childTwoTableData = this.childTwoTableData;
          setRowHasChange(childTwoTableData,false)
          for (let i = 0; i < childTwoTableData.length; i++) {
              var vIdI = childTwoTableData[i].vId;
              for (let j = 0; j < childOneRela.length; j++) {
                var vIdJ = childOneRela[j].vid;
                if (vIdI == vIdJ) {
                  //虚拟主键置空，主键赋值
                  console.log("2222",mid)
                  childTwoTableData[i].mid = mid;
                  childTwoTableData[i].vId = "";
                  childTwoTableData[i].id = childOneRela[j].id;
                  break;
                }
              }
          }
        }
      });
      // }else{
      //   // modifyDemo(saveData).then(response => {
      //   //   //相应字段回写和部分逻辑处理
      //   // });
      // }
    },
    //初始化表单必须的数据
    initFormOptions() {
      //组织机构初始化
      getOfficeTree().then(response => {
        this.mainFormOptions.officeCascaderOptions = response.data;
      });
      getRoleList().then(response => {
        this.mainFormProps.roleOptions = response.data;
      });
    },
    //tab页签切换时触发，此处预留
    handleClick(tab, event) {},
    goBack() {
      //返回函数
    },
    // 增加
    handleChildOneAdd() {
      this.childOneSaveMode = "add";
      this.showChildOneDialog({});
    },
    // 删除
    handleChildOneDelete() {},
    // 编辑
    handleChildOneEdit() {
      if (this.childOneCurrRow.id || this.childOneCurrRow.vId) {
        this.childOneSaveMode = "update";
        this.showChildOneDialog();
      } else {
        this.$notify({
          title: "提示",
          message: "请选择要编辑的行",
          type: "warning",
          duration: 2000
        });
      }
    },
    handleChildOneSelectionChange(val) {
      this.childOneSelectRows = val;
      //当只勾选一行时进行赋值
      if (val && val.length == 1) {
        this.childOneCurrRow = val[0];
      }
    },
    // 显示弹框
    showChildOneDialog() {
      this.childOneDialogShow = true;
    },
    // 关闭弹框
    closeChildOneDialog(command, formData) {
      this.childOneDialogShow = false;
      //当点击确定时，做相应的操作
      if (command == "ok") {
        if (this.childOneSaveMode == "add") {
          //设置已经被修改
          setRowHasChange(formData,true)
          this.childOneTableData.push(formData);
        } else {
          var index = this.childOneTableData.indexOf(this.childOneCurrRow);
          if (index >= 0) {
             //设置已经被修改
            setRowHasChange(formData,true)
            this.$set(this.childOneTableData, index, formData);
          }
        }
      }
    },
    // 显示公司搜索框
    showCompanyDialog() {
      this.companyDialogShow = true;
    },
    //关闭公司搜索框
    closeCompanyDialog(command, selectedRows) {
      this.companyDialogShow = false;
      //当点击确定时，做相应的操作
      if (command == "ok") {
        var ids = new Array();
        var names = new Array();
        if (selectedRows && selectedRows.length > 0) {
          Object.keys(selectedRows).forEach(function(key) {
            var row = selectedRows[key];
            ids.push(row.companyId);
            names.push(row.companyName);
          });
        }
        this.mainForm.compId = ids.join(",");
        this.mainForm.compName = names.join(",");
      }
    },
    handleChildTwoSelectionChange(val) {
      this.childTwoSelectRows = val;
    },
    handleChildTwoAdd() {
      this.childTwoAddBtnDisabled = true;
      var vId = createVId();
      var mid = this.mainForm.id;
      var newRow = {
        vId: vId,
        mid: mid,
        id: 0,
        fldOne: "",
        createTime: "",
        fldThree: "",
        remark: "",
        fldTwo: "",
        editable: true
      };
      this.childTwoTableData.push(newRow);
    },
    handleChildTwoDelete() {
      // 删除行数
      if (this.childTwoSelectRows.length <= 0) {
        this.$notify({
          title: "提示",
          message: "请选择要删除的项",
          type: "warning",
          duration: 2000
        });
      } else {
        //筛选出没有被删除的行
        const newTableData = [];
        for (var i = 0; i < this.childTwoTableData.length; i++) {
          if (
            this.childTwoSelectRows.indexOf(this.childTwoTableData[i]) === -1
          ) {
            newTableData.push(this.childTwoTableData[i]);
          }
        }
        this.childTwoTableData = newTableData;
        this.$notify({
          title: "成功",
          message: "删除成功",
          type: "success",
          duration: 2000
        });
      }
    },
    // 编辑
    handleChildTwoEdit(row) {
      //当前行可编辑
      row.editable = true;
    },
    // 确认
    handleChildTwoOk(row) {
      //当前行数据被修改
      setRowHasChange(row,true)
      // 如果当前行所有的数据都为空，则不能编辑下一行
      if (
        row.fldOne !== "" &&
        row.createTime !== "" &&
        row.fldThree !== "" &&
        row.remark !== "" &&
        row.fldTwo !== ""
      ) {
        row.editable = false;
      } else {
        //将当前行移除
        this.childTwoTableData.pop();
      }
      this.childTwoAddBtnDisabled = false;
    },
    // 保存
    handleChildTwoSave() {
      // 1：控制最后一行的编辑状态
      // 2：控制添加按钮是否可用
      var lastRow = this.childTwoTableData[this.childTwoTableData.length - 1];
      if (
        lastRow.fldOne !== "" &&
        lastRow.createTime !== "" &&
        lastRow.fldThree !== "" &&
        lastRow.remark !== "" &&
        lastRow.fldTwo !== ""
      ) {
        lastRow.editable = false;
        this.childTwoAddBtnDisabled = false;
        return this.tableData;
      } else {
        this.$notify({
          title: "提示",
          message: "请完善数据",
          type: "warning",
          duration: 2000
        });
        lastRow.editable = true;
        return this.childTwoTableData;
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
  border-left: 3px solid #409eff;
  padding-left: 5px;
}
.el-table__fixed-right::before {
  background-color: none;
}
.area_border,
.area_bordes {
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
</style>
