<template>
  <table class="table">
    <thead class="table-header">
      <tr>
        <td
          v-for="header in dataHeader"
          :key="header.key"
          @click="onClickTableHeader(header.keyOrder)"
        >
          {{ header.key }}
          <span
            v-if="header.key === sortField"
            class="icon"
            :class="sortFieldClass"
          >&#10140;</span>
        </td>
      </tr>
    </thead>
    <tbody class="table-body">
      <tr v-for="item in data" :key="item.id">
        <td v-for="headerItem in dataHeader"
        :key="`${headerItem.key}-${item.id}`">
        {{ item[headerItem.key] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'AppTable',
  props: {
    data: {
      type: Array,
      required: true
    },
    dataHeader: {
      type: Array,
      required: true
    },
    sortField: {
      type: String,
      required: true
    },
    sortByAscending: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    sortFieldClass () {
      return this.sortByAscending ? 'icon-up' : 'icon-down'
    }
  },
  methods: {
    onClickTableHeader (newSortField) {
      if (newSortField) {
        this.$emit('sorting-change', {
          sortField: newSortField,
          sortByAscending:
            this.sortField === newSortField ? !this.sortByAscending : true
        })
      }
    }
  }
}
</script>

<style lang="scss">
.table {
  border-collapse: collapse;
  width: 100%;

  &-header {
    font-weight: $font-weight-bold;
    border-bottom: 2px solid $gray-dark;
    background: $gray-base;
    text-transform: uppercase;
  }

  &-body {
    tr:nth-of-type(2n) {
      background-color: $gray;
    }
  }

  td {
    max-width: 100px;
    padding: 8px;
    @include ellipsis-on-overflow();
  }

  .icon {
    display: inline-block;
    font-size: $font-size-additional;

    &-up {
      transform: rotate(-90deg);
    }

    &-down {
      transform: rotate(90deg);
    }
  }
}
</style>
