<template>
  <div class="wscn-http404-container">
    <div class="wscn-http404">
      <div class="pic-404">
        <img class="pic-404__parent" style="width:600px" src="@/assets/404_images/404.png" alt="404">
      </div>
      
    </div>
  </div>
</template>

<script>

export default {
  name: 'Page404',
  computed: {
    message() {
      return '页面不存在'
    }
  }
}
</script>

<style lang="scss" scoped>
  .wscn-http404{
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 200px;
  }
</style>
