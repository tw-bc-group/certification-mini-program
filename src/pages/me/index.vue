<template>
  <div class="container">
    <div class="user-info-wrapper">
      <img class="user-info-avatar" :src="userInfo.avatarUrl" />
      <p class="user-info-nickname">{{ userInfo.nickName }}</p>
    </div>
    <div class="form-item">我的证书</div>
  </div>
</template>

<script>

export default {
  data: {
    userInfo: {}
  },
  methods: {

  },
  onShow () {
    wx.getUserInfo({
      withCredentials: false,
      success: res => {
        this.userInfo = res.userInfo
      },
      fail: () => {},
      complete: () => {}
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding: 0 20px;

  .user-info-wrapper{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;

    .user-info-avatar {
      width: 80px;
      height: 80px;
      border: 0;
      border-radius: 50%;
    }
    .user-info-nickname {
      margin-top: 10px;
    }
  }

  .form-item {
    width: 100%;
    padding: 10px;
    border-style: solid;
    border-color: black;
    border-width: 0 0 1px 0;
  }
}
</style>

