const HtmlWebpackPlugin = require('html-webpack-plugin');
const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

rules.push(
  // Style sheet
  {
    test: /\.s?css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
          sourceMap: true,
          importLoaders: 1,
        },
      },
      'sass-loader',
    ],
    include: /\.module\.s?(c|a)ss$/,
  },
  {
    test: /\.s?css$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    exclude: /\.module\.s?(c|a)ss$/,
  },
  // Fonts
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
  },
  // Images
  {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  },
  {
    test: /\.svg$/i,
    use: [
      {
        loader: '@svgr/webpack',
      },
      {
        loader: 'url-loader',
      },
    ],
  }
);

module.exports = {
  module: {
    rules,
  },
  plugins: [
    ...plugins,
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/renderer/index.ejs',
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true,
      },
      isBrowser: false,
      isDevelopment: process.env.NODE_ENV !== 'production',
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
};
