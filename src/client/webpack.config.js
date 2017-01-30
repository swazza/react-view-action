var HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    autoprefixer = require('autoprefixer'),
    webpack = require('webpack'),
    path = require('path'),
    args = require('yargs').argv,
    deploymentMode = args.deploymentMode,
    projectHome = process.cwd(),
    env = JSON.stringify(process.env.NODE_ENV || 'development');

var constants = {
  deploymentMode      : deploymentMode,
  srcDir              : path.join(projectHome, 'src/'),
  nodeModules         : path.join(projectHome, 'node_modules'),
  styleBootstrap      : path.join(projectHome, 'src/client', 'styles/bootstrap-custom/imports.less'),
  styleApp            : path.join(projectHome, 'src/client', 'styles/app-styles.sass'),
  //styleNormalize      : path.join(projectHome, 'node_modules', 'normalize.css/normalize.css'),
  appEntry            : path.join(projectHome, 'src/client', 'index.js'),
  common              : path.join(projectHome, 'src/common'),
  views               : path.join(projectHome, 'src/common', 'views'),
  models              : path.join(projectHome, 'src/common', 'models'),
  components          : path.join(projectHome, 'src/common', 'components'),
  appComponents       : path.join(projectHome, 'src/common', 'appComponents'),
  exceptions          : path.join(projectHome, 'src/common', 'exceptions'),
  reducers            : path.join(projectHome, 'src/common', 'reducers'),
  store               : path.join(projectHome, 'src/common', 'store'),
  actions             : path.join(projectHome, 'src/common', 'actions'),
  utils               : path.join(projectHome, 'src/common', 'utils'),
  routes              : path.join(projectHome, 'src/common/', 'routes'),
  repos               : path.join(projectHome, 'src/common/', 'repos'),
  validators          : path.join(projectHome, 'src/common/', 'validators'),
  hoc                 : path.join(projectHome, 'src/common/', 'hoc'),
  config              : path.join(projectHome, 'src/common/', 'config.js'),
  api                 : path.join(projectHome, 'src/common/', 'api'),
  htmlTemplate        : path.join(projectHome, 'src/client', 'index.html'),
  styling             : path.join(projectHome, 'src/common/utils', 'styling'),
  outputPath          : path.join(projectHome, 'dist/client'),
  config              : path.join(projectHome, 'src/config.js')
};

function DeploymentModePlugin(options) {
  this.deploymentMode = options.deploymentMode || '';
};
DeploymentModePlugin.prototype.apply = function(compiler) {
  var self = this;
  compiler.plugin('compilation', function(compilation) {

    compilation.plugin('html-webpack-plugin-after-html-processing', function(htmlPluginData, callback) {

      if(self.deploymentMode === 'clientOnly') {
        htmlPluginData.html = htmlPluginData.html
                              .replace('{$preboot}', '')
                              .replace('{$stateFromServer}', '')
                              .replace('{$template}', '');
      }

      callback(null, htmlPluginData);
    });
  });
};

var getPlugins = function() {
  var plugins = [];
  plugins.push(new HtmlWebpackPlugin({title: 'Gymnage Signup', template: 'html!' + constants.htmlTemplate, minify: { html5: env === 'production' } }))
  plugins.push(new DeploymentModePlugin({deploymentMode: constants.deploymentMode, htmlTemplate: constants.htmlTemplate}));
  plugins.push(new ExtractTextPlugin('[name].css'));
  plugins.push(new webpack.ProvidePlugin({ preboot: "preboot" }));
  plugins.push(new webpack.HotModuleReplacementPlugin());

  if(env === 'production') {
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin());
  }

  return plugins;
}

module.exports = {
  entry: {
    app: [/*constants.styleApp,*/ constants.appEntry,
          'webpack/hot/dev-server', 'webpack-dev-server/client?http://localhost:8080/']
  },
  output: {
    path:       constants.outputPath,
    filename:   '[name].bundle.js',
    publicPath: constants.deploymentMode === 'clientOnly' ? '' : '/static/'
  },
  devTool: 'source-map',
  module: {
    loaders: [
      { test: /\.js?$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.sass?$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!sass-loader?includePaths[]=" + constants.nodeModules) },
      { test: /\.scss?$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!sass-loader?includePaths[]=" + constants.nodeModules) },
      { test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!less-loader") }
    ],
    preLoaders: [
      { test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  resolve: {
    root: path.resolve(__dirname),
    alias: {
      components  : constants.components,
      appComponents: constants.appComponents,
      models      : constants.models,
      utils       : constants.utils,
      routes      : constants.routes,
      reducers    : constants.reducers,
      store       : constants.store,
      actions     : constants.actions,
      repos       : constants.repos,
      exceptions  : constants.exceptions,
      validators  : constants.validators,
      hoc         : constants.hoc,
      config      : constants.config,
      api         : constants.api,
      views       : constants.views,
      styling     : constants.styling,
      config      : constants.config
    }
  },
  plugins: getPlugins(),
  devServer: { inline: true, 'content-base': constants.outputPath, historyApiFallback: true },
  postcss: function () { return [autoprefixer]; }
}
