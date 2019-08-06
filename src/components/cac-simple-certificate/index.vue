<template>
  <div class="simple-certificate-wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .simple-certificate-wrapper {
    width: 100%;
    height: 365px;

    border-radius: 6.3px;
    box-shadow: 0 0 11px 0 rgba(0, 0, 0, 0.2);
    background-color: #f39f54;
    color: white;
  }
</style>
