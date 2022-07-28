import { kebabCase } from "../utils";

declare var document: { fonts: any };

export const fontListener = ({ fontNames, scope }) => {
  const hasFonts = fontNames && Boolean(fontNames.length);
  const targetElement = scope === "html" ? "documentElement" : "body";
  const apiAvailable = "fonts" in document;

  function handleLoadComplete() {
    addClassName("all");
  }

  function handleFontLoad(fontFaces: FontFace[]) {
    fontFaces.forEach((fontFace) => {
      addClassName(fontFace.family);
    })
  }

  function fontMapper(fontName) {
    return document.fonts
      .load(`1rem ${fontName}`)
      .then(handleFontLoad)
      .catch(errorFallback);
  }

  function loadFonts() {
    const fonts = fontNames.map(fontMapper);
    Promise.all(fonts).then(handleLoadComplete).catch(errorFallback);
  }

  function errorFallback() {
    fontNames.forEach(addClassName);
  }

  function handleApiError(error) {
    console.info(`document.fonts API error: ${error}`);
    console.info(`Replacing fonts instantly. FOUT handling failed.`);
    errorFallback();
  }

  function addClassName(fontName: string) {
    document[targetElement].classList.add(`wf-${kebabCase(fontName)}`);
  }

  if (!apiAvailable) {
    handleApiError("Font loading API not available");
    return;
  }

  if (hasFonts && apiAvailable) {
    loadFonts();
  }
};
