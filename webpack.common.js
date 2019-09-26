const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./front/index.js",
  output: {
    path: path.join(__dirname, "build"),
		filename: "bundle.js",
		publicPath: "/"
  },
  resolve: {
		extensions: [".js"],
		alias: {
			'react-dom': '@hot-loader/react-dom'
		}
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          {
            loader: "eslint-loader",
            options: {
              fix: true
            }
          }
        ]
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "front/index.html")
    })
  ]
};
