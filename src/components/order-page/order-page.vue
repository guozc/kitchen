<template>
  <div class="order-page">
    <div class="scroll-list-wrap">
      <cube-scroll
        ref="orderScroll"
        :data="orders"
        :options="scrollOptions"
        @pulling-down="onPullingDown"
        >
        <div class="none-order" v-if="orders.length < 0">暂无订单</div>
        <ul class="order-list-wrapper">
          <li v-for="(order, index) in orders" class="order-item" :key="index" @click.stop="showOrder(order)">
              <div class="order-header border-bottom-1px">
                <span class="date">{{ order.date }}</span>
                <span class="interval">{{ order.interval == 0 ? "午餐" : "晚餐"}}</span>
              </div>
              <div class="order-user">
                <div class="text">点单用户：</div>
                <div class="avatar-wrapper">
                  <div class="avatar" v-for="(ouser) in getOrderUser(order.id)" :key="ouser.name">
                    <img :src="ouser.avatar" alt="">
                  </div>
                </div>
              </div>
              <div class="order-status" :class="{ 'confirm':order.status==2 }">
                {{order.status == 1 ? "待确认" : "已确认"}}
              </div>
          </li>
        </ul>
      </cube-scroll>
    </div>
</div>
</template>

<script>
import { getBills } from 'api'
export default {
    name: 'order-page',
    components: {
    },
    data() {
        return {
          orders: [],
          scrollOptions: {
              click: false,
              directionLockThreshold: 0
          },
          selectedOrder: {}
         }
    },
    props: {
      data: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    created() {
    },
    computed: {
      user() {
            return this.data.user
        }
    },
    methods: {
      onPullingDown() {
        console.log('执行下拉刷新')
        this.refreshOrder()
      },
      refreshOrder() {
        getBills(this.user).then((orders) => {
            this.orders = orders
            this.$refs.orderScroll.refresh()
        })
      },
      fetch() {
             if (!this.fetched) {
                this.fetched = true
                this.refreshOrder()
             }
        },
      getOrderUser(orderId) {
        let od = this.orders.filter((order) => {
          return order.id === orderId
        })
        od = od.length > 0 ? od[0] : []
        const allUser = []
        if (od.bills && od.bills.length > 0) {
          od.bills.forEach((bill) => {
            this.hasUser = false
            allUser.forEach((auser) => {
              if (auser.uid === bill.uid) {
                this.hasUser = true
              }
            })
            if (!this.hasUser) {
              allUser.push({
                uid: bill.uid,
                avatar: bill.avatar,
                name: bill.name
              })
            }
          })
        }
        return allUser
      },
      showOrder(sorder) {
          this.selectedOrder = sorder
          this.orderComp = this.orderComp || this.$createOrder({
              $props: {
                  order: 'selectedOrder'
              },
              $events: {
                leave: () => {
                }
              }
          })
          this.orderComp.show()
      }
    }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable.styl"

.order-page
  height:100%
  position:relative
  .scroll-list-wrap
        position: absolute
        top: 0
        bottom: 0
        left: 0
        right: 0
        background:$color-background-ssss
        padding:0 10px
    .none-order
        padding:20px 20px
        text-align: center
        font-size: $fontsize-medium
        color: $color-light-grey
    .order-list-wrapper
      .order-item
        font-size: $fontsize-small
        background: $color-white
        border-radius: 5px
        border: 1px solid #eee
        margin: 5px 0
        padding: 15px 15px
        position: relative;
        .order-header
          display:flex
          align-items: center
          padding-bottom:10px
          .date
            font-size: $fontsize-medium
            color: $color-light-pink
            padding: 5px 20px
            border-radius: 4px
            border: 1px solid $color-light-pink
            font-weight: 700
          .interval
            font-size: $fontsize-medium
            color: $color-light-pink
            padding: 5px 20px
            border-radius: 4px
            border: 1px solid $color-light-pink
            margin-left: 10px
        .order-user
          display:flex
          align-items:center
          margin-top: 10px
          align-items: flex-start
          .text
            font-size: $fontsize-small
            color: $color-light-grey
            line-height: 24px
          .avatar-wrapper
            flex-wrap: wrap
            display: flex
            .avatar
              margin-right:5px
              img
                border: 1px solid $color-light-grey
                border-radius: 20px
                width:20px
                height: 20px
        .order-status
          position:absolute
          right:15px
          top:20px
          color:$color-red
          &.confirm
            color:$color-green
</style>
