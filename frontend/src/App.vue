<template lang="pug">
  #app
    a-layout.layout(theme='light')
      component(:is="layout" :selectedKeys="selectedKeys")

</template>

<script>
export default {
  name: 'App',
  computed: {
    selectedKeys() {
      return [this.$route.name]
    },
    layout() {
      return `${this.$route.meta.layout || 'default'}-layout`
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
