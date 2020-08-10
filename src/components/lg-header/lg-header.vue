<template>
  <div class="lg-header">
      <div class="logo"></div>
  </div>
</template>

<script>
export default {
    name: 'lg-header',
    components: {},
    data() {
        return {
         }
    },
    props: {},
    created() {},
    computed: {},
    methods: {}
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/mixin.styl"
@import "~common/stylus/variable.styl"

.lg-header
    width: 100%
    height:125px
    background-color: $color-grey-lg
    .logo
        width: 300px
        height: 125px
        margin: 0 auto
        background-size: 300px 125px
        bg-image('logo')
</style>
