<template>
  <button
    class="app-button"
    @click="onClick"><slot/></button>
</template>

<script>
export default {
  name: 'AppButton',
  methods: {
    onClick: function (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss">
.app-button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: $btn-font-weight;
    line-height: $btn-line-height;
    text-align: center;
    white-space: nowrap;
    user-select: none;
    border: none;
    @include button-size($btn-padding-y, $btn-padding-x, $btn-font-size, $btn-border-radius-base);
    transition: $btn-transition;
    cursor: pointer;
    @include box-sizing(border-box);

    &:focus,
    &.focus {
      outline: none;
    }

    background-color: $btn-default-bg;
    border-color: $btn-default-border;
    color: $btn-default-color;

    &.active,
    &:hover {
      color: $btn-default-hover-color;
      background-color: $btn-default-hover-bg;
    }

    &:active {
      background-color: $btn-default-bg;
    }

    &.disabled,
    &:disabled,
    &[disabled] {
      cursor: $cursor-disabled;
      opacity: 0.7;

      &:hover {
        color: $btn-default-color;
        background-color: $btn-default-bg;
      }
    }

    @include rippleEffect($btn-default-hover-bg, $btn-default-hover-bg, $btn-default-bg)
}
</style>
