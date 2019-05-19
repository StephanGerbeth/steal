<template>
  <p>
    {{ content }}
  </p>
</template>
<script>
export default {
  props: {
    content: {
      type: String,
      required: true,
      default: 'Headline'
    }
  }
};
</script>
<style lang="postcss">
</style>
