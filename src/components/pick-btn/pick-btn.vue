<template>
  <div class="pick-btn" :class="{'pick-selected':this.dish.selected }" @click.stop="toggle">
      {{ text }}
  </div>
</template>

<script>
import clickTimeMixin from 'common/mixin/clicktime'
const EVENT_ADD_DISH = 'adish'
const EVENT_REMOVE_DISH = 'rdish'

export default {
    name: 'pick-btn',
    mixins: [clickTimeMixin],
    components: {},
    data() {
        return {
         }
    },
    props: {
        dish: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    created() {},
    computed: {
        text() {
            return this.dish.selected ? '取消' : '点菜'
        }
    },
    methods: {
        toggle(event) {
            if (!this.checkClickTime()) return
            if (this.dish.selected) {
                this.removeDish()
            } else {
                this.addDish(event)
            }
            this.dish.selected = !this.dish.selected
        },
        addDish(event) {
            this.$emit(EVENT_ADD_DISH, event.target)
        },
        removeDish() {
            this.$emit(EVENT_REMOVE_DISH)
        }
    }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable.styl"

.pick-btn
    padding: 5px 10px
    background-color: $color-light-pink
    border: 1px solid $color-light-pink
    color: $color-white
    border-radius: 5px
    font-size: $fontsize-small
    &.pick-selected
        background-color: $color-white
        color: $color-light-pink
</style>
