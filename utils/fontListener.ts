import { info, warn } from './logger';
import { convertToFVD, parseFontInfo } from './parseFontInfo';

export type FontInfo = { fontName: string; fontStyle: string; fontWeight: string }

export const fontListener = ({ fontNames, scope, timeout, interval }) => {

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
    const startTime = Date.now();

    return new Promise((resolve, reject) => {
      const recursiveFn = () => {
        const currTime = Date.now();

        if ((currTime - startTime) >= timeout) {
          reject('font listener timeout ' + fontFace);
        } else {
          document.fonts.load(fontFace).then((fonts) => {
            if (fonts.length >= 1) {
              handleFontLoad(fontDetail);
              resolve(true);
            } else {
              setTimeout(recursiveFn, interval);
            }
          }).catch((err) => {
            errorFallback(err);
            reject(err);
          });
        }
      };
      recursiveFn()
    });

  }

  function loadFonts() {
    const fonts = parsedFont.map(fontMapper);
    Promise.all(fonts).then(handleLoadComplete).catch(errorFallback);
  }

  function errorFallback(e) {
    warn('error in omni font loader', e)
    parsedFont.forEach((fontInfo) => addClassName(convertToFVD(fontInfo)));
  }

  function handleApiError(error) {
    info(`document.fonts API error: ${error}`);
    info(`Replacing fonts instantly. FOUT handling failed.`);
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
