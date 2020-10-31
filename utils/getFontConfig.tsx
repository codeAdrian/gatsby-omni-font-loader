import React from "react"

export const getFontConfig = (
  preconnectConfig: string[],
  preloadConfig: string[]
) => {
  const headComponents = []

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

  preloadConfig.forEach(href => {
    headComponents.push(
      <link key={`preload-${href}`} rel="preload" as="style" href={href} />
    )
  })

  return headComponents
}
