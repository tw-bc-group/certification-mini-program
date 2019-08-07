<template>
  <div>
    <div class="top-bar-wrapper">
      <img class="top-bar-delete" :src="deleteImgPath">
    </div>
    <swiper class="certificate-gallery-wrapper" previous-margin="32px" next-margin="32px">
      <swiper-item class="certificate-gallery-item" @click="test(1)">
        <cac-simple-certificate>
        </cac-simple-certificate>
      </swiper-item>
      <swiper-item class="certificate-gallery-item">
        <cac-simple-certificate>
        </cac-simple-certificate>
      </swiper-item>
      <swiper-item class="certificate-gallery-item">
        <cac-simple-certificate>
        </cac-simple-certificate>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import cacSimpleCertificate from '../../components/cac-simple-certificate'
import deleteImgPath from '../../../static/images/delete.png'

export default {
  components: {
    cacSimpleCertificate
  },
  data () {
    return {
      deleteImgPath,
      scrollIndex: 0
    }
  },
  computed: {
    scrollViewIndex () {
      return `a${this.scrollIndex}`
    }
  },
  methods: {
    test (e) {
      console.log('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
  $top-bar-height: 44px;

  .top-bar-wrapper {
    height: $top-bar-height;
    padding: 0 26px;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    .top-bar-delete {
      height: 20px;
      width: 20px;
    }
  }
  .certificate-gallery-wrapper {
    width: 100%;
    height: 365px;
    margin-top: 48px;
    white-space: nowrap;
  }
  .certificate-gallery-item {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>


