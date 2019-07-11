<template>
  <table class="table">
    <thead class="header">
      <tr>
        <td v-for="header in headers"
          :key="header">
          {{header}}
        </td>
        <td></td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items"
        :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.url }}</td>
        <td>{{ item.owner }}</td>
        <td>{{ item.stars }}</td>
        <td>{{ item.forks }}</td>
        <td>{{ item.issues }}</td>
        <td>{{ item.watchers }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  name: 'AppTable',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  computed: {
    headers () {
      return this.items.length
        ? Object.keys(this.items[0])
        : []
    }
  }
}
</script>

<style lang="scss">
.table {
  border-collapse: collapse;
  width: 100%;

  .header {
    font-weight: $font-weight-bold;
    border-bottom: 2px solid $gray-dark;
    background: $gray-base;
    text-transform: uppercase;
  }

  td {
    padding: 8px;
  }
}
</style>
