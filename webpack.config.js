const path = require(`path`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public/js`)
  },
  devtool: `source-map`,
  devServer: {
    hot: false
  },
};

