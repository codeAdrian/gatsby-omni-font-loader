import React from "react"
import { arrayCheck, kebabCase } from "../utils"

export const getFontConfig = (
  preconnectConfig: string[],
  preloadConfig: string[],
  renderBlockingFonts?: { name: string | string[]; file: string }[]
) => {
  const headComponents = []

  if (arrayCheck(preconnectConfig)) {
    preconnectConfig.forEach(href => {
      headComponents.push(
        <link
          key={`preconnect-${href}`}
          rel="preconnect"
          href={href}
          crossOrigin="true"
        />
      )
    })
  }

  if (arrayCheck(preloadConfig)) {
    preloadConfig.forEach(href => {
      headComponents.push(
        <link key={`preload-${href}`} rel="stylesheet" href={href} />
      )
    })
  }

  if (arrayCheck(renderBlockingFonts)) {
    renderBlockingFonts.forEach(({ name, file }) => {
      const key = Array.isArray(name)
        ? name.map(n => kebabCase(n)).join("-")
        : kebabCase(name)
      headComponents.push(
        <link key={`render-blocking-${key}`} href={file} rel="stylesheet" />
      )
    })
  }

  return headComponents
}
