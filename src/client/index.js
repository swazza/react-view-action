require('babel-polyfill');
require.ensure(["./app"], function(require) {
  var app = require("./app");
  var preboot = require("exports?preboot!preboot");
  app.app.run();
  preboot.complete();
});
