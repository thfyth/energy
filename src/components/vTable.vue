<template>
  <div class="table-template">
    <el-table
      ref="tableTemplate"
      :data="tableData"
      :row-key="tableColId"
      @selection-change="handleSelectionChange"
      element-loading-text="Loading"
      tooltip-effect="dark"
      formatter
      border
      :header-cell-style="{ background: '#F7F8FA', color: '#293B59' }"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      style="width: 100%"
    >
      <template v-for="(item, index) in tableLabel">
        <el-table-column
          v-if="index == 0 && !item.selection"
          :key="item.id"
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
          v-else-if="item.click"
          @click="getOneData"
          :width="item.width ? item.width : ''"
          :key="item.id"
          :align="item.align"
          :label="item.label"
          :fixed="item.fixed"
          :prop="item.param"
          :sortable="item.sortable ? 'custom' : false"
        >
          <template slot-scope="scope">
            <span
              class="article"
              v-if="item.render"
              @click="getOneData(scope.row)"
              >{{ item.render(scope.row) }}</span
            >
            <span class="article" v-else @click="getOneData(scope.row)">{{
              scope.row[item.param]
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :width="item.width ? item.width : ''"
          :key="item.id"
          :align="item.align"
          :label="item.label"
          :fixed="item.fixed"
          :prop="item.param"
          :sortable="item.sortable ? 'custom' : false"
        >
          <template slot-scope="scope">
            <span v-if="item.render">{{ item.render(scope.row) }} </span>
            <span v-else>
              <span v-if="scope.row[item.param]">{{
                scope.row[item.param]
              }}</span>
              <span v-else-if="scope.row[item.param] === 0">0</span>
              <span v-else>---</span>
            </span>
          </template>
        </el-table-column>
      </template>

      <el-table-column
        v-if="tableOption.label"
        :width="tableOption.width"
        :label="tableOption.label"
        fixed="right"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            v-for="(item, index) in tableOption.options"
            :key="index"
            :type="item.type"
            :icon="item.icon"
            :disabled="item.disabled"
            @click="handleButton(item.methods, scope.row)"
            size="mini"
            >{{ item.label }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="block pagination-box" v-if="isShowPage">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>



<script>
export default {
  props: {
    tableLabel: {
      type: Array,
      default: () => {
        return [];
      },
    },

    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    tableOption: {
      type: Object,
      default: () => {
        return {};
      },
    },
    currentPage: {
      type: Number,
      default: () => {
        return 1;
      },
    },
    total: {
      type: Number,
      default: () => {
        return 0;
      },
    },
    tableColId: {
      type: String,
      default: () => {
        return "id";
      },
    },
    isShowPage: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
  },

  methods: {
    //向父组件传递按钮事件
    handleButton(e, row) {
      this.$emit("handleButton", e, row);
    },
    // 向父组件传递多选事件
    handleSelectionChange(e) {
      // console.log(e);
      this.$emit("handleSelectionChange", e);
    },
    handleSizeChange(e) {
      this.$emit("handleSizeChange", e);
    },
    handleCurrentChange(e) {
      this.$emit("handleCurrentChange", e);
    },
    getOneData(e) {
      this.$emit("getOneData", e);
    },
    setStatus(e) {
      this.$emit("setStatus", e);
    },
  },
};
</script>



<style lang="scss">


/* .cell > article:after {
  height: 1px;
  content: "";
  display: block;
  border-top: 1px dotted 	Blue;
} */
</style>