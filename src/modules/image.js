const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozJpeg = require('imagemin-mozjpeg');
const imageminWebp = require('imagemin-webp');

const options = {
  plugin: {
    default: {
      test: /\.(jpe?g|png|gif)$/i,
      pngquant: {
        quality: '75-100'
      },
      optipng: {
        optimizationLevel: 3
      },
      jpegtran: null,
      plugins: [
        imageminMozJpeg({
          quality: 70,
          progressive: true,
          sample: ['2x2']
        })
      ]
    },
    webp: {
      test: /\.(webp)$/i,
      plugins: [imageminWebp({ quality: 75 })]
    }
  },
  module: {
    test: /\.(jpe?g|png)$/i,
    oneOf: [
      {
        resourceQuery: /webp/,
        use: {
          loader: 'responsive-loader',
          options: {
            name: '[path][name].[width]x[height].[sha512:hash:base64:7].[ext].webp',
            adapter: require(__dirname + '/responsive-loader/adapter.js')
          }
        }
      },
      {
        use: {
          loader: 'responsive-loader',
          options: {
            name: '[path][name].[width]x[height].[sha512:hash:base64:7].[ext]',
            adapter: require(__dirname + '/responsive-loader/adapter.js')
          }
        }
      }
    ]
  }
};

module.exports = function () {
  this.extendBuild(config => {
    config.module.rules.push(options.module);

    config.plugins.push(prepareConfig(options.plugin.default, this.options.dev));
    config.plugins.push(prepareConfig(options.plugin.webp, this.options.dev));
  });
};

function prepareConfig (options, dev) {
  return new ImageminPlugin(Object.assign(options, { disable: dev }));
}
