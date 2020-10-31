import React from "react"
import { Helmet } from "react-helmet"

export const AsyncFonts: React.FC<{ hrefs: string[] }> = ({ hrefs }) => {
  const links = []

  hrefs.forEach(href => {
    const noScript = (
      <noscript
        key={`noscript-${href}`}
      >{`<link rel="stylesheet" href="${href}" />`}</noscript>
    )
    const link = (
      <link
        key={`stylesheet-${href}`}
        rel="stylesheet"
        media="all"
        href={href}
      />
    )

    links.push([noScript, link])
  })

  return <Helmet>{links}</Helmet>
}
