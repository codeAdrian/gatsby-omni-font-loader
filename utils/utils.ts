export const getFontNames = (allFonts: { name: string }[]) => {
  const fontNames = []
  allFonts.forEach(({ name }) =>
    Array.isArray(name) ? fontNames.push(...name) : fontNames.push(name)
  )
  return fontNames
}

export const getFontFiles = (allFonts: { file: string }[]) =>
  allFonts.map(({ file }) => file)

export const kebabCase = str =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z0-9]*|\b)|[A-Z]?[a-z0-9]*|[A-Z]|[0-9]+/g)
    .filter(Boolean)
    .map(x => x.toLowerCase())
    .join("-")
