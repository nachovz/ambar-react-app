const path = require('path')

module.exports = (baseConfig, env, config) => {
  config.resolve.alias = {
    app: path.resolve(__dirname, '..', 'src/app/'),
  };
  return config;
}
