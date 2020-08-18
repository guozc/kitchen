<template>
  <div class="admin-page">
      <div class="order-wrapper">
          <cube-scroll
            ref="orderScroll"
            :data="orders"
            :options="scrollOptions"
            >
            <ul>
                <li class="order-item" v-for="(order, index) in orders" :key="index" @click.stop="showOrder(order)">
                    <div class="order-info">
                        <div class="time">
                            <span class="date">{{order.date}}</span>
                            <span class="interval">{{order.interval === 0 ? '午餐' : '晚餐'}}</span>
                            <span class="status" :class="{'highlight':order.status === 1 ,'confirm':order.status === 2}">{{getStatusLabel(order.status)}}</span>
                        </div>
                        <div class="invite">
                            <span class="text">邀请码：{{order.invite}}</span>
                        </div>
                        <div class="btn-wrapper">
                            <div class="remove-order-btn" v-if="order.status===0" >删除订单</div>
                            <div class="share-order-btn" v-if="order.status===1" @click.stop="setShare(order)">设置分享</div>
                            <div class="cancel-order-btn" v-if="order.status===1" @click.stop="cancelOrder(order)">取消订单</div>
                        </div>
                    </div>
                </li>
            </ul>
          </cube-scroll>
      </div>
      <div class="add-order-wrapper border-top-1px">
          <div class="add-btn" @click.stop="addOrder">新增订单</div>
      </div>
  </div>
</template>

<script>
import { getAllOrders, changeOrderStatus } from 'api'

export default {
    name: 'admin-page',
    components: {},
    data() {
        return {
            orders: [],
            scrollOptions: {
                click: false,
                directionLockThreshold: 0
            },
            selectedOrderId: 0,
            title: '',
            content: ''
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
    created() {},
    computed: {
        admin() {
            return this.data.user
        },
        wx() {
            return this.data.wx
        }
    },
    methods: {
        setShare(order) {
            const title = '老郭邀请您赴宴'
            const desc = `${order.date} ${order.interval === 0 ? '午餐' : '晚餐'}`

            this.$createDialog({
                type: 'alert',
                title: '设置分享',
                content: desc,
                onConfirm: () => {
                     this.wx.onMenuShareAppMessage({
                        title: title, // 分享标题
                        desc: desc, // 分享描述
                        link: `http://h5.whalesgeek.net/lg_kitchen/index.html?invite=${order.invite}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: 'http://h5.whalesgeek.net/lg_kitchen/icon.png' // 分享图标
                    })
                }
            }).show()
        },
        cancelOrder(order) {
            this.cancelDialogComp = this.cancelDialogComp || this.$createDialog({
                type: 'confirm',
                icon: 'cubeic-alert',
                title: '确认取消订单',
                content: `${order.date} ${order.interval === 0 ? '午餐' : '晚餐'}`,
                onConfirm: () => {
                    changeOrderStatus(order).then((res) => {
                        this.refreshOrders()
                    })
                }
            })
            this.cancelDialogComp.show()
        },
        fetch() {
            this.refreshOrders()
        },
        addOrder() {
            this.addOrderComp = this.addOrderComp || this.$createAddOrder({
                $props: {
                    admin: 'admin'
                },
                $events: {
                    leave: () => {
                        this.refreshOrders()
                    }
                }
            })
            this.addOrderComp.show()
        },
        getStatusLabel(status) {
            if (status === 0) return '已取消'
            if (status === 1) return '待确认'
            return '已确认'
        },
        refreshOrders() {
            getAllOrders(this.admin).then((orders) => {
                this.orders = orders
            })
        },
        showOrder(order) {
            this.selectedOrderId = order.id
            this.adminOrderComp = this.adminOrderComp || this.$createAdminOrder({
                $props: {
                    orderId: 'selectedOrderId'
                },
                $events: {
                    leave: () => {
                        this.refreshOrders()
                    }
                }
            })
            this.adminOrderComp.show()
        }
    }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'

.admin-page
    height:100%
    position:relative
    background: $color-background-ssss
    width:100%
    .add-order-wrapper
        position:absolute
        bottom:0
        left:0
        right:0
        background:$color-white
        text-align:center
        padding: 15px 15px
        .add-btn
            background:$color-dark-pink
            padding:10px 0
            color:$color-white
            font-size:$fontsize-medium
    .order-wrapper
        position: absolute
        top: 0
        bottom: 64px
        left: 0
        right: 0
        background:$color-background-ssss
        padding:0 10px
        .order-item
            padding: 15px
            background: $color-white
            border-radius: 5px
            margin-top:5px
            border: 1px solid #eee
            position:relative
            .order-info
                display:block
                .time
                    display:block
                    padding:3px 0
                    .date, .interval, .status
                        font-size:$fontsize-small
                        padding: 3px 10px
                        color:$color-light-pink
                        border: 1px solid $color-light-pink
                        border-radius: 4px
                        margin-right:5px
                    .status
                        border: 0px
                        color:$color-grey
                        &.highlight
                            color:$color-dark-pink
                        &.confirm
                            color:$color-green
            .invite
                display:block
                margin-top:10px
                .text
                    font-size: $fontsize-small
                    color:$color-light-grey
                    padding: 3px 10px
                    // border: 1px solid $color-dark-pink
                    border-radius: 4px
            .remove-order-btn, .cancel-order-btn
                position:absolute
                right:15px
                top:15px
                padding:5px 10px
                background:$color-light-pink
                font-size:$fontsize-small
                color:$color-white
                border-radius: 4px
            .share-order-btn
                position:absolute
                right:15px
                top:45px
                padding:5px 10px
                background:$color-light-pink
                font-size:$fontsize-small
                color:$color-white
                border-radius: 4px
</style>
