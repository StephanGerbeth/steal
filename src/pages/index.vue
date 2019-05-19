<i18n>
{
  "de": {
    "text": "Ich bin die Startseite12",
    "sources": [
      {"media": "default", "src": "retina/1152x600.jpg"},
      {"media": "xs", "src": "retina/1536x600.jpg"},
      {"media": "sm", "src": "retina/1984x600.jpg"},
      {"media": "md", "src": "retina/2400x600.jpg"},
      {"media": "lg", "src": "retina/3200x600.jpg"},
      {"media": "xl", "src": "retina/3840x600.jpg"}
    ]
  },
  "en": {
    "text": "I'm the homepage",
    "sources": [
      {"media": "default", "src": "retina/1152x600.jpg"},
      {"media": "xs", "src": "retina/1536x600.jpg"},
      {"media": "sm", "src": "retina/1984x600.jpg"},
      {"media": "md", "src": "retina/2400x600.jpg"},
      {"media": "lg", "src": "retina/3200x600.jpg"},
      {"media": "xl", "src": "retina/3840x600.jpg"}
    ]
  }
}
</i18n>
<template>
  <div class="content">
    <!-- <component
      :is="test"
      :content="data.content"
    /> -->

    <LazyHydrate
      v-for="(item, index) in components"
      :key="index"
      when-visible
    >
      <component
        :is="item.asyncComponent"
        :content="item.data.content"
      />
    </LazyHydrate>

    <!-- <svg>
      <use
        :xlink:href="`#${require('@/assets/svg/' + test).default.id}`"
        :href="`#${require('@/assets/svg/' + test).default.id}`"
      />
    </svg> -->

    <pic
      :sources="$t('sources')"
      alt="sample picture"
    />

    <!-- <img
      class="blur"
      :src="`${require('@/assets/image0.png?size=200&placeholder=true').placeholder}`"
    > -->
    <!-- <img :src="`${require('@/assets/retina/1152x600.jpg?size=200&nonretina&webp').src}`"> -->
    <img :src="`${require('!!responsive-loader?size=!@/assets/' + src + '.png')}`">
    <img :src="`${require('@/assets/image0.png?size=600').src}`">
    <img src="@/assets/image0.png?webp&size=200">

    <h1>Headline</h1>
    <p>{{ $t('text') }}</p>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration';
import Pic from '@/components/atoms/Picture';

export default {
  head () {
    return {
      title: 'title of page'
    };
  },

  components: {
    LazyHydrate,
    Pic
  },

  data () {

    // console.log(require(`!!responsive-loader?size=220!@/assets/${tuch}.png`));
    return {
      test: 'image3.svg',
      src: 'image2',
      size: 200,
      svg: require('@/assets/svg/image2.svg?embed')
    };
  },

  asyncData () {
    // return new Promise((resolve) => {
    //   resolve({
    //     c: 'atoms/Headline',
    //     data: {
    //       content: 'HURZFURZ'
    //     }
    //   });
    // });
    return new Promise((resolve) => {
      resolve([{
        c: 'Headline_Test',
        data: {
          content: 'HURZFURZ'
        }
      }, {
        c: 'Text',
        data: {
          content: 'tolle wurst'
        }
      }]);
    }).then((components) => {
      return {
        components: components
      };
    });
  },
  created () {
    console.log(this.svg);
    // console.log(require('@/assets/image0.png?retina'));
    // let width = 'retina/2400x600.jpg?size=576';
    // console.log(process);
    // console.log(require(`~/assets/${width}`));

    // this.test = () => {
    //   return new Promise((resolve) => {
    //     require.ensure(['@/components/atoms/Headline', '@/components/atoms/Picture'], (require) => {
    //       resolve(require(`@/components/${this.$data.c}`));
    //     });
    //   });
    // };
    this.components = this.components.map((item) => {
      return {
        asyncComponent: () => {
          return new Promise((resolve) => {
            require.ensure(['@/components/atoms/Headline_Test', '@/components/atoms/Text'], (require) => {
              resolve(require(`@/components/atoms/${item.c}`));
            });
          });
        },
        data: item.data
      };
    });
  }
};
</script>

<style lang="postcss">
.blur {
  filter: blur(25px);
}
</style>

