<template>
  <div class="btn-group">
    <template v-if="pageCount > 3">
      <AppButton @click="onFirtsPageClick">&#10094;&#10094;</AppButton>
      <AppButton @click="onPrevPageClick">&#10094;</AppButton>
    </template>
    <AppButton v-for="page in pages"
      :key="page"
      :class="{ active: page === pageNumber }"
      @click="onPageClick(page)">
      {{page}}
    </AppButton>
    <template v-if="pageCount > 3">
      <AppButton @click="onNextPageClick">&#10095;</AppButton>
      <AppButton @click="onLastPageClick">&#10095;&#10095;</AppButton>
    </template>
  </div>
</template>

<script>
import AppButton from '@/components/basic/AppButton'

export default {
  name: 'AppPagination',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    perPageCount: {
      type: Number,
      required: true
    },
    totalCount: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      pageNumber: this.currentPage
    }
  },
  components: {
    AppButton
  },
  computed: {
    pageCount () {
      return Math.floor(this.totalCount / this.perPageCount)
    },
    pages () {
      if (this.pageNumber === 1) {
        return [this.pageNumber, this.pageNumber + 1, this.pageNumber + 2]
      } else if (this.pageNumber === this.pageCount) {
        return [this.pageCount - 2, this.pageCount - 1, this.pageCount]
      } else {
        return [this.pageNumber - 1, this.pageNumber, this.pageNumber + 1]
      }
    }
  },
  methods: {
    emitPageChange () {
      this.$emit('change-page', this.pageNumber)
    },
    onFirtsPageClick () {
      this.pageNumber = 1
      this.emitPageChange()
    },
    onPrevPageClick () {
      if (this.pageNumber !== 1) {
        this.pageNumber -= 1
        this.emitPageChange()
      }
    },
    onPageClick (page) {
      this.pageNumber = page
      this.emitPageChange()
    },
    onNextPageClick () {
      if (this.pageNumber !== this.pageCount) {
        this.pageNumber += 1
        this.emitPageChange()
      }
    },
    onLastPageClick () {
      this.pageNumber = this.pageCount
      this.emitPageChange()
    }
  }
}
</script>

<style lang="scss">
$btn-group-border-radius: 18px;

.btn {
  &-primary {
    background-color: $brand-primary;
    color: #fff;
  }

  &-group {
    display: flex;
    color: #fff;

    .app-button {
      border-radius: 0px;

      &:first-child {
        border-top-left-radius: $btn-group-border-radius !important;
        border-bottom-left-radius: $btn-group-border-radius !important;
      }
      &:last-child {
        border-top-right-radius: $btn-group-border-radius !important;
        border-bottom-right-radius: $btn-group-border-radius !important;
      }
    }
  }
}
</style>
