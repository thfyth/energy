<template>
  <div class="main">
    <div class="title-box" style="width: auto">
      <div class="title-list">
        <div class="list-box list-input">
          <!-- <span class="title">姓名</span> -->
          <el-input
            v-model="query.queryValue"
            placeholder="请输入查询条件"
            style="width: 200px"
            clearable
          />
        </div>
        <div class="list-box">
          <el-button type="primary" plain icon="el-icon-query" @click="getData"
            >查询</el-button
          >
        </div>
        <!-- <div class="list-box">
          <el-button class="resetting" @click="runReset">重置</el-button>
        </div> -->
      </div>
      <div class="titles-list">
        <el-button class="insert" @click="addQuery" type="primary"
          >新增账户</el-button
        >
        <el-button class="insert" @click="roleMan" type="primary"
          >角色管理</el-button
        >
        <!-- <el-button class="insert" @click="rawQuery" type="primary">获取最新组织数据</el-button> -->
      </div>
    </div>
    <div class="table-box">
      <el-table :data="tableData" @selection-change="getSelectionChange" stripe>
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column fixed label="序号" type="index"></el-table-column>
        <el-table-column prop="userName" label="用户名" align="center"></el-table-column>
        <el-table-column  label="姓名" align="center">
          <template slot-scope="scope">
            <span
              class="article"
              @click="getOneUser(scope.row)"
              v-text="scope.row.name"
            >
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称" align="center"></el-table-column>
        <el-table-column prop="mobile" label="手机" align="center"></el-table-column>
        <el-table-column prop="email" label="电子邮箱" align="center"></el-table-column>
        <el-table-column prop="createDate" label="创建时间" align="center"></el-table-column>
        <el-table-column label="状态" width="200" align="center">
          <template slot-scope="{ row }">
            <el-switch
              v-model="row.status"
              :active-value="1"
              :inactive-value="2"
              @change="setStatus(row)"
              active-color="#13ce66"
              inactive-text="停用"
              class="tablescope"
              active-text="启用"
              inactive-color="#ff4949"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          align="center"
          width="300"
          class-name="small-padding fixed-width"
        >
          <!-- slot-scope="scope" -->
          <template slot-scope="{ row }">
            <el-button type="text" icon="el-icon-my-edit" @click="edit(row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              icon="el-icon-my-set"
              @click="delOneUser(row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-box">
        <el-pagination
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <div class="model">
      <!-- 编辑，增加模态框 -->
      <el-dialog title="用户信息" :visible.sync="editVisible" width="40%">
        <el-form :rules="rules" ref="form" :model="form" label-width="100px">
          <el-form-item label="姓名:" :required="true">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="用户名:" :required="true">
            <el-input v-model="form.userName"></el-input>
          </el-form-item>
          <el-form-item label="手机号:" prop="mobile" :required="true">
            <el-input v-model.number="form.mobile"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱:" :required="true">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="密码:">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item label="角色:">
            <el-select v-model="form.roleId" placeholder="请选择角色">
              <el-option
                v-for="item in roleList"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="角色管理" :visible.sync="editVisible2" width="40%">
        <el-form
          :model="roleFormList"
          ref="ruleForm"
          label-width="100px"
          class="form-user"
        >
          <el-form-item label="角色" prop="region">
            <el-select
              v-model="roleFormList.roleIdLists"
              @change="getRoleInfo"
              placeholder="请选择角色"
            >
              <el-option
                v-for="item in roleList"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
              >
              </el-option>
            </el-select>
            <el-button class="insert" style="margin-left:10px" @click="addRoleMan" type="primary"
              >新建角色</el-button
            >
          </el-form-item>
          <el-form-item label="关联权限" prop="region">
            <wl-tree-select
              v-model="checkList"
              :props="defaultProps"
              :data="menuList"
              multiple
              checkbox
              nodeKey="menuId"
              default-select
            ></wl-tree-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="saveEditRole">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="角色信息" :visible.sync="editVisible3" width="30%">
        <el-form
          ref="ruleForm"
          label-width="100px"
          class="form-user"
          :model="rolesForm"
        >
          <el-form-item label="角色名" prop="region">
            <el-input v-model="rolesForm.roleName"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="saveEditRoleAdd">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
let vm;
import {
  getByIdUser,
  delUser,
  addUser,
  selectUser,
  updataUser,
} from "@/api/stsyem/user";

