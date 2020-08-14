<template>
  <div class="bubble">{{num}}</div>
</template>

<script>
export default {
    name: 'bubble',
    components: {},
    data() {
        return {
         }
    },
    props: {
        num: Number,
        default() {
            return 0
        }
    },
    created() {},
    computed: {},
    methods: {}
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable.styl"

.bubble
    display: inline-block
    padding: 0 5px
    height: 16px
    line-height: 16px
    text-align: center
    border-radius: 16px
    font-weight: 700
    font-size: $fontsize-small
    color: $color-white
    background-color: $color-light-pink
</style>
