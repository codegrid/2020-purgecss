const { PurgeCSS } = require("purgecss");

module.exports = (eleventyConfig) => {
  eleventyConfig.addTransform("purge-css", async function (content) {
    const purgeCSSResult = await new PurgeCSS().purge({
      content: [
        {
          raw: content,
          extension: "html",
        },
      ],
      css: ["src/css/style.css"],
    });
    return content.replace(
      "</head>",
      `<style>${purgeCSSResult[0].css}</style></head>`
    );
  });
  return {
    dir: {
      input: "src/site",
    },
  };
};
