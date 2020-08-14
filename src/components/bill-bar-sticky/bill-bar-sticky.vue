<template>
  <div class="bill-bar-sticky" v-show="visible">
      <bill-bar
        ref="billBar"
        :selectedDishes = "selectedDishes"
        :isForSticky = "isForSticky"
        :order="order"
        :user="user"
      ></bill-bar>
  </div>
</template>

<script>
import billBar from 'components/bill-bar/bill-bar'
import popupMixin from 'common/mixin/popup'

export default {
    name: 'bill-bar-sticky',
    mixins: [popupMixin],
    components: {
        billBar
    },
    props: {
        isForSticky: {
            type: Boolean,
            default() {
                return true
            }
        },
        selectedDishes: {
            type: Array,
            default() {
                return []
            }
        },
        list: {
            type: Object,
            default() {
                return {}
            }
        },
        user: {
            type: Object,
            default() {
                return {}
            }
        },
        order: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    created() {},
    computed: {},
    methods: {
        drop(el) {
            this.$refs.billBar.drop(el)
        }
    },
    watch: {
        selectedDishes(val) {
            if (val.length < 1) {
                this.list.hide && this.list.hide()
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
.bill-bar-sticky
    position: absolute
    left: 0
    bottom: 0
    z-index: 999
    width: 100%
    height: 48px
</style>
