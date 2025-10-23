() => {
  "use strict";

  const CONFIG = async () => {
    const conf = await pluginApi.getConfiguration("PicsWall");
    return conf ?? null;
    console.log(conf);
  };
};
