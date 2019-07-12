<template>
  <div class="widget">
    <div class="widget__header">
      <h4 class="widget__name">
        <span class="widget__name-text">{{ name }}</span>
      </h4>
    </div>
    <div class="widget__body">
      <slot name="widget-body" />
    </div>
    <div class="widget__footer">
      <slot name="widget-footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Widget',
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
.widget {
  border-radius: $border-radius-base;
  border: $btn-border-width solid $gray-light;
  overflow: hidden;
  box-shadow: 0 10px 25px 0 rgba(33, 43, 56, 0.25);
  background-color: $brand-white;

  &__header,
  &__footer {
    background-color: #34495e;
    padding: 15px 20px;
  }

  &__name {
    margin: 0;
    font-weight: $font-weight-normal;

    &-text {
      color: $brand-white;
    }
  }
}
</style>
