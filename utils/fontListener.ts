import { convertToFVD, parseFontInfo } from './parseFontInfo';

export type FontInfo = { fontName: string; fontStyle: string; fontWeight: string }
const fontLoadConst = {
  interval: 10,
  timeout: 5000,
}
export const fontListener = ({ fontNames, scope }) => {

  const hasFonts = fontNames && Boolean(fontNames.length);
  const targetElement = scope === "html" ? "documentElement" : "body";
  const apiAvailable = "fonts" in document;

  let parsedFont: FontInfo[] = [];

  function handleLoadComplete() {
    addClassName("all");
  }

  function handleFontLoad(fontInfo: FontInfo) {
    const fvd = convertToFVD(fontInfo)
    addClassName(fvd);
  }

  function fontMapper(fontDetail: FontInfo) {
    const fontFace = [fontDetail.fontStyle, fontDetail.fontWeight, '1rem', fontDetail.fontName].join(' ')
    // refer https://stackoverflow.com/a/64192936/9740955
    return new Promise((resolve, reject) => {
       const poller = setInterval(async () => {
        try {
          await document.fonts.load(fontFace);
        } catch (err) {
          clearTimeout(timeOut)
          clearInterval(poller);
          errorFallback(err)
          reject(err)
        }
        if (document.fonts.check(fontFace)) {
          clearTimeout(timeOut)
          clearInterval(poller);
          handleFontLoad(fontDetail)
          resolve(true);
        }
      }, fontLoadConst.interval);
      const timeOut = setTimeout(() => clearInterval(poller), fontLoadConst.timeout);
    })
  }

  function loadFonts() {
    const fonts = parsedFont.map(fontMapper);
    Promise.all(fonts).then(handleLoadComplete).catch(errorFallback);
  }

  function errorFallback(e) {
    console.warn('error in omni font loader', e)
    parsedFont.forEach((fontInfo) => addClassName(convertToFVD(fontInfo)));
  }

  function handleApiError(error) {
    console.info(`document.fonts API error: ${error}`);
    console.info(`Replacing fonts instantly. FOUT handling failed.`);
    errorFallback(error);
  }

  function addClassName(fontName: string) {
    document[targetElement].classList.add(`wf-${fontName}`);
  }

  if (!apiAvailable) {
    handleApiError("Font loading API not available");
    return;
  }

  if (hasFonts && apiAvailable) {
    parsedFont = parseFontInfo(fontNames)
    loadFonts();
  }
};
