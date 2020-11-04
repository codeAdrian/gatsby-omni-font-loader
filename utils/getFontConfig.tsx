import React from "react"

export const getFontConfig = (
  preconnectConfig: string[],
  preloadConfig: string[]
) => {
  const headComponents = []

  if (
    preconnectConfig &&
    Array.isArray(preconnectConfig) &&
    Boolean(preconnectConfig.length)
  ) {
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

  if (
    preloadConfig &&
    Array.isArray(preloadConfig) &&
    Boolean(preloadConfig.length)
  ) {
    preloadConfig.forEach(href => {
      headComponents.push(
        <link key={`preload-${href}`} rel="preload" as="style" href={href} />
      )
    })
  }

  return headComponents
}
