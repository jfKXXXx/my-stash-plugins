() => {
  "use strict";

  const App = {
    config: null,

    pluginInitialized: false,
  };

  const getConfig = async () => {
    try {
      const config = await getConfiguration("PicsWall");
      App.config = config ?? null;
    } catch (e) {
      console.error("PicsWall: Failed to get configuration", e);
    }
    console.log("PicsWall: Configuration loaded", CONFIG);
  };

  //Initialization
  async () => {
    await getConfig();
    App.pluginInitialized = true;
    console.log("PicsWall: Plugin initialized");
  };
};
