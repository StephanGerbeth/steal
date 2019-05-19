<template>
  <ul>
    <li
      v-for="(item) in list"
      :key="item.title"
    >
      <nuxt-link :to="localePath(item.url)">
        {{ item.title }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
      default: function () {
        return [];
      }
    }
  },
};
</script>

<style lang="postcss">
a {
  color: black;

  &.nuxt-link-active {
    color: #805e00;
  }
}
</style>
