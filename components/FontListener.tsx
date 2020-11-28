import React, { useEffect, useMemo, useRef, useState } from "react"
import { Helmet } from "react-helmet"
import { kebabCase } from "../utils"

declare var document: { fonts: any }

interface Props {
  fontNames: string[]
  interval?: number
  timeout?: number
}

export const FontListener: React.FC<Props> = ({
  fontNames,
  interval = 300,
  timeout = 30000,
}) => {
  const [hasLoaded, setHasLoaded] = useState<Boolean>(false)
  const [loadedFonts, setLoadedFonts] = useState<string[]>([])
  const [intervalId, setIntervalId] = useState<number>(-1)
  const attempts = useRef<number>(Math.floor(timeout / interval))

  const pendingFonts = useMemo(
    () => fontNames.filter(fontName => !loadedFonts.includes(fontName)),
    [loadedFonts, fontNames]
  )

  const loadedClassname = useMemo(getLoadedFontClassNames, [loadedFonts])

  const apiAvailable = "fonts" in document

  useEffect(() => {
    if (!apiAvailable) {
      handleApiError("Font loading API not available")
      return
    }

    if (apiAvailable && !hasLoaded && intervalId < 0) {
      const id = window.setInterval(isFontLoaded, interval)
      setIntervalId(id)
    }
  }, [hasLoaded, intervalId, apiAvailable])

  useEffect(() => {
    if (hasLoaded && intervalId > 0) {
      clearInterval(intervalId)
    }
  }, [hasLoaded, intervalId])

  return (
    <Helmet>
      <body className={loadedClassname} />
    </Helmet>
  )

  function getLoadedFontClassNames() {
    return Boolean(loadedFonts.length)
      ? loadedFonts
          .map(fontName => `wf-${kebabCase(fontName)}--loaded`)
          .join(" ")
      : ""
  }

  function errorFallback() {
    setHasLoaded(true)
    setLoadedFonts(fontNames)
  }

  function handleApiError(error) {
    console.info(`document.fonts API error: ${error}`)
    console.info(`Replacing fonts instantly. FOUT handling failed due.`)
    errorFallback()
  }

  function isFontLoaded() {
    const loaded = []
    attempts.current = attempts.current - 1

    if (attempts.current < 0) {
      handleApiError("Interval timeout reached, maybe due to slow connection.")
    }

    const fontsLoading = pendingFonts.map(fontName => {
      let hasLoaded = false
      try {
        hasLoaded = document.fonts.check(`12px '${fontName}'`)
      } catch (error) {
        handleApiError(error)
        return
      }

      if (hasLoaded) loaded.push(fontName)
      return hasLoaded
    })

    const allFontsLoaded = fontsLoading.every(font => font)

    if (Boolean(loaded.length)) {
      setLoadedFonts(loaded)
    }

    if (allFontsLoaded) {
      setHasLoaded(true)
    }
  }
}
