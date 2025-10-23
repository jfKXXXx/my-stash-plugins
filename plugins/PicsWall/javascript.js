"use strict";

const App = {
  config: null,

  pluginInitialized: false,
};

const getConfig = async () => {
  try {
    const config = await getConfiguration("PicsWall");
    App.config = config ?? null;
    if (!App.config) {
      throw new Error("No configuration found");
    }
    return App.config;
  } catch (e) {
    console.error("PicsWall: Failed to get configuration", e);
  }
  console.log("PicsWall: Configuration loaded", config);
};

//Initialization
let conf = await getConfig(); //test
