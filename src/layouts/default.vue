<template>
  <div>
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="spriteContent" />
    <LazyHydrate when-idle>
      <page-header :navigation="$t('header.navigation')" />
    </LazyHydrate>
    <main>
      <nuxt />
    </main>
    <LazyHydrate when-idle>
      <page-footer :navigation="$t('footer.navigation')" />
    </LazyHydrate>
  </div>
</template>

<script>
import PageHeader from '../components/page/Header';
import PageFooter from '../components/page/Footer';
import LazyHydrate from 'vue-lazy-hydration';
import sprite from 'svg-sprite-loader/runtime/sprite.build';

export default {
  components: {
    LazyHydrate,
    PageHeader,
    PageFooter
  },

  head () {

    return {
      htmlAttrs: {
        lang: this.$i18n.locale
      }
    };
  },

  data () {
    return {
      spriteContent: sprite.stringify()
    };
  },

  created () {

  },

  mounted () {
    this.spriteContent = sprite.stringify();
  }
};
</script>

<style lang="postcss">
body {
  margin: 0;
}
</style>

