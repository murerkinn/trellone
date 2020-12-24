<template lang="pug">
  a-layout-content(style="margin-top: 3em")
    a-row(type="flex" justify="center")
      a-col(:span="4")
        a-menu(mode="inline" :selectedKeys="selectedKeys")
          a-menu-item(key="dashboard")
            router-link(to="/dashboard")
              a-icon(type="dashboard")
              span Dashboard

      a-col(:span="12" :offset="1")
        router-view
</template>

<script>
export default {
  name: 'dashboard-layout',
  props: {
    selectedKeys: Array
  }
}
</script>

<style></style>
