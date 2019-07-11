<template>
  <div id="app">
    <Repositories class="app-repositories"/>
  </div>
</template>

<script>
import Repositories from './views/Repositories/Index'

export default {
  name: 'app',
  components: {
    Repositories
  }
}
</script>

<style lang="scss">
html, body, #app {
  height: 100%;
}

body {
  font-family: Open Sans,sans-serif,Arial;
  font-size: $font-size-base;
  font-weight: $font-weight-normal;
  margin: 0px;
}
</style>
