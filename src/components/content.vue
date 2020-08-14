<template>
  <div class="user-content">
       <span class="inner icon-lg-order"></span>
  </div>
</template>

<script>
import { getDishes } from 'api'

export default {
    name: 'user-content',
    components: {},
    data() {
        return {
            menu: []
         }
    },
    props: {},
    created() {
        getDishes().then((res) => {
            this.menu = res
            console.log(this.dishes)
        })
    },
    computed: {},
    methods: {}
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable.styl'

.user-content
    display:block
    height:30px
    width:100%
    .inner
        font-size: 160px
        color: $color-light-pink
</style>
