<template lang="pug" functional>
  div.card(:style="`background: ${props.background};`")
    p.description(v-if="props.createNewPanel") Create new ✨
    h3.title(v-else) {{ props.title }}

</template>

<script>
export default {
  props: {
    title: String,
    background: {
      type: String,
      default: '#4e97c2'
    },
    createNewPanel: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 200px;
  height: 100px;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 3px;
  transition: filter 170ms ease-in-out;

  &:hover {
    filter: brightness(0.9);
  }

  .description {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-weight: 700;
  }

  .title {
    position: absolute;
    top: 5px;
    left: 10px;
    color: #fefefe;
  }
}
</style>
