<div align="center">
<img src="https://res.cloudinary.com/dazdt97d3/image/upload/c_scale,q_auto:best,w_200/v1606558223/omni-logo.jpg" alt="Omni font loader logo">
<br/><br/>
<h1>Gatsby Omni Font Loader</h1>

Performant asynchronous font loading & Flash Of Unstyled Text (FOUT) handling plugin for Gatsby.

<br/>
<img src="https://badgen.net/github/tag/codeAdrian/gatsby-omni-font-loader" />
&nbsp;
<img src="https://badgen.net/npm/dt/gatsby-omni-font-loader" />
&nbsp;
<img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" />
<br/><br/>

<img src="https://badgen.net/github/stars/codeAdrian/gatsby-omni-font-loader" />
&nbsp;
<img src="https://badgen.net/github/open-issues/codeAdrian/gatsby-omni-font-loader" />
&nbsp;
<img src="https://badgen.net/github/closed-issues/codeAdrian/gatsby-omni-font-loader" />
&nbsp;
<img src="https://badgen.net/github/last-commit/codeAdrian/gatsby-omni-font-loader/main" />
&nbsp;
<img src="https://badgen.net/github/license/codeAdrian/gatsby-omni-font-loader" />
&nbsp;
<img src="https://badgen.net/packagephobia/install/gatsby-omni-font-loader" />
</div>
<br/><br/>

## Features

* Supports web fonts & self-hosted fonts
* Preloads the files & preconnects to the URL
* Loads fonts asynchronously to avoid render blocking
* Implemented with [fast loading snippets](https://csswizardry.com/2020/05/the-fastest-google-fonts/)
* Loading status listener for avoiding FOUT
* Small size & minimal footprint

## Install

`npm install --save-dev gatsby-omni-font-loader`

or

`yarn add --dev gatsby-omni-font-loader`

## Configuration

Add the following snippet to `gatsby-config.js` plugins array.

```js
{
  /* Include plugin */
  resolve: "gatsby-omni-font-loader",

  /* Plugin options */
  options: {

    /* Enable font loading listener to handle FOUT */
    enableListener: true,

    /* Preconnect URL-s. This example is for Google Fonts */
    preconnect: ["https://fonts.gstatic.com"],

    /* Font listener interval (in ms). Default is 300ms. Recommended: >=300ms */
    interval: 300,

    /* Font listener timeout value (in ms). Default is 30s (30000ms). Listener will no longer check for loaded fonts after timeout, fonts will still be loaded and displayed, but without handling FOUT. */
    timeout: 30000,

    /* Self-hosted fonts config. Add font files and font CSS files to "static" folder */
    custom: [
      {
        /* Exact name of the font as defied in @font-face CSS rule */
        name: ["Font Awesome 5 Brands", "Font Awesome 5 Free"],
        /* Path to the font CSS file inside the "static" folder with @font-face definition */
        file: "/fonts/fontAwesome/css/all.min.css",
      },
    ],

    /* Web fonts. File link should point to font CSS file. */
    web: [{
        /* Exact name of the font as defied in @font-face CSS rule */
        name: "Staatliches",
        /* URL to the font CSS file with @font-face definition */
        file: "https://fonts.googleapis.com/css2?family=Staatliches",
      },
    ],
  },
}
```

## Options

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Description</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>enableListener</td>
      <td>Enable font loading listener to handle Flash Of Unstyled Text. If enabled, CSS classes will be applied to HTML once each font has finished loading.</td>
      <td>false</td>
    </tr>
    <tr>
      <td>preconnect</td>
      <td>URLs used for preconnect meta. Base URL where <strong>font files</strong> are hosted.</td>
      <td>[]</td>
    </tr>
    <tr>
      <td>interval</td>
      <td>Font listener interval (in ms). Default is 300ms. Recommended: >=300ms. </td>
      <td>300</td>
    </tr>
    <tr>
      <td>timeout</td>
      <td>Font listener timeout value (in ms). Default is 30s (30000ms). Listener will no longer check for loaded fonts after timeout, fonts will still be loaded and displayed, but without handling FOUT.</td>
      <td>30000</td>
    </tr>
    <tr>
      <td>custom</td>
      <td>Self-hosted fonts config. Add font files and font CSS files to "static" folder. Array of <code>{name: "Font name", file: "https://url-to-font-css.path"}</code> objects.</td>
      <td>[]</td>
    </tr>
    <tr>
      <td>web</td>
      <td>Web fonts config. File link should point to font CSS file. Array of <code>{name: "Font name", file: "https://url-to-font-css.path"}</code> objects.</td>
      <td>[]</td>
    </tr>
  <tbody>
</table>

## Handling FOUT with Font loading listener

When loading fonts asynchronously, Flash Of Unstyled Text (FOUT) might happen because fonts load few moments later after page is displayed to the user.

To avoid this, we can use CSS to style the fallback font to closely match the font size, line height and letter spacing of the main font that is being loaded.

When `enableListener: true` is set in plugin config in `gatsby-config.js`, HTML classes are being added to `<body>` element as the fonts are being loaded.

HTML class name format will be in the following format `wf-[font-family-name]--loaded`.

You can use the [Font Style Matcher](https://meowni.ca/font-style-matcher/) to adjust the perfect fallback font and fallback CSS config.

Here is the example of how `body` element will look like after all fonts are being loaded (depending on the config).

```html
<body class="wf-lazy-monday--loaded wf-font-awesome-5-brands--loaded wf-font-awesome-5-free--loaded wf-staatliches--loaded wf-henny-penny--loaded">
```

<img alt="FOUT example" src="https://res.cloudinary.com/dazdt97d3/image/upload/v1604140006/fouc.gif">

## Issues and Contributions

Feel free to [report issues](https://github.com/codeAdrian/gatsby-omni-font-loader/issues) you find and feel free to contribute to the project by creating Pull Requests.

Contributions are welcome and appreciated!

## Thank you for the support

[Roboto Studio](https://roboto.studio/) • [Your Name Here](https://www.buymeacoffee.com/ubnZ8GgDJ/e/11337)

## Support

The project is created and maintained by [Adrian Bece](https://codeadrian.github.io/) with the generous help of community contributors. If you have used the plugin and would like to contribute, feel free to [Buy Me A Coffee](https://www.buymeacoffee.com/ubnZ8GgDJ).

<a href="https://www.buymeacoffee.com/ubnZ8GgDJ"><img src="https://img.buymeacoffee.com/button-api/?text=Support this project&emoji=&slug=ubnZ8GgDJ&button_colour=BD5FFF&font_colour=ffffff&font_family=Bree&outline_colour=000000&coffee_colour=FFDD00"></a>
