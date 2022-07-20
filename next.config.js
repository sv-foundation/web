const { i18n } = require('./next-i18next.config');

module.exports = {
  output: 'standalone',
  i18n,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{
        loader: "@svgr/webpack", options: {
          svgoConfig: {
            plugins: [{
              name: 'removeViewBox',
              active: false
            }]
          }
        }
      }]
    });

    return config;
  }
};