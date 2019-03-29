const config = require('./app.config')
const public_config = require('./webpack.config')
const nodeExternals = require('webpack-node-externals')

public_config.target = 'node'
public_config.output = {
    path: config.WEBPACK_SERVER_ROOT,
    filename: 'app.js',
    libraryExport: 'default',
    libraryTarget: 'commonjs2',
}
public_config.externals = [nodeExternals()]

module.exports = public_config
