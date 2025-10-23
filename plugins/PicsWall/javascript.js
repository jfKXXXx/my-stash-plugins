() => {
  "use strict";

  const App = {
    config: null,

    pluginInitialized: false,
  };

  const getConfig = async () => {
    try {
      const config = await getConfiguration("PicsWall");
      return config ?? null;
    } catch (e) {
      console.error("PicsWall: Failed to get configuration", e);
    }
    console.log("PicsWall: Configuration loaded", config);
  };

  //Initialization
  () => {
    if (App.pluginInitialized) return;
    App.config = getConfig();
    App.pluginInitialized = true;
  };
};
