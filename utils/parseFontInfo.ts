import { kebabCase } from "../utils";
import { FontInfo } from './fontListener';
import { VARIATION_MATCH, WEIGHTS, STYLES } from '../consts';

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
    return STYLES[parsedStyle]
}

export const normalizeWeight = (parsedWeight: string | number): string => {
    if (!parsedWeight) {
        return ""
    }
    return WEIGHTS[parsedWeight]

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

 
export const convertToFVD = ({fontName, fontStyle, fontWeight}: FontInfo) => {
    const weightVal = normalizeWeight(fontWeight)
    const styleVal = normalizeStyle(fontStyle)
    const styleWeight = styleVal + weightVal
    const fontNameVal = kebabCase(fontName)
    return styleWeight ? [fontNameVal, styleWeight].join('-') : fontNameVal
}