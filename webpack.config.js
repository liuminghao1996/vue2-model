const path = require("path");

module.exports = {
  mode: "development",
  // mode: "production",
  devtool: "source-map",
  entry: "./src/index.js",
  //   entry: "./src/test.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
