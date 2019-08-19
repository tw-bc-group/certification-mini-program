var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  LC_APP_ID: '"gVpjrW4U6TfrM4AGmxX9toma-9Nh9j0Va"',
  LC_APP_KEY: '"5ypXCePx32LNLbO0sdSxcBlw"'
})
