<template>
<div class="tab">
  <cube-tab-bar
    v-model="selectedLabel"
    :useTransition=false
    :show-slider=true
    :data="tabs"
    ref="tabBar"
    @click="clickHandler"
    @change="changeHandler"
    class="border-bottom-1px"
  >
  </cube-tab-bar>
  <div class="slide-wrapper">
      <cube-slide
        :loop = false
        :auto-play = false
        :show-dots = false
        :initial-index = "index"
        ref="slide"
        :options="slideOptions"
        @change="onChange"
        @scroll="onScroll"
      >
        <cube-slide-item v-for="(tab, index) in tabs" :key="index">
            <component ref="component" :is="tab.component" :data="tab.data"></component>
        </cube-slide-item>
      </cube-slide>
  </div>
</div>
</template>

<script>
export default {
    name: 'lg-tab',
    props: {
        tabs: {
            type: Array,
            default() {
                return []
            }
        },
        initialIndex: {
            type: Number,
            default() {
                return 0
            }
        }
    },
    components: {},
    data() {
        return {
            index: this.initialIndex,
            slideOptions: {
                listenScroll: true,
                probeType: 3,
                directionLockThreshold: 0
            }
         }
    },
    created() {},
    computed: {
        selectedLabel: {
            get() {
                return this.tabs[this.index].label
            },
            set(newVal) {
                this.index = this.tabs.findIndex((value) => {
                    return value.label === newVal
                })
            }
        }
    },
    mounted() {
        this.onChange(this.index)
    },
    methods: {
        clickHandler() {
            // console.log(123)
        },
        changeHandler() {
            // console.log(456)
        },
        onChange(current) {
            this.index = current
            const instance = this.$refs.component[current]
            if (instance && instance.fetch) {
                instance.fetch()
            }
        },
        onScroll(pos) {
            const tabBarWidth = this.$refs.tabBar.$el.clientWidth
            const slideWidth = this.$refs.slide.slide.scrollerWidth
            const transfrom = -pos.x / slideWidth * tabBarWidth
            this.$refs.tabBar.setSliderTransform(transfrom)
        }
    }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"
.tab
    display: flex
    flex-direction: column
    height: 100%
    >>> .cube-tab
        padding: 10px 0
        font-weight: 700
        div
            font-weight: 700
            font-size: $fontsize-medium
    .slide-wrapper
        flex: 1
        overflow: hidden

</style>
