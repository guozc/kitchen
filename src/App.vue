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
import adminPage from 'components/admin-page/admin-page'
import lgTab from 'components/lg-tab/lg-tab'
import { getUser, adminOpenid, getWxConfig } from 'api'
import wx from 'weixin-js-sdk'

export default {
  name: 'App',
  components: {
    lgHeader,
    lgTab
  },
  data() {
    return {
      user: {},
      wx: wx
    }
  },
  created() {
    this.user = getUser()
    getWxConfig().then((config) => {
      this.wx.config({
        debug: false,
        appId: config.appId,
        timestamp: config.timestamp,
        nonceStr: config.nonceStr,
        signature: config.signature,
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage'
        ]
      })
      this.wx.ready(() => {
        // 设置朋友圈分享
        this.wx.onMenuShareTimeline({
          title: '老郭私厨',
          link: 'http://h5.whalesgeek.net/lg_kitchen/',
          imgUrl: 'http://h5.whalesgeek.net/lg_kitchen/icon.png'
        })
        // 设置分享朋友
        this.wx.onMenuShareAppMessage({
          title: '老郭私厨', // 分享标题
          desc: '请联系老郭获取用餐码', // 分享描述
          link: 'http://h5.whalesgeek.net/lg_kitchen/index.html', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'http://h5.whalesgeek.net/lg_kitchen/icon.png' // 分享图标
        })
      })
    })
  },
  computed: {
    tabs() {
      const defaultTab = [
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
      if (this.user.openid === adminOpenid) {
        defaultTab.push({
          label: '管理',
          component: adminPage,
          data: {
            user: this.user,
            wx: this.wx
          }
        })
      }
      return defaultTab
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
