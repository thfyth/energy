<template>
  <div class="mocha-main">
    <el-tabs v-model="activeName" :before-leave="handleLeave">
      <el-tab-pane label="设备验收" name="first"></el-tab-pane>
      <el-tab-pane label="台账管理" name="second">
        <div class="main">
          <div class="title-box" style="width: auto">
            <div class="title-list">
              <div class="list-box list-input">
                <el-input
                  v-model="query.equipmentName"
                  placeholder="设备名称"
                  style="width: 200px"
                  clearable
                />
                <!-- <el-input
                  v-model="query.planId"
                  placeholder="计划"
                  style="width: 200px"
                  clearable
                /> -->
              </div>
              <div class="list-box">
                <el-button
                  type="primary"
                  plain
                  icon="el-icon-query"
                  @click="gettableData"
                  >查询</el-button
                >
              </div>
            </div>
            <div class="titles-list">
              <el-button class="insert" @click="setDeviceDetails" type="primary"
                >编辑设备详情</el-button
              >
              <!-- <el-button class="insert" type="primary">设备统计表</el-button> -->
            </div>
          </div>
          <div class="table-view">
            <el-table
              :data="standingData"
              stripe
              element-loading-text="Loading"
              tooltip-effect="dark"
              formatter
              @selection-change="handleStandSelection"
              :header-cell-style="{ background: '#F7F8FA', color: '#293B59' }"
            >
              <el-table-column
                type="selection"
                width="55"
                align="center"
              ></el-table-column>
              <el-table-column type="index" width="100" label="序号">
              </el-table-column>
              <el-table-column
                prop="equipmentName"
                label="设备名称"
              ></el-table-column>

              <el-table-column
                prop="inspectCount"
                label="巡检记录"
              ></el-table-column>
              <el-table-column prop="defectCount" label="缺陷报告">
              </el-table-column>
              <el-table-column prop="maintenanceCount" label="维护保养">
              </el-table-column>
              <el-table-column prop="repairCount" label="维修记录">
              </el-table-column>
              <el-table-column prop="equipmentStatus" label="设备状态">
              </el-table-column>
              <el-table-column prop="scrapStatus" label="报废状态">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="250">
                <template slot-scope="{ row }">
                  <el-button
                    type="text"
                    size="small"
                    @click="viewStandFun1(row)"
                    >查看</el-button
                  >
                  <el-button type="text" size="small" @click="viewStandFun(row)"
                    >编辑</el-button
                  >
                  <el-popconfirm
                    title="删除后无法恢复,是否继续删除？"
                    @onConfirm="delMaintFun(row)"
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
              @current-change="currentMaintChange"
              layout="total,prev, pager, next"
              :total="standingTotal"
            >
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="设备运行" name="third"></el-tab-pane>
      <el-tab-pane label="巡检管理" name="fourth"></el-tab-pane>
      <el-tab-pane label="缺陷管理" name="five">
        <div class="main">
          <div class="title-box" style="width: auto">
            <div class="title-list">
              <div class="list-box list-input">
                <!-- <span class="title">姓名</span> -->
                <el-input
                  v-model="query.queryValue"
                  placeholder="名称"
                  style="width: 200px"
                  clearable
                />
              </div>
              <div class="list-box">
                <el-button
                  type="primary"
                  plain
                  icon="el-icon-query"
                  @click="getDefectList"
                  >查询</el-button
                >
              </div>
            </div>
            <div class="titles-list">
              <el-button class="insert" @click="addDefectFun" type="primary"
                >上传缺陷报告</el-button
              >
            </div>
          </div>
          <div class="table-view">
            <el-table
              :data="defectData"
              stripe
              element-loading-text="Loading"
              tooltip-effect="dark"
              formatter
              border
              :header-cell-style="{ background: '#F7F8FA', color: '#293B59' }"
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            >
              <el-table-column
                type="selection"
                width="55"
                align="center"
              ></el-table-column>
              <el-table-column type="index" width="100" label="序号">
              </el-table-column>
              <el-table-column prop="equipmentName" label="设备名称">
              </el-table-column>
              <el-table-column label="缺陷描述" prop="defectPosition">
              </el-table-column>
              <el-table-column label="发现时间" prop="findTime">
              </el-table-column>
              <el-table-column prop="approvalStatus" label="流程审批">
                <template slot-scope="{ row }">
                  <span v-if="row.approvalStatusName">{{row.approvalStatusName}}</span>
                  <span v-else>---</span>
                </template>
              </el-table-column>
              <el-table-column fixed="right" align="center" label="操作" width="250">
                <template slot-scope="{ row }">
                  <el-popover
                    v-if="
                      row.status == 1 && row.approvedUserId == userId
                    "
                    placement="bottom"
                    width="160"
                    trigger="click"
                  >
                    <p>对该申请进行审批</p>
                    <div style="text-align: center; margin: 0">
                      <el-button
                        size="mini"
                        type="text"
                        @click="approvalDefectFun(row, 2)"
                        >不通过</el-button
                      >
                      <el-button
                        type="primary"
                        size="mini"
                        @click="approvalDefectFun(row, 3)"
                        >通过</el-button
                      >
                    </div>
                    <el-button type="text" size="small" slot="reference"
                      >审批</el-button
                    >
                  </el-popover>
                  <el-button type="text" size="small" @click="openDefect(row)"
                    >编辑</el-button
                  >
                  <el-popconfirm
                    title="删除后无法恢复,是否继续删除？"
                    @onConfirm="delDefectFun(row)"
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
              @current-change="currentRunChange"
              layout="total,prev, pager, next"
              :total="defectTotal"
            >
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="维护保养" name="six">
        <div class="main">
          <div class="title-box" style="width: auto">
            <div class="title-list">
              <div class="list-box list-input">
                <el-input
                  v-model="query.queryValue"
                  placeholder="维护名称"
                  style="width: 200px"
                  clearable
                />
              </div>
              <div class="list-box">
                <el-button
                  type="primary"
                  plain
                  icon="el-icon-query"
                  @click="getMaintenanceList"
                  >查询</el-button
                >
              </div>
            </div>
            <div class="titles-list">
              <el-button
                class="insert"
                @click="addMaintenanceFun"
                type="primary"
                >新增保养计划</el-button
              >
              <el-button
                class="insert"
                @click="addMaintenanceRecFun"
                type="primary"
                >新增保养记录</el-button
              >
            </div>
          </div>
          <div class="table-view">
            <el-table
              :data="maintenanceData"
              stripe
              element-loading-text="Loading"
              tooltip-effect="dark"
              formatter
              @selection-change="handleRepairSelection"
              :header-cell-style="{ background: '#F7F8FA', color: '#293B59' }"
            >
              <el-table-column
                type="selection"
                width="55"
                align="center"
              ></el-table-column>
              <el-table-column type="index" width="100" label="序号">
              </el-table-column>
              <el-table-column
                prop="planName"
                label="维护计划"
              ></el-table-column>
              <el-table-column
                prop="equipmentName"
                label="设备名称"
              ></el-table-column>
              <el-table-column prop="maintenancePosition" label="维护部位">
              </el-table-column>
              <el-table-column label="最新维修记录">
                <template slot-scope="{ row }">
                  <span
                    v-text="row.recordDate"
                    class="article"
                    @click="viewMaintenance(row)"
                  ></span>
                </template>
              </el-table-column>
              <el-table-column prop="approvalStatus" label="流程审批">
                <template slot-scope="{ row }">
                  <span v-if="row.approvalStatusName">{{row.approvalStatusName}}</span>
                  <span v-else>---</span>
                </template>
              </el-table-column>
              <el-table-column fixed="right" align="center" label="操作" width="250">
                <template slot-scope="{ row }">
                  <el-popover
                    v-if="
                      row.status == 1 && row.approvedUserId == userId
                    "
                    placement="bottom"
                    width="160"
                    trigger="click"
                  >
                    <p>对该申请进行审批</p>
                    <div style="text-align: center; margin: 0">
                      <el-button
                        size="mini"
                        type="text"
                        @click="approvalMaintFun(row, 2)"
                        >不通过</el-button
                      >
                      <el-button
                        type="primary"
                        size="mini"
                        @click="approvalMaintFun(row, 3)"
                        >通过</el-button
                      >
                    </div>
                    <el-button type="text" size="small" slot="reference"
                      >审批</el-button
                    >
                  </el-popover>
                  <el-button type="text" size="small" @click="openMaintFun(row)"
                    >编辑</el-button
                  >
                  <el-popconfirm
                    title="删除后无法恢复,是否继续删除？"
                    @onConfirm="delMaintFun(row)"
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
              @current-change="currentMaintChange"
              layout="total,prev, pager, next"
              :total="maintenanceTotal"
            >
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="设备维修" name="seven">
        <div class="main">
          <div class="title-box" style="width: auto">
            <div class="title-list">
              <div class="list-box list-input">
                <el-input
                  v-model="query.queryValue"
                  placeholder="计划名称"
                  style="width: 200px"
                  clearable
                />
              </div>
              <div class="list-box">
                <el-button
                  type="primary"
                  plain
                  icon="el-icon-query"
                  @click="getRepairList"
                  >查询</el-button
                >
              </div>
            </div>
            <div class="titles-list">
              <el-button class="insert" @click="addRepairlFun" type="primary"
                >新增维修计划</el-button
              >
              <el-button
                class="insert"
                @click="addRepairRecordFun"
                type="primary"
                >新增维修记录</el-button
              >
            </div>
          </div>
          <div class="table-view">
            <el-table
              :data="repairlData"
              stripe
              element-loading-text="Loading"
              tooltip-effect="dark"
              formatter
              @selection-change="handleRepairSelection"
              :header-cell-style="{ background: '#F7F8FA', color: '#293B59' }"
            >
              <el-table-column
                type="selection"
                width="55"
                align="center"
              ></el-table-column>
              <el-table-column type="index" width="100" label="序号">
              </el-table-column>
              <el-table-column
                prop="planName"
                label="巡检计划"
              ></el-table-column>
              <el-table-column
                prop="equipmentName"
                label="设备名称"
              ></el-table-column>
              <el-table-column prop="repairType" label="维修部位">
                <template slot-scope="{ row }">
                  <span v-if="row.repairType == 1">日常维修</span>
                  <span v-if="row.repairType == 2">定期检修</span>
                  <span v-if="row.repairType == 3">故障维修</span>
                  <span v-if="row.repairType == 4">外委维修</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="repairPosition"
                label="维修部位"
              ></el-table-column>
              <el-table-column label="最新维修记录">
                <template slot-scope="{ row }">
                  <span
                    v-text="row.recordDate"
                    class="article"
                    @click="viewRecord(row)"
                  ></span>
                </template>
              </el-table-column>
              <el-table-column prop="approvalStatus" label="流程审批">
                <template slot-scope="{ row }">
                  <span v-if="row.approvalStatusName">{{row.approvalStatusName}}</span>
                  <span v-else>---</span>
                </template>
              </el-table-column>
              <el-table-column fixed="right" align="center" label="操作" width="250">
                <template slot-scope="{ row }">
                  <el-popover
                    v-if="
                      row.status == 1 && row.approvedUserId == userId
                    "
                    placement="bottom"
                    width="160"
                    trigger="click"
                  >
                    <p>对该申请进行审批</p>
                    <div style="text-align: center; margin: 0">
                      <el-button
                        size="mini"
                        type="text"
                        @click="approvalRepairFun(row, 2)"
                        >不通过</el-button
                      >
                      <el-button
                        type="primary"
                        size="mini"
                        @click="approvalRepairFun(row, 3)"
                        >通过</el-button
                      >
                    </div>
                    <el-button type="text" size="small" slot="reference"
                      >审批</el-button
                    >
                  </el-popover>
                  <el-button
                    type="text"
                    size="small"
                    @click="openRepairFun(row)"
                    >编辑</el-button
                  >
                  <el-button type="text" size="small" @click="delRepairFun(row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination-box">
            <el-pagination
              background
              @current-change="currentRepairChange"
              layout="total,prev, pager, next"
              :total="repairlTotal"
            >
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="退役报废" name="eight">
        <div class="main">
          <div class="title-box" style="width: auto">
            <div class="title-list">
              <div class="list-box list-input">
                <el-input
                  v-model="query.queryValue"
                  placeholder="计划名称"
                  style="width: 200px"
                  clearable
                />
              </div>
              <div class="list-box">
                <el-button
                  type="primary"
                  plain
                  icon="el-icon-query"
                  @click="getScrapList"
                  >查询</el-button
                >
              </div>
            </div>
            <div class="titles-list">
              <el-button class="insert" @click="addScrapFun" type="primary"
                >新增报废计划</el-button
              >
              <el-button
                class="insert"
                @click="addScrapRecordFun"
                type="primary"
                >新增报废记录</el-button
              >
            </div>
          </div>
          <div class="table-view">
            <el-table
              :data="scrapData"
              stripe
              element-loading-text="Loading"
              tooltip-effect="dark"
              formatter
              @selection-change="handleRepairSelection"
              :header-cell-style="{ background: '#F7F8FA', color: '#293B59' }"
            >
              <el-table-column
                type="selection"
                width="55"
                align="center"
              ></el-table-column>
              <el-table-column type="index" width="100" label="序号">
              </el-table-column>
              <el-table-column
                prop="planName"
                label="报废计划"
              ></el-table-column>
              <el-table-column
                prop="equipmentName"
                label="设备名称"
              ></el-table-column>
              <el-table-column
                prop="repairPosition"
                label="设备类型"
              ></el-table-column>
              <el-table-column
                prop="scrapReason"
                label="报废原因"
              ></el-table-column>

              <el-table-column label="报废退役时间">
                <template slot-scope="{ row }">
                  <span
                    v-text="row.recordDate"
                    class="article"
                    @click="viewScrapRecord(row)"
                  ></span>
                </template>
              </el-table-column>
              <el-table-column prop="approvalStatus" label="流程审批">
                <template slot-scope="{ row }">
                  <span v-if="row.approvalStatusName">{{row.approvalStatusName}}</span>
                  <span v-else>---</span>
                </template>
              </el-table-column>
              <el-table-column fixed="right" align="center" label="操作" width="250">
                <template slot-scope="{ row }">
                  <el-popover
                    v-if="
                      row.status == 1 && row.approvedUserId == userId
                    "
                    placement="bottom"
                    width="160"
                    trigger="click"
                  >
                    <p>对该申请进行审批</p>
                    <div style="text-align: center; margin: 0">
                      <el-button
                        size="mini"
                        type="text"
                        @click="approvalScrapFun(row, 2)"
                        >不通过</el-button
                      >
                      <el-button
                        type="primary"
                        size="mini"
                        @click="approvalScrapFun(row, 3)"
                        >通过</el-button
                      >
                    </div>
                    <el-button type="text" size="small" slot="reference"
                      >审批</el-button
                    >
                  </el-popover>
                  <el-button type="text" size="small" @click="openScrapFun(row)"
                    >编辑</el-button
                  >
                  <el-popconfirm
                    title="删除后无法恢复,是否继续删除？"
                    @onConfirm="delScrapFun(row)"
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
              @current-change="currentScrapChange"
              layout="total,prev, pager, next"
              :total="scrapTotal"
            >
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="能源站管理" name="ten">
        <div class="main">
          <div class="title-box" style="width: auto">
            <div class="title-list">
              <div class="list-box list-input">
                <el-input
                  v-model="query.queryValue"
                  placeholder="能源站名称"
                  style="width: 200px"
                  clearable
                />
              </div>
              <div class="list-box">
                <el-button
                  type="primary"
                  plain
                  icon="el-icon-query"
                  @click="getEnergyList"
                  >查询</el-button
                >
              </div>
            </div>
            <div class="titles-list">
              <el-button class="insert" @click="addEnergyFun" type="primary"
                >新增能源站</el-button
              >
            </div>
          </div>
          <div class="table-view">
            <el-table
              :data="energyData"
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
              <el-table-column
                prop="energyStationName"
                label="能源站名称"
              ></el-table-column>
              <el-table-column
                prop="areaName"
                label="区域名称"
              ></el-table-column>
              <el-table-column label="状态">
                <template slot-scope="{ row }">
                  <span v-if="row.status == 0">异常</span>
                  <span v-if="row.status == 1">正常</span>
                  <span v-if="row.status == 2">警告</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="createDate"
                label="创建时间"
              ></el-table-column>
              <el-table-column fixed="right" label="操作" width="200">
                <template slot-scope="{ row }">
                  <el-button
                    type="text"
                    size="small"
                    @click="openEnergyFun(row)"
                    >编辑</el-button
                  >
                  <el-popconfirm
                    title="删除后无法恢复,是否继续删除？"
                    @onConfirm="delEnergyFun(row)"
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
              @current-change="currentEnergyChange"
              layout="total,prev, pager, next"
              :total="energyTotal"
            >
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="main">
      <div v-show="activeName == 'first'">
        <div class="mocha-run">
          <div class="title-box" style="width: auto">
            <div class="title-list">
              <div class="list-box list-input">
                <!-- <span class="title">姓名</span> -->
                <el-input
                  v-model="query.equipmentName"
                  placeholder="设备名称"
                  style="width: 200px"
                  clearable
                />
              </div>
              <div class="list-box">
                <el-button
                  type="primary"
                  plain
                  icon="el-icon-query"
                  @click="getAccData"
                  >查询</el-button
                >
              </div>
            </div>
            <div class="titles-list">
              <el-button class="insert" @click="addAccept" type="primary"
                >新建验收单</el-button
              >
            </div>
          </div>
          <div class="table-view">
            <el-table
              :data="accData"
              stripe
              element-loading-text="Loading"
              tooltip-effect="dark"
              formatter
              border
              :header-cell-style="{ background: '#F7F8FA', color: '#293B59' }"
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
              style="width: 100%"
            >
              <el-table-column
                type="selection"
                width="55"
                align="center"
              ></el-table-column>
              <el-table-column type="index" width="100" label="序号">
              </el-table-column>
              <el-table-column prop="equipmentName" label="设备名称">
              </el-table-column>
              <el-table-column label="检验结果">
                <template slot-scope="{ row }">
                  <span v-if="row.inspectState == 0">不合适</span>
                  <span v-else>合适</span>
                </template>
              </el-table-column>
              <el-table-column prop="acceptDesc" label="验收描述">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="200">
                <template slot-scope="{ row }">
                  <el-button type="text" size="small" @click="openModeAcc(row)"
                    >编辑</el-button
                  >
                  <el-button type="text" size="small" @click="delAccFun(row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination-box">
            <el-pagination
              background
              @current-change="currentAccChange"
              layout="total,prev, pager, next"
              :total="accTotal"
            >
            </el-pagination>
          </div>
        </div>
      </div>
      <div v-show="activeName == 'third'">
        <div class="mocha-run">
          <div class="title-box" style="width: auto">
            <div class="title-list">
              <div class="list-box list-input">
                <!-- <span class="title">姓名</span> -->
                <el-input
                  v-model="query.queryValue"
                  placeholder="设备名称"
                  style="width: 200px"
                  clearable
                />
              </div>
              <div class="list-box">
                <el-button
                  type="primary"
                  plain
                  icon="el-icon-query"
                  @click="gettableData"
                  >查询</el-button
                >
              </div>
            </div>
            <div class="titles-list">
              <el-button class="insert" @click="addRun" type="primary"
                >新增</el-button
              >
            </div>
          </div>
          <div class="table-view">
            <el-table
              :data="runData"
              stripe
              element-loading-text="Loading"
              tooltip-effect="dark"
              formatter
              border
              :header-cell-style="{ background: '#F7F8FA', color: '#293B59' }"
              :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            >
              <el-table-column
                type="selection"
                width="55"
                align="center"
              ></el-table-column>
              <el-table-column type="index" width="100" label="序号">
              </el-table-column>
              <el-table-column prop="equipmentName" label="设备名称">
              </el-table-column>
              <el-table-column label="运行状态">
                <template slot-scope="{ row }">
                  <span>{{ row.runingStatus }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="approvalStatus" label="流程审批">
                <template slot-scope="{ row }">
                  <span v-if="row.approvalStatusName">{{row.approvalStatusName}}</span>
                  <span v-else>---</span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" width="250">
                <template slot-scope="{ row }">
                  <el-popover
                    v-if="
                      row.approvalStatus == 1 && row.approvalUserId == userId
                    "
                    placement="bottom"
                    width="160"
                    trigger="click"
                  >
                    <p>对该申请进行审批</p>
                    <div style="text-align: center; margin: 0">
                      <el-button
                        size="mini"
                        type="text"
                        @click="approvalEquFun(row, 2)"
                        >不通过</el-button
                      >
                      <el-button
                        type="primary"
                        size="mini"
                        @click="approvalEquFun(row, 3)"
                        >通过</el-button
                      >
                    </div>
                    <el-button type="text" size="small" slot="reference"
                      >审批</el-button
                    >
                  </el-popover>
                  <el-button type="text" size="small" @click="openModeRun(row)"
                    >编辑</el-button
                  >
                  <el-button type="text" size="small" @click="delRunFun(row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination-box">
            <el-pagination
              background
              @current-change="currentRunChange"
              layout="total,prev, pager, next"
              :total="runTotal"
            >
            </el-pagination>
          </div>
        </div>
      </div>
      <div v-show="activeName == 'fourth'">
        <div class="mocha-run">
          <div class="title-box" style="width: auto">
            <div class="title-list">
              <div class="list-box list-input">
                <el-input
                  v-model="query.queryValue"
                  placeholder="计划名称"
                  style="width: 200px"
                  clearable
                />
              </div>
              <div class="list-box">
                <el-button
                  type="primary"
                  plain
                  icon="el-icon-query"
                  @click="getInspectplanList"
                  >查询</el-button
                >
              </div>
            </div>
            <div class="titles-list">
              <el-button class="insert" @click="addInsp" type="primary"
                >新增巡检计划</el-button
              >
              <el-button class="insert" @click="addRecordFun" type="primary"
                >新增巡检记录</el-button
              >
            </div>
          </div>
          <div class="table-view">
            <el-table
              :data="inspData"
              stripe
              element-loading-text="Loading"
              tooltip-effect="dark"
              formatter
              @selection-change="handleRepairSelection"
              :header-cell-style="{ background: '#F7F8FA', color: '#293B59' }"
            >
              <el-table-column
                type="selection"
                width="55"
                align="center"
              ></el-table-column>
              <el-table-column type="index" width="100" label="序号">
              </el-table-column>
              <el-table-column
                prop="planName"
                label="巡检计划"
              ></el-table-column>
              <el-table-column
                prop="equipmentName"
                label="设备名称"
              ></el-table-column>
              <el-table-column label="巡检周期" prop="inspectCycle">
              </el-table-column>
              <el-table-column
                prop="inspectPosition"
                label="检查部位"
              ></el-table-column>
              <el-table-column prop="inspectDate" label="最新巡检记录">
                <template slot-scope="{ row }">
                  <span
                    v-text="row.inspectDate"
                    class="article"
                    @click="viewInspectCycle(row)"
                  ></span>
                </template>
              </el-table-column>
              <el-table-column prop="approvalStatus" label="流程审批">
                <template slot-scope="{ row }">
                  <span v-if="row.approvalStatusName">{{row.approvalStatusName}}</span>
                  <span v-else>---</span>
                </template>
              </el-table-column>
              <!-- <el-table-column label="审批状态">
                <template slot-scope="{ row }">
                  <span v-if="row.status == 0">异常</span>
                  <span v-else>正常</span>
                </template>
              </el-table-column> -->
              <el-table-column fixed="right" label="操作" width="250">
                <template slot-scope="{ row }">
                  <el-popover
                    v-if="
                      row.status == 1 && row.approvedUserId == userId
                    "
                    placement="bottom"
                    width="160"
                    trigger="click"
                  >
                    <p>对该申请进行审批</p>
                    <div style="text-align: center; margin: 0">
                      <el-button
                        size="mini"
                        type="text"
                        @click="approvalInspFun(row, 2)"
                        >不通过</el-button
                      >
                      <el-button
                        type="primary"
                        size="mini"
                        @click="approvalInspFun(row, 3)"
                        >通过</el-button
                      >
                    </div>
                    <el-button type="text" size="small" slot="reference"
                      >审批</el-button
                    >
                  </el-popover>
                  <el-button type="text" size="small" @click="openModeInsp(row)"
                    >编辑</el-button
                  >
                  <el-button type="text" size="small" @click="delInspFun(row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination-box">
            <el-pagination
              background
              @current-change="currentInspChange"
              layout="total,prev, pager, next"
              :total="inspTotal"
            >
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="block pagination-box">
      <el-pagination
        @size-change="runPage"
        @current-change="runSize"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div> -->
    <div class="model">
      <!-- 运行策略 -->
      <el-dialog
        title="运行策略"
        :visible.sync="runVisible"
        width="30%"
        :before-close="runClose"
      >
        <div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="设备编号">
              <el-autocomplete
                v-model="form.equipmentCode"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item label="设备名称">
              <el-input v-model="form.equipmentName" disabled></el-input>
            </el-form-item>
            <el-form-item label="运行状态">
              <el-input v-model="form.runingStatus"></el-input>
            </el-form-item>
            <el-form-item label="运行详情">
              <el-input v-model="form.runingDetail"></el-input>
            </el-form-item>
            <el-form-item label="处理内容">
              <el-input
                v-model="form.dealContent"
                type="textarea"
                :rows="3"
              ></el-input>
            </el-form-item>
            <el-form-item label="开始时间">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.startTime"
                style="width: 100%"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                type="date"
                placeholder="结束时间"
                v-model="form.endTime"
                style="width: 100%"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="审批人">
              <el-select
                v-model="form.approvalUserId"
                placeholder="审批人"
              >
                <el-option
                  v-for="item in empOptions"
                  :key="item.userId"
                  :label="item.name"
                  :value="item.userId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="runVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveRunEqu">保 存</el-button>
          <el-button type="primary" @click="submitRunEqu">提 交</el-button>
        </span>
      </el-dialog>
      <!-- 验收信息 -->
      <el-dialog
        title="验收信息"
        :visible.sync="accVisible"
        width="30%"
        :before-close="runClose"
      >
        <div>
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="设备库">
              <el-row>
                <el-col :span="12">
                  <el-select
                    v-model="form.equipmentLibId"
                    placeholder="设备库"
                  >
                    <el-option
                      v-for="item in libOptions"
                      :key="item.equipmentLibId"
                      :label="item.equipmentLibName"
                      :value="item.equipmentLibId"
                    >
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="12">
                  <el-button @click="libVisible = true">新增设备库</el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="设备类别">
              <el-select
                v-model="equipmentType"
                placeholder="请选择设备类别"
                @change="setChangeSelect"
                style="width: 100%"
                multiple
              >
                <el-option
                  v-for="item in equipmentTypeList"
                  :key="item.typeId"
                  :label="item.typeName"
                  :value="item.typeCode"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备编号">
              <el-input disabled v-model="form.equipmentCode"></el-input>
            </el-form-item>
            <el-form-item label="设备名称">
              <el-input v-model="form.equipmentName"></el-input>
            </el-form-item>
            <el-form-item label="设备型号">
              <el-select
                v-model="form.equipmentType"
                placeholder="请选择设备型号"
              >
                <el-option
                  v-for="item in accType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="能源站">
              <el-select
                v-model="form.energyStationId"
                placeholder="请选择能源站"
              >
                <el-option
                  v-for="item in energyData"
                  :key="item.energyStationId"
                  :label="item.energyStationName"
                  :value="item.energyStationId"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="购价">
              <el-input v-model.number="form.equipmentPrice"></el-input>
            </el-form-item>
            <el-form-item label="运杂费">
              <el-input v-model.number="form.otherPrice"></el-input>
            </el-form-item>
            <el-form-item label="质检项目">
              <div
                v-for="(item, index) in form.qualityTestingList"
                :key="index"
              >
                <el-input v-model="item.descInfo" @change="setData"></el-input>
              </div>
            </el-form-item>

            <el-form-item label="验收描述">
              <el-input
                v-model="form.acceptDesc"
                type="textarea"
                :rows="3"
              ></el-input>
            </el-form-item>
            <el-form-item label="检验结果">
              <el-select
                v-model="form.inspectState"
                placeholder="检验结果"
              >
                <el-option
                  v-for="item in isAdopt"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="accVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveRunAcc">保 存</el-button>
        </span>
      </el-dialog>
      <!-- 验收库信息 -->
      <el-dialog
        title="验收库信息"
        :visible.sync="libVisible"
        width="20%"
        :before-close="runClose"
      >
        <div>
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="设备库名称">
              <el-input v-model="form.equipmentLibName"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="libVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEquLib">保 存</el-button>
        </span>
      </el-dialog>
      <!-- 巡检计划 -->
      <el-dialog
        title="巡检计划"
        :visible.sync="inspVisible"
        width="30%"
        :before-close="runClose"
      >
        <div>
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="巡检计划">
              <el-input v-model="form.planName"></el-input>
            </el-form-item>
            <el-form-item label="设备库">
              <el-select
                v-model="form.equipmentLibId"
                placeholder="设备库"
              >
                <el-option
                  v-for="item in libOptions"
                  :key="item.equipmentLibId"
                  :label="item.equipmentLibName"
                  :value="item.equipmentLibId"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备编号">
              <el-autocomplete
                v-model="form.equipmentCode"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item label="设备名称">
              <el-input v-model="form.equipmentName" disabled></el-input>
            </el-form-item>
            <el-form-item label="巡检周期">
              <el-select v-model="form.inspectCycle" placeholder="巡检周期">
                <el-option
                  v-for="item in inspType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="检查部位">
              <el-input v-model="form.inspectPosition"></el-input>
            </el-form-item>
            <el-form-item label="审批人">
              <el-select
                v-model="form.approvedUserId"
                placeholder="审批人"
              >
                <el-option
                  v-for="item in empOptions"
                  :key="item.userId"
                  :label="item.name"
                  :value="item.userId"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="计划详情">
              <el-input
                v-model="form.planDesc"
                type="textarea"
                :rows="3"
              ></el-input>
            </el-form-item>
            <el-form-item label="文件上传">
              <div v-if="form.filePath">
                <el-popconfirm
                  title="确认删除文件?"
                  @onConfirm="delFileFun(form.filePath)"
                >
                  <el-button slot="reference">删除文件</el-button>
                </el-popconfirm>
              </div>
              <el-upload
                v-else
                action="http://47.92.201.212:6004/api/admin/file/uploadFile"
                :show-file-list="false"
                :on-success="handleUrl"
                name="files"
                :headers="headersData"
              >
                <el-button>上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="inspVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveInsp">保 存</el-button>
          <el-button type="primary" @click="submitInsp">提 交</el-button>
        </span>
      </el-dialog>
      <!-- 巡检记录 -->
      <el-dialog
        title="巡检记录"
        :visible.sync="repairVisible"
        width="30%"
        :before-close="runClose"
      >
        <div>
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="巡检时间">
              <el-date-picker
                v-model="form.inspectDate"
                format="yyyy-MM-dd  HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="检查部位">
              <el-input v-model="form.inspectPosition"></el-input>
            </el-form-item>
            <el-form-item label="检查发现">
              <el-input v-model="form.inspectDiscover"></el-input>
            </el-form-item>
            <el-form-item label="处理描述">
              <el-input v-model="form.handleDesc"></el-input>
            </el-form-item>
            <el-form-item label="上报内容">
              <el-input v-model="form.reportDesc"></el-input>
            </el-form-item>
            <el-form-item label="维修上报">
              <el-select v-model="form.isRepair" placeholder="请选择是否上报">
                <el-option
                  v-for="item in repairType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="附件上传">
              <div v-if="form.filePath">
                <el-popconfirm
                  title="确认删除文件?"
                  @onConfirm="delFileFun(form.filePath)"
                >
                  <el-button slot="reference">删除文件</el-button>
                </el-popconfirm>
              </div>
              <el-upload
                v-else
                action="http://47.92.201.212:6004/api/admin/file/uploadFile"
                :show-file-list="false"
                :on-success="handleUrl"
                name="files"
                :headers="headersData"
              >
                <el-button>上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="repairVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveInspPlan">保 存</el-button>
        </span>
      </el-dialog>
      <!-- 巡检记录详细 -->
      <el-dialog
        title="巡检记录详细"
        :visible.sync="repairVisibleInfo"
        width="30%"
        :before-close="runClose"
      >
        <div>
          <template v-for="item in repairListInfo">
            <span
              class="span-active"
              @click="getPairInfo(item)"
              :key="item.recordId"
              v-text="item.inspectDate"
            ></span>
          </template>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="repairVisibleInfo = false"
            >退 出</el-button
          >
        </span>
      </el-dialog>
      <!-- 缺陷报告 -->
      <el-dialog
        title="巡检记录"
        :visible.sync="defectVisible"
        width="30%"
        :before-close="runClose"
      >
        <div>
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="设备编号">
              <el-autocomplete
                v-model="form.equipmentCode"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item label="设备名称">
              <el-input v-model="form.equipmentName" disabled></el-input>
            </el-form-item>
            <el-form-item label="缺陷描述">
              <el-input v-model="form.defectPosition"></el-input>
            </el-form-item>
            <el-form-item label="发现时间">
              <el-date-picker
                v-model="form.findTime"
                format="yyyy-MM-dd  HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="审批人">
              <el-select
                v-model="form.approvedUserId"
                placeholder="审批人"
              >
                <el-option
                  v-for="item in empOptions"
                  :key="item.userId"
                  :label="item.name"
                  :value="item.userId"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="缺陷报告详情">
              <el-input
                v-model="form.reportDetail"
                type="textarea"
                :rows="3"
              ></el-input>
            </el-form-item>

            <el-form-item label="附件上传">
              <div v-if="form.filePath">
                <el-popconfirm
                  title="确认删除文件?"
                  @onConfirm="delFileFun(form.filePath)"
                >
                  <el-button slot="reference">删除文件</el-button>
                </el-popconfirm>
              </div>
              <el-upload
                v-else
                action="http://47.92.201.212:6004/api/admin/file/uploadFile"
                :show-file-list="false"
                :on-success="handleUrl"
                name="files"
                :headers="headersData"
              >
                <el-button>上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="defectVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveDefect">保 存</el-button>
          <el-button type="primary" @click="submitDefect">提 交</el-button>
        </span>
      </el-dialog>
      <!-- 维修计划 -->
      <el-dialog
        title="维修计划"
        :visible.sync="repairlVisible"
        width="30%"
        :before-close="runClose"
      >
        <div>
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="计划名称">
              <el-input v-model="form.planName"></el-input>
            </el-form-item>
            <el-form-item label="设备库">
              <el-select v-model="form.equipmentId"  @change="selectEquList" placeholder="设备库">
                <el-option
                  v-for="item in libOptions"
                  :key="item.equipmentLibId"
                  :label="item.equipmentLibName"
                  :value="item.equipmentLibId"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备编号">
              <el-autocomplete
                v-model="form.equipmentCode"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                @select="selectEquName"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item label="设备名称">
              <el-input v-model="form.equipmentName" disabled></el-input>
            </el-form-item>
            <el-form-item label="维修类型">
              <el-select v-model="form.repairType" placeholder="维修类型">
                <el-option
                  v-for="item in repairList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="维修部位">
              <el-input v-model="form.repairPosition"></el-input>
            </el-form-item>
            <el-form-item label="审批人">
              <el-select
                v-model="form.approvedUserId"
                placeholder="审批人"
              >
                <el-option
                  v-for="item in empOptions"
                  :key="item.userId"
                  :label="item.name"
                  :value="item.userId"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="计划详情">
              <el-input
                v-model="form.planDesc"
                type="textarea"
                :rows="3"
              ></el-input>
            </el-form-item>
            <el-form-item label="文件上传">
              <div v-if="form.filePath">
                <el-popconfirm
                  title="确认删除文件?"
                  @onConfirm="delFileFun(form.filePath)"
                >
                  <el-button slot="reference">删除文件</el-button>
                </el-popconfirm>
              </div>
              <el-upload
                v-else
                action="http://47.92.201.212:6004/api/admin/file/uploadFile"
                :show-file-list="false"
                :on-success="handleUrl"
                name="files"
                :headers="headersData"
              >
                <el-button>上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="repairlVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveRepairl">保 存</el-button>
          <el-button type="primary" @click="submitRepairl">提 交</el-button>
        </span>
      </el-dialog>
      <!-- 维修记录 -->
      <el-dialog
        title="维修记录"
        :visible.sync="repairRepVisible"
        width="30%"
        :before-close="runClose"
      >
        <div>
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="维修时间">
              <el-date-picker
                v-model="form.repairDate"
                format="yyyy-MM-dd  HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="维修部位">
              <el-input v-model="form.repairPosition"></el-input>
            </el-form-item>
            <el-form-item label="维修原因">
              <el-input v-model="form.faultReason"></el-input>
            </el-form-item>
            <el-form-item label="维修内容">
              <el-input v-model="form.repairDesc"></el-input>
            </el-form-item>

            <el-form-item label="详细信息">
              <el-input
                v-model="form.detailDesc"
                type="textarea"
                :rows="3"
              ></el-input>
            </el-form-item>
            <el-form-item label="维修人员">
              <el-input v-model="form.repairer"></el-input>
            </el-form-item>
            <el-form-item label="维修费用">
              <el-input v-model="form.repairCost"></el-input>
            </el-form-item>
            <el-form-item label="审批人">
              <el-select v-model="form.approvedUserId" placeholder="审批人">
                <el-option
                  v-for="item in empOptions"
                  :key="item.userId"
                  :label="item.name"
                  :value="item.userId"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="附件上传">
              <div v-if="form.filePath">
                <el-popconfirm
                  title="确认删除文件?"
                  @onConfirm="delFileFun(form.filePath)"
                >
                  <el-button slot="reference">删除文件</el-button>
                </el-popconfirm>
              </div>
              <el-upload
                v-else
                action="http://47.92.201.212:6004/api/admin/file/uploadFile"
                :show-file-list="false"
                :on-success="handleUrl"
                name="files"
                :headers="headersData"
              >
                <el-button>上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="repairRepVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveRepairRep">保 存</el-button>
        </span>
      </el-dialog>
      <!-- 维修记录信息详细 -->
      <el-dialog
        title="维修记录信息"
        :visible.sync="repairRecordVisibleInfo"
        width="30%"
        :before-close="runClose"
      >
        <div>
          <template v-for="item in repairrecordListInfo">
            <span
              class="span-active"
              @click="getRepRecrdInfo(item)"
              :key="item.recordId"
              v-text="item.repairDate"
            ></span>
          </template>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="repairRecordVisibleInfo = false"
            >退 出</el-button
          >
        </span>
      </el-dialog>
      <!-- 报废计划 -->
      <el-dialog
        title="报废计划"
        :visible.sync="scrapVisible"
        width="30%"
        :before-close="runClose"
      >
        <div>
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="计划名称">
              <el-input v-model="form.planName"></el-input>
            </el-form-item>
            <el-form-item label="设备库">
              <el-select
                v-model="form.equipmentLibId"
                placeholder="设备库"
                @change="selectEquList"
              >
                <el-option
                  v-for="item in libOptions"
                  :key="item.equipmentLibId"
                  :label="item.equipmentLibName"
                  :value="item.equipmentLibId"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备编号">
              <!-- <el-autocomplete
                v-model="form.equipmentCode"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                @select="handleSelect"
              ></el-autocomplete> -->
              <el-select
                v-model="form.equipmentCode"
                placeholder="设备"
                @change="selectEquName"
              >
                <el-option
                  v-for="item in equList"
                  :key="item.equipmentId"
                  :label="item.equipmentName"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备名称">
              <el-input v-model="form.equipmentName" disabled></el-input>
            </el-form-item>
            <el-form-item label="报废原因">
              <el-input v-model="form.scrapReason"></el-input>
            </el-form-item>
            <el-form-item label="审批人">
              <el-select
                v-model="form.approvedUserId"
                placeholder="审批人"
              >
                <el-option
                  v-for="item in empOptions"
                  :key="item.userId"
                  :label="item.name"
                  :value="item.userId"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="计划详情">
              <el-input
                v-model="form.planDesc"
                type="textarea"
                :rows="3"
              ></el-input>
            </el-form-item>
            <el-form-item label="文件上传">
              <div v-if="form.filePath">
                <el-popconfirm
                  title="确认删除文件?"
                  @onConfirm="delFileFun(form.filePath)"
                >
                  <el-button slot="reference">删除文件</el-button>
                </el-popconfirm>
              </div>
              <el-upload
                v-else
                action="http://47.92.201.212:6004/api/admin/file/uploadFile"
                :show-file-list="false"
                :on-success="handleUrl"
                name="files"
                :headers="headersData"
              >
                <el-button>上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="scrapVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveScrap">保 存</el-button>
          <el-button type="primary" @click="submitScrap">提 交</el-button>
        </span>
      </el-dialog>
      <!-- 报废记录信息 -->
      <el-dialog
        title="报废记录"
        :visible.sync="scrapRecordVisible"
        width="30%"
        :before-close="runClose"
      >
        <div>
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="报废时间">
              <el-date-picker
                v-model="form.scrapDate"
                format="yyyy-MM-dd  HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="详细信息">
              <el-input
                v-model="form.detailDesc"
                type="textarea"
                :rows="3"
              ></el-input>
            </el-form-item>
            <el-form-item label="审批人">
              <el-select v-model="form.approvedUserId" placeholder="审批人">
                <el-option
                  v-for="item in empOptions"
                  :key="item.userId"
                  :label="item.name"
                  :value="item.userId"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="附件上传">
              <div v-if="form.filePath">
                <el-popconfirm
                  title="确认删除文件?"
                  @onConfirm="delFileFun(form.filePath)"
                >
                  <el-button slot="reference">删除文件</el-button>
                </el-popconfirm>
              </div>
              <el-upload
                v-else
                action="http://47.92.201.212:6004/api/admin/file/uploadFile"
                :show-file-list="false"
                :on-success="handleUrl"
                name="files"
                :headers="headersData"
              >
                <el-button>上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="scrapRecordVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveScrapRecord">保 存</el-button>
        </span>
      </el-dialog>
      <!-- 报废记录 -->
      <el-dialog
        title="报废记录"
        :visible.sync="scrapRecordInfoVisible"
        width="30%"
        :before-close="runClose"
      >
        <div>
          <template v-for="item in scrapRecordInfoList">
            <span
              class="span-active"
              @click="getScrapRecord(item)"
              :key="item.recordId"
              v-text="item.scrapDate"
            ></span>
          </template>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="scrapRecordInfoVisible = false"
            >退 出</el-button
          >
        </span>
      </el-dialog>
      <!-- 维护保养计划 -->
      <el-dialog
        title="维护保养计划"
        :visible.sync="maintenanceVisible"
        width="30%"
        :before-close="runClose"
      >
        <div>
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="计划名称">
              <el-input v-model="form.planName"></el-input>
            </el-form-item>
            <el-form-item label="设备库">
              <el-select
                v-model="form.equipmentLibId"
                placeholder="设备库"
                @change="selectEquList"
              >
                <el-option
                  v-for="item in libOptions"
                  :key="item.equipmentLibId"
                  :label="item.equipmentLibName"
                  :value="item.equipmentLibId"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备编号">
              <el-select
                v-model="form.equipmentCode"
                placeholder="设备"
                @change="selectEquName"
              >
                <el-option
                  v-for="item in equList"
                  :key="item.equipmentId"
                  :label="item.equipmentName"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备名称">
              <el-input v-model="form.equipmentName" disabled></el-input>
            </el-form-item>
            <el-form-item label="取得时间">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="form.getTime"
                style="width: 100%"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="耐用年限">
              <el-input v-model.number="form.equipmentLife"></el-input>
            </el-form-item>
            <el-form-item label="已使用年限">
              <el-input v-model.number="form.useTime"></el-input>
            </el-form-item>
            <el-form-item label="巡检周期">
              <el-select v-model="form.maintenanceCycle" placeholder="巡检周期">
                <el-option
                  v-for="item in inspType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="维保部位">
              <el-input v-model="form.maintenancePosition"></el-input>
            </el-form-item>
            <el-form-item label="审批人">
              <el-select
                v-model="form.approvedUserId"
                placeholder="审批人"
              >
                <el-option
                  v-for="item in empOptions"
                  :key="item.userId"
                  :label="item.name"
                  :value="item.userId"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="计划详情">
              <el-input
                v-model="form.planDesc"
                type="textarea"
                :rows="3"
              ></el-input>
            </el-form-item>
            <el-form-item label="文件上传">
              <div v-if="form.filePath">
                <el-popconfirm
                  title="确认删除文件?"
                  @onConfirm="delFileFun(form.filePath)"
                >
                  <el-button slot="reference">删除文件</el-button>
                </el-popconfirm>
              </div>
              <el-upload
                v-else
                action="http://47.92.201.212:6004/api/admin/file/uploadFile"
                :show-file-list="false"
                :on-success="handleUrl"
                name="files"
                :headers="headersData"
              >
                <el-button>上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="maintenanceVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveMaintenance">保 存</el-button>
          <el-button type="primary" @click="submitMaintenance">提 交</el-button>
        </span>
      </el-dialog>
      <!-- 维护保养信息 -->
      <el-dialog
        title="维护保养信息"
        :visible.sync="maintenanceRecordVisible"
        width="30%"
        :before-close="runClose"
      >
        <div>
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="维护时间">
              <el-date-picker
                v-model="form.maintenanceDate"
                format="yyyy-MM-dd  HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="发起途径">
              <el-select v-model="form.maintenanceType" placeholder="发起途径">
                <el-option
                  v-for="item in maintenanceList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="维护部位">
              <el-input v-model="form.maintenancePosition"></el-input>
            </el-form-item>
            <el-form-item label="故障原因">
              <el-input v-model="form.faultReason"></el-input>
            </el-form-item>
            <el-form-item label="维护成本">
              <el-input v-model="form.maintenanceCost"></el-input>
            </el-form-item>
            <el-form-item label="维护情况">
              <el-input v-model="form.maintenanceDesc"></el-input>
            </el-form-item>
            <el-form-item label="详细信息">
              <el-input
                v-model="form.detailDesc"
                type="textarea"
                :rows="3"
              ></el-input>
            </el-form-item>
            <el-form-item label="审批人">
              <el-select v-model="form.approvedUserId" placeholder="审批人">
                <el-option
                  v-for="item in empOptions"
                  :key="item.userId"
                  :label="item.name"
                  :value="item.userId"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="附件上传">
              <div v-if="form.filePath">
                <el-popconfirm
                  title="确认删除文件?"
                  @onConfirm="delFileFun(form.filePath)"
                >
                  <el-button slot="reference">删除文件</el-button>
                </el-popconfirm>
              </div>
              <el-upload
                v-else
                action="http://47.92.201.212:6004/api/admin/file/uploadFile"
                :show-file-list="false"
                :on-success="handleUrl"
                name="files"
                :headers="headersData"
              >
                <el-button>上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="maintenanceRecordVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveMaintRecord">保 存</el-button>
        </span>
      </el-dialog>
      <!-- 维护保养记录 -->
      <el-dialog
        title="维护保养记录"
        :visible.sync="maintenanceRecordInfoVisible"
        width="30%"
        :before-close="runClose"
      >
        <div>
          <template v-for="item in maintenanceRecordInfoList">
            <span
              class="span-active"
              @click="getMaintRecord(item)"
              :key="item.recordId"
              v-text="item.maintenanceDate"
            ></span>
          </template>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="maintenanceRecordInfoVisible = false"
            >退 出</el-button
          >
        </span>
      </el-dialog>
      <!-- 台账信息 -->
      <el-dialog
        title="台账信息"
        :visible.sync="standingVisible"
        width="40%"
        :before-close="runClose"
      >
        <div>
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="设备编号">
              <el-input v-model="form.equipmentCode" disabled></el-input>
            </el-form-item>
            <!-- <el-form-item label="设备编号">
              <el-select
                v-model="form.equipmentCode"
                placeholder="设备"
                @change="selectEquName"
              >
                <el-option
                  v-for="item in equList"
                  :key="item.equipmentId"
                  :label="item.equipmentName"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="设备名称">
              <el-input v-model="form.equipmentName" disabled></el-input>
            </el-form-item>
            <el-form-item label="规格型号">
              <el-input v-model="form.model"></el-input>
            </el-form-item>
            <el-form-item label="生产厂家">
              <el-input v-model="form.manufacturer"></el-input>
            </el-form-item>
            <el-form-item label="制造日期">
              <el-date-picker
                v-model="form.markDate"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="购入(安装时间)">
              <el-date-picker
                v-model="form.buyDate"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="现存/安装位置">
              <el-input v-model="form.installPosition"></el-input>
            </el-form-item>
            <el-form-item label="技术参数">
              <el-button type="primary" @click="viewParam">编辑</el-button>
            </el-form-item>
            <el-form-item label="运行状态">
              <el-select v-model="form.runingStatus" placeholder="运行状态">
                <el-option
                  v-for="item in statusType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备状态">
              <el-select v-model="form.equipmentStatus" placeholder="设备状态">
                <el-option
                  v-for="item in equipmentList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-button @click="getRunStatus" type="primary"
                >自动校验</el-button
              >
            </el-form-item>
            <el-form-item label="保养要求">
              <el-input v-model="form.maintainCondition"></el-input>
            </el-form-item>
            <el-form-item label="价格">
              <el-input
                v-model="form.equipmentPrice"
                placeholder="购入价格"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <div v-if="isView">
            <el-button type="primary" @click="standingVisible = false"
              >退 出</el-button
            >
          </div>
          <div v-else>
            <el-button @click="standingVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveStanding">保 存</el-button>
          </div>
        </span>
      </el-dialog>
      <!-- 台账信息技术参数 -->
      <el-dialog
        title="编辑详细参数"
        :visible.sync="standingInfoVisible"
        width="80%"
      >
        <div>
          <table
            align="center"
            cellspacing="0"
            border="1"
            class="table-defalut"
            style="width: 100%; table-layout: fixed"
          >
            <tr>
              <th>资产编号</th>
              <td>
                <el-input v-model="form.assetsCode"></el-input>
              </td>
              <th>型号</th>
              <td>
                <el-input v-model="form.equipmentType"></el-input>
              </td>
              <th>制造厂</th>
              <td>
                <el-input v-model="form.manufacturer"></el-input>
              </td>
              <th>国别</th>
              <td>
                <el-input v-model="form.differentCountries"></el-input>
              </td>
              <th>出厂编号</th>
              <td>
                <el-input v-model="form.deliveryCode"></el-input>
              </td>
            </tr>
            <tr>
              <th>设备名称</th>
              <td>
                <el-input v-model="form.equipmentName"></el-input>
              </td>
              <th>规格</th>
              <td>
                <el-input v-model="form.model"></el-input>
              </td>
              <th>出厂日期</th>
              <td>
                <el-date-picker
                  v-model="form.deliveryDate"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </td>
              <th>到站日期</th>
              <td>
                <el-date-picker
                  v-model="form.arriveStationDate"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </td>
              <th>启用日期</th>
              <td>
                <el-date-picker
                  v-model="form.eableDate"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </td>
            </tr>
            <tr>
              <th>参数(机,电)</th>
              <td colspan="2">
                <el-input v-model="form.electromechanical"></el-input>
              </td>
              <th>重量(吨)</th>
              <td>
                <el-input v-model="form.weight"></el-input>
              </td>
              <th>安装地点</th>
              <td colspan="2">
                <el-input v-model="form.installPosition"></el-input>
              </td>
              <th>原值(元)</th>
              <td>
                <el-input v-model="form.equipmentPrice"></el-input>
              </td>
            </tr>
            <tr>
              <th colspan="3">附属点击总容量:千瓦</th>
              <td>
                <el-input
                  v-model.number="form.otherElectromechanical"
                ></el-input>
              </td>
              <th colspan="6">附件及专用工具</th>
            </tr>
            <tr>
              <th>型号</th>
              <th>容量</th>
              <th>安装部位</th>
              <th>台数</th>
              <th colspan="2">名称</th>
              <th colspan="2">型号规格</th>
              <th colspan="2">数量</th>
            </tr>
            <tr rowspan="9">
              <td colspan="4">
                <table
                  class="table-defalut"
                  align="center"
                  cellspacing="0"
                  border="1"
                  style="width: 100%; table-layout: fixed"
                >
                  <template v-for="(item, index) in form.electricCapacityList">
                    <tr :key="index">
                      <td>
                        <el-input v-model="item.model"></el-input>
                      </td>
                      <td>
                        <el-input v-model="item.capacity"></el-input>
                      </td>
                      <td>
                        <el-input v-model="item.installPost"></el-input>
                      </td>
                      <td>
                        <el-input v-model.number="item.installNum"></el-input>
                      </td>
                    </tr>
                  </template>
                </table>
                <table
                  class="table-defalut"
                  align="center"
                  cellspacing="0"
                  border="1"
                  style="width: 100%; table-layout: fixed"
                >
                  <tr>
                    <th colspan="4">技术参数</th>
                  </tr>
                  <tr>
                    <th colspan="2">项目</th>
                    <th colspan="2">技术指标</th>
                  </tr>
                  <template
                    v-for="(item, index) in form.technicalParameterList"
                  >
                    <tr :key="index">
                      <td colspan="2">
                        <el-input v-model="item.projectName"></el-input>
                      </td>
                      <td colspan="2">
                        <el-input v-model="item.technicalIndex"></el-input>
                      </td>
                    </tr>
                  </template>
                </table>
              </td>
              <td colspan="6">
                <table
                  class="table-defalut"
                  align="center"
                  cellspacing="0"
                  border="1"
                  style="width: 100%; table-layout: fixed"
                >
                  <template v-for="(item, index) in form.specialToolsList">
                    <tr :key="index">
                      <td colspan="2">
                        <el-input v-model="item.toolsName"></el-input>
                      </td>
                      <td colspan="2">
                        <el-input v-model="item.toolsModel"></el-input>
                      </td>
                      <td colspan="2">
                        <el-input v-model="item.toolsNum"></el-input>
                      </td>
                    </tr>
                  </template>
                </table>
              </td>
            </tr>
            <tr>
              <th colspan="2">大修理完工日期</th>
              <template v-for="(item, index) in form.repairDateList">
                <td colspan="2" :key="index">
                  <el-date-picker
                    v-model="item.dateValue"
                    format="yyyy年MM月dd日"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="年  月  日"
                  >
                  </el-date-picker>
                </td>
              </template>
            </tr>
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
          <template v-if="standStaus">
            <el-button type="primary" @click="standingInfoVisible = false"
              >保 存</el-button
            >
          </template>
          <template v-else>
            <el-button @click="standingInfoVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveStanding">确定</el-button>
          </template>
        </span>
      </el-dialog>
      <!-- 能源站管理 -->
      <el-dialog
        title="能源站信息"
        :visible.sync="energyVisible"
        width="30%"
        :before-close="runClose"
      >
        <div>
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="区域">
              <el-row>
                <el-col :span="12">
                  <el-select v-model="form.areaId" placeholder="请选择活动区域">
                    <el-option
                      v-for="item in areaList"
                      :key="item.areaId"
                      :label="item.areaName"
                      :value="item.areaId"
                    >
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="12">
                  <el-button @click="areaVisible = true">新增区域</el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="能源站编号">
              <el-input v-model="form.energyStationCode"></el-input>
            </el-form-item>
            <el-form-item label="能源站名称">
              <el-input v-model="form.energyStationName"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="form.status" placeholder="状态">
                <el-option
                  v-for="item in equipmentList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="energyVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEnergy">保 存</el-button>
        </span>
      </el-dialog>

      <!-- 区域 -->
      <el-dialog
        title="区域信息"
        :visible.sync="areaVisible"
        width="20%"
        :before-close="runClose"
      >
        <div>
          <el-form ref="form" :model="areaForm" label-width="120px">
            <el-form-item label="区域名称">
              <el-input v-model="areaForm.areaName"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="areaVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveArea">保 存</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>



<script>
let vm;
import viewTable from "@/components/vTable";
import { getToken } from "@/utils/auth";
import { selectUser } from "@/api/stsyem/user";
import {
  /* 设备验收 */
  getIdEqu,
  delEqu,
  addEqu,
  selectEqu,
  approvalEqu,
  getEquipmentType,
  updataEqu,
  getIdAcc,
  delAcc,
  addAcc,
  selectAcc,
  updataAcc,
  getByIdEquLib,
  delEquLib,
  addEquLib,
  selectEquLib,
  updataEquLib,
  getEquName,
  /* 巡检计划 */
  getInspectplan,
  delInspectplan,
  approvalInsp,
  addInspectplan,
  selectInspectplan,
  updataInspectplan,
  /* 巡检记录 */
  addRecord,
  getByIdRecord,
  selectRecord,
  updataRecord,
  /* 缺陷报告 */
  selectDefect,
  addDefect,
  delDefect,
  updataDefect,
  getByIdDefect,
  approvalDefct,
  /* 维修计划 */
  getByIdRepair,
  delRepair,
  addRepair,
  selectRepair,
  updataRepair,
  getByIdRepairRecord,
  delRepairRecord,
  addRepairRecord,
  selectRepairRecord,
  updataRepairRecord,
  approvalRepair,
  /* 报废计划 */
  addScrap,
  updataScrap,
  selectScrap,
  delScrap,
  getByIdScrap,
  getByIdScrapRecord,
  selectScrapRecord,
  addScrapRecord,
  delScrapRecord,
  updataScrapRecord,
  approvalScrap,
  /* 维护保养计划 */
  addMaintenance,
  getByIdMaintenance,
  delMaintenance,
  selectMaintenance,
  updataMaintenance,
  addMaintenanceRecord,
  getByIdMaintenanceRecord,
  delMaintenanceRecord,
  selectMaintenanceRecord,
  updataMaintenanceRecord,
  approvalMainten,
  /* 台账信息 */
  getStandingbookDetail,
  selectStandingbook,
  updataStandingbook,
  delStandingbook,
  findRuningStatus,
  /* 能源站管理 */
  selectEnergyStation,
  delEnergyStation,
  addEnergyStation,
  updataEnergyStation,
  selectArea,
  delArea,
  addArea,
  updataArea,
} from "@/api/mocha";

import { delFiles } from "@/api/file";

import { mapGetters } from "vuex";

export default {
  data() {
    return {
      activeName: "first",
      query: {
        pageNumber: 1,
        pageSize: 10,
      },
      equList: [],
      //设备运行数据
      tableData: [],
      total: 0,
      runVisible: false,
      libVisible: false,
      inspVisible: false,
      equipmentTypeList: [],
      form: {},
      empOptions: [],
      option: true,
      libOptions: [],
      isAdopt: [
        { value: "0", label: "不合适" },
        { value: "1", label: "合适" },
      ],
      accType: [
        { value: "0", label: "台" },
        { value: "1", label: "只" },
        { value: "2", label: "根" },
      ],
      inspType: [
        { value: "0", label: "每日" },
        { value: "1", label: "每周" },
        { value: "2", label: "每月" },
        { value: "3", label: "每年" },
      ],
      headersData: {
        Authorization: "Bearer " + getToken(),
      },
      optionType: null,
      /* 设备验收参数 */
      accData: [],
      accVisible: false,
      accTotal: 0,

      /* 设备运行参数 */
      runData: [],
      runTotal: 0,
      /* 巡检计划参数 */
      inspData: [],
      inspTotal: 0,
      repairVisible: false,
      repairType: [
        { value: 0, label: "否" },
        { value: 1, label: "是" },
      ],
      repairVisibleInfo: false,
      repairListInfo: [],
      /* 缺陷报告参数 */
      defectData: [],
      defectVisible: false,
      defectTotal: 0,
      /* 维修计划 */
      repairlData: [],
      repairlVisible: false,
      repairlTotal: 0,
      repairList: [
        { value: 1, label: "日常维修" },
        { value: 2, label: "定期检修" },
        { value: 3, label: "故障维修" },
        { value: 4, label: "外委维修" },
      ],
      repairRecordVisibleInfo: false,
      repairrecordListInfo: [],
      repairRepVisible: false,
      /* 报废计划 */
      scrapVisible: false,
      scrapData: [],
      scrapRecordVisible: false,
      scrapRecordInfoVisible: false,
      scrapRecordInfoList: [],
      scrapTotal: 0,
      comPlanId: null,
      /* 维护保养计划 */
      maintenanceVisible: false,
      maintenanceData: [],
      maintenanceRecordVisible: false,
      maintenanceRecordInfoVisible: false,
      maintenanceRecordInfoList: [],
      maintenanceTotal: 0,
      maintenanceList: [
        { value: 1, label: "定期" },
        { value: 2, label: "突发" },
        { value: 3, label: "巡检" },
        { value: 4, label: "维修" },
      ],
      /* 台账信息 */
      standingData: [],
      standingTotal: 0,
      standingVisible: false,
      standingInfoVisible: false,
      equipmentList: [
        { value: 0, label: "异常" },
        { value: 1, label: "正常" },
        { value: 2, label: "警告" },
      ],
      standRow: {},
      //判断是查看还是编辑
      isView: false,
      //台账操作，判断是修改台账全部信息还是只修改设备信息
      standStaus: true,
      /* 能源站 */
      energyData: [],
      energyTotal: 0,
      energyVisible: false,
      areaVisible: false,
      areaForm: {},
      areaList: [],
      statusType: [
        { value: "0", label: "异常" },
        { value: "1", label: "运行中" },
        { value: "2", label: "中止" },
      ],
      equipmentType: [],
    };
  },
  created() {
    vm = this;
    vm.getData();
    // vm.gettableData();
    vm.getEquLib();
    vm.getAccData();
    vm.getDefectList();
    vm.getRepairList();
    vm.getScrapList();
    vm.getMaintenanceList();
    vm.getStandList();
    vm.getEnergyList();
  },
  computed: {
    ...mapGetters(["userId"]),
  },
  components: { viewTable },
  methods: {
    //获取数据
    getData() {
      //获取员工
      const empQuery = {
        pageNumber: 1,
        pageSize: 100,
        queryValue: null,
      };
      //获取设备类别
      const data = selectUser(empQuery);
      const data1 = getEquipmentType();
      Promise.all([data, data1]).then((res) => {
        if (res[0].code === 0) {
          vm.empOptions = res[0].data.records;
        }
        if (res[1].code === 0) {
          vm.equipmentTypeList = res[1].data;
        }
      });
    },
    /* 设备验收 */

    //新增验收
    addAccept() {
      vm.option = true;
      vm.getEquLib();
      vm.form = {};
      // const data = [
      //   { descInfo: null, equipmentId: null },
      //   { descInfo: null, equipmentId: null },
      //   { descInfo: null, equipmentId: null },
      // ];
      // vm.form.qualityTestingList = data;
      const arr = [];
      for (let t = 0; t < 3; t++) {
        const obj = {
          descInfo: null,
          equipmentId: null,
        };
        arr.push(obj);
      }
      vm.$set(vm.form, "qualityTestingList", arr);
      vm.accVisible = true;
    },
    //删除验收设备
    delAccFun(row) {
      const { equipmentId } = row;
      delAcc({ equipmentId }).then((res) => {
        if (res.code === 0) {
          vm.getAccData();
          vm.$message.success(res.message);
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //设备验收信息
    getAccData() {
      selectAcc(vm.query).then((res) => {
        if (res.code === 0) {
          vm.accData = res.data.records;
          vm.accTotal = res.data.total;
        } else {
          vm.accData = [];
          vm.accTotal = 0;
        }
      });
    },
    //保存设备验收
    saveRunAcc() {
      let data;
      if (vm.option) {
        //新增
        data = addAcc(vm.form);
      } else {
        //修改
        data = updataAcc(vm.form);
      }

      data.then((res) => {
        if (res.code === 0) {
          vm.getAccData();
          vm.$message.success(res.message);
          vm.accVisible = false;
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //动态查询单个配置
    openModeAcc(row) {
      vm.option = false;
      // vm.form = row;
      const { equipmentId } = row;
      getIdAcc(equipmentId).then((res) => {
        console.log(res);
        if (res.code === 0) {
          const { data } = res;
          if (!data.qualityTestingList) {
            const arr = [];
            vm.form = data;
            for (let t = 0; t < 3; t++) {
              const obj = {
                descInfo: null,
                equipmentId: null,
              };
              arr.push(obj);
            }
            vm.$set(vm.form, "qualityTestingList", arr);
          } else {
            vm.form = data;
          }
          vm.accVisible = true;
        }
      });

      // optionType
    },
    //设备验收分页
    currentAccChange(e) {
      vm.query.pageNumber = e;
      vm.getAccData();
    },

    /* 运行设备 */

    //新增运行设备
    addRun() {
      vm.option = true;
      vm.form = {
        createBy:vm.userId
      };
      vm.runVisible = true;
    },
    //获取运行设备列表
    gettableData() {
      selectEqu(vm.query).then((res) => {
        console.log(res);
        if (res.code === 0) {
          vm.runData = res.data.records;
          vm.runTotal = res.data.total;
        } else {
          vm.runData = [];
          vm.runTotal = 0;
        }
      });
    },
    //删除运行设备
    delRunFun(row) {
      const { runingId } = row;
      delEqu({ runingId }).then((res) => {
        if (res.code === 0) {
          vm.gettableData();
          vm.$message.success(res.message);
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //查询当运行设备信息
    openModeRun(row) {
      vm.option = false;
      vm.form = row;
      vm.runVisible = true;
    },
    //审批
    approvalEquFun(row,approvalStatus) {
      const { runingId } = row;
      const data = {
        approvalStatus,
        runingId
      }
      approvalEqu(data).then(res=>{
          vm.$message.info(res.message);
          vm.gettableData();
      })
    },
    //分页
    currentRunChange(e) {
      vm.query.pageNumber = e;
      vm.gettableData();
    },

    /* 巡检计划 */

    //获取巡检计划
    getInspectplanList() {
      selectInspectplan(vm.query).then((res) => {
        if (res.code === 0) {
          vm.inspData = res.data.records;
          vm.inspTotal = res.data.total;
        } else {
          vm.inspData = [];
          vm.inspTotal = 0;
        }
      });
    },
    //新增巡检计划
    addInsp() {
      vm.option = true;
      vm.form = {
        createBy:vm.userId
      };
      vm.inspVisible = true;
    },
    //提交巡检计划
    submitInsp() {
      vm.form.status = 1;
      vm.inspReqFun();
    },
    inspReqFun() {
      let data;
      if (vm.option) {
        //新增
        data = addInspectplan(vm.form);
      } else {
        //修改
        data = updataInspectplan(vm.form);
      }

      data.then((res) => {
        if (res.code === 0) {
          vm.getInspectplanList();
          vm.$message.success(res.message);
          vm.inspVisible = false;
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //保存巡检计划
    saveInsp() {
      vm.form.status = 0;
      vm.inspReqFun();
    },
    //查看一个巡检计划
    openModeInsp(row) {
      const { planId } = row;
      vm.option = false;
      getInspectplan(planId).then((res) => {
        if (res.code === 0) {
          vm.form = res.data;
          vm.inspVisible = true;
        }
      });
    },
    //审批
    approvalInspFun(row,approvalStatus){
      const { planId } = row;
      const data = {
        approvalStatus,
        planId
      }
      approvalInsp(data).then(res=>{
          vm.$message.info(res.message);
          vm.getInspectplanList();
      })
    },
    //删除巡检计划
    delInspFun(row) {
      const { planId } = row;
      delInspectplan({ planId }).then((res) => {
        if (res.code === 0) {
          vm.getInspectplanList();
          vm.$message.success(res.message);
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //新增巡检记录
    addRecordFun() {
      if (!vm.comPlanId) {
        vm.$message.error("请选择一个巡检计划进行新增记录");
        return;
      }
      vm.option = true;
      vm.form = {
        planId: vm.comPlanId,
      };
      vm.option = true;
      vm.repairVisible = true;
    },
    //保存巡检记录
    saveInspPlan() {
      let data;
      if (vm.option) {
        //新增
        data = addRecord(vm.form);
      } else {
        //修改
        data = updataRecord(vm.form);
      }
      data.then((res) => {
        if (res.code === 0) {
          vm.$message.success(res.message);
          vm.repairVisible = false;
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //打开单个巡检记录
    getPairInfo(row) {
      const { recordId } = row;
      vm.option = false;
      getByIdRecord(recordId).then((res) => {
        if (res.code === 0) {
          vm.form = res.data;
          vm.repairVisible = true;
        }
      });
    },

    //查看巡检记录
    viewInspectCycle(row) {
      const { planId } = row;
      selectRecord({ planId }).then((res) => {
        console.log(res);
        if (res.code === 0) {
          vm.repairListInfo = res.data;
          vm.repairVisibleInfo = true;
        }
      });
    },
    //巡检计划分页
    currentInspChange(e) {
      vm.query.pageNumber = e;
      vm.getInspectplanList();
    },

    /* 缺陷报告 */

    //获取缺陷报告列表
    getDefectList() {
      selectDefect(vm.query).then((res) => {
        if (res.code === 0) {
          vm.defectData = res.data.records;
          vm.defectTotal = res.data.total;
        } else {
          vm.defectData = [];
          vm.defectTotal = 0;
        }
      });
    },
    addDefectFun() {
      vm.option = true;
      vm.form = {
        createBy:vm.userId
      };
      vm.defectVisible = true;
    },
    //提交缺陷
    submitDefect() {
      vm.form.status = 1;
      vm.defectReqFun();
    },
    defectReqFun() {
      let data;
      if (vm.option) {
        //新增
        data = addDefect(vm.form);
      } else {
        //修改
        data = updataDefect(vm.form);
      }
      data.then((res) => {
        if (res.code === 0) {
          vm.$message.success(res.message);
          vm.getDefectList();
          vm.defectVisible = false;
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //保存缺陷
    saveDefect() {
      vm.form.status = 0;
      vm.defectReqFun();
    },
    //获取一个缺陷
    openDefect(row) {
      const { reportId } = row;
      vm.option = false;
      getByIdDefect(reportId).then((res) => {
        if (res.code === 0) {
          vm.form = res.data;
          vm.defectVisible = true;
        }
      });
    },
    //审批
    approvalDefectFun(row,approvalStatus){
      const { reportId } = row;
      const data = {
        approvalStatus,
        reportId
      }
      approvalDefct(data).then(res=>{
          vm.$message.info(res.message);
          vm.getDefectList();
      })
    },
    delDefectFun(row) {
      const { reportId } = row;
      delDefect({ reportId }).then((res) => {
        if (res.code === 0) {
          vm.$message.success(res.message);
          vm.getDefectList();
        } else {
          vm.$message.error(res.message);
        }
      });
    },

    /* 维修计划 */

    // 分页查询维修计划列表
    getRepairList() {
      selectRepair(vm.query).then((res) => {
        if (res.code === 0) {
          vm.repairlData = res.data.records;
          vm.repairlTotal = res.data.total;
        } else {
          vm.repairlData = [];
          vm.repairlTotal = 0;
        }
      });
    },
    //新增维修计划
    addRepairlFun() {
      vm.option = true;
      vm.form = {
        createBy:vm.userId
      };
      vm.repairlVisible = true;
    },
    //提交维修计划
    submitRepairl() {
      vm.form.status = 1;
      vm.repairlFun();
    },
    //维修计划请求
    repairlFun() {
      let data;
      if (vm.option) {
        //新增
        data = addRepair(vm.form);
      } else {
        //修改
        data = updataRepair(vm.form);
      }
      data.then((res) => {
        if (res.code === 0) {
          vm.$message.success(res.message);
          vm.getRepairList();
          vm.repairlVisible = false;
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //保存维修计划
    saveRepairl() {
      vm.form.status = 0;
      vm.repairlFun();
    },
    //查看一个维修计划
    openRepairFun(row) {
      const { planId } = row;
      vm.option = false;
      getByIdRepair(planId).then((res) => {
        if (res.code === 0) {
          vm.form = res.data;
          vm.repairlVisible = true;
        }
      });
    },
    //审批
    approvalRepairFun(row,approvalStatus){
       const { planId } = row;
      const data = {
        approvalStatus,
        planId
      }
      approvalRepair(data).then(res=>{
          vm.$message.info(res.message);
          vm.getRepairList();
      })
    },
    delRepairFun(row) {
      const { planId } = row;
      delRepair({ planId }).then((res) => {
        if (res.code === 0) {
          vm.$message.success(res.message);
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //打开维修记录
    viewRecord(row) {
      const { planId } = row;
      selectRepairRecord({ planId }).then((res) => {
        console.log(res);
        if (res.code === 0) {
          vm.repairrecordListInfo = res.data.records;
          vm.repairRecordVisibleInfo = true;
        }
      });
    },

    //新增维修记录
    addRepairRecordFun() {
      if (!vm.comPlanId) {
        vm.$message.error("请选择一个维修计划");
        return;
      }
      vm.option = true;
      vm.form = {
        planId: vm.comPlanId,
      };
      vm.repairRepVisible = true;
    },
    //获取一个维修记录信息
    getRepRecrdInfo(row) {
      vm.option = false;
      const { recordId } = row;
      getByIdRepairRecord(recordId).then((res) => {
        if (res.code === 0) {
          // vm.repairrecordListInfo = res.data;
          vm.form = res.data;
          vm.repairRepVisible = true;
        }
      });
    },
    //保存维修记录
    saveRepairRep() {
      let data;
      if (vm.option) {
        //新增
        data = addRepairRecord(vm.form);
      } else {
        //修改
        data = updataRepairRecord(vm.form);
      }
      data.then((res) => {
        if (res.code === 0) {
          vm.$message.success(res.message);
          vm.repairRepVisible = false;
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //多选
    handleRepairSelection(e) {
      if (e.length > 0) {
        const { planId } = e[0];
        vm.comPlanId = planId;
      } else {
        vm.comPlanId = null;
      }
    },
    //维修分页
    currentRepairChange(e) {
      vm.query.pageNumber = e;
      vm.getRepairList();
    },

    /* 退役报废计划 */

    //新增报废计划
    addScrapFun() {
      vm.option = true;
      vm.form = {
        createBy:vm.userId
      };
      vm.scrapVisible = true;
    },
    //获取报废计划
    getScrapList() {
      selectScrap(vm.query).then((res) => {
        if (res.code === 0) {
          vm.scrapData = res.data.records;
          vm.scrapTotal = res.data.total;
        } else {
          vm.scrapData = [];
          vm.scrapTotal = 0;
        }
      });
    },
    //提交报废计划
    submitScrap() {
      vm.form.status = 1;
      vm.scrapReqFun();
    },
    scrapReqFun() {
      let data;
      if (vm.option) {
        //新增
        data = addScrap(vm.form);
      } else {
        //修改
        data = updataScrap(vm.form);
      }
      data.then((res) => {
        if (res.code === 0) {
          vm.$message.success(res.message);
          vm.getScrapList();
          vm.scrapVisible = false;
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //保存报废计划
    saveScrap() {
      vm.form.status = 0;
      vm.scrapReqFun();
    },
    //查看一个报废计划
    openScrapFun(row) {
      vm.option = false;
      const { planId } = row;
      getByIdScrap(planId).then((res) => {
        if (res.code === 0) {
          // vm.repairrecordListInfo = res.data;
          vm.form = res.data;
          vm.scrapVisible = true;
        }
      });
    },
    //审批
    approvalScrapFun(row,approvalStatus){
      const { planId } = row;
      const data = {
        approvalStatus,
        planId
      }
      approvalScrap(data).then(res=>{
          vm.$message.info(res.message);
          vm.getScrapList();
      })
    },
    //删除一个报废计划
    delScrapFun(row) {
      const { planId } = row;
      delScrap({ planId }).then((res) => {
        if (res.code === 0) {
          vm.getScrapList();
          vm.$message.success(res.message);
        } else {
          vm.$message.error(res.message);
        }
      });
    },

    //新增报废记录
    addScrapRecordFun() {
      if (!vm.comPlanId) {
        vm.$message.error("请选择一个维修计划");
        return;
      }
      vm.option = true;
      vm.form = {
        planId: vm.comPlanId,
      };
      vm.scrapRecordVisible = true;
    },
    //保存报废记录
    saveScrapRecord() {
      let data;
      if (vm.option) {
        //新增
        data = addScrapRecord(vm.form);
      } else {
        //修改
        data = updataScrapRecord(vm.form);
      }
      data.then((res) => {
        if (res.code === 0) {
          vm.getScrapList();
          vm.$message.success(res.message);
          vm.scrapRecordVisible = false;
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //查看报废记录
    viewScrapRecord(row) {
      const { planId } = row;
      selectScrapRecord({ planId }).then((res) => {
        console.log(res);
        if (res.code === 0) {
          vm.scrapRecordInfoList = res.data.records;
          vm.scrapRecordInfoVisible = true;
        }
      });
    },
    //查看报废记录详细
    getScrapRecord(row) {
      vm.option = false;
      const { recordId } = row;
      getByIdScrapRecord(recordId).then((res) => {
        if (res.code === 0) {
          // vm.repairrecordListInfo = res.data;
          vm.form = res.data;
          vm.scrapRecordVisible = true;
        }
      });
    },
    //分页
    currentScrapChange(e) {
      vm.query.pageNumber = e;
      vm.getScrapList();
    },

    /* 维护保养计划 */
    //查询保养计划
    getMaintenanceList() {
      selectMaintenance(vm.query).then((res) => {
        if (res.code === 0) {
          vm.maintenanceData = res.data.records;
          vm.maintenanceTotal = res.data.total;
        } else {
          vm.maintenanceData = [];
          vm.maintenanceTotal = 0;
        }
      });
    },
    //新增保养计划
    addMaintenanceFun() {
      vm.form = {
        createBy:vm.userId
      };
      vm.option = true;
      vm.maintenanceVisible = true;
    },
    //提交保养计划
    submitMaintenance() {
      vm.form.status = 1;
      vm.maintenanceReqFun();
    },
    maintenanceReqFun() {
      let data;
      if (vm.option) {
        //新增
        data = addMaintenance(vm.form);
      } else {
        //修改
        data = updataMaintenance(vm.form);
      }
      data.then((res) => {
        if (res.code === 0) {
          vm.$message.success(res.message);
          vm.getMaintenanceList();
          vm.maintenanceVisible = false;
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //保存保养计划
    saveMaintenance() {
      vm.form.status = 0;
      vm.maintenanceReqFun();
    },
    //查看报废计划详细
    openMaintFun(row) {
      vm.option = false;
      const { planId } = row;
      getByIdMaintenance(planId).then((res) => {
        if (res.code === 0) {
          // vm.repairrecordListInfo = res.data;
          vm.form = res.data;
          vm.maintenanceVisible = true;
        }
      });
    },
    //审批
    approvalMaintFun(row,approvalStatus){
      const { planId } = row;
      const data = {
        approvalStatus,
        planId
      }
      approvalMainten(data).then(res=>{
          vm.$message.info(res.message);
          vm.getMaintenanceList();
      })
    },
    //删除报废计划
    delMaintFun(row) {
      const { planId } = row;
      delMaintenance({ planId }).then((res) => {
        if (res.code === 0) {
          vm.getMaintenanceList();
          vm.$message.success(res.message);
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //查看保养记录
    viewMaintenance(row) {
      const { planId } = row;
      selectMaintenanceRecord({ planId }).then((res) => {
        console.log(res);
        if (res.code === 0) {
          vm.maintenanceRecordInfoList = res.data.records;
          vm.maintenanceRecordInfoVisible = true;
        }
      });
    },
    //查看保养记录详情
    getMaintRecord(row) {
      vm.option = false;
      const { recordId } = row;
      getByIdMaintenanceRecord(recordId).then((res) => {
        if (res.code === 0) {
          // vm.repairrecordListInfo = res.data;
          vm.form = res.data;
          vm.maintenanceRecordVisible = true;
        }
      });
    },

    //新增保养记录
    addMaintenanceRecFun() {
      if (!vm.comPlanId) {
        vm.$message.error("请选择一个维修计划");
        return;
      }
      vm.option = true;
      vm.form = {
        planId: vm.comPlanId,
      };
      vm.maintenanceRecordVisible = true;
    },
    //保存保养记录
    saveMaintRecord() {
      let data;
      if (vm.option) {
        //新增
        data = addMaintenanceRecord(vm.form);
      } else {
        //修改
        data = updataMaintenanceRecord(vm.form);
      }
      data.then((res) => {
        if (res.code === 0) {
          vm.$message.success(res.message);
          vm.getMaintenanceList();
          vm.maintenanceRecordVisible = false;
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //分页
    currentMaintChange(e) {
      vm.query.pageNumber = e;
      vm.getMaintenanceList();
    },

    /* 台账管理 */

    //获取台账列表
    getStandList() {
      const query = {
        areaId: null,
        energyStationId: null,
        pageNumber: 1,
        pageSize: 20,
      };
      selectStandingbook(query).then((res) => {
        if (res.code === 0) {
          vm.standingData = res.data.records;
          vm.standingTotal = res.data.total;
        } else {
          vm.standingData = [];
          vm.standingTotal = 0;
        }
      });
    },
    //查询台账信息
    viewStandFun(row) {
      const { equipmentId } = row;
      vm.standStaus = true;
      vm.isView = false;
      getStandingbookDetail({ equipmentId }).then((res) => {
        if (res.code === 0) {
          vm.form = res.data;
          vm.standingVisible = true;
        }
      });
    },
    viewStandFun1(row) {
      const { equipmentId } = row;
      vm.standStaus = true;
      vm.isView = true;
      getStandingbookDetail({ equipmentId }).then((res) => {
        if (res.code === 0) {
          vm.form = res.data;
          vm.standingVisible = true;
        }
      });
    },
    //查看技术参数
    viewParam() {
      /* 判断参数是否齐全 */

      //型号容量
      const {
        electricCapacityList,
        //附件及专用工具
        specialToolsList,
        //技术参数
        technicalParameterList,
        //大修理完工日期
        repairDateList,
      } = vm.form;
      if (!electricCapacityList) {
        const arr = [];
        for (let t = 0; t < 3; t++) {
          const obj = {
            capacity: null,
            // capacityId
            equipmentId: vm.form.equipmentId,
            installNum: 0,
            installPost: null,
            model: null,
            id: t,
          };
          arr.push(obj);
        }
        vm.$set(vm.form, "electricCapacityList", arr);
      }
      if (!specialToolsList) {
        const arr = [];
        for (let t = 0; t < 9; t++) {
          const obj = {
            equipmentId: vm.form.equipmentId,
            toolsModel: null,
            toolsName: null,
            toolsNum: null,
            id: t,
          };
          arr.push(obj);
        }
        vm.$set(vm.form, "specialToolsList", arr);
      }
      if (!technicalParameterList) {
        const arr = [];
        for (let t = 0; t < 4; t++) {
          const obj = {
            equipmentId: vm.form.equipmentId,
            projectName: null,
            technicalIndex: null,
            id: t,
          };
          arr.push(obj);
        }
        vm.$set(vm.form, "technicalParameterList", arr);
      }
      if (!repairDateList) {
        const arr = [];
        for (let t = 0; t < 4; t++) {
          const obj = {
            equipmentId: vm.form.equipmentId,
            dateValue: null,
            id: t,
          };
          arr.push(obj);
        }
        vm.$set(vm.form, "repairDateList", arr);
      }

      vm.standingInfoVisible = true;
    },
    //保存台账信息
    saveStanding() {
      let data = updataStandingbook(vm.form);
      data.then((res) => {
        if (res.code === 0) {
          vm.$message.success(res.message);
          vm.getStandList();
          vm.standingVisible = false;
          vm.standingInfoVisible = false;
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //台账多选
    handleStandSelection(e) {
      if (e.length > 0) {
        vm.standRow = e[0];
      } else {
        vm.standRow = {};
      }
    },
    //设置设备详情
    setDeviceDetails() {
      const row = vm.standRow;
      vm.standStaus = false;
      if (row.equipmentId) {
        const { equipmentId } = row;
        getStandingbookDetail({ equipmentId }).then((res) => {
          if (res.code === 0) {
            vm.form = res.data;
            vm.viewParam();
          }
        });
      } else {
        vm.$message.error("请选择一个台账进行编辑");
      }
    },
    // 自动检查设备运行状态
    getRunStatus() {
      const equipmentId = vm.form.equipmentId;
      findRuningStatus({ equipmentId }).then((res) => {
        vm.$message.info(res.message);
      });
    },

    /* 能源站管理 */

    //新增能源站
    addEnergyFun() {
      vm.option = true;
      vm.form = {};
      vm.getAreaList();
      vm.energyVisible = true;
    },
    //获取能源站列表
    getEnergyList() {
      selectEnergyStation(vm.query).then((res) => {
        if (res.code === 0) {
          vm.energyData = res.data.records;
          vm.energyTotal = res.data.total;
        } else {
          vm.energyData = [];
          vm.energyTotal = 0;
        }
      });
    },
    //能源站信息保存
    saveEnergy() {
      let data;
      if (vm.option) {
        //新增
        data = addEnergyStation(vm.form);
      } else {
        //修改
        data = updataEnergyStation(vm.form);
      }
      data.then((res) => {
        if (res.code === 0) {
          vm.$message.success(res.message);
          vm.getEnergyList();
          vm.energyVisible = false;
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //查看一个能源站
    openEnergyFun(e) {
      vm.form = e;
      vm.option = false;
      vm.getAreaList();
      vm.energyVisible = true;
    },
    //删除能源站
    delEnergyFun(row) {
      const { energyStationId } = row;
      delEnergyStation({ id: energyStationId }).then((res) => {
        if (res.code === 0) {
          vm.$message.success(res.message);
          vm.getEnergyList();
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //分页
    currentEnergyChange(e) {
      vm.query.pageNumber = e;
      vm.getEnergyList();
    },
    //获取区域列表
    getAreaList() {
      const query = {
        pageNumber: 1,
        pageSize: 100,
      };
      selectArea(query).then((res) => {
        if (res.code === 0) {
          vm.areaList = res.data.records;
        }
      });
    },
    //保存区域
    saveArea() {
      addArea(vm.areaForm).then((res) => {
        if (res.code === 0) {
          vm.$message.success(res.message);
          vm.getAreaList();
          vm.areaVisible = false;
        } else {
          vm.$message.error(res.message);
        }
      });
    },

    setData() {
      vm.$set(vm.form);
    },
    //获取一个数据
    getRunInfo() {},
    getRunButton() {},
    runPage() {},
    runSize() {},

    //模态框关闭
    runClose(done) {
      if (vm.option) {
        vm.$confirm("确认关闭？离开后不会保存已经输入的数据!", {
          type: "warning",
        })
          .then((_) => {
            done();
          })
          .catch((_) => {});
      } else {
        done();
      }
    },
    saveRunEqu() {
      vm.form.approvalStatus = 0;
      vm.runEquFun();
    },
    runEquFun() {
      let data;
      if (vm.option) {
        //新增
        data = addEqu(vm.form);
      } else {
        //修改
        data = updataEqu(vm.form);
      }

      data.then((res) => {
        if (res.code === 0) {
          vm.gettableData();
          vm.$message.success(res.message);
          vm.runVisible = false;
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //提交设备运行
    submitRunEqu() {
      vm.form.approvalStatus = 1;
      vm.runEquFun();
    },

    //获取设备库列表
    getEquLib() {
      selectEquLib().then((res) => {
        if (res.code === 0) {
          vm.libOptions = res.data;
        }
      });
    },
    saveEquLib() {
      addEquLib(vm.form).then((res) => {
        if (res.code === 0) {
          vm.getEquLib();
          vm.$message.success(res.message);
          vm.libVisible = false;
        } else {
          vm.$message.error(res.message);
        }
      });
    },

    querySearchAsync(queryString, cb) {
      const query = {
        equipmentName: queryString,
      };
      getEquName(query).then((res) => {
        console.log(res);
        const { data } = res;
        if (data.length > 0) {
          data.forEach((v) => {
            v.value = v.equipmentName;
          });
          cb(res.data);
        }
      });
    },
    handleSelect(item) {
      console.log(item);
      const { equipmentCode, equipmentId, equipmentName } = item;
      vm.form.equipmentCode = equipmentCode;
      vm.form.equipmentId = equipmentId;
      vm.form.equipmentName = equipmentName;
    },

    //切换TAB
    handleLeave(newId, oldId) {
      vm.comPlanId = null;
      vm.query = {
        pageNumber: 1,
        pageSize: 10,
      };
      if (newId !== vm.activeInfo) {
        vm.activeInfo = newId;
        switch (newId) {
          case "third":
            vm.gettableData();
            break;
          case "first":
            vm.getAccData();
            break;
          case "fourth":
            vm.getInspectplanList();
            break;
          case "ten":
            vm.getEnergyList();
            break;

          default:
            break;
        }
        // if (newId == 1) vm.getStyInfo();
        // else vm.getEmpBirthdoy();
      }
    },

    handleUrl(file) {
      console.log(file);
      if (file.code === 0) {
        const url = file.data.pathList[0];
        vm.form.filePath = url;
        vm.$set(vm.form);
      }
    },
    //删除文件
    delFileFun(pathList) {
      delFiles({ pathList }).then((res) => {
        if (res.code === 0) {
          vm.form.filePath = null;
          console.log(vm.form);
          vm.$set(vm.form);
          vm.$message.success(res.message);
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //设备库选择设备
    selectEquList(e) {
      getEquName({ equipmentLibId: e }).then((res) => {
        if (res.code === 0) {
          vm.equList = res.data;
        }
      });
    },
    selectEquName(e) {
      console.log(e);
      const { equipmentId, equipmentCode, equipmentName } = e;
      vm.form.equipmentId = equipmentId;
      vm.form.equipmentName = equipmentName;
      vm.form.equipmentCode = equipmentCode;
    },
    setChangeSelect(e) {
      let str = "";
      e.forEach((v) => {
        str = str + v + "-";
      });
      vm.form.equipmentCode = str.substr(0, str.length - 1);
    },
  },
};
</script>


<style lang='scss'>
.table-defalut {
  border-collapse: collapse;
  word-wrap: break-word;
  word-break: break-all;
  border: none;
  th {
    text-align: center;
    padding-right: 5px;
    background-color: #f8f9fe;
    font-size: 14px;
    text-shadow: 0 1px 1px #e8ebee;
    line-height: 40px;
    max-width: 130px;
    min-width: 100px;
    border: 1px solid #ccc;
  }
  td {
    border: 1px solid #ccc;
    min-width: 130px !important;
    padding: 0 5px;
    .el-input .el-input__inner {
      box-shadow: none;
      background: transparent;
      cursor: text;
      border-color: transparent;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #111;
      overflow: hidden;
    }
    .el-textarea.is-disabled .el-textarea__inner {
      background-color: #fff;
      border: none;
      color: #000;
      padding: 0;
      cursor: text;
      resize: none;
    }
    .el-input--prefix .el-input__inner {
      padding-left: 5px;
    }
    .el-input__inner {
      padding: 0;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 100% !important;
    }
    .el-icon-date:before {
      content: "";
    }
    .el-input .el-input__icon {
      display: none;
    }
  }
}
</style>