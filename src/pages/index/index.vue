<template>
  <div class="container">
    <div class="user-info-wrapper">
      <open-data class="user-info-avatar" type="userAvatarUrl"></open-data>
      <open-data class="user-info-nickname" type="userNickName"></open-data>
    </div>
    <div class="form-item" @click="goToMyCertificates">
      <img class="form-item-icon" :src="myCertIcon" />
      <p>我的证书</p>
      <img class="form-item-arrow-icon" :src="arrowImgPath"/>
    </div>
    <div class="related-link">相关链接</div>
    <div class="insight-container" @click="gotoDongjian">
      <p>CAC敏捷教练关联的小程序</p>
      <div class="insight-content">
        <img class="insight-icon" :src="insightsIcon"/>
        <div class="insight-text">
          <p class="title">ThoughtWorks洞见</p>
          <p class="description">ThoughtWorks洞见汇集了来自Thought…</p>
        </div>
        <div class="insight-btn">查看</div>
      </div>
    </div>
    <official-account style="width:100%;margin: 10px auto auto auto;"></official-account>
    <cac-button clazz="scan-btn" text="扫码添加证书" :click="scan"></cac-button>
  </div>
</template>

<script>
import userDefaultImgPath from '@/assets/images/user-default.png'
import arrowImgPath from '@/assets/images/right-arrow.png'
import CacButton from '@/components/cac-button'
import myCertIcon from '@/assets/images/my-cert.png'
import insightsIcon from '@/assets/images/insights.png'

export default {
  components: {
    CacButton
  },
  data () {
    return {
      userDefaultImgPath,
      arrowImgPath,
      myCertIcon,
      insightsIcon
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
    gotoDongjian () {
      wx.navigateToMiniProgram({
        appId: 'wx6ac335896f1078f1',
        path: 'pages/index/index',
        success (res) {
          console.log('打开成功', res)
        }
      })
    },
    jumpToCertDetailsPage (qrCode) {
      wx.navigateTo({'url': `/pages/scanning-info/main?qrCode=${qrCode}`})
    }
  },
  onReady () {
    console.log(process.env.NODE_ENV)
    console.log(process.env.LC_APP_ID)
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
      border-radius: 6px;
      border: solid 0.9px #CFCFCF;
      margin-top: 24px;

      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 14px;

      .form-item-icon {
        width: $form-height;
        height: $form-height;
      }

      p {
        height: 20px;
        font-size: 14px;
        color: #111111;
      }

      &-arrow-icon {
        width: $form-height;
        height: $form-height;
        margin: auto 0 auto auto;
      }
    }

    .related-link {
        height: 20px;
        font-size: 14px;
        color: #323232;
        margin: 30px auto 0 0;
    }

    .insight-container {
      width: 100%;
      height: 76px;
      border-radius: 2px;
      border: solid 0.9px #CFCFCF;

      margin-top: 10px;
      padding: 4px 11px 10px 7px;
      box-sizing: border-box;

      p {
        width: 100%;
        height: 22px;
        font-size: 9.2px;
        color: #b6b6b6;

        // margin: 4px auto auto 7px;
      }

      .insight-content {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        img {
          width: 35px;
          height: 34px;
          margin-top: 2px;
        }

        .insight-text {
          margin-left: 10px;

          .title {
            height: 22px;
            font-size: 14px;
            letter-spacing: 0.5px;
            color: #323232;
          }

          .description {
            height: 18px;
            font-size: 10px;
            letter-spacing: 0.39px;
            color: #828282;
          }
        }

        .insight-btn {
          width: 53px;
          height: 23px;
          line-height: 23px;
          border-radius: 2px;
          border: solid 1px #09bb07;

          font-size: 12px;
          text-align: center;
          color: #09bb07;

          margin: auto 0 auto auto;
        }
      }
    }
  }
</style>

