"use strict";

const App = {
  config: {},
  pluginInitialized: false,
};

const getConfig = async () => {
  try {
    console.log("PicsWall Building config query...")
    let gqlReq = {
      query: `{
            configuration {
              general
              {
                apiKey
                username
                password
                
                
            }
              ui
              plugins
            
          }`,

      variables: {}
    }
    console.log("Sending graphql request")
    await csLib.callGQL(gqlReq).then(res=>{
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
     console.log("Initialising PicsWall PLugin...");

     if (App.pluginInitialized) {
        console.warn("PicsWall plugin already initialised: exiting.");
        return;

      }
     
      //Create event listeners...
      console.log("PicsWall: creating event listeners...");
      document.addEventListener("OnPicsWallInit", (e) => {OnPluginReady(e)});

      
      const configData = await getConfig().then(data=> {
        let evt = new CustomEvent("OnPicsWallInit", {details: data}) 
        document.dispatchEvent(evt);
      });
    
      



  }
  catch (error) {
    console.error("error during PicsWall plugin Init: ", error)

  }
 
  
}

function OnPluginReady(e) {
    console.log("PicsWall Plugin initialised successfully. event details: ", e);
    App.pluginInitialized = true;
}


// Initialization (avoid top-level await by using an async IIFE)
(async () => {
  InitPlugin();
})();
