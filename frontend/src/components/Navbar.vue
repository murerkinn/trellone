<template lang="pug">
  a-layout-header
    a-row(type="flex" justify="space-between")
      a-col
        a-button.topBtns(type="primary" icon="download")
        a-button.topBtns(type="primary" icon="home")
        a-button.topBtns(type="primary" icon="project") Panels
      a-col
        div.logo
          router-link(to="/dashboard") <i>Trellone</i>
      a-col
        a-button.topBtns(type="primary" icon="plus")
        a-button.topBtns(type="primary" icon="info-circle")
        a-button.topBtns(type="primary" icon="bell")
        a-dropdown(:trigger="['click']" placement="bottomLeft")
          a-menu(slot="overlay")
            a-menu-item(key="1" @click="$emit('do-logout')") <a-icon type="logout" /> Logout

          a-button.topBtns(type="primary" icon="user")
</template>

<script>
export default {
  name: 'navbar'
}
</script>

<style lang="scss">
.ant-layout-header {
  background: #026aa7 !important;
  height: 40px !important;
  line-height: 40px !important;
  padding: 0 0 0 0.3em !important;
}

.ant-menu-item {
  background: transparent !important;
  border: none !important;
  padding: none !important;
}

.topBtns.ant-btn {
  margin-right: 0.2em;
  background: #4e97c2;
}

.logo {
  font-weight: bold;
  line-height: 40px;

  a {
    color: #fefefe;
    height: 100%;
    width: 100%;
    display: block;
  }
}
</style>
