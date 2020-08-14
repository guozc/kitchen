<template>
    <transition name="fade">
        <cube-popup
            type="bill-list"
            :mask="true"
            @mask-click="maskClick"
            position="bottom"
            :z-index=90
            v-show="visible"
        >
            <transition name="move" @after-leave="afterLeave">
                <div v-if="visible">
                    <div class="list-header">
                        <h1 class="title">点单信息</h1>
                        <span class="empty" @click.stop="empty">清空</span>
                    </div>
                    <cube-scroll class="list-content" ref="listContent">
                        <ul>
                            <li class="dish border-bottom-1px" v-for="(dish, index) in selectedDishes" :key="index">
                                <span class="name">{{ dish.name }}</span>
                                <lg-icon :size=12 :type=2 :subType=dish.dtype></lg-icon>
                                <div class="pick-btn-wrapper">
                                    <pick-btn :dish="dish"></pick-btn>
                                </div>
                            </li>
                        </ul>
                    </cube-scroll>
                </div>
            </transition>
        </cube-popup>
    </transition>
</template>

<script>
import pickBtn from 'components/pick-btn/pick-btn'
import LgIcon from 'components/lg-icon/lg-icon'
import popupMixin from 'common/mixin/popup'

const EVENT_LEAVE = 'leave'
const EVENT_ADD = 'add'
export default {
    name: 'bill-list',
    components: {
        pickBtn,
        LgIcon
    },
    mixins: [popupMixin],
    props: {
        selectedDishes: {
            type: Array,
            default() {
                return []
            }
        }
    },
    created() {},
    computed: {
    },
    methods: {
        maskClick() {
            this.hide()
        },
        afterLeave(target) {
            this.visible = false
            this.$emit(EVENT_LEAVE, target)
        },
        empty() {
            this.dialogComp = this.dialogComp || this.$createDialog({
                type: 'confirm',
                title: '清空点单？',
                confirmBtn: {
                    text: '确定',
                    active: true,
                    disabled: false,
                    href: 'javascript:;'
                },
                cancelBtn: {
                    text: '取消',
                    active: false,
                    disabled: false,
                    href: 'javascript:;'
                },
                onConfirm: () => {
                    this.selectedDishes.forEach((dish) => {
                        dish.selected = false
                    })
                }
            })
            this.dialogComp.show()
        },
        onAdd(el) {
            console.log(123123)
            this.$emit(EVENT_ADD, el)
        }
    }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"

.cube-bill-list
    bottom:48px
    &.fade-enter, &.fade-leave-to
        opacity: 0
    &.fade-enter-active, &.fade-leave-active
        transition: all .3s ease-in-out
    .move-enter, .move-leave-to
        transform: translate3d(0, 100%, 0)
    .move-enter-active, .move-leave-active
        transition: all .3s ease-in-out
    .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: $color-background-ssss
        .title
            float:left
            font-size: $fontsize-medium
            color: $color-dark-grey
        .empty
            float:right
            font-size: $fontsize-medium
            color: $color-dark-pink
    .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: $color-white
        .dish
            padding: 12px 0
            position: relative
            box-sizing: border-box
            .name
                font-size: $fontsize-medium
                line-height: 24px
                color: $color-dark-grey
            .price
                position: absolute
                right: 90px
                bottom: 12px
                line-height: 24px
                font-size: $fontsize-medium
                font-weight: 700
                color: $color-red
            .pick-btn-wrapper
                position: absolute
                right: 12px
                top: 18px
</style>
