<template>
  <div class="service-main">
    <el-tabs v-model="activeName" :before-leave="handleLeave">
      <el-tab-pane label="用户档案管理" name="first">
        <div class="main">
          <div class="title-box" style="width: auto">
            <div class="title-list">
              <div class="list-box list-input">
                <!-- <span class="title">姓名</span> -->
                <el-input
                  v-model="query.queryValue"
                  placeholder="用户信息"
                  style="width: 200px"
                  clearable
                />
              </div>
              <div class="list-box">
                <el-button
                  type="primary"
                  @click="getCustomerList"
                  plain
                  icon="el-icon-query"
                  >筛选</el-button
                >
              </div>
            </div>
            <div class="titles-list">
              <el-button class="insert" @click="addCustomerFun" type="primary"
                >新建客户</el-button
              >
            </div>
          </div>
          <div class="table-view">
            <el-table :data="customerData" stripe style="width: 100%">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column type="index" label="序号" width="80">
              </el-table-column>
              <el-table-column
                prop="customerName"
                label="客户名称"
                width="100"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="customerAddress"
                label="客户地址"
                width="120"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="customerType"
                label="业态"
                width="180"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="contacts"
                label="联系人"
                width="100"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="contactsType"
                label="联系方式"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="guessArea"
                label="预计供能面积"
                align="center"
              ></el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="{ row }">
                  <el-button type="text" size="small" @click="openCustomer(row)"
                    >编辑</el-button
                  >
                  <el-popconfirm
                    title="删除后无法恢复,是否继续删除？"
                    @onConfirm="delCustomerFun(row)"
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
              @current-change="currentCustomerChange"
              layout="total,prev, pager, next"
              :total="customerTotal"
            >
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="合同管理" name="second">
        <div class="main">
          <div class="title-box" style="width: auto">
            <div class="title-list">
              <div class="list-box list-input">
                <!-- <span class="title">姓名</span> -->
                <el-input
                  v-model="query.queryValue"
                  placeholder="合同信息"
                  style="width: 200px"
                  clearable
                />
              </div>
              <div class="list-box">
                <el-button
                  type="primary"
                  @click="getContractList"
                  plain
                  icon="el-icon-query"
                  >查询</el-button
                >
              </div>
            </div>
            <div class="titles-list">
              <el-button class="insert" @click="addPayFun" type="primary"
                >新增缴费记录</el-button
              >
              <el-button class="insert" @click="addContractFun" type="primary"
                >新建合同</el-button
              >
            </div>
          </div>
          <div class="table-view">
            <el-table
              :data="contractData"
              @selection-change="handleContractSelection"
              stripe
              style="width: 100%"
            >
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column type="index" label="序号" width="80">
              </el-table-column>
              <el-table-column
                prop="customerName"
                label="客户名称"
                width="100"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="contractCode"
                label="合同编号"
                width="120"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="area"
                label="供能面积"
                width="180"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="serviceDate"
                label="服务时间"
                width="100"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="spaceLayoutFile"
                label="末端空间布局"
                width="120"
                align="center"
              >
                <template>
                  <span>附件X</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="payDate"
                label="缴费日期"
                width="120"
                align="center"
              >
                <template slot-scope="{ row }">
                  <span
                    v-if="row.payDate"
                    class="article"
                    @click="getPayList(row)"
                    >{{ row.payDate }}</span
                  >
                  <span v-else>---</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="freightBasis"
                label="计费标准"
                width="120"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="signDate"
                label="签约日期"
                width="120"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="firstEnergySupplyDate"
                label="首次供能日期"
                width="120"
                align="center"
              ></el-table-column>
              <el-table-column
                fixed="right"
                align="center"
                label="操作"
                width="200"
              >
                <template slot-scope="{ row }">
                  <el-button type="text" size="small" @click="openContract(row)"
                    >编辑</el-button
                  >
                  <el-popconfirm
                    title="删除后无法恢复,是否继续删除？"
                    @onConfirm="delContractFun(row)"
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
              @current-change="currentContractChange"
              layout="total,prev, pager, next"
              :total="contractTotal"
            >
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="供能服务管理" name="third"></el-tab-pane> -->
      <el-tab-pane label="用户反馈" name="fourth">
        <div class="main">
          <div class="title-box" style="width: auto">
            <div class="title-list">
              <div class="list-box list-input">
                <!-- <span class="title">姓名</span> -->
                <el-input
                  v-model="query.queryValue"
                  placeholder="诉求名称"
                  style="width: 200px"
                  clearable
                />
              </div>
              <div class="list-box">
                <el-button
                  type="primary"
                  @click="getSeekingList"
                  plain
                  icon="el-icon-query"
                  >筛选</el-button
                >
              </div>
            </div>
            <div class="titles-list">
              <el-button class="insert" @click="addSeekingFun" type="primary"
                >新建诉求</el-button
              >
            </div>
          </div>
          <div class="table-view">
            <el-table :data="seekingData" stripe style="width: 100%">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column type="index" label="序号" width="80">
              </el-table-column>
              
              <el-table-column
                prop="title"
                label="诉求名称"
                width="120"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="customerName"
                label="客户名称"
                width="100"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="contractCode"
                label="合同编号"
                width="120"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="createDate"
                label="发起时间"
                width="180"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="appealTypeName"
                label="诉求类型"
                width="100"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="createByName"
                label="发起人"
                width="120"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="statusName"
                label="处理情况"
                width="120"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="updateDate"
                label="办结时间"
                align="center"
              ></el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="{ row }">
                  <el-button type="text" size="small" @click="openSeeking(row)"
                    >编辑</el-button
                  >
                  <el-popconfirm
                    title="删除后无法恢复,是否继续删除？"
                    @onConfirm="delSeekFun(row)"
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
              @current-change="currentSeekingChange"
              layout="total,prev, pager, next"
              :total="seekingTotal"
            >
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="报修管理" name="five">
        <div class="main">
          <div class="title-box" style="width: auto">
            <div class="title-list">
              <div class="list-box list-input">
                <!-- <span class="title">姓名</span> -->
                <el-input
                  v-model="query.queryValue"
                  placeholder="报修名称"
                  style="width: 200px"
                  clearable
                />
              </div>
              <div class="list-box">
                <el-button
                  type="primary"
                  @click="getReportList"
                  plain
                  icon="el-icon-query"
                  >筛选</el-button
                >
              </div>
            </div>
            <div class="titles-list">
              <el-button class="insert" @click="addReportFun" type="primary"
                >新建报修</el-button
              >
            </div>
          </div>
          <div class="table-view">
            <el-table :data="reportData" stripe style="width: 100%">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column type="index" label="序号" width="80">
              </el-table-column>
              <el-table-column
                prop="title"
                label="报修名称"
                width="120"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="customerName"
                label="客户名称"
                width="100"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="contractCode"
                label="合同编号"
                width="120"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="createDate"
                label="发起时间"
                width="180"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="appealTypeName"
                label="报修类型"
                width="100"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="createByName"
                label="发起人"
                width="120"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="statusName"
                label="处理情况"
                width="120"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="updateDate"
                label="办结时间"
                align="center"
              ></el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="{ row }">
                  <el-button type="text" size="small" @click="openReport(row)"
                    >编辑</el-button
                  >
                  <el-popconfirm
                    title="删除后无法恢复,是否继续删除？"
                    @onConfirm="delReportFun(row)"
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
              @current-change="currentReportChange"
              layout="total,prev, pager, next"
              :total="reportTotal"
            >
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="服务回访管理" name="six">
        <div class="main">
          <div class="table-view">
            <el-table :data="visitData" stripe style="width: 100%">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column type="index" label="序号" width="80">
              </el-table-column>
              <el-table-column
                prop="customerName"
                label="客户名称"
                width="100"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="contractCode"
                label="合同编号"
                width="120"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="startDate"
                label="发起时间"
                width="180"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="reportType"
                label="上报类型"
                width="180"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="sponsor"
                label="发起人"
                width="180"
                align="center"
              ></el-table-column>
              <el-table-column label="处理情况" width="180" align="center">
                <template slot-scope="{ row }">
                  <span class="faqi" v-if="row.status == 0">发起</span>
                  <span class="banjie" v-if="row.status == 1">办结</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="endDate"
                label="办结时间"
                align="center"
              ></el-table-column>

              <el-table-column align="center" label="操作">
                <template slot-scope="{ row }">
                  <el-button type="text" size="small" @click="openVisit(row)"
                    >编辑</el-button
                  >
                  <el-popconfirm
                    title="删除后无法恢复,是否继续删除？"
                    @onConfirm="delVisitFun(row)"
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
              @current-change="currentMsgChange"
              layout="total,prev, pager, next"
              :total="customerTotal"
            >
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="推送消息管理" name="seven">
        <div class="main">
          <div class="title-box" style="width: auto">
            <div class="title-list">
              <div class="list-box list-input">
                <!-- <span class="title">姓名</span> -->
                <el-input
                  v-model="query.queryValue"
                  placeholder="消息"
                  style="width: 200px"
                  clearable
                />
              </div>
              <div class="list-box">
                <el-button
                  type="primary"
                  @click="getMsgList"
                  plain
                  icon="el-icon-query"
                  >筛选</el-button
                >
              </div>
            </div>
            <div class="titles-list">
              <el-button class="insert" @click="addMsgFun" type="primary"
                >新建消息</el-button
              >
            </div>
          </div>
          <div class="table-view">
            <el-table :data="msgData" stripe style="width: 100%">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column type="index" label="序号" width="80">
              </el-table-column>
              <el-table-column
                prop="msgName"
                label="消息名称"
                width="100"
                align="center"
              ></el-table-column>
              <el-table-column prop="msgType" label="消息类型" align="center">
                <template slot-scope="{ row }">
                  <span v-if="row.msgType == 1">新闻</span>
                  <span v-else-if="row.msgType == 2">小常识</span>
                  <span v-else>---</span>
                </template>
              </el-table-column>
              <!-- 消息类型（1新闻2小常识） -->
              <el-table-column
                prop="updateDate"
                label="更新时间"
                align="center"
              ></el-table-column>
              <el-table-column
                prop="userName"
                label="编辑人"
                align="center"
              ></el-table-column>

              <el-table-column align="center" label="操作">
                <template slot-scope="{ row }">
                  <el-button type="text" size="small" @click="openMsg(row)"
                    >编辑</el-button
                  >
                  <el-popconfirm
                    title="删除后无法恢复,是否继续删除？"
                    @onConfirm="delMsgFun(row)"
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
              @current-change="currentMsgChange"
              layout="total,prev, pager, next"
              :total="customerTotal"
            >
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <div class="model">
      <!-- 合同 -->
      <el-dialog
        title="合同信息"
        :visible.sync="contractVisible"
        width="40%"
        :before-close="handleClose"
      >
        <el-form ref="contractForm" :model="form" label-width="120px">
          <el-form-item label="客户">
            <!-- <el-input v-model="form.customerId"></el-input> -->
            <el-autocomplete
              v-model="form.customerName"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="合同编号">
            <el-input v-model="form.contractCode"></el-input>
          </el-form-item>
          <el-form-item label="供能面积">
            <el-input v-model.number="form.area"></el-input>
          </el-form-item>
          <el-form-item label="服务时间">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.serviceDate"
              style="width: 100%"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="末端空间布局">
            <!--  -->
            <div v-if="form.spaceLayoutFile">
              <el-popconfirm
                title="确认删除文件?"
                @onConfirm="delFileFun(form.spaceLayoutFile)"
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
          <el-form-item label="计费标准">
            <el-input v-model.number="form.freightBasis">
              <template slot="append">元/M²（元/平方米）</template>
            </el-input>
          </el-form-item>
          <el-form-item label="签约日期">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.signDate"
              style="width: 100%"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="首次供能日期">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.firstEnergySupplyDate"
              style="width: 100%"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="contractVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveContract">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 客户 -->
      <el-dialog
        title="客户信息"
        :visible.sync="customerVisible"
        width="30%"
        :before-close="handleClose"
      >
        <el-form ref="customerForm" :model="form" label-width="100px">
          <el-form-item label="客户名称">
            <el-input v-model="form.customerName"></el-input>
          </el-form-item>
          <el-form-item label="客户地址">
            <el-input v-model="form.customerAddress"></el-input>
          </el-form-item>
          <el-form-item label="业态">
            <el-input v-model="form.customerType"></el-input>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model="form.contacts"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="form.contactsType"></el-input>
          </el-form-item>
          <el-form-item label="预计供能面积">
            <el-input v-model="form.guessArea">
              <template slot="append">M²（平方米）</template>
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="customerVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveCustomer">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 诉求 -->
      <el-dialog
        title="诉求信息"
        :visible.sync="seekingVisible"
        width="40%"
        :before-close="handleClose"
      >
        <el-form ref="contractForm" :model="form" label-width="120px">
          <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="客户名称">
            <!-- <el-input v-model="form.customerId"></el-input> -->
            <el-autocomplete
              v-model="form.customerName"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入客户名称"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="合同编号">
            <el-input disabled v-model="form.contractCode"></el-input>
          </el-form-item>
          <el-form-item label="联系人名称">
            <el-input v-model="form.contactsName"></el-input>
          </el-form-item>
          <el-form-item label="联系人手机号">
            <el-input v-model="form.contactsMobile"></el-input>
          </el-form-item>
          <el-form-item label="诉求类型">
            
             <el-select v-model.number="form.appealType" placeholder="请选择">
              <el-option
                v-for="item in seekTypeOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客服工号">
            <el-input v-model="form.manMadeCode"></el-input>
          </el-form-item>

          <el-form-item label="诉求内容">
            <el-input
              type="textarea"
              :rows="3"
              v-model="form.appealContent"
            ></el-input>
          </el-form-item>
          <el-form-item label="处理进度">
            <el-input
              type="textarea"
              :rows="3"
              v-model="form.dealContent"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              type="textarea"
              :rows="3"
              v-model="form.descInfo"
            ></el-input>
          </el-form-item>
          <el-form-item label="处理情况">
            <el-select v-model.number="form.status" placeholder="请选择">
              <el-option
                v-for="item in seekStatuOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="经办人">
            <el-select v-model="form.updateBy" placeholder="经办人">
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
        <span slot="footer" class="dialog-footer">
          <el-button @click="seekingVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveSeeking">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 报修 -->
      <el-dialog
        title="报修信息"
        :visible.sync="reportVisible"
        width="40%"
        :before-close="handleClose"
      >
        <el-form ref="contractForm" :model="form" label-width="120px">
          <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="客户名称">
            <!-- <el-input v-model="form.customerId"></el-input> -->
            <el-autocomplete
              v-model="form.customerName"
              :fetch-suggestions="querySearchAsync"
              placeholder="请输入客户名称"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="合同编号">
            <el-input disabled v-model="form.contractCode"></el-input>
          </el-form-item>
          <el-form-item label="联系人名称">
            <el-input v-model="form.contactsName"></el-input>
          </el-form-item>
          <el-form-item label="联系人手机号">
            <el-input v-model="form.contactsMobile"></el-input>
          </el-form-item>
          <el-form-item label="诉求类型">
            
             <el-select v-model.number="form.appealType" placeholder="请选择">
              <el-option
                v-for="item in seekTypeOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客服工号">
            <el-input v-model="form.manMadeCode"></el-input>
          </el-form-item>

          <el-form-item label="诉求内容">
            <el-input
              type="textarea"
              :rows="3"
              v-model="form.appealContent"
            ></el-input>
          </el-form-item>
          <el-form-item label="处理进度">
            <el-input
              type="textarea"
              :rows="3"
              v-model="form.dealContent"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              type="textarea"
              :rows="3"
              v-model="form.descInfo"
            ></el-input>
          </el-form-item>
          <el-form-item label="处理情况">
            <el-select v-model.number="form.status" placeholder="请选择">
              <el-option
                v-for="item in seekStatuOpt"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="经办人">
            <el-select v-model="form.updateBy" placeholder="经办人">
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
        <span slot="footer" class="dialog-footer">
          <el-button @click="reportVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveReport">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 消息 -->
      <el-dialog
        title="消息"
        :visible.sync="msgVisible"
        width="40%"
        :before-close="handleClose"
      >
        <el-form ref="contractForm" :model="form" label-width="120px">
          <el-form-item label="消息名称">
            <el-input v-model="form.msgName"></el-input>
          </el-form-item>
          <el-form-item label="消息类型">
            <el-select v-model="form.msgType" placeholder="消息类型">
              <el-option
                v-for="item in msgType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="更新时间">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.updateDate"
              style="width: 100%"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="消息内容">
            <el-input
              v-model="form.msgContent"
              type="textarea"
              :rows="3"
            ></el-input>
            <!-- <quill-editor v-model="form.msgContent" :options="editorOption" ref="myQuillEditor1"></quill-editor> -->
          </el-form-item>
          <el-form-item label="新闻图片">
            <!--  -->
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
              :on-success="handleMsgUrl"
              name="files"
              :headers="headersData"
            >
              <el-button>上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="msgVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveMsg">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 服务回访 -->
      <el-dialog
        title="服务回访"
        :visible.sync="visitVisible"
        width="40%"
        :before-close="handleClose"
      >
        <el-form ref="visitForm" :model="form" label-width="120px">
          <el-form-item label="客户名称">
            <el-input v-model="form.customerName" disabled></el-input>
          </el-form-item>
          <el-form-item label="合同编号">
            <el-input v-model="form.contractCode" disabled></el-input>
          </el-form-item>
          <el-form-item label="上报类型">
            <el-input v-model="form.reportType" disabled></el-input>
          </el-form-item>
          <el-form-item label="详情">
            <el-input
              v-model="form.appealContent"
              type="textarea"
              :rows="3"
            ></el-input>
          </el-form-item>
          <el-form-item label="工单状态">
            <el-select v-model.number="form.status" placeholder="工单状态">
              <el-option
                v-for="item in statusType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="处理内容">
            <el-input
              v-model="form.dealContent"
              type="textarea"
              :rows="3"
            ></el-input>
          </el-form-item>

          <el-form-item label="经办人">
            <el-select v-model="form.endUserId" placeholder="经办人">
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
        <span slot="footer" class="dialog-footer">
          <el-button @click="visitVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveVisit">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 缴费记录 -->
      <el-dialog
        title="缴费记录"
        :visible.sync="payVisible"
        width="40%"
        :before-close="handleClose"
      >
        <el-form ref="visitForm" :model="form" label-width="120px">
          <el-form-item label="客户名称">
            <el-input v-model="form.customerName" disabled></el-input>
          </el-form-item>
          <el-form-item label="合同编号">
            <el-input v-model="form.contractCode" disabled></el-input>
          </el-form-item>
          <el-form-item>
            <span>缴费记录</span>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="payVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveVisit">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 缴费信息 -->
      <el-dialog
        title="缴费信息"
        :visible.sync="payInfoVisible"
        width="40%"
        :before-close="handleClose"
      >
        <el-form ref="visitForm" :model="form" label-width="120px">
          <el-form-item label="缴费时间">
            <el-date-picker
              type="datetime"
              placeholder="选择日期"
              v-model="form.payDate"
              style="width: 100%"
              format="yyyy 年 MM 月 dd 日 HH时mm分"
              value-format="yyyy-MM-dd hh-mm"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="缴费金额">
            <el-input v-model.number="form.payMoney"></el-input>
          </el-form-item>
          <!-- <el-form-item  label="缴费渠道">
            <el-input v-model="form.payType"></el-input>
          </el-form-item> -->
          <el-form-item label="缴费状态">
            <el-select v-model="form.status" placeholder="缴费状态">
              <el-option
                v-for="item in payListOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="到期时间">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.expireDate"
              style="width: 100%"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="payInfoVisible = false">取 消</el-button>
          <el-button type="primary" @click="savePay">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 缴费信息列表 -->
      <el-dialog
        title="缴费列表"
        :visible.sync="payListVisible"
        width="30%"
        :before-close="handleClose"
      >
        <div>
          <template v-for="item in payList">
            <span
              class="span-active"
              @click="getPayInfo(item)"
              :key="item.payRecordId"
              v-text="item.payDate"
            ></span>
          </template>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="payListVisible = false"
            >退 出</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
