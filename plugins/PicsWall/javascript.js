"use strict";

const App = {
  config: {},
  pluginInitialized: false,
};

const getPluginConfig = async () => {
  try {
    console.log("PicsWall Building config query...")
    const query = `query GetPluginConfig {
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
      
    
      console.log("Sending graphql request: ", query)
      console.log("Waiting response...")
      await csLib.callGQL({query}).then(res => {
        console.log("PicsWall: graphql response found: ", res);
        App.config = {
          apiKey: res.configuration.general.apiKey,
          pluginConfig: res.configuration?.plugins["PicsWall"] ?? {}

        };

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

function OnStashPageChange(evt) {
  console.log("PicsWall: Stash location changed event fired:", evt)

}

function OnDomReady(evt){
  console.log("PicsWall: DOMLoaded event fired:", evt)
}

async function InitPlugin() {
  try {
     console.log("Initialising PicsWall Plugin...");
     if (App.pluginInitialized) {
        console.warn("PicsWall plugin already initialised: exiting.");
        return null;

      }
      //TODO Create event listeners...
      console.log("PicsWall: creating event listeners...");
      document.addEventListener("DOMContentLoaded", OnDomReady)
      window.stashListener.addEventListener("stash:location", OnStashPageChange);
      
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
    App.pluginInitialized= true;
  }
 
  
}



// Initialization (avoid top-level await by using an async IIFE)
(async () => {
  InitPlugin();
})();
