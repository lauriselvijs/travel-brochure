const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins: [
    require("postcss-preset-env"),
    purgecss({
      whitelistPatterns: [/mgl-map-wrapper.*/, /mapboxgl.*/],
      content: ["*.html"]
    }),
  ],
};
