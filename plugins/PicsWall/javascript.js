"use strict";

const App = {
  config: {},
  pluginInitialized: false,
};

const getPluginConfig = async () => {
  try {
    console.log("PicsWall Building config query...")
    let gqlQuery = `query GetPluginConfig {
   configuration {
    general
    {
    	apiKey
      username
      password
      
      
  }
    ui
    plugins
  
}
}`
      
    
      console.log("Sending graphql request: ", gqlQuery)
      console.log("Waiting response...")
      await csLib.callGQL({gqlQuery}).then(res => {
        console.log("PicsWall: graphql response found: ", res);
        App.config = res;

    })
    

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

async function InitPlugin() {
  try {
     console.log("Initialising PicsWall Plugin...");
     if (App.pluginInitialized) {
        console.warn("PicsWall plugin already initialised: exiting.");
        return null;

      }
      //TODO Create event listeners...
      console.log("PicsWall: creating event listeners...");
      
      console.log("Getting plugin configuration...");
      await getPluginConfig().then(data => {
          console.log("Found configuration data: ", data);



      })

  }
  catch (error) {
    console.error("error during PicsWall plugin Init: ", error)

  }
  finally {
    console.log("PicsWall plugin initialized successfully.") //TODO: send custom event
  }
 
  
}



// Initialization (avoid top-level await by using an async IIFE)
(async () => {
  InitPlugin();
})();
