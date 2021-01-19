import React from "react"
import { AsyncFonts, FontListener } from "./components"
import {
  INTERVAL_DEFAULT,
  MODE_DEFAULT,
  TIMEOUT_DEFAULT,
  SCOPE_DEFAULT,
} from "./consts"
import { getFontFiles, getFontNames } from "./utils"

export const wrapRootElement = (
  { element },
  {
    custom = [],
    web = [],
    enableListener,
    interval = INTERVAL_DEFAULT,
    timeout = TIMEOUT_DEFAULT,
    scope = SCOPE_DEFAULT,
    mode = MODE_DEFAULT,
  }
) => {
  if (mode !== "async") {
    return element
  }

  const allFonts = [...custom, ...web]
  const fontFiles = getFontFiles(allFonts)
  const fontNames = getFontNames(allFonts)

  const listenerProps = { fontNames, interval, timeout, scope }

  const hasFontFiles = Boolean(fontFiles.length)
  const hasFontNames = Boolean(fontNames.length)

  const children = (
    <>
      {hasFontNames && <AsyncFonts hrefs={fontFiles} />}
      {element}
    </>
  )

  if (!hasFontFiles || !enableListener) {
    return children
  }

  return <FontListener options={listenerProps}>{children}</FontListener>
}
