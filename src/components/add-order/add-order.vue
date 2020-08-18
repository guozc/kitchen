<template>
    <transition name="move" @after-leave="afterLeave" @after-enter="afterEnter">
        <div class="order"  v-show="visible">
            <div class="content">
                <div class="title">新增订单</div>
                <div class="date" @click.stop="selectDate">
                    {{date.length > 0 ? date : '点击选择日期'}}
                </div>
                <div class="interval">
                    <cube-radio-group v-model="interval" :options="options" />
                </div>
                <div class="submit-btn" :class="{'disable':date.length == 0}" @click.stop="addOrder">新增</div>
            </div>
            <div class="back-btn" @click="hide">
                <i class="icon-lg-aleft"></i>
            </div>
        </div>
    </transition>
</template>

<script>
import popupMixin from 'common/mixin/popup'
import { addOrder } from 'api'
const EVENT_ENTER = 'enter'
const EVENT_LEAVE = 'leave'
export default {
    name: 'add-order',
    mixins: [popupMixin],
    components: {},
    data() {
        return {
            date: '',
            interval: 0,
            options: [
                {
                    label: '午餐',
                    value: 0
                },
                {
                    label: '晚餐',
                    value: 1
                }
            ]
         }
    },
    props: {
        admin: {
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
        selectDate() {
            this.datePickerComp = this.datePickerComp || this.$createDatePicker({
                title: 'Date Picker',
                min: new Date(2019, 1, 1),
                max: new Date(2040, 1, 1),
                value: new Date(),
                format: {
                    year: 'YYYY',
                    month: 'MM',
                    date: 'DD'
                },
                onSelect: this.selectHandle
            })
            this.datePickerComp.show()
        },
        selectHandle(date, selectedVal, selectedText) {
            this.date = selectedText.join('-')
        },
        afterEnter() {
            this.$emit(EVENT_ENTER)
            console.log(123)
        },
        afterLeave() {
            this.date = ''
            this.interval = 0
        },
        addOrder() {
            const reqDate = {}
            reqDate.date = this.date
            reqDate.interval = this.interval
            reqDate.openid = this.admin.openid
            console.log(reqDate)
            addOrder(reqDate).then((res) => {
                this.$emit(EVENT_LEAVE)
                this.hide()
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'
.order
    position:fixed
    top:0
    left:0
    width:100%
    bottom: 0
    background: $color-background-ssss
    &.move-enter-active, &.move-leave-active
        transition: all 0.3s linear
    &.move-enter, &.move-leave-active
        transform: translate3d(100%, 0, 0)
        opacity: 0
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
    .content
        padding: 100px 50px
        position:absolute
        top:0
        left:0
        bottom:0
        right:0
        text-align:center
        .title
            font-size:$fontsize-large
            text-align:center
            color:$color-grey
            padding-bottom: 10px
            border-bottom:1px solid $color-grey
        .date
            font-size: $fontsize-large
            text-align: center
            background:$color-white
            border: 1px solid  $color-light-pink
            margin-top: 20px
            padding: 15px 0px
            color: $color-light-pink
            font-weight: 700
        .interval
            margin-top:10px
        .submit-btn
            margin-top:20px
            padding:10px 20px
            background:$color-dark-pink
            color: $color-white
            &.disable
                background:$color-grey

</style>
