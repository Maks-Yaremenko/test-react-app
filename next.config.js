// https://github.com/vercel/next.js/discussions/11267#discussioncomment-101154
function camelCaseRulePatch(config) {
  const rules = config.module.rules
    .find((rule) => typeof rule.oneOf === "object")
    .oneOf.filter((rule) => Array.isArray(rule.use));

  rules.forEach((rule) => {
    rule.use.forEach((moduleLoader) => {
      if (
        moduleLoader.loader.includes("css-loader") &&
        typeof moduleLoader.options.modules === "object"
      ) {
        moduleLoader.options = {
          ...moduleLoader.options,
          modules: {
            ...moduleLoader.options.modules,
            exportLocalsConvention: "camelCase", // https://github.com/webpack-contrib/css-loader#exportlocalsconvention
          },
        };
      }
    });
  });
}

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["placeimg.com"],
  },
  webpack: (config) => {
    camelCaseRulePatch(config);

    return config;
  },
};
