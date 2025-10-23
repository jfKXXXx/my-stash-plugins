"use strict";

const App = {
  config: {},
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
    if (!response || !response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("PicsWall: Retrieved configuration data", data);

    App.config = (await data.data) ?? {};

    if (!App.config) {
      console.warn("PicsWall: No configuration found");
      return null;
    }
    console.log("PicsWall: Configuration loaded", App.config);

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
