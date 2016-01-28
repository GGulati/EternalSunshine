var webpack = require('webpack');

var envPlugin = new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
});

module.exports = {
  entry: __dirname + "/src/index.jsx",
  output: {
    path: __dirname + '/deploy',
    filename: 'bundle.js',
  },
  plugins: [envPlugin],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['react', 'es2015'],
        },
      },
    ],
  },
};
