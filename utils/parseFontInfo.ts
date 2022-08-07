import { kebabCase } from "../utils";
import { FontInfo } from './fontListener';


const weights = {
    1: "100",
    2: "200",
    3: "300",
    4: "400",
    5: "500",
    6: "600",
    7: "700",
    8: "800",
    9: "900",
    100: "1",
    200: "2",
    300: "3",
    400: "4",
    500: "5",
    600: "6",
    700: "7",
    800: "8",
    900: "9",
    normal: "4",
    bold: "7",
}


const styles = {
    n: "normal",
    i: "italic",
    o: "oblique",
    normal: "n",
    italic: "i",
    oblique: "o",
}

const VARIATION_MATCH = new RegExp("^(n|i)([1-9])$")


export const parseFontInfo = (fontFamilies: string[]) => {
    const length = fontFamilies.length

    const parsedFonts: FontInfo[] = []
    for (let i = 0; i < length; i++) {
        const elements = fontFamilies[i].split(":")
        const fontFamily = elements[0].replace(/\+/g, " ")
        let variations = [{ fontStyle: '', fontWeight: '' }]

        if (elements.length >= 2) {
            const fvds = parseVariations(elements[1])

            if (fvds.length > 0) {
                variations = fvds
            }
        }

        for (let j = 0; j < variations.length; j += 1) {
            parsedFonts.push({ fontName: fontFamily, ...variations[j] })
        }
    }
    return parsedFonts
}

const generateFontVariationDescription = (variation: string) => {
    const normalizedVariation = variation.toLowerCase()
    const groups = VARIATION_MATCH.exec(normalizedVariation)
    if (groups == null) {
        return ""
    }
    const styleMatch = normalizeStyle(groups[1])
    const weightMatch = normalizeWeight(groups[2])
    return (
        {
            fontStyle: styleMatch,
            fontWeight: weightMatch
        }
    )
}

export const normalizeStyle = (parsedStyle: string): string => {
    if (!parsedStyle) {
        return ""
    }
    return styles[parsedStyle]
}

export const normalizeWeight = (parsedWeight: string | number): string => {
    if (!parsedWeight) {
        return ""
    }
    return weights[parsedWeight]

}

const parseVariations = (variations: string) => {
    let finalVariations: Omit<FontInfo, 'fontName'>[] = []

    if (!variations) {
        return finalVariations
    }
    const providedVariations = variations.split(",")
    const length = providedVariations.length

    for (let i = 0; i < length; i++) {
        let variation = providedVariations[i]
        const fvd = generateFontVariationDescription(variation)

        if (fvd) {
            finalVariations.push(fvd)
        }
    }
    return finalVariations
}

 
export const convertToFVD = (fontInfo: FontInfo) => {
    const weightVal = normalizeWeight(fontInfo.fontWeight)
    const styleVal = normalizeStyle(fontInfo.fontStyle)
    const styleWeight = styleVal + weightVal
    const fontNameVal = kebabCase(fontInfo.fontName)
    return styleWeight ? [fontNameVal, styleWeight].join('-') : fontNameVal

}