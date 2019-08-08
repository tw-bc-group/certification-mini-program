<template>
  <div class="container">
    <div class="user-info-wrapper">
      <open-data class="user-info-avatar" type="userAvatarUrl"></open-data>
      <open-data class="user-info-nickname" type="userNickName"></open-data>
    </div>
    <!-- <template v-if="!isLogin">
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
    </template> -->
    <div class="form-item" @click="goToMyCertificates">
      <p>我的证书</p>
      <img class="form-item-arrow-icon" :src="arrowImgPath"/>
    </div>
  </div>
</template>

<script>
import userDefaultImgPath from '@/assets/images/user-default.png'
import arrowImgPath from '@/assets/images/right-arrow.png'

export default {
  data () {
    return {
      userInfo: wx.getStorageSync('userInfo') || {},
      userDefaultImgPath,
      arrowImgPath
    }
  },
  onLoad () {
    wx.setNavigationBarTitle({ title: '我的' })
  },
  computed: {
    isLogin () {
      return Object.keys(this.userInfo).length > 0
    }
  },
  methods: {
    getUserInfo (e) {
      if (!e.target.userInfo) return

      this.userInfo = e.target.userInfo
      wx.setStorageSync('userInfo', this.userInfo)
    },
    goToMyCertificates () {
      wx.navigateTo({ url: '../my-certificates/main' })
    }
  }
}
</script>

<style lang="scss" scoped>
  $avatar-size: 60px;
  $form-height: 44px;
  $user-info-wrapper-width: 329px;
  $user-info-wrapper-height: 100px;

  .container {
    padding: 0 23px;

    .user-info-wrapper{
      width: 100%;
      height: $user-info-wrapper-height;
      padding: 20px 23px;

      display: flex;
      align-items: center;
      justify-content: flex-start;

      color: white;
      font-size: 14px;
      border-radius: 6px;
      box-sizing: border-box;
      background-image: url('~@/assets/images/user-profile-bg.png') ,linear-gradient(284deg, #f7a658, #eb4e44);
      background-repeat: no-repeat;
      background-size: $user-info-wrapper-width $user-info-wrapper-height;

      .user-info-avatar {
        width: $avatar-size;
        height: $avatar-size;

        border: 1px solid #fff;
        border-radius: 50%;
        overflow: hidden;
      }
      .user-info-nickname {
        margin-left: 16px;
        width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .form-item {
      width: 100%;
      height: $form-height;
      margin-top: 24px;

      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;

      &-arrow-icon {
        width: $form-height;
        height: $form-height;

        position: relative;
        right: -17px;
      }
    }
  }
</style>

