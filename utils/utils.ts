export const getFontNames = (allFonts: { name: string }[]) => {
  const fontNames = []
  allFonts.forEach(({ name }) =>
    Array.isArray(name) ? fontNames.push(...name) : fontNames.push(name)
  )
  return fontNames
}

export const getFontFiles = (allFonts: { file: string }[]) =>
  allFonts.map(({ file }) => file)
