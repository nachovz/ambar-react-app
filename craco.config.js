const rewireTypescript = require('react-app-rewire-typescript');
const workboxPlugin = require('workbox-webpack-plugin');
const path = require('path');
module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig = rewireTypescript(webpackConfig, env);
      if (env === 'production') {
          const workboxConfigProd = {
              swSrc: path.join(__dirname, 'src', 'custom-service-worker.js'),
              swDest: 'service-worker.js',
              importWorkboxFrom: 'disabled',
              exclude: [/\.map$/]
          };

          webpackConfig = removePreWorkboxWebpackPluginConfig(webpackConfig);

          webpackConfig.plugins.push(new  workboxPlugin.InjectManifest(workboxConfigProd));
      }
      return webpackConfig;
    }
  }
};
// delete the default configuration of WorkboxWebpackPlugin
function removePreWorkboxWebpackPluginConfig (config) {
  const preWorkboxPluginIndex = config.plugins.findIndex(
  (element) => {return   Object.getPrototypeOf(element).constructor.name === 'GenerateSW';
  });
  if (preWorkboxPluginIndex !== -1) {
    //console.log(config.plugins[preWorkboxPluginIndex].config.exclude);
    config.plugins.splice(preWorkboxPluginIndex, 1);
  }
  return config;
}
