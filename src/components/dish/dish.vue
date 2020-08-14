<template>
<transition name="move" @after-leave="afterLeave" @after-enter="afterEnter">
  <div class="dish" v-show="visible">
      <cube-scroll ref="scroll">
          <div class="dish-content">
                <div class="image-header">
                    <img :src="dish.imageUrl" alt="">
                    <div class="back-btn" @click="hide">
                        <i class="icon-lg-aleft"></i>
                    </div>
                    <div class="simple-info">
                        <div class="name">{{dish.name}}</div>
                    </div>
                    <div class="dish-icon">
                        <lg-icon :size=16 :type=2 :subType=dish.dtype></lg-icon>
                        <lg-icon :size=16 :type=0 :subType=dish.ismeat></lg-icon>
                        <lg-icon :size=16 :type=1 :subType=dish.spicy></lg-icon>
                    </div>
                    <div class="desc">{{dish.desc}}</div>
                    <div class="btn-wrapper">
                        <pick-btn @adish="onAdd" :dish="dish"></pick-btn>
                    </div>
                </div>
                <holder></holder>
                <div class="ingredient-wrapper">
                    <div class="header">食材清单</div>
                    <div class="main">
                        <div class="text">主料：</div>
                        <div class="main-items">
                            <ul>
                                <li class="item" v-for="(item, index) in dish.main.split(';')" :key="index">
                                    {{item}}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="mix">
                        <div class="text">配料：</div>
                        <div class="mix-items">
                            <ul>
                                <li class="item" v-for="(item, index) in dish.mix.split(';')" :key="index">
                                    {{item}}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <holder></holder>
                <div class="step-wrapper">
                    <div class="header">制作步骤</div>
                    <div class="content">
                            <ul>
                                <li class="item" v-for="(item, index) in dish.step.split(';')" :key="index">
                                    <div class="bubble-wrapper">
                                        <bubble :num="index+1"></bubble>
                                    </div>
                                    <span class="text">{{item}}{{item}}</span>
                                </li>
                            </ul>
                    </div>
                </div>
                <holder></holder>
          </div>
      </cube-scroll>
  </div>
  </transition>
</template>

<script>
import popupMixin from 'common/mixin/popup'
import pickBtn from 'components/pick-btn/pick-btn'
import lgIcon from 'components/lg-icon/lg-icon'
import holder from 'components/holder/holder'
import bubble from 'components/bubble/bubble'

const EVENT_LEAVE = 'leave'
const EVENT_ADD = 'add'

export default {
    name: 'dish',
    mixins: [popupMixin],
    components: {
        pickBtn,
        lgIcon,
        holder,
        bubble
    },
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
    },
    methods: {
        afterEnter() {
             this.$nextTick(() => {
                this.$refs.scroll.refresh()
            })
        },
        onAdd(target) {
            this.$emit(EVENT_ADD, target)
        },
        afterLeave() {
            this.$emit(EVENT_LEAVE)
        }
    }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
.dish
    position:fixed
    top:0
    left:0
    width:100%
    bottom: 48px
    background: $color-background-ssss
    &.move-enter-active, &.move-leave-active
        transition: all 0.3s linear
    &.move-enter, &.move-leave-active
        transform: translate3d(100%, 0, 0)
        opacity: 0
    .dish-content
        width: 100%
        background: $color-background-ssss
        position: relative
        .image-header
            position: relative;
            background: $color-white
            img
                width:100%
            .back-btn
                width: 30px
                height: 30px
                position: absolute
                top: 10px
                left: 10px
                text-align: center
                font-size: $fontsize-medium
                line-height: 30px
                background: $color-background-s
                color: $color-white
                border-radius: 30px
                font-weight: 700
            .simple-info
                display:inline-block
                padding: 15px
                .name
                    font-size: $fontsize-large
                    color: $color-dark-grey
                    font-weight: 700
                .sinfo
                    font-size: $fontsize-small
                    color: $color-grey
                    margin-top: 5px
            .btn-wrapper
                height: 36px
                position: absolute
                right: 15px
                bottom: 56px
            .dish-icon
                padding: 0 15px
                display: flex
                .lg-icon-wrapper
                    padding-right: 10px
                padding-bottom: 15px
            .desc
                padding: 0 15px
                font-size: $fontsize-small
                color: $color-light-pink
                padding-bottom: 15px
        .ingredient-wrapper
            padding: 15px
            background-color: $color-white
            .header
                display: inline-block
                font-size: $fontsize-medium
                padding-bottom: 5px
                border-bottom: 2px solid $color-light-pink;
                margin-bottom: 10px;
            .main, .mix
                display: flex
                align-items: flex-start
                .text
                    font-size: $fontsize-small
                    color: $color-light-grey
                    flex: 0 0 40px
                    padding-top: 5px
                .main-items, .mix-items
                    ul
                        display: flex
                        flex-wrap: wrap
                        .item
                            font-size: $fontsize-small
                            padding: 4px 6px
                            border: 1px solid $color-light-grey
                            color: $color-dark-grey
                            margin-right: 5px
                            border-radius: 5px
                            margin-bottom: 5px
        .step-wrapper
            padding: 15px
            background-color: $color-white
            .header
                display: inline-block
                font-size: $fontsize-medium
                padding-bottom: 5px
                border-bottom: 2px solid $color-light-pink;
                margin-bottom: 10px;
            .content
                .item
                    margin-bottom:10px
                    display: flex;
                    align-items: flex-start;
                    .text
                        font-size: $fontsize-small
                        margin-left:8px
                        color:$color-dark-grey
                        line-height:$fontsize-small
                        padding-top: 4px
</style>
