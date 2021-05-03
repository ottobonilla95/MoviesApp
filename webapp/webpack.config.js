const path = require("path");

// plugins
const htmlWebpackPlugin = require("html-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// prod
const publicPath = "/moviesapp/";
// dev
// const publicPath = "/";

const port = process.env.PORT || 3002;

module.exports = {
  mode: "development",

  entry: path.resolve(__dirname, "/src/index.tsx"),
  output: {
    path: path.resolve(__dirname, `dist${publicPath}`),
    filename: "bundle.js",
    publicPath: publicPath,
  },

  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "/src/index.html"),
    }),
    new MiniCssExtractPlugin(),
  ],

  devServer: {
    port: port,
    historyApiFallback: true,
    open: true,
    contentBase: "./",
  },
};
