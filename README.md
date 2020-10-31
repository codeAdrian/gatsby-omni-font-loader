# Gatsby Omni Font Loader

Performant asynchronous font loading plugin for Gatsby.

:globe_with_meridians: Supports web fonts
<br/>
:house: Suports self-hosted fonts
<br/>
:trident: Loads fonts asynchronously to avoid render blocking
<br/>
:stopwatch: Implemented with [fast loading snippets](https://csswizardry.com/2020/05/the-fastest-google-fonts/)
<br/>
:eyes: Loading status watcher for avoiding FOUT & FOUC

## Configuration

Add the following snippet to `gatsby-config.js` plugins array.

```js
{
  /* Include plugin */
  resolve: "gatsby-omni-font-loader",

  /* Plugin options */
  options: {

    /* Enable font loading listener to handle FOUC */
    enableListener: true,

    /* Preconnect URL-s. This example is for Google Fonts */
    preconnect: ["https://fonts.gstatic.com"],

    /* Self-hosted fonts config. Add font files and font CSS files to "static" folder */
    custom: [
      {
        name: ["Font Awesome 5 Brands", "Font Awesome 5 Free"],
        file: "/fonts/fontAwesome/css/all.min.css",
      },
    ],

    /* Web fonts. File link should point to font CSS file. */
    web: [{
        name: "Staatliches",
        file: "https://fonts.googleapis.com/css2?family=Staatliches",
      },
    ],
  },
}
```

## Handling FOUC with Font loading watcher

When loading fonts asynchronously, Flash Of Unstyled Content (FOUC) might happen because fonts load few moments later after page is displayed to the user.

To avoid this, we can use CSS to style the fallback font to closely match the font size, line height and letter spacing of the main font that is being loaded.

When `enableListener: true` is set in plugin config in `gatsby-config.js`, HTML classes are being added to `<body>` element as the fonts are being loaded.

HTML class name format will be in the following format `wf-[font-family-name]--loaded`.

You can use the [Font Style Matcher](https://meowni.ca/font-style-matcher/) to adjust the perfect fallback font and fallback CSS config.

Here is the example of how `body` element will look like after all fonts are being loaded (depending on the config).

```html
<body class="wf-lazy-monday--loaded wf-font-awesome-5-brands--loaded wf-font-awesome-5-free--loaded wf-staatliches--loaded wf-henny-penny--loaded">
```

<img alt="FOUC example" src="https://res.cloudinary.com/dazdt97d3/image/upload/v1604140006/fouc.gif">


## Issues and Contributions

Feel free to report and issues in the "Issues tab" and feel free to contribute to the project by creating Pull Requests.

Contributions are welcome and appreciated!

## Support

The project is created and maintained by [Adrian Bece](https://codeadrian.github.io/) with the generous help of community contributors. If you have used the plugin and would like to contribute, feel free to [Buy Me A Coffee](https://www.buymeacoffee.com/ubnZ8GgDJ).

<a href="https://www.buymeacoffee.com/ubnZ8GgDJ" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-red.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>