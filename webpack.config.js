require("dotenv").config();
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: path.resolve(__dirname, "/assets/js/main.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "assets/js/[name].[contenthash].js",
    clean: true,
  },
  performance: {
    maxAssetSize: 1000 * 1024,
    maxEntrypointSize: 1000 * 1024,
  },
  devtool: "source-map",
  devServer: {
    port: 3000,
    open: true,
    hot: true,
    watchFiles: ["index.html"],
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(sc|sa|c)ss$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "postcss-loader",
          "resolve-url-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.html$/i,
        use: "html-loader",
      },
      {
        test: /\.(png|jpg)$/i,
        type: "asset",
        generator: {
          filename: "assets/images/[name].[contenthash][ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(ico)$/i,
        type: "asset",
        generator: {
          filename: "assets/icons/[name].[contenthash][ext]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/inline",
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
    }),
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
    ...(isProduction
      ? [
          new MiniCssExtractPlugin({
            filename: "assets/css/style.[contenthash].css",
          }),
          new ImageMinimizerPlugin({
            minimizer: {
              implementation: ImageMinimizerPlugin.imageminMinify,
              options: {
                plugins: [
                  ["jpegtran", { progressive: true }],
                  ["optipng", { optimizationLevel: 5 }],
                ],
              },
            },
          }),
          new CompressionPlugin({
            algorithm: "gzip",
            threshold: 1 * 1024,
          }),
        ]
      : []),
  ],
};
