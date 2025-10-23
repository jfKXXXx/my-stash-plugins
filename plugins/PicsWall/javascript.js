() => {
  "use strict";

  const CONFIG = async () => {
    const conf = await pluginApi.getConfiguration("PicsWall");
    console.log("plugin config:", conf);
    return conf ?? null;
  };
};
