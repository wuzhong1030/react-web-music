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
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_moduels/,
                include: resolve('src')
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                    'less-loader'
                ]
            }
        ]
    }
}