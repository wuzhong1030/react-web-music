var path = require('path')
function resolve(dir) {
    return path.join(__dirname, './', dir)
  }
module.exports = {
    context: path.resolve(__dirname, './'),
    mode: 'development',
    entry: './app/index.js',
    output: {
        path: resolve('dist'),
        filename: 'bundle.js'
    }
}