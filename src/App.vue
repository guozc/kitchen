<template>
  <div id="app">
    <lg-header></lg-header>
    <user-content></user-content>
  </div>
</template>

<script>
import UserContent from 'components/content.vue'
import LgHeader from 'components/lg-header/lg-header'

export default {
  name: 'App',
  components: {
    UserContent,
    LgHeader
  }
}
</script>

<style lang="stylus">

</style>
