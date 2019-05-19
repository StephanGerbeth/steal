import Vue from 'vue';
import svg4everybody from 'svg4everybody';

Vue.component('svg-symbol', {
  props: {
    src: {
      type: Object,
      required: false,
      default: null
    },
    polyfill: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  computed: {
    url () {
      return this.src.url.replace(/-usage$/, '');
    }
  },

  mounted () {
    svg4everybody({ polyfill: this.isIE11() || this.polyfill });
  },

  methods: {
    isIE11 () {
      if (!this.$isServer) {
        return !!window.MSInputMethodContext && !!document.documentMode;
      }
      return false;
    }
  },

  render (createElement) {
    // if (this.$isServer) {

    const svg = createElement(
      'svg',
      {
        attrs: {
          viewBox: this.src.viewBox,
          width: '100%',
          height: '100%'
        }
      },
      [
        createElement('use', {
          attrs: {
            'xlink:href': this.src.url
          }
        })
      ]
    );
    return svg;
    // } else {
    //   console.log(this.$el);
    //   return null;
    // }

  }
});
