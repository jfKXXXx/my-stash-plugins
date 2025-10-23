"use strict";

const App = {
  config: { apiKey: "", pluginId: "" },
  pluginInitialized: false,
};

const getConfig = async () => {
  try {
    if (typeof csLib.getConfiguration !== "function") {
      console.warn(
        "PicsWall: getConfiguration not available (missing UI library?)"
      );
      return null;
    }
    const response = await csLib.getConfiguration("PicsWall");

    App.config.apiKey = response.apiKey ?? "";
    App.config.pluginId = response.pluginId ?? "";
    if (!App.config) {
      console.warn("PicsWall: No configuration found");
      return null;
    }
    console.log("PicsWall: Configuration loaded", App.config);
    console.log("PicsWall: Configuration Apikey", App.config.apiKey);
    return App.config;
  } catch (e) {
    console.error("PicsWall: Failed to get configuration", e);
    return null;
  }
};

// Initialization (avoid top-level await by using an async IIFE)
(async () => {
  const conf = await getConfig();
  App.pluginInitialized = true;
  if (App.pluginInitialized) {
    console.log("PicsWall: Plugin initialized");
  }
})();
