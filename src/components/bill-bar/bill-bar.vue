<template>
  <div class="bill-bar" ref="realBillBar">
      <div class="content" @click.stop="toggleList">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight':total>0}">
                        <i class="icon-lg-order"></i>
                    </div>
                    <div class="num" v-show="total > 0">
                        <bubble :num=total></bubble>
                    </div>
                </div>
                <div class="bill-info border-left-1px" v-if="!order.id">暂无用餐信息</div>
                <div class="bill-info border-left-1px highlight" v-if="order.id">
                    <span>{{order.date}}</span>
                    <span class="interval">{{order.interval === 0 ? '午餐' : '晚餐'}}</span>
                </div>
            </div>
            <div class="content-right">
                <div class="confirm enough" v-if="!order.id" @click.stop="showInvite">
                    输入用餐码
                </div>
                 <div class="confirm" v-if="order.id" :class="{'enough':selectedDishes.length>0}" @click.stop="postBill">
                    {{submitText}}
                </div>
            </div>
      </div>
      <div class="ball-container">
            <div v-for="(ball, index) in balls" :key="index">
                <transition
                    @before-enter="beforeDrop"
                    @enter="dropping"
                    @after-enter="afterDrop"
                >
                    <div class="ball" v-show="ball.show">
                        <div class="inner inner-hook"></div>
                    </div>
                </transition>
            </div>
        </div>
  </div>
</template>

<script>
import Bubble from 'components/bubble/bubble'
import { getOrderByInvite, saveBill } from 'api'
const EVENT_ORDER_READY = 'order_ready'
const EVENT_BILL_READY = 'bill_ready'

const BALL_LEN = 10
function createBalls() {
    const ret = []
    for (let i = 0; i < BALL_LEN; i++) {
        ret.push({ show: false })
    }
    return ret
}

export default {
    name: 'bill-bar',
    components: {
        Bubble
    },
    data() {
        return {
            balls: createBalls(),
            hasShowList: this.isForSticky
         }
    },
    props: {
        isForSticky: {
            type: Boolean,
            default() {
                return false
            }
        },
        selectedDishes: {
            type: Array,
            default() {
                return []
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
    created() {
        this.dropBalls = []
    },
    computed: {
        total() {
            return this.selectedDishes.length
        },
        submitText() {
           return this.total > 0 ? '确认点单' : '请点菜'
        }
    },
    methods: {
        postBill() {
            if (!this.user.openid || this.total < 1 || !this.order.id) return
            const billData = {}
            billData.user = this.user
            billData.dishes = this.selectedDishes
            billData.order = this.order
            console.log(JSON.stringify(billData))
            this._showToast()
            saveBill(billData).then(() => {
                this.$createDialog({
                    type: 'alert',
                    title: '点单成功提交',
                    content: '主厨会参考您的选择准备菜品，可在订单中查看状态',
                    icon: 'cubeic-right'
                }).show()
                this._hideToast()
                this.$emit(EVENT_BILL_READY)
            })
        },
        showAlert(text) {
            this.$createDialog({
                type: 'alert',
                title: '用餐码无效',
                content: text,
                icon: 'cubeic-alert'
            }).show()
        },
        showInvite() {
            this.$createDialog({
                type: 'prompt',
                title: '输入用餐码',
                prompt: {
                    value: '',
                    placeholder: '点击输入'
                },
                onConfirm: (e, invite) => {
                    const gobiData = {}
                    gobiData.invite = invite
                    gobiData.openid = this.user.openid
                    this._showToast()
                    getOrderByInvite(gobiData).then((res) => {
                        this._hideToast()
                        // this.order = {}
                        if (res.id) {
                            this.$emit(EVENT_ORDER_READY, res)
                            this.$createDialog({
                                type: 'alert',
                                title: '用餐信息确认',
                                content: `${res.date}  ${res.interval === 0 ? '午餐' : '晚餐'}`,
                                icon: 'cubeic-right'
                            }).show()
                        } else {
                            this.showAlert(res)
                        }
                    })
                }
            }, false).show()
        },
        drop(el) {
            for (let i = 0; i < this.balls.length; i++) {
                const ball = this.balls[i]
                if (!ball.show) {
                    ball.show = true
                    ball.el = el
                    this.dropBalls.push(ball)
                    return
                }
            }
            console.log(123)
        },
        beforeDrop(el) {
            const ball = this.dropBalls[this.dropBalls.length - 1]
            const rect = ball.el.getBoundingClientRect()
            const x = rect.left - 32
            const y = -(window.innerHeight - rect.top - 22)
            el.style.display = ''
            el.style.transform = el.style.webkitTransfrom = `translate3d(0, ${y}px, 0)`
            const inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.transform = inner.style.webkitTransfrom = `translate3d(${x}px, 0, 0)`
        },
        dropping(el, done) {
            this._redraw = el.offsetHeight //    offsetHeight触发强制重绘
            el.style.transform = el.style.webkitTransfrom = 'translate3d(0, 0, 0)'
            const inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.transform = inner.style.webkitTransfrom = 'translate3d(0, 0, 0)'
            el.addEventListener('transitionend', done)
        },
        afterDrop(el) {
            const ball = this.dropBalls.shift()
            if (ball) {
                ball.show = false
                el.style.display = 'none'
            }
        },
        toggleList() {
            if (this.hasShowList) {
                this._hideBillList()
            } else {
                if (this.total < 1) return
                this._showBillList()
                this._showBillBarSticky()
                this.hasShowList = true
            }
        },
        _showBillList() {
            this.billListComp = this.billListComp || this.$createBillList({
                $props: {
                    selectedDishes: 'selectedDishes'
                },
                $events: {
                    leave: () => {
                        this._hideBillBarSticky()
                    }
                }
            })
            this.billListComp.show()
        },
        _hideBillList() {
            const comp = this.isForSticky ? this.$parent.list : this.billListComp
            comp.hide && comp.hide()
        },
        _showBillBarSticky() {
            this.billBarStickyComp = this.billBarStickyComp || this.$createBillBarSticky({
                $props: {
                    selectedDishes: 'selectedDishes',
                    list: this.billListComp,
                    order: 'order',
                    user: 'user'
                }
            })
            this.billBarStickyComp.show()
        },
        _hideBillBarSticky() {
            this.hasShowList = false
            this.billBarStickyComp.hide()
        },
        _showToast() {
            this.toastComp = this.toastComp || this.$createToast({
                txt: '提交中',
                time: 0,
                mask: true
            })
            this.toastComp.show()
        },
        _hideToast() {
             this.toastComp && this.toastComp.hide()
        }
    }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable.styl"
.bill-bar
    height:100%
    .content
        display: flex
        background-color: $color-grey-lg
        font-size: 0
        color: $color-light-grey
        .content-left
            flex:1
            .logo-wrapper
                display: inline-block
                vertical-align: top
                position: relative
                top: -10px
                margin: 0 12px
                padding: 6px
                width: 56px
                height: 56px
                box-sizing: border-box
                border-radius: 50%
                background: $color-grey-lg
                .logo
                    width: 100%
                    height: 100%
                    border-radius: 50%
                    text-align: center
                    background: $color-light-grey
                    &.highlight
                        background: $color-dark-pink
                    .icon-lg-order
                        line-height: 23px
                        font-size:40px
                        color:$color-white
                        &.highlight
                            color: $color-light-pink
                .num
                    position: absolute
                    top: 0
                    right: 0
            .bill-info
                display:inline-block
                position:relative
                margin-top:12px
                line-height: 24px
                padding-left:12px
                font-size:$fontsize-small-s
                .interval
                    margin-left:10px
                &.highlight
                    color:$color-white
        .content-right
            flex: 0 0 100px
            width: 100px
            .confirm
                height: 48px
                line-height: 48px
                text-align: center
                font-size: $fontsize-medium
                background: $color-light-grey
                color: $color-white
                &.not-enough
                    background: $color-dark-grey
                &.enough
                    background: $color-dark-pink
                    color:$color-white
    .ball-container
        .ball
            position: fixed
            left: 32px
            bottom: 22px
            z-index: 200
            transition: all .4s cubic-bezier(.25,-0.25,1,.01)
            .inner
                width: 16px
                height: 16px
                border-radius: 16px
                background: $color-light-pink
                transition: all .4s linear
</style>
