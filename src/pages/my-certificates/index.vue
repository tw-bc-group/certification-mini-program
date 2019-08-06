<template>
  <div>
    <div class="top-bar-wrapper">
      <img class="top-bar-delete" :src="deleteImgPath">
    </div>
    <scroll-view scroll-x scroll-with-animation @scroll="onScroll" :scroll-into-view="scrollViewIndex" class="certificate-gallery-wrapper">
      <div id="a0" class="certificate-gallery-item">
        <cac-simple-certificate>
        </cac-simple-certificate>
      </div>
      <div id="a1" class="certificate-gallery-item">
        <cac-simple-certificate>
        </cac-simple-certificate>
      </div>
      <div id="a2" class="certificate-gallery-item">
        <cac-simple-certificate>
        </cac-simple-certificate>
      </div>
    </scroll-view>
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
    onScroll (e) {
      console.log(e.target)
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
    width: 100%;
    height: 365px;
    padding: 0 44px;
    box-sizing: border-box;
    display: inline-block;
  }
</style>