let vm;
import { delFiles } from "@/api/file";
import { getToken } from "@/utils/auth";

import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { selectUser } from "@/api/stsyem/user";
import {
  /* 合同 */
  addContract,
  delContract,
  getIdContract,
  selectContract,
  updataContract,
  /* 客户 */
  addCustomer,
  selectCustomer,
  updataCustomer,
  delCustomer,
  /* 述求 */
  addAppeal,
  updataAppeal,
  delAppeal,
  selectAppeal,
  /* 报修 */
  addReport,
  updataReport,
  delReport,
  selectReport,
  /* 消息 */
  addMsg,
  updaMsg,
  delMsg,
  selectMsg,
  /* 服务回访 */
  delVisit,
  selectVisit,
  updataVisit,
  selectServerDetail,
  /* 缴费 */
  selectPayrecord,
  getByIdPay,
  delPayrecord,
  addPayrecord,
  updataPayrecord,
} from "@/api/service";
import { mapGetters } from "vuex";
const toolbarOption = [
  ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
  ["blockquote", "code-block"], //引用，代码块
  [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
  [{ list: "ordered" }, { list: "bullet" }], //列表
  [{ script: "sub" }, { script: "super" }], // 上下标
  [{ indent: "-1" }, { indent: "+1" }], // 缩进
  [{ direction: "rtl" }], // 文本方向
  [{ size: ["small", false, "large", "huge"] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
  [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
  [{ font: [] }], //字体
  [{ align: [] }], //对齐方式
  ["clean"], //清除字体样式
  ["image", "video"], //上传图片、上传视频
];
export default {
  data() {
    return {
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOption,
          },
        }, //编辑器配置项
      }, //编辑器配置项
      query: {
        pageNumber: 1,
        pageSize: 20,
      },
      activeName: "first",
      /* 客户参数 */
      customerData: [],
      customerVisible: false,
      customerTotal: 0,
      /* 合同参数 */
      contractData: [],
      contractVisible: false,
      contractTotal: 0,
      /* 诉求参数 */
      seekingData: [],
      seekingVisible: false,
      seekingTotal: 0,
      seekStatuOpt: [
        { value: 0, label: "发起" },
        { value: 1, label: "办结" },
      ],
      seekTypeOpt: [
        { value: 1, label: "报修" },
        { value: 2, label: "投诉" },
        { value: 3, label: "咨询" },
        { value: 4, label: "建议" },
        { value: 5, label: "表扬" },
      ],
      /* 报修参数 */
      reportData: [],
      reportVisible: false,
      reportTotal: 0,
      /* 信息推送参数 */
      msgData: [],
      msgVisible: false,
      msgTotal: 0,
      msgType: [
        { value: "1", label: "新闻" },
        { value: "2", label: "小常识" },
      ],
      /* 服务回访 */
      visitVisible: false,
      visitData: [],
      visitTotal: 0,
      statusType: [
        { value: 0, label: "发起" },
        { value: 1, label: "办结" },
        { value: 2, label: "办理中" },
      ],
      /* 缴费记录 */
      payVisible: false,
      payInfoVisible: false,
      payListVisible: false,
      payList: [],
      payListOption: [
        { value: 1, label: "待缴费" },
        { value: 2, label: "已缴费" },
        { value: 3, label: "超时未缴费" },
      ],
      /* 通用 */
      form: {},
      total: 0,
      headersData: {
        Authorization: "Bearer " + getToken(),
      },
      //用户操作 true为新增，false为修改
      option: true,
      //合同ID
      comContractId: null,
      empOptions: [],
    };
  },
  created() {
    vm = this;
    // vm.getContractList()
    vm.getCustomerList();
    vm.getUserList();
    // vm.getSeekingList()
    // vm.getReportList()
    // vm.getMsgList()
  },
  computed: {
    ...mapGetters(["userId"]),
  },
  components: { quillEditor },
  methods: {
    getUserList() {
      //获取员工
      const empQuery = {
        pageNumber: 1,
        pageSize: 100,
        queryValue: null,
      };
      //获取设备类别
      selectUser(empQuery).then((res) => {
        if (res.code === 0) {
          vm.empOptions = res.data.records;
        }
      });
    },
    //通用重置
    resetQuery() {
      vm.option = true;
      vm.query = {
        pageNumber: 1,
        pageSize: 10,
      };
      vm.form = {};
    },
    /* 合同 */
    //查询所有合同
    getContractList() {
      selectContract(vm.query).then((res) => {
        if (res.code === 0) {
          vm.contractData = res.data.records;
          vm.contractTotal = res.data.total;
        } else {
          vm.contractData = [];
          vm.contractTotal = 0;
        }
      });
    },
    //新建合同
    addContractFun() {
      vm.resetQuery();
      vm.contractVisible = true;
    },
    //删除合同文件
    delFileFun(pathList) {
      delFiles({ pathList }).then((res) => {
        if (res.code === 0) {
          vm.form.spaceLayoutFile = null;
          vm.$set(vm.form);
          vm.$message.success(res.message);
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    handleUrl(file) {
      console.log(file);
      if (file.code === 0) {
        const url = file.data.pathList[0];
        vm.form.spaceLayoutFile = url;
        vm.$set(vm.form);
      }
    },
    //保存合同
    saveContract() {
      let data;
      if (vm.option) {
        //新增
        data = addContract(vm.form);
      } else {
        //修改
        data = updataContract(vm.form);
      }

      data.then((res) => {
        if (res.code === 0) {
          vm.getContractList();
          vm.$message.success(res.message);
          vm.contractVisible = false;
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //打开一个合同
    openContract(row) {
      vm.form = row;
      vm.option = false;
      vm.contractVisible = true;
    },
    //删除合同
    delContractFun(row) {
      const { contractId } = row;
      delContract({ contractId }).then((res) => {
        if (res.code === 0) {
          vm.getContractList();
          vm.$message.success(res.message);
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //分页
    currentContractChange(e) {
      vm.query.pageNumber = e;
      vm.getContractList();
    },
    /* 客户 */
    addCustomerFun() {
      vm.resetQuery();
      vm.customerVisible = true;
    },
    //查询所有客户
    getCustomerList() {
      selectCustomer(vm.query).then((res) => {
        if (res.code === 0) {
          vm.customerData = res.data.records;
          vm.customerTotal = res.data.total;
        } else {
          vm.customerData = [];
          vm.customerTotal = 0;
        }
      });
    },
    //保存客户
    saveCustomer() {
      let data;
      if (vm.option) {
        //新增
        data = addCustomer(vm.form);
      } else {
        //修改
        data = updataCustomer(vm.form);
      }

      data.then((res) => {
        if (res.code === 0) {
          vm.getCustomerList();
          vm.$message.success(res.message);
          vm.customerVisible = false;
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //查看一个客户
    openCustomer(row) {
      vm.form = row;
      vm.option = false;
      vm.customerVisible = true;
    },
    //删除一个客户
    delCustomerFun(row) {
      const { customerId } = row;
      delCustomer({ customerId }).then((res) => {
        if (res.code === 0) {
          vm.getCustomerList();
          vm.$message.success(res.message);
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //分页
    currentCustomerChange(e) {
      vm.query.pageNumber = e;
      vm.getCustomerList();
    },
    /* 述求 */

    //获取诉求
    getSeekingList() {
      selectAppeal(vm.query).then((res) => {
        console.log(res);
        if (res.code === 0) {
          vm.seekingData = res.data.records;
          vm.seekingTotal = res.data.total;
        } else {
          vm.seekingData = [];
          vm.seekingTotal = 0;
        }
      });
    },

    //新增述求
    addSeekingFun() {
      vm.option = true;
      vm.query = {
        pageNumber: 1,
        pageSize: 10,
      };
      vm.form = {
        createBy: vm.userId,
      };
      vm.seekingVisible = true;
    },
    //保存诉求
    saveSeeking() {
      let data;
      if (vm.option) {
        //新增
        data = addAppeal(vm.form);
      } else {
        //修改
        data = updataAppeal(vm.form);
      }

      data.then((res) => {
        if (res.code === 0) {
          vm.getSeekingList();
          vm.$message.success(res.message);
          vm.seekingVisible = false;
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //查看一个诉求
    openSeeking(row) {
      vm.form = row;
      vm.option = false;
      vm.seekingVisible = true;
    },
    //删除一个诉求
    delSeekFun(row) {
      const { appealId } = row;
      delAppeal({ id: appealId }).then((res) => {
        if (res.code === 0) {
          vm.getSeekingList();
          vm.$message.success(res.message);
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //分页
    currentSeekingChange(e) {
      vm.query.pageNumber = e;
      vm.getSeekingList();
    },

    /* 报修 */

    //获取报修列表
    getReportList() {
      selectReport(vm.query).then((res) => {
        console.log(res);
        if (res.code === 0) {
          vm.reportData = res.data.records;
          vm.reportTotal = res.data.total;
        } else {
          vm.reportData = [];
          vm.reportTotal = 0;
        }
      });
    },
    //新增报修
    addReportFun() {
      vm.option = true;
      vm.query = {
        pageNumber: 1,
        pageSize: 10,
      };
      vm.form = {
        createBy: vm.userId,
      };
      vm.reportVisible = true;
    },
    //保存报修
    saveReport() {
      let data;
      if (vm.option) {
        //新增
        data = addReport(vm.form);
      } else {
        //修改
        data = updataReport(vm.form);
      }

      data.then((res) => {
        if (res.code === 0) {
          vm.getReportList();
          vm.$message.success(res.message);
          vm.reportVisible = false;
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //查看一个报修
    openReport(row) {
      vm.form = row;
      vm.option = false;
      vm.reportVisible = true;
    },
    //删除一个报修
    delReportFun(row) {
      const { appealId } = row;
      delReport({ id: appealId }).then((res) => {
        if (res.code === 0) {
          vm.getReportList();
          vm.$message.success(res.message);
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //分页
    currentReportChange() {
      vm.query.pageNumber = e;
      vm.getReportList();
    },
    /* 推送消息管理 */
    getMsgList() {
      selectMsg(vm.query).then((res) => {
        if (res.code === 0) {
          vm.msgData = res.data.records;
          vm.msgTotal = res.data.total;
        } else {
          vm.msgData = [];
          vm.msgTotal = 0;
        }
      });
    },
    //新增消息
    addMsgFun() {
      vm.resetQuery();
      vm.msgVisible = true;
    },
    handleMsgUrl(file) {
      if (file.code === 0) {
        vm.$message.success(file.message);
        const url = file.data.pathList[0];
        vm.form.filePath = url;
        vm.$set(vm.form);
      } else {
        vm.$message.error(file.message);
      }
    },
    //保存消息
    saveMsg() {
      let data;
      if (vm.option) {
        //新增
        data = addMsg(vm.form);
      } else {
        //修改
        data = updaMsg(vm.form);
      }

      data.then((res) => {
        if (res.code === 0) {
          vm.getMsgList();
          vm.$message.success(res.message);
          vm.msgVisible = false;
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //查看一个消息
    openMsg(row) {
      vm.form = row;
      vm.option = false;
      vm.msgVisible = true;
    },
    //删除一个消息
    delMsgFun(row) {
      const { msgId } = row;
      delMsg({ id: msgId }).then((res) => {
        if (res.code === 0) {
          vm.getMsgList();
          vm.$message.success(res.message);
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //分页
    currentMsgChange() {
      vm.query.pageNumber = e;
      vm.getMsgList();
    },
    /* 查询服务回访列表 */
    selectVisitList() {
      selectVisit(vm.query).then((res) => {
        if (res.code === 0) {
          vm.visitData = res.data.records;
          vm.visitTotal = res.data.total;
        } else {
          vm.visitData = [];
          vm.visitTotal = 0;
        }
      });
    },
    openVisit(row) {
      const { id } = row;
      vm.option = false;
      selectServerDetail({id}).then(res=>{
        if(res.code === 0){
          vm.form = res.data;
          vm.visitVisible = true;
        }else{
          vm.$message.error(res.message);
        }
      })
    },
    delVisitFun(row) {
      const { id } = row;
      delVisit({ id }).then((res) => {
        if (res.code === 0) {
          vm.selectVisitList();
          vm.$message.success(res.message);
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //保存 更新服务回访详细
    saveVisit() {
      updataVisit(vm.form).then((res) => {
        if (res.code === 0) {
          vm.selectVisitList();
          vm.$message.success(res.message);
          vm.visitVisible = false;
        } else {
          vm.$message.error(res.message);
        }
      });
    },

    /* 缴费记录 */
    addPayFun() {
      if (!vm.comContractId) {
        vm.$message.error("请选择一个合同进行缴费");
        return;
      }
      vm.form = {
        contractId: vm.comContractId,
      };
      vm.option = true;
      vm.payInfoVisible = true;
    },
    //保存缴费信息
    savePay() {
      let data;
      if (vm.option) {
        //新增
        data = addPayrecord(vm.form);
      } else {
        //修改
        data = updataPayrecord(vm.form);
      }
      data.then((res) => {
        if (res.code === 0) {
          vm.$message.success(res.message);
          vm.payInfoVisible = false;
        } else {
          vm.$message.error(res.message);
        }
      });
    },
    //合同多选
    handleContractSelection(e) {
      const { contractId } = e[0];
      if (contractId) vm.comContractId = contractId;
      else vm.comContractId = null;
    },
    //获取缴费信息
    getPayList(row) {
      const { contractId } = row;
      selectPayrecord({ contractId }).then((res) => {
        if (res.code === 0) {
          vm.payList = res.data;
          vm.payListVisible = true;
        }
      });
    },
    //获取缴费详细信息
    getPayInfo(row) {
      console.log(row);
      vm.option = false;
      const { payRecordId } = row;
      getByIdPay(payRecordId).then((res) => {
        if (res.code === 0) {
          vm.form = res.data;
          vm.payInfoVisible = true;
        }
      });
    },

    //切换TAB
    handleLeave(newId) {
      vm.query = {
        pageNumber: 1,
        pageSize: 20,
      };
      console.log(newId);
      if (newId !== vm.activeName) {
        vm.activeName = newId;
        switch (newId) {
          case "first":
            vm.getCustomerList();
            break;
          case "second":
            vm.getContractList();
            break;
          case "third":
            break;
          case "fourth":
            vm.getSeekingList();
            break;
          case "five":
            vm.getReportList();
            break;
          case "six":
            vm.selectVisitList();
            break;
          case "seven":
            vm.getMsgList();
            break;
          default:
            break;
        }
      }
    },
    querySearchAsync(queryString, cb) {
      const query = {
        customerName: queryString || null,
      };
      getIdContract(query).then((res) => {
        console.log(res);
        const { data } = res;
        console.log(typeof data);
        if (typeof data == "object") {
          data.forEach((v) => {
            v.value = v.customerName;
          });
          cb(res.data);
        }
      });
    },
    handleSelect(item) {
      const { customerName, customerId, contractCode, contractId } = item;
      vm.form.customerName = customerName;
      vm.form.customerId = customerId;
      if (contractCode) {
        vm.form.contractCode = contractCode;
      }
      if (contractId) {
        vm.form.contractId = contractId;
      }
    },
    //运行设备模态框关闭
    handleClose(done) {
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
  },
};
</script>


<style lang='scss'>
.main {
  .faqi {
    color: #cec551;
  }
  .banjie {
    color: #5bd66a;
  }
}
</style>