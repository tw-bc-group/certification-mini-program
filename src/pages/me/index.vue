<template>
  <div class="container">
    <template v-if="!isLogin">
      <button class='user-info-wrapper' open-type="getUserInfo" @getuserinfo='getUserInfo'>
        <img class="user-info-avatar" :src="userDefaultImgPath" />
        <p class="user-info-nickname">请点击登录</p>
      </button>
    </template>
    <template v-else>
      <div class="user-info-wrapper">
        <img class="user-info-avatar" :src="userInfo.avatarUrl" />
        <p class="user-info-nickname">{{ userInfo.nickName }}</p>
      </div>
    </template>
    <div class="form-item">
      <p>我的证书</p>
      <img class="form-item-arrow-icon" :src="arrowImgPath"/>
    </div>
  </div>
</template>

<script>
import userDefaultImgPath from '../../../static/images/user-default.png'
import arrowImgPath from '../../../static/images/right-arrow.png'

export default {
  data: {
    userInfo: wx.getStorageSync('userInfo') || {},
    userDefaultImgPath,
    arrowImgPath
  },
  computed: {
    isLogin: function () {
      return Object.keys(this.userInfo).length > 0
    }
  },
  methods: {
    getUserInfo (e) {
      if (!e.target.userInfo) return

      this.userInfo = e.target.userInfo
      wx.setStorageSync('userInfo', this.userInfo)
    }
  },
  onLoad () {
    wx.setNavigationBarTitle({ title: '我的' })
  }
}
</script>

<style lang="scss" scoped>
  $avatar-size: 60px;
  $form-height: 44px;

  .container {
    width: 100%;
    padding: 0 23px;

    .user-info-wrapper{
      width: 100%;
      height: 100px;
      box-sizing: border-box;
      font-size: 14px;

      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 20px 23px;

      .user-info-avatar {
        width: $avatar-size;
        height: $avatar-size;
        border: 0;
        border-radius: 50%;
      }
      .user-info-nickname {
        margin-left: 16px;
      }
    }

    .form-item {
      width: 100%;
      height: $form-height;
      box-sizing: border-box;

      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      margin-top: 24px;

      &-arrow-icon {
        position: relative;
        width: $form-height;
        height: $form-height;
        right: -17px;
      }
    }
  }
</style>

