export default {
  data() {
    return {
        clickTimeStamp: 0
     }
  },
  methods: {
    checkClickTime() {
        const nowTime = new Date().getTime()
        if (nowTime - this.clickTimeStamp > 100) {
            this.clickTimeStamp = nowTime
            return true
        } else {
            return false
        }
    }
  }
}
