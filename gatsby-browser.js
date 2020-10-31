import { AsyncFonts, FontListener } from "./components"
import React from "react"

export const wrapRootElement = (
  { element },
  { custom, web, enableListener }
) => {
  const allFonts = [...custom, ...web]
  const fontNames = []
  const fontFiles = allFonts.map(({ file }) => file)
  allFonts.forEach(({ name }) =>
    Array.isArray(name) ? fontNames.push(...name) : fontNames.push(name)
  )

  const hasFontFiles = Boolean(fontFiles.length)
  const hasFontNames = Boolean(fontNames.length)

  return (
    <>
      {hasFontNames && <AsyncFonts hrefs={fontFiles} />}
      {enableListener && hasFontFiles && <FontListener fontNames={fontNames} />}
      {element}
    </>
  )
}
