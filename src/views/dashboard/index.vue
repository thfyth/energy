<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">欢迎: {{ name }}</div> -->
    <el-card shadow="hover" class="mgb20" style="height: 252px">
      <div class="user-info">
        <img src="../../assets/img.jpg" class="user-avator" alt />
        <div class="user-info-cont">
          <div class="user-info-name">欢迎:{{ name }}</div>
          <!-- <div>{{roles}}</div> -->
        </div>
      </div>
    </el-card>
    <!-- <div class="dashboard-text">roles: <span v-for="(role,index) in roles" :key="index">{{ role }}</span></div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name", "roles"]),
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}
</style>
