const path = require("path");

module.exports = {
  entry: [
    "./js/card.js",
    "./js/xhr.js",
    "./js/load.js",
    "./js/upload.js",
    "./js/debounce.js",
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
