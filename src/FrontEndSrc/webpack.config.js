const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          require.resolve("style-loader"),
          {
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1
            }
          }
        ]
      },
      {
        test: /\.less$/,
        exclude: [/src/],
        use: [
          require.resolve("style-loader"),
          {
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1
            }
          },
          {
            loader: require.resolve("less-loader"),
            options: {modifyVars: {"@primary-color": "#1DA57A"}}
          }
        ]
      },
      {
        test: /\.less$/,
        exclude: [/node_modules/],
        use: [
          require.resolve("style-loader"),
          {
            loader: require.resolve("css-loader"),
            options: {
              modules: true,
              localIdentName: "[local]_[hash:base64:8]"
            }
          },
          {
            loader: require.resolve("less-loader"),
            options: {modifyVars: {"@primary-color": "#1DA57A"}}
          }
        ]
      },
      {
        test: /\.(jpg|png|gif)/,
        use: ["url-loader?limit=8000"]
      }
    ]
  },
  output: {
    path: __dirname,
    filename: "./src/bundle.js"
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
