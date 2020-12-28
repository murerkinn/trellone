<template lang="pug">
  div
    navbar
    a-layout-content(style="margin-top: 2em")
      a-row(type="flex")
        a-col(:span="23" :offset="1")
          router-view
</template>

<script>
import Navbar from '../components/Navbar'

export default {
  name: 'panel-layout',
  components: {
    Navbar
  }
}
</script>

<style></style>
