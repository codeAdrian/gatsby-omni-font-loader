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

  const hasPreconnect = Boolean(preconnect.length)
  const hasPreload = Boolean(preload.length)

  if (!preconnect || !preload || !hasPreconnect || !hasPreload) return

  const preloadConfig = getFontConfig(preconnect, preload)

  if (enableListener) {
    const testFontConfig = getTestFonts(fontNames)
    setPostBodyComponents(testFontConfig)
  }

  setHeadComponents(preloadConfig)
}
