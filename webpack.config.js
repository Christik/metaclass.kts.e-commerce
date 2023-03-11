const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

const distPath = path.resolve(__dirname, "dist");
const srcPath = path.resolve(__dirname, "src");
const nodeModulesPath = path.resolve(__dirname, "node_modules");

const isProd = process.env.NODE_ENV === "production";

const getSettingsForStyles = (withModules = false) => {
  return [
    isProd
      ? MiniCssExtractPlugin.loader
      : "style-loader",

    !withModules
      ? "css-loader"
      : {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: !isProd
              ? "[path][name]__[local]"
              : "[hash: base64]",
          },
        },
      },

    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [["autoprefixer"]],
        },
      },
    },
    "sass-loader",
  ];
};

module.exports = {
  entry: [
    path.join(nodeModulesPath, "regenerator-runtime/runtime.js"),
    path.join(srcPath, "index.tsx"),
  ],
  output: {
    path: distPath,
    filename: "bundle.js",
  },
  target: isProd ? "browserslist" : "web",
  devtool: isProd ? "hidden-source-map" : "eval-source-map",
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true),
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles(),
      },
      {
        test: /\.[tj]sx?$/,
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, "index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-[hash].css",
    }),
    new TsCheckerPlugin(),
    new ESLintWebpackPlugin({
      context: srcPath,
      extensions: [".tsx", ".ts", ".jsx", ".js"],
    }),
  ].filter(Boolean),
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    alias: {
      "@components": path.join(srcPath, "components"),
      "@config": path.join(srcPath, "config"),
      "@styles": path.join(srcPath, "styles"),
      "@utils": path.join(srcPath, "utils"),
      "@static": path.join(srcPath, "static"),
      "@store": path.join(srcPath, "store"),
    },
  },
  devServer: {
    host: "127.0.0.1",
    port: 9000,
    compress: true,
    hot: true,
    historyApiFallback: true,
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512 * 1024,
    maxAssetSize: 512 * 1024,
  },
}
