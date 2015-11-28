module.exports = {
  entry: './src/app.js',
  output: {
    path: './dist/',
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    inline: true,
    contentBase: './dist/',
    port: 3003
  },
  plugins: [
    new webpack.ProvidePlugin({jquery: "jquery"})
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