import {
  selectUserMenuRel,
  addMenuRel,
  addRole,
  delRole,
  selectRole,
  updataRole,
  selectMenu,
  addRoleMenu,
  selectRoleMenu,
} from "@/api/stsyem/menuManage";
export default {
  data() {
    return {
      tableData: [],
      treeData: [],
      //操作状态，新增或更新,true为新增，false为修改
      operation: true,
      total: 0,
      //请求参数
      query: {
        pageNumber: 1,
        pageSize: 10,
        queryValue: null,
      },
      roleFormList: {},
      rolesForm: {},
      defaultProps: {
        label: "menuName",
        children: "children",
        value: "menuId",
      },
      roleList: [],
      roleForm: {},
      menuList: [],
      //树默认选中数据
      defaultKyes: [],
      filterText: null,
      editVisible: false,
      editVisible1: false,
      editVisible2: false,
      editVisible3: false,
      total: 0,
      form: {},
      userId: null,
      checkList: [],
      rules: {
        mobile: [
          { required: true, message: "手机号不能为空" },
          {
            pattern: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
            message: "请输入正确的手机号码",
          },
        ],
      },
      // 默认展开的数组
    };
  },
  created() {
    vm = this;
    vm.getData();
    vm.getRoleList();
  },
  components: {
    // menuList
  },
  methods: {
    //获取所有组织
    getData() {
      //   selectAccount(vm.query).then((res) => {
      //     if (res.code === 0) {
      //       vm.tableData = res.data.records;
      //     }
      //   });
      selectUser(vm.query).then((res) => {
        if (res.code === 0) {
          vm.tableData = res.data.records;
          vm.total = res.data.total;
        }
      });
    },
    //编辑用户
    edit(e) {
      vm.form = e;
      vm.operation = false;
      vm.editVisible = true;
    },
    getSelectionChange(e) {},
    //监听table组件按钮事件
    getButton(e, info) {},
    //保存
    saveEdit() {
      vm.$refs["form"].validate((valid) => {
        if (valid) {
          // vm.form.orgId = vm.query.orgId;
          // vm.form.orgIdAll = vm.query.orgIdAll;
          if (vm.operation) {
            //新增用户
            addUser(vm.form).then(
              (res) => (
                vm.$message.info(res.message),
                vm.getData(),
                (vm.editVisible = false)
              )
            );
          } else {
            //更新用户
            const { roleId } = vm.form;
            const list = vm.roleList;
            list.forEach((v) => {
              if (v.roleId === roleId) {
                vm.form.roleName = v.roleName;
              }
            });
            updataUser(vm.form).then(
              (res) => (
                vm.$message.info(res.message),
                vm.getData(),
                (vm.editVisible = false)
              )
            );
          }
        } else {
          return false;
        }
      });
    },
    setStatus(row) {
      vm.form = row;
      updataUser(vm.form).then(
        (res) => (vm.$message.info(res.message), vm.getData())
      );
    },
    //递归遍历取菜单id
    getMenuIdList(data) {
      let menuIdList = "";
      const getStr = function (list) {
        if (list.length !== undefined) {
          list.forEach(function (row) {
            if (row.menuList) {
              if (row.isChecked == 1) {
                menuIdList += row.menuId + ",";
              }
              getStr(row.menuList);
            } else {
              if (row.isChecked == 1) {
                menuIdList += row.menuId + ",";
              }
            }
          });
        }
      };
      getStr(data);
      const arr = menuIdList.split(",");
      return arr;
    },
    //过滤用户选中的菜单
    setMenu(e) {
      console.log(e);
      vm.editVisible = true;
    },

    //根据条件查询
    rawQuery() {
      vm.getData();
    },
    //新增用户
    addQuery() {
      vm.form = {};
      vm.operation = true;
      vm.editVisible = true;
    },

    getOneUser(e) {
      vm.edit(e);
    },
    saveEditRole() {
      const menuIdList = vm.checkList;
      const { roleIdLists } = vm.roleFormList;
      if(!roleIdLists){
        vm.$message.error('请选择角色')
        return
      }
      const data = vm.getMenuLists(menuIdList);
      const roleIdList = [];
      roleIdList.push(roleIdLists);
      vm.roleFormList = {
        roleIdList,
        menuIdList: data,
      };

      addRoleMenu(vm.roleFormList).then((res) => {
        if (res.code === 0) {
          vm.$message.success(res.message);
          vm.editVisible2 = false;
          vm.checkList = [];
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    roleMan() {
      vm.editVisible2 = true;

      vm.getMenuList();
    },
    addRoleMan() {
      vm.editVisible3 = true;
    },
    saveEditRoleAdd() {
      addRole(vm.rolesForm).then((res) => {
        if (res.code === 0) {
          vm.$message.success(res.message);
          vm.editVisible3 = false;
          vm.getRoleList();
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //获取角色
    getRoleList() {
      selectRole().then((res) => {
        console.log(res);
        if (res.code === 0) {
          vm.roleList = res.data;
        }
      });
    },
    //获取菜单
    getMenuList() {
      const query = {
        menuName: null,
        pageNumber: "1",
        pageSize: "10",
        parentId: null,
      };
      selectMenu(query).then((res) => {
        console.log(res);
        if (res.code === 0) {
          vm.menuList = res.data;
        }
      });
    },
    //获取权限下菜单
    getRoleInfo(e) {
      const roleIds = e;
      vm.checkList = [];
      selectRoleMenu({ roleIds }).then((res) => {
        if (res.code === 0) {
          const data = vm.getMenuIdList(res.data);
          console.log(data);
          vm.checkList = data;
        }
      });
    },
    //递归遍历取菜单id
    getMenuLists(data) {
      let menuIdList = "";
      const getStr = function (list) {
        if (list.length !== undefined) {
          list.forEach(function (row) {
            if (row.children) {
              //   if (row.isChecked == 1) {
              menuIdList += row.menuId + ",";
              //   }
              getStr(row.children);
            } else {
              //   if (row.isChecked == 1) {
              menuIdList += row.menuId + ",";
              //   }
            }
          });
        }
      };
      getStr(data);
      const arr = menuIdList.split(",");
      const newArr = arr.filter((v) => {
        return v;
      });
      var nr = newArr.filter(function (element, index, self) {
        return self.indexOf(element) === index;
      });
      return nr;
    },
    // 分页
    handleSizeChange(e) {
      vm.query.pageSize = e;
      vm.getData();
    },
    handleCurrentChange(e) {
       vm.query.pageNumber = e;
        vm.getData();
    },
    //删除用户
    delOneUser(row) {
      const { userId } = row;
      const idList = userId;
      vm.$confirm("删除后无法回复，是否继续", "提示", {
        distinguishCancelAndClose: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          delUser({ idList }).then((res) => {
            if (res.code === 0) {
              vm.$message.success(res.message);
              vm.getData();
            } else {
              vm.$message.error(res.message);
            }
          });
        })
        .catch((action) => {});
    },
  },
};
</script>
<style>
.btn-list {
  display: inline-block;
  margin-left: 20px;
}
</style>