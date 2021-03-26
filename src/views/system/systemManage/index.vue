<template>
  <div class="main">
    <div class="title-box" style="width: auto">
      <div class="title-list">
        <div class="list-box list-input">
          <el-input
            v-model="query.backupsName"
            placeholder="设备名称"
            style="width: 200px"
            clearable
          />
        </div>
        <div class="list-box">
          <el-button type="primary" plain icon="el-icon-query" @click="getData"
            >查询</el-button
          >
        </div>
      </div>
      <div class="titles-list">
        <el-button class="insert" @click="addBackupsFun" type="primary"
          >新增备份</el-button
        >
      </div>
    </div>
    <div class="table-view">
      <el-table
        :data="tableData"
        stripe
        element-loading-text="Loading"
        tooltip-effect="dark"
        formatter
        :header-cell-style="{ background: '#F7F8FA', color: '#293B59' }"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column type="index" width="100" label="序号">
        </el-table-column>
        <el-table-column prop="backupsName" align="center" label="备份名称"></el-table-column>
        <el-table-column prop="createBy" align="center" label="备份人员"></el-table-column>
        <el-table-column prop="backupsDesc" align="center" label="备注"> </el-table-column>
        <el-table-column prop="createDate" align="center" label="创建时间"> </el-table-column>
        <el-table-column fixed="right" align="center" label="操作" width="200">
          <template slot-scope="{ row }">
            <el-button type="text" size="small" @click="openModel(row)"
              >查看</el-button
            >
            <el-popconfirm
              title="删除后无法恢复,是否继续删除？"
              @onConfirm="delBackupsFun(row)"
            >
              <el-button type="text" size="small" slot="reference"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-box">
      <el-pagination
        background
        @current-change="currentAccChange"
        layout="total,prev, pager, next"
        :total="total"
      >
      </el-pagination>
    </div>

    <div class="model">
      <el-dialog
        title="验收信息"
        :visible.sync="visible"
        width="30%"
      >
        <div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="备份名称">
              <el-input v-model="form.backupsName"></el-input>
            </el-form-item>

            <el-form-item label="备注">
              <el-input
                v-model="form.backupsDesc"
                type="textarea"
                :rows="3"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="visible = false">取 消</el-button>
          <el-button type="primary" @click="saveData">保 存</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
let vm;
import {
  selectBackups,
  delBackups,
  addBackups,
  updataBackups,
} from "@/api/stsyem/backups";
export default {
  data() {
    return {
      query: {
        pageSize: 20,
        pageNumber: 1,
      },
      tableData: [],
      total: 0,
      visible: false,
      //true为新增,false为修改
      option: true,
      form: {},
    };
  },
  created() {
    vm = this;
    vm.getData();
  },
  components: {},
  methods: {
    //获取备份列表
    getData() {
      selectBackups(vm.query).then((res) => {
        if (res.code === 0) {
          vm.tableData = res.data.records;
          vm.total = res.data.total;
        } else {
          vm.tableData = [];
          vm.total = 0;
        }
      });
    },
    //删除备份
    delBackupsFun(row) {
      const { backupsId } = row;
      delScrap({ id: backupsId }).then((res) => {
        if (res.code === 0) {
          vm.getData();
          vm.$message.success(res.message);
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //新增备份
    addBackupsFun() {
      vm.option = true;
      vm.form = {};
      vm.visible = true;
    },
    currentAccChange(e) {
      vm.query.pageNumber = e;
      vm.getData();
    },
    //查看备份详细
    openModel(row) {
      vm.option = false;
      vm.form = row;
      vm.visible = true;
    },
    //保存数据
    saveData() {
      let data;
      if (vm.option) {
        //新增
        data = addBackups(vm.form);
      } else {
        //修改
        data = updataBackups(vm.form);
      }
      data.then((res) => {
        if (res.code === 0) {
          vm.getData();
          vm.$message.success(res.message);
          vm.visible = false;
        } else {
          vm.$message.error(res.message);
        }
      });
    },
  },
};
</script>