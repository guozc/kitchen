<template>
  <div class="content-wrapper">
    <div class="scroll-nav-wrapper">
          <cube-scroll-nav
            :side=true
            :data="menu"
            :options="scrollOptions"
            ref="dishScroll"
            >
                <template slot="bar" slot-scope="props">
                    <cube-scroll-nav-bar
                        direction="vertical"
                        :current="props.current"
                        :labels="props.labels"
                        :txts="barTxts"
                    >
                        <template slot-scope="props">
                            <div class="text">
                                <lg-icon :size=16 :type=2 :showLabel=false :subType=props.txt.dtype></lg-icon>
                                <span class="name">{{props.txt.name}}</span>
                                <span class="num" v-if="props.txt.count">
                                    <bubble :num="props.txt.count"></bubble>
                                </span>
                            </div>
                        </template>
                    </cube-scroll-nav-bar>
                </template>
                <cube-scroll-nav-panel
                v-for="subMenu in menu"
                :key="subMenu.name"
                :label="subMenu.name"
                :title="subMenu.name"
                >
                    <ul>
                        <li v-for="dish in subMenu.dishes" :key="dish.name" class="dish-item" @click="showDish(dish)">
                            <div class="icon">
                                <img :src="dish.imageUrl" width="57" height="57" alt="">
                            </div>
                            <div class="content">
                                <h2 class="name">{{dish.name}}</h2>
                                <div class="menu-icon-wrapper">
                                     <lg-icon :size=12 :type=0 :subType=dish.ismeat></lg-icon>
                                     <lg-icon :size=12 :type=1 :subType=dish.spicy></lg-icon>
                                </div>
                                <div v-if="dish.desc.length<12" class="desc">{{dish.desc}}</div>
                            </div>
                            <div class="pick-btn-wrapper">
                                <pick-btn @adish="onAdd" :dish="dish"></pick-btn>
                            </div>
                        </li>
                    </ul>
                </cube-scroll-nav-panel>
          </cube-scroll-nav>
      </div>
      <div class="bill-bar-wrapper">
          <bill-bar
          ref="billBar"
          :selectedDishes="selectedDishes"
          :user="user"
          :order="order"
          @order_ready="orderReady"
          @bill_ready="billReady"
          >
          </bill-bar>
      </div>
  </div>
</template>

<script>
import { getDishes } from 'api'
import lgIcon from 'components/lg-icon/lg-icon'
import pickBtn from 'components/pick-btn/pick-btn'
import billBar from 'components/bill-bar/bill-bar'
import Bubble from 'components/bubble/bubble'

export default {
    name: 'menu-page',
    components: {
        lgIcon,
        pickBtn,
        billBar,
        Bubble
    },
    data() {
        return {
            menu: [],
            scrollOptions: {
                click: false,
                directionLockThreshold: 0
            },
            selectedDish: {},
            order: {}
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
        barTxts() {
            const ret = []
            this.menu.forEach((submenu) => {
                const { dtype, name, dishes } = submenu
                let count = 0
                dishes.forEach((dish) => {
                    if (dish.selected) {
                        count++
                    }
                })
                ret.push({ dtype, name, count })
            })
            return ret
        },
        selectedDishes() {
            const ret = []
            this.menu.forEach((subMenu) => {
                subMenu.dishes.forEach((dish) => {
                    if (dish.selected === true) {
                        ret.push(dish)
                    }
                })
            })
            return ret
        },
        user() {
            return this.data.user
        }
    },
    methods: {
        billReady() {
            this.order = {}
            this.menu.forEach((subMenu) => {
                subMenu.dishes.forEach((dish) => {
                    dish.selected = false
                })
            })
        },
        orderReady(order) {
            console.log(order)
            this.order = order
        },
        fetch() {
             if (!this.fetched) {
                this.fetched = true
                getDishes().then((menu) => {
                    this.menu = menu
                    this.$refs.dishScroll.refresh()
                })
             }
        },
        onAdd(el) {
            this.$refs.billBar.drop(el)
        },
        showDish(dish) {
            this.selectedDish = dish
            this._showDish()
            this._showBillBarSticky()
        },
        _showDish() {
            this.dishComp = this.dishComp || this.$createDish({
                $props: {
                    dish: 'selectedDish'
                },
                $events: {
                    leave: () => {
                        this.billBarStickyComp.hide()
                    },
                    add: (target) => {
                        this.billBarStickyComp.drop(target)
                    }
                }
            })
            this.dishComp.show()
        },
        _showBillBarSticky() {
           this.billBarStickyComp = this.billBarStickyComp || this.$createBillBarSticky({
                $props: {
                    selectedDishes: 'selectedDishes',
                    isForSticky: false,
                    order: 'order',
                    user: 'user'
                }
            })
            this.billBarStickyComp.show()
        },
        _hideBillBarSticky() {
            this.billBarStickyComp.hide()
        }
    }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable.styl"
.content-wrapper
    position: relative
    height: 100%
    >>> .cube-scroll-nav-bar
        width: 80px
        white-space: normal
        overflow-x: hidden
    >>> .cube-scroll-nav-bar-item
        padding: 0 10px
        display: flex
        align-items: center
        height: 54px
        font-size: $fontsize-small
        background-color: $color-background-ssss
        .num
            position: absolute;
            top: -10px;
            right: -15px;
        .text
            position:relative
            display:flex
            align-items: center
            .name
                padding: 0 4px
    >>> .cube-scroll-nav-bar-item_active
        background: $color-white
        color: $color-dark-grey
    >>> .cube-scroll-nav-panel-title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid $color-light-pink
        font-size: $fontsize-small
        color: $color-grey
        background: $color-background-ssss
    >>> .cube-scroll-wrapper
        width: 80px
        background-color: $color-background-ssss
    >>> .cube-scroll-nav-panel
        background-color: $color-white
    .scroll-nav-wrapper
        position: absolute
        top: 0
        width:100%
        bottom: 48px
        left: 0
        .dish-item
            display: flex
            margin: 18px
            padding-bottom: 18px
            position: relative
            background-color: $color-white
            align-items: center;
            &:last-child
                border-none()
                margin-bottom: 0
            .icon
                flex: 0 0 57px
                margin-right: 10px
                img
                    height: auto
            .content
                flex: 1
                .name
                    margin: 2px 0 8px 0
                    height: 14px
                    line-height: 14px
                    font-size: $fontsize-medium
                    color: $color-dark-grey
                .desc
                    line-height: 10px
                    font-size: $fontsize-small-s
                    color: $color-light-grey
                    line-height: 12px
                    margin-bottom: 8px
                    color: $color-light-pink
                .menu-icon-wrapper
                    display: flex
                    align-items: center
                    margin-bottom:8px
            .pick-btn-wrapper
                position:absolute
                right:0
.bill-bar-wrapper
    position: absolute
    bottom: 0
    left: 0
    right: 0
    width: 100%
    height: 48px
    z-index: 50
</style>
