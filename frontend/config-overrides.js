const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = function override(config, env) {
  if (env === 'development') {
    config.plugins.push(new ReactRefreshWebpackPlugin());
  }

  config.watchOptions = {
    poll: 1000,
    aggregateTimeout: 300,
  };

  return config;
};
