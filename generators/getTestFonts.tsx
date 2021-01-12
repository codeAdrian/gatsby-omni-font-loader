import React from "react"

export const getTestFonts = (fontNames: string[]) => {
  const fontConfig = []

  const hiddenStyles: React.CSSProperties = {
    position: "absolute",
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    height: "1px",
    width: "1px",
    margin: "-1px",
    padding: "0",
    border: "0",
  }

  fontNames.forEach(fontName => {
    fontConfig.push(
      <span
        key={`wf-test-${fontName}`}
        aria-hidden="true"
        style={{ ...hiddenStyles, fontFamily: `"${fontName}"` }}
      >
        &nbsp;
      </span>
    )
  })

  return (
    <span key="wf-test-wrapper" style={hiddenStyles}>
      {fontConfig}
    </span>
  )
}
