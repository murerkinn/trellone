<template lang="pug">
  a-layout-content(style="margin-top: 2em")
    a-row(type="flex")
      a-col(:span="23" :offset="1")
        router-view
</template>

<script>
export default {
  name: 'panel-layout'
}
</script>

<style></style>
