<template>
  <div class="spinner-wrapper">
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {
  name: 'Spinner'
}
</script>

<style lang="scss">
$spinner-width: 60px;
$spinner-border: 16px;

.spinner-wrapper {
  height: 100%;
  min-height: calc(3 * #{$spinner-width});
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {
  border: $spinner-border solid $gray-base;
  border-top: $spinner-border solid $brand-blue;
  border-radius: 50%;
  width: $spinner-width;
  height: $spinner-width;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
