import { useEffect, useMemo, useRef, useState } from "react"
import { kebabCase } from "../utils"

declare var document: { fonts: any }

export type hookOptions = {
  fontNames: string[]
  interval: number
  timeout: number
  scope: string
}

type fontListenerHook = (options: hookOptions) => void

export const useFontListener: fontListenerHook = ({
  fontNames,
  interval,
  timeout,
  scope,
}) => {
  const [hasLoaded, setHasLoaded] = useState<Boolean>(false)
  const [loadedFonts, setLoadedFonts] = useState<string[]>([])
  const [intervalId, setIntervalId] = useState<number>(-1)
  const attempts = useRef<number>(Math.floor(timeout / interval))

  const hasFonts = fontNames && Boolean(fontNames.length)

  const pendingFonts = useMemo(
    () => fontNames.filter(fontName => !loadedFonts.includes(fontName)),
    [loadedFonts, fontNames]
  )
  const targetElement = useMemo(
    () => (scope === "html" ? "documentElement" : "body"),
    [scope]
  )

  const apiAvailable = "fonts" in document

  useEffect(() => {
    if (!apiAvailable) {
      handleApiError("Font loading API not available")
      return
    }

    if (hasFonts && apiAvailable && !hasLoaded && intervalId < 0) {
      const id = window.setInterval(isFontLoaded, interval)
      setIntervalId(id)
    }
  }, [hasFonts, hasLoaded, intervalId, apiAvailable])

  useEffect(() => {
    if (hasLoaded && intervalId > 0) {
      clearInterval(intervalId)
    }
  }, [hasLoaded, intervalId])

  function errorFallback() {
    setHasLoaded(true)
    setLoadedFonts(fontNames)
    fontNames.forEach(addClassName)
  }

  function handleApiError(error) {
    console.info(`document.fonts API error: ${error}`)
    console.info(`Replacing fonts instantly. FOUT handling failed.`)
    errorFallback()
  }

  function addClassName(fontName) {
    document[targetElement].classList.add(`wf-${kebabCase(fontName)}--loaded`)
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

      if (hasLoaded) {
        addClassName(fontName)
        loaded.push(fontName)
      }

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
