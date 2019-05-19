<i18n>
{
  "en": {
    "test": "message23",
    "hello": "hello world!",
    "sources": [
      {"media": "default", "src": "sample/576x300.jpg"},
      {"media": "xs", "src": "sample/768x300.jpg"},
      {"media": "sm", "src": "sample/992x300.jpg"},
      {"media": "md", "src": "sample/1200x300.jpg"},
      {"media": "lg", "src": "sample/1600x300.jpg"},
      {"media": "xl", "src": "sample/1920x300.jpg"}
    ]
  },
  "de": {
    "test": "nachricht 123",
    "hello": "hallo welt",
    "sources": [
      {"media": "default", "src": "sample/576x300.jpg"},
      {"media": "xs", "src": "sample/768x300.jpg"},
      {"media": "sm", "src": "sample/992x300.jpg"},
      {"media": "md", "src": "sample/1200x300.jpg"},
      {"media": "lg", "src": "sample/1600x300.jpg"},
      {"media": "xl", "src": "sample/1920x300.jpg"}
    ]
  }
}
</i18n>

<template>
  <div class="test">
    <component
      :is="item.asyncComponent"
      v-for="(item, index) in components"
      :key="index"
      :content="item.data.content"
    />
    <headline :content="$t('test')" />
    hello2 huhu234 {{ $t('configxyz') }}
    {{ $t('test') }}
    <br>
    <!-- <picture-comp
      :sources="$t('sources')"
      alt="image description"
    /> -->
  </div>
</template>

<script>
import Headline from '~/components/atoms/Headline';
// import PictureComp from '~/components/atoms/Picture';

export default {
  nuxtI18n: {
    paths: {
      en: '/sub',
      de: '/unter'
    }
  },
  components: {
    Headline,
    // PictureComp
  },
  data () {
    return {

    };
  },

  head () {
    return {
      title: 'title of page'
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
        c: 'atoms/Headline_Test',
        data: {
          content: 'HURZFURZ'
        }
      }, {
        c: 'atoms/Text',
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

  mounted () {
    // console.log(this.$t('sources'));
  },

  created () {
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
            require.ensure([], (require) => {
              resolve(require(`@/components/${item.c}`));
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
picture img {
  width: 100%;
  height: 300px;
  object-fit: cover;

  @media (--xs) {
    object-fit: contain;
  }

  @media (--sm) {
    object-fit: fill;
  }

  @media (--md) {
    object-fit: cover;
  }

  @media (--lg) {
    object-fit: contain;
  }

  @media (--xl) {
    object-fit: fill;
  }

  @media (--xxl) {
    object-fit: cover;
  }
}
</style>
