const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins: [
    require("postcss-preset-env"),
    // BUG: removes mapbox classes
    // purgecss({
    //   whitelistPatterns: [/mapbox*/],
    //   whitelistPatternsChildren: [/mapbox*/],
    //   content: ["*.html"],
    // }),
  ],
};
