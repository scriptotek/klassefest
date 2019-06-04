process.env.VUE_APP_VERSION = require('./package.json').version

module.exports = {
  configureWebpack: (config) => {
      // config.devtool = 'source-map'
  },
};
