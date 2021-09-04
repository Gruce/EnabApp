<template>
  <span v-b-tooltip.hover.right title="إغلاق">
    <span class="text-dark pointer">
      <i class="fas fa-times fa-2x"></i>
    </span>
  </span>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.text-dark {
  opacity: 0.8;
  transition: 0.15s ease-in-out;
}
.text-dark:hover {
  opacity: 1;
}
i.fas {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 60px;
  box-shadow: 0px 0px 2px rgba(255, 255, 255, 0.3);
  padding: 0.5em 0.7em;
  transition: 0.15s ease-in-out;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
}
</style>