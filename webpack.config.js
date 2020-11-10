const path = require(`path`);

module.exports = {
  entry: [
    "./js/util.js",
    "./js/picture.js",
    "./js/backend.js",
    "./js/thumbnails.js",
    "./js/popup.js",
    "./js/main.js",
    "./js/filter.js",
    "./js/effects.js",
    "./js/set-effect.js",
    "./js/validate.js",
    "./js/upload.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: "eval"
}
