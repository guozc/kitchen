<template>
    <div class="lg-icon-wrapper">
        <div class="lg-icon" :class="iconClass"></div>
        <div v-if="this.showLabel" class="text">{{text}}</div>
    </div>
</template>

<script>
const dishText = [
        ['素菜', '荤素搭配', '荤菜'],
        ['不辣', '微辣', '中辣', '非常辣'],
        ['空缺', '凉菜', '热菜', '靓汤', '主食', '小吃']
    ]
export default {
    name: 'lg-icon',
    components: {},
    props: {
        size: {
            type: Number,
            default() {
                return 12
            }
        },
        // 0:是否是肉 1:是否辣 2:食物类型
        type: {
            type: Number
        },
        // 0:素菜 1:荤素 2:荤菜
        // 0:不辣 1:微辣 2:中辣 3:非常辣
        // 1:凉菜 2:热菜 3:汤 4:主食 5:小吃
        subType: {
            type: Number
        },
        showLabel: {
            type: Boolean,
            default() {
                return true
            }
        }
    },
    created() {
    },
    computed: {
        iconClass() {
            const classMap = ['ismeat', 'spicy', 'type']
            return `size-${this.size} ${classMap[this.type]} sub${this.subType}`
        },
        text() {
            return dishText[this.type][this.subType]
        }
    },
    methods: {}
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/mixin"
@import "~common/stylus/variable"
.lg-icon-wrapper
    display: flex
    align-items: center
    .text
        font-size: $fontsize-small
        padding: 0 2px
        padding-right: 5px
        color: $color-light-grey
    .lg-icon
        display: inline-block
        background-repeat: no-repeat
        &.size-12
            width: 12px
            height: 12px
            background-size: 12px 12px
            &.ismeat
                &.sub0
                    bg-image('ismeat_0')
                &.sub1
                    bg-image('ismeat_1')
                &.sub2
                    bg-image('ismeat_2')
            &.spicy
                &.sub0
                    bg-image('spicy_0')
                &.sub1
                    bg-image('spicy_1')
                &.sub2
                    bg-image('spicy_2')
                &.sub3
                    bg-image('spicy_3')
            &.type
                &.sub1
                    bg-image('type_1')
                &.sub2
                    bg-image('type_2')
                &.sub3
                    bg-image('type_3')
                &.sub4
                    bg-image('type_4')
                &.sub5
                    bg-image('type_5')
        &.size-16
            width: 16px
            height: 16px
            background-size: 16px 16px
            &.ismeat
                &.sub0
                    bg-image('ismeat_0')
                &.sub1
                    bg-image('ismeat_1')
                &.sub2
                    bg-image('ismeat_2')
            &.spicy
                &.sub0
                    bg-image('spicy_0')
                &.sub1
                    bg-image('spicy_1')
                &.sub2
                    bg-image('spicy_2')
                &.sub3
                    bg-image('spicy_3')
            &.type
                &.sub1
                    bg-image('type_1')
                &.sub2
                    bg-image('type_2')
                &.sub3
                    bg-image('type_3')
                &.sub4
                    bg-image('type_4')
                &.sub5
                    bg-image('type_5')
</style>
