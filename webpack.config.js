const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/card.js",
    "./js/load.js",
    "./js/upload.js",
    "./js/xhr.js",
    "./js/debouncing.js",
    "./js/pin.js",
    "./js/map.js",
    "./js/form.js",
    "./js/message.js",
    "./js/move.js",
    "./js/filter.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
}
