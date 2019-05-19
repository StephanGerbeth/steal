// const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = function () {
  this.extendBuild((config
    /*,{
      isClient,
      loaders: { vue }
    }*/
  ) => {

    // svg - symbol
    // if (isClient) {
    //   vue.transformAssetUrls['svg-symbol'] = ['src'];
    // }

    // config.plugins.push(new SpriteLoaderPlugin({ plainSprite: false }));
    config.module.rules.push({
      test: /\.svg$/,
      oneOf: [
        {
          resourceQuery: /embed/,
          use: [{
            loader: 'svg-inline-loader',
            options: {

            }
          }, {
            loader: 'svgo-loader',
            options: {
              externalConfig: '.svgorc.yml'
            }
          }]
        }, {
          use: [{
            loader: 'svg-sprite-loader',
            options: {
              spriteModule: 'svg-sprite-loader/runtime/sprite.build',
              // extract: true,
              // esModule: false
              // prefixize: false
            }
          }, {
            loader: 'svgo-loader',
            options: {
              externalConfig: '.svgorc.yml'
            }
          }]
        }
      ]
    });
  });
};
