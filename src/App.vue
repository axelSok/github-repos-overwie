<template>
  <div id="app">
    <section>
      <Repositories class=""/>
    </section>
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
