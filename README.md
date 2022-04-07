<div align="center">
<img src="https://res.cloudinary.com/dazdt97d3/image/upload/c_scale,q_auto:best,w_200/v1606558223/omni-logo.jpg" alt="Omni font loader logo">
<br/><br/>
<h1>Gatsby Omni Font Loader v2</h1>
</div>

- Simple way to add webfonts or custom fonts to Gatsby project
- Performant asynchronous font loading can be enabled
- Font loading listener can be enabled
- Flash Of Unstyled Text (FOUT) handling support

<div align="center">
<br/>
<img src="https://badgen.net/github/tag/codeAdrian/gatsby-omni-font-loader" /> <img src="https://badgen.net/npm/dt/gatsby-omni-font-loader" /> <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" />
<br/><br/>

<img src="https://badgen.net/github/stars/codeAdrian/gatsby-omni-font-loader" /> <img src="https://badgen.net/github/open-issues/codeAdrian/gatsby-omni-font-loader" /> <img src="https://badgen.net/github/closed-issues/codeAdrian/gatsby-omni-font-loader" /> <img src="https://badgen.net/github/last-commit/codeAdrian/gatsby-omni-font-loader/main" /> <img src="https://badgen.net/github/license/codeAdrian/gatsby-omni-font-loader" /> <img src="https://badgen.net/packagephobia/install/gatsby-omni-font-loader" />

</div>
<br/><br/>

## Features

- Supports web fonts & self-hosted fonts
- Preloads the files & preconnects to the URL
- Loads fonts asynchronously to avoid render blocking
- Implemented with [fast loading snippets](https://csswizardry.com/2020/05/the-fastest-google-fonts/)
- Loading status listener for avoiding FOUT
- Small size & minimal footprint

## Install

`npm install gatsby-omni-font-loader react-helmet`

or

`yarn add gatsby-omni-font-loader react-helmet`

## Configuration

Add the following snippet to `gatsby-config.js` plugins array.

```js
{
  /* Include plugin */
  resolve: "gatsby-omni-font-loader",

  /* Plugin options */
  options: {

    /* Font loading mode */
    mode: "async",

    /* Enable font loading listener to handle FOUT */
    enableListener: true,

    /* Preconnect URL-s. This example is for Google Fonts */
    preconnect: ["https://fonts.gstatic.com"],

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
      <td>mode</td>
      <td>Can be set to <code>async</code> (default) or <code>render-blocking</code>. In <code>async</code> mode, fonts are loaded in optimal way, but FOUT is visible. In <code>render-blocking</code> mode FOUT will happen in rare cases, but the font files will become render-blocking.</td>
      <td>async</td>
  </tr>
    <tr>
      <td>scope</td>
      <td>Can be set to <code>body</code> (default) or <code>html</code>. Sets the target element for HTML classnames to be applied to.</td>
      <td>body</td>
  </tr>
    <tr>
      <td>enableListener</td>
      <td>Works in <code>async</code> mode. Enable font loading listener to handle Flash Of Unstyled Text. If enabled, CSS classes will be applied to HTML once each font has finished loading.</td>
      <td>false</td>
    </tr>
    <tr>
      <td>interval <strong>(V1 ONLY)</strong></td>
      <td>Works if <code>enableListener</code> is <code>true</code>. Font listener interval (in ms). Default is 300ms. Recommended: >=300ms. </td>
      <td>300</td>
    </tr>
    <tr>
      <td>timeout <strong>(V1 ONLY)</strong></td>
      <td>Works if <code>enableListener</code> is <code>true</code>. Font listener timeout value (in ms). Default is 30s (30000ms). Listener will no longer check for loaded fonts after timeout, fonts will still be loaded and displayed, but without handling FOUT.</td>
      <td>30000</td>
    </tr>
    <tr>
      <td>custom</td>
      <td>Self-hosted fonts config. Add font files and font CSS files to <code>static</code> folder. Array of <code>{name: "Font name", file: "https://url-to-font-css.path"}</code> objects.</td>
      <td><code>[]</code></td>
    </tr>
    <tr>
      <td>web</td>
      <td>Web fonts config. File link should point to font CSS file. Array of <code>{name: "Font name", file: "https://url-to-font-css.path"}</code> objects.</td>
      <td><code>[]</code></td>
    </tr>
    <tr>
      <td>preconnect</td>
      <td>URLs used for preconnect meta. Base URL where <strong>font files</strong> are hosted.</td>
      <td><code>[]</code></td>
    </tr>
    <tr>
      <td>preload</td>
      <td>Additional URLs used for preload meta. Preload for URLs provided under <code>file</code> attribute of <code>custom</code> and <code>web</code> fonts are automatically generated.</td>
      <td><code>[]</code></td>
    </tr>
  <tbody>
</table>

## Async mode vs Render-blocking mode

### Async mode

Load font stylesheets and files in low-priority mode. If you want to add fonts in a performant way, handle FOUT on your own and make sure that the page render times are low, you should use `async` mode.

**Pros:** Performance, content is displayed before font files are downloaded and parsed
<br/>
**Cons:** FOUT needs to be handled

### Render-blocking mode

Load font stylesheets and files in high-priority mode. If you want to use this plugin as a simple way to add fonts to your project as you would do in any other project, without any performance optimizations and FOUT handling, you should use `render-blocking` mode.

**Pros:** Simple markup, FOUT won't occur in most cases
<br/>
**Cons:** Font stylesheets and font files can delay first content paint time

## Handling FOUT with Font loading listener

When loading fonts asynchronously, Flash Of Unstyled Text (FOUT) might happen because fonts load few moments later after page is displayed to the user.

To avoid this, we can use CSS to style the fallback font to closely match the font size, line height and letter spacing of the main font that is being loaded.

When `enableListener: true` is set in plugin config in `gatsby-config.js`, HTML classes are being added to `<body>` element as the fonts are being loaded.

HTML class name format will be in the following format `wf-[font-family-name]`. When all fonts are loaded `wf-all` is applied.

You can use the [Font Style Matcher](https://meowni.ca/font-style-matcher/) to adjust the perfect fallback font and fallback CSS config.

Here is the example of how `body` element will look like after all fonts are being loaded (depending on the config).

```html
<body
  class="wf-lazy-monday wf-font-awesome-5-brands wf-font-awesome-5-free wf-staatliches wf-all"
></body>
```

<img alt="FOUT example" src="https://res.cloudinary.com/dazdt97d3/image/upload/v1604140006/fouc.gif">

## V2 breaking changes
* Removed `interval` and `timeout` options
* Changed class name format to a more generic `wf-[font-family-name]` to avoid mixing naming conventions

## Issues and Contributions

Feel free to [report issues](https://github.com/codeAdrian/gatsby-omni-font-loader/issues) you find and feel free to contribute to the project by creating Pull Requests.

Contributions are welcome and appreciated!

## Code contributors

Thank you for your contribution!

[Henrik](https://github.com/henrikdahl) • [Lennart](https://github.com/LekoArts) • [Francis Champagne](https://github.com/fcisio) • [Hugo](https://github.com/hugofabricio)

## Supported by

Thank you for your support!

[Roboto Studio](https://roboto.studio/)
