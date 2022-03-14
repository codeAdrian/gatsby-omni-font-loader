import { MODE_DEFAULT } from "./consts";
import { getFontConfig } from "./generators";
import { getFontFiles, getFontNames } from "./utils";

export const onRenderBody = (
  { setHeadComponents },
  {
    enableListener,
    preconnect = [],
    preload = [],
    web = [],
    custom = [],
    mode = MODE_DEFAULT,
  }
) => {
  const allFonts = [...web, ...custom];
  const allPreloads = preload.concat(getFontFiles(allFonts));
  const fontNames = getFontNames(allFonts);

  const preloadConfig = getFontConfig(
    preconnect,
    allPreloads,
    mode === "async" ? [] : allFonts
  );

  if (preloadConfig && Boolean(preloadConfig.length)) {
    setHeadComponents(preloadConfig);
  }
};
