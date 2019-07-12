<template>
  <div class="btn-group">
    <AppButton>&#10094;&#10094;</AppButton>
    <AppButton>&#10094;</AppButton>
    <AppButton>1</AppButton>
    <AppButton>2</AppButton>
    <AppButton>3</AppButton>
    <AppButton>&#10095;</AppButton>
    <AppButton>&#10095;&#10095;</AppButton>
  </div>
</template>

<script>
import AppButton from '@/components/basic/AppButton'

export default {
  name: 'AppPagination',
  props: {
    model: {
      type: Object,
      required: true
    }
  },
  components: {
    AppButton
  },
  computed: {
    pageCount () {
      let pageCount = Math.floor(this.model.totalCount / this.model.countPerPage)
      console.log(pageCount)
      return pageCount
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
