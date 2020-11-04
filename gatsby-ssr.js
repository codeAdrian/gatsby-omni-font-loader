import {
  getFontConfig,
  getFontFiles,
  getFontNames,
  getTestFonts,
} from "./utils"

export const onRenderBody = (
  { setHeadComponents, setPostBodyComponents },
  { enableListener, preconnect = [], web = [], custom = [] }
) => {
  const allFonts = [...web, ...custom]
  const preload = getFontFiles(allFonts)
  const fontNames = getFontNames(allFonts)

  const preloadConfig = getFontConfig(preconnect, preload)

  if (enableListener && Boolean(allFonts.length)) {
    const testFontConfig = getTestFonts(fontNames)
    setPostBodyComponents(testFontConfig)
  }

  if(preloadConfig && Boolean(preloadConfig.length)) {
    setHeadComponents(preloadConfig)
  }
}
