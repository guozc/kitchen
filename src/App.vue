<template>
  <div id="app">
    <lg-header></lg-header>
    <div class="tab-wrapper">
      <lg-tab :tabs="tabs"></lg-tab>
    </div>
  </div>
</template>

<script>
// import UserContent from 'components/content.vue'
import lgHeader from 'components/lg-header/lg-header'
import menuPage from 'components/menu-page/menu-page'
import orderPage from 'components/order-page/order-page'
import lgTab from 'components/lg-tab/lg-tab'
import { getUser } from 'api'

export default {
  name: 'App',
  components: {
    lgHeader,
    lgTab
  },
  data() {
    return {
      user: {}
    }
  },
  created() {
    this.user = getUser()
  },
  computed: {
    tabs() {
      return [
        {
          label: '点菜',
          component: menuPage,
          data: {
            user: this.user
          }
        },
        {
          label: '订单',
          component: orderPage,
          data: {
            user: this.user
          }
        }
      ]
    }
  }
}
</script>

<style lang="stylus">
#app
  .tab-wrapper
    position: fixed
    top: 100px
    left: 0
    right: 0
    bottom: 0
    >>> .cube-tab
      padding: 10px 0
      font-size: $fontsize-small
</style>
