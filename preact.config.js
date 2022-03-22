export default {
  webpack(config, env, helpers, options) {
    const manifestPlugin = helpers.getPluginsByName(
      config,
      "InjectManifest"
    )[0];
    if (manifestPlugin) {
      manifestPlugin.plugin.config.maximumFileSizeToCacheInBytes =
        25 * 1024 * 1024;
    }
  },
};
