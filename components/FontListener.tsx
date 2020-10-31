import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"

declare var document: { fonts: any }

export const FontListener: React.FC<{ fontNames: string[] }> = ({
  fontNames,
}) => {
  const [hasLoaded, setHasLoaded] = useState<Boolean>(false)
  const [loadedFonts, setLoadedFonts] = useState<string[]>([])
  const [intervalId, setIntervalId] = useState<number>(-1)

  const apiAvailable = "fonts" in document

  useEffect(() => {
    if (!apiAvailable) {
      setHasLoaded(true)
      setLoadedFonts(fontNames)
      return
    }

    if (!hasLoaded && intervalId < 0) {
      const id = window.setInterval(isFontLoaded, 100)
      setIntervalId(id)
    }
  }, [hasLoaded, intervalId, apiAvailable])

  useEffect(() => {
    if (hasLoaded && intervalId > 0) {
      clearInterval(intervalId)
    }
  }, [hasLoaded, intervalId])

  const loadedClassname = Boolean(loadedFonts.length)
    ? loadedFonts.map(fontName => `wf-${kebabCase(fontName)}--loaded`).join(" ")
    : ""

  return (
    <Helmet>
      {Boolean(loadedFonts.length) && <body className={loadedClassname} />}
    </Helmet>
  )

  function kebabCase(str) {
    return str
      .match(/[A-Z]{2,}(?=[A-Z][a-z0-9]*|\b)|[A-Z]?[a-z0-9]*|[A-Z]|[0-9]+/g)
      .filter(Boolean)
      .map(x => x.toLowerCase())
      .join("-")
  }

  function isFontLoaded() {
    const loaded = []

    const fontsLoading = fontNames.map(fontName => {
      let hasLoaded = false
      try {
        hasLoaded = document.fonts.check(`12px '${fontName}'`)
      } catch (error) {
        console.info(`document.fonts API error: ${error}`)
        console.info(`Replacing fonts instantly. FOUT handling failed.`)
        setHasLoaded(true)
        setLoadedFonts(fontNames)
        return
      }

      if (hasLoaded) loaded.push(fontName)
      return hasLoaded
    })

    const allFontsLoaded = fontsLoading.every(font => font)

    if (loadedFonts.length !== loaded.length) {
      setLoadedFonts(loaded)
    }

    if (allFontsLoaded) {
      setHasLoaded(true)
    }
  }
}
