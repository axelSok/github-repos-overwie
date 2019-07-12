<template>
  <div class="btn-group">
    <AppButton :disabled="isDisabledPrevButton" @click="onFirtsPageClick">&#10094;&#10094;</AppButton>
    <AppButton :disabled="isDisabledPrevButton" @click="onPrevPageClick">&#10094;</AppButton>
    <AppButton
      v-for="page in pages"
      :key="page"
      :class="{ active: page === currentPage }"
      @click="onPageClick(page)"
    >{{page}}</AppButton>
    <AppButton :disabled="isDisabledNextButton" @click="onNextPageClick">&#10095;</AppButton>
    <AppButton :disabled="isDisabledNextButton" @click="onLastPageClick">&#10095;&#10095;</AppButton>
  </div>
</template>

<script>
import AppButton from '@/components/basic/AppButton'

const defaultMiddleButtonsCount = 3

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
    },
    buttonsCount: {
      type: Number,
      default: defaultMiddleButtonsCount
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
      let pages = []
      let offset = parseInt(this.buttonsCount / 2)
      let minPage = this.currentPage - offset
      minPage = minPage || 1

      if (this.buttonsCount % 2) {
        for (let i = minPage; i <= minPage + this.buttonsCount - 1; i++) {
          pages.push(i)
        }
      } else {
        for (let i = minPage; i <= minPage + this.buttonsCount - 1; i++) {
          pages.push(i)
        }
      }

      if (this.currentPage === 1) {
        pages = []
        for (let i = 1; i <= this.buttonsCount; i++) {
          pages.push(i)
        }
      } else if (this.currentPage === this.pageCount) {
        pages = []
        for (let i = this.pageCount - this.buttonsCount + 1; i <= this.pageCount; i++) {
          pages.push(i)
        }
      }
      return pages
    },
    isDisabledNextButton () {
      return this.currentPage === this.pageCount
    },
    isDisabledPrevButton () {
      return this.currentPage === 1
    }
  },
  methods: {
    emitNewCurrentPage (newPage) {
      this.$emit('change-page', newPage)
    },
    onFirtsPageClick () {
      this.emitNewCurrentPage(1)
    },
    onPrevPageClick () {
      if (this.currentPage !== 1) {
        this.emitNewCurrentPage(this.currentPage - 1)
      }
    },
    onPageClick (page) {
      this.emitNewCurrentPage(page)
    },
    onNextPageClick () {
      if (this.currentPage !== this.pageCount) {
        this.emitNewCurrentPage(this.currentPage + 1)
      }
    },
    onLastPageClick () {
      this.emitNewCurrentPage(this.pageCount)
    }
  }
}
</script>

<style lang="scss">
$btn-group-border-radius: 18px;

.btn {
  &-primary {
    background-color: $brand-primary;
    color: $brand-white;
  }

  &-group {
    display: flex;
    color: $brand-white;
    border-radius: $btn-group-border-radius;

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
