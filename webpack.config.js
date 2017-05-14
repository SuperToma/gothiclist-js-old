var getConfig = require('hjs-webpack')

module.exports = getConfig({
  hot: false,
  html: false,
  in: 'client/application.js',
  out: 'public',
  clearBeforeBuild: true
})
