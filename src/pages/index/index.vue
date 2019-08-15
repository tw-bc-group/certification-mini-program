<template>
  <div class="container">
    <div class="user-info-wrapper">
      <open-data class="user-info-avatar" type="userAvatarUrl"></open-data>
      <open-data class="user-info-nickname" type="userNickName"></open-data>
    </div>
    <div class="form-item" @click="goToMyCertificates">
      <p>我的证书</p>
      <img class="form-item-arrow-icon" :src="arrowImgPath"/>
    </div>
    <cac-button clazz="scan-btn" text="扫码添加证书" :click="scan"></cac-button>
  </div>
</template>

<script>
import userDefaultImgPath from '@/assets/images/user-default.png'
import arrowImgPath from '@/assets/images/right-arrow.png'
import CacButton from '@/components/cac-button'

export default {
  components: {
    CacButton
  },
  data () {
    return {
      userDefaultImgPath,
      arrowImgPath
    }
  },
  methods: {
    goToMyCertificates () {
      wx.navigateTo({ url: '../my-certificates/main' })
    },
    scan () {
      wx.scanCode({
        success: (res) => {
          this.jumpToCertDetailsPage(res.result)
        },
        fail: (error) => {
          console.log(error)
        }
      })
    },
    jumpToCertDetailsPage (qrCode) {
      wx.navigateTo({'url': `/pages/scanning-info/main?qrCode=${qrCode}`})
    }
  },
  onReady () {
    const scanParamFromRoot = this.$root.$mp.query.q
    if (scanParamFromRoot) {
      this.jumpToCertDetailsPage(decodeURIComponent(scanParamFromRoot))
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

