import React from "react"
import { AsyncFonts, FontListener } from "./components"
import { getFontFiles, getFontNames } from "./utils"

export const wrapRootElement = (
  { element },
  { custom = [], web = [], enableListener, interval, timeout }
) => {
  const allFonts = [...custom, ...web]
  const fontFiles = getFontFiles(allFonts)
  const fontNames = getFontNames(allFonts)

  const listenerProps = { fontNames, interval, timeout }

  const hasFontFiles = Boolean(fontFiles.length)
  const hasFontNames = Boolean(fontNames.length)

  return (
    <>
      {hasFontNames && <AsyncFonts hrefs={fontFiles} />}
      {enableListener && hasFontFiles && <FontListener {...listenerProps} />}
      {element}
    </>
  )
}
