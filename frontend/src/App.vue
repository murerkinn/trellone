<template lang="pug">
  #app
    a-layout#components-layout-demo-top.layout(theme='light')
      a-layout-content
        router-view
</template>

<style lang="scss">
.ant-layout {
  min-height: 100vh;
  background: #fefefe !important;
}
</style>
