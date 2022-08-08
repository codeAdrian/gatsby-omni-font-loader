import React from 'react';
import { AsyncFonts } from './components';
import { MODE_DEFAULT, SCOPE_DEFAULT, TIMEOUT_DEFAULT, INTERVAL_DEFAULT } from './consts';
import { getFontFiles, getFontNames } from './utils';
import { fontListener } from './utils/fontListener';

export const onClientEntry = (
  _,
  {
    custom = [],
    web = [],
    enableListener = false,
    scope = SCOPE_DEFAULT,
    timeout = TIMEOUT_DEFAULT,
    interval = INTERVAL_DEFAULT,
  }
) => {
  if (!enableListener) {
    return;
  }

  const allFonts = [...custom, ...web];
  const fontNames = getFontNames(allFonts);
  const listenerProps = { fontNames, scope, timeout, interval };

  fontListener(listenerProps);
};

export const wrapRootElement = ({ element }, { custom = [], web = [], mode = MODE_DEFAULT }) => {
  if (mode !== 'async') {
    return element;
  }

  const allFonts = [...custom, ...web];
  const fontFiles = getFontFiles(allFonts);
  const fontNames = getFontNames(allFonts);
  const hasFontNames = Boolean(fontNames.length);

  return (
    <>
      {hasFontNames && <AsyncFonts hrefs={fontFiles} />}
      {element}
    </>
  );
};
