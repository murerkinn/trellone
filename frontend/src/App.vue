<template lang="pug">
  #app
    navbar(@do-logout="doLogout")
    a-layout.layout(theme='light')
      component(:is="layout" :selectedKeys="selectedKeys")

</template>

<script>
import { mapState, mapActions } from 'vuex'
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  },
  computed: {
    selectedKeys() {
      return [this.$route.name]
    },
    layout() {
      return `${this.$route.meta.layout || 'default'}-layout`
    }
  },
  methods: {
    ...mapActions('account', ['logout']),
    async doLogout() {
      await this.logout()
      this.$router.push('/login?logoutSuccess=1')
    }
  }
}
</script>

<style lang="scss">
.ant-layout {
  min-height: 100vh;
  background: #fefefe !important;
}
</style>
