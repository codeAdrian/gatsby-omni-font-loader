export const getFontNames = (allFonts: { name: string | string[] }[]) => {
  const fontNames: string[] = []
  allFonts.forEach(({ name }) =>
    Array.isArray(name) ? fontNames.push(...name) : fontNames.push(name)
  )
  return fontNames
}
