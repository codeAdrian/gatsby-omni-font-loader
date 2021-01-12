export const getFontNames = (allFonts: { name: string }[]) => {
  const fontNames = []
  allFonts.forEach(({ name }) =>
    Array.isArray(name) ? fontNames.push(...name) : fontNames.push(name)
  )
  return fontNames
}
