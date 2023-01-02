# 🧁 funfetti [![Netlify Status](https://api.netlify.com/api/v1/badges/8af1abb7-f4a1-46de-b6c7-cda9727b7dd7/deploy-status)](https://app.netlify.com/sites/cupcake-funfetti/deploys)

_Wow, this is an absolutely delicious, I mean really just scrumptious, personal site for the Oakland-based UX engineer Mina Markham._

## Development

#### 0. **Ensure** you're using correct version of node.

```bash
nvm install
```

#### 1. **Install** dependencies.

```bash
npm install
```

#### 2. **Run** the project for local development.

```bash
npm start
```
The site will be compiled into `www/` and available at http://localhost:8080.

#### 3. **Generate** site for production.

```bash
npm run build
```

## Deployment

The site is auto-deployed on [Netlify][netlify] from the `main` branch on GitHub. Deploys are automated on push to `main`.

## Project Structure

```
 .
 ├── 11ty/                          * 11ty configuration file
 ├── node_modules/                  * contains dependencies pulled from npm
 ├── src/                           * input directory a.k.a. source files
 │   ├── assets/                    * static assets such as images, icons, fonts
 │   │   ├── files/                 * downloaded files
 │   │   ├── fonts/                 * font assets
 │   │   ├── icons/                 * favicons and the like
 │   │   ├── images/                * all site images
 │   │   ├── media/                 * non-image media files
 │   │   ├── scripts/               * external javascript files are placed here
 │   │   └── styles/                * styles folder
 │   │       ├── partials/          * place all the sass partial stylesheets in this folder
 │   │       └── styles.scss        * the main stylesheet for the project which gets compiled to CSS
 │   ├── content/                   * where the content resides
 │   ├── data/                      * global data files
 │   └── views/                     * template files including files, extends files, partials, or macros
 │       ├── layouts/               * defined page layouts
 │       └── partials/              * layout partials
 ├── tweets/                        * minamarkham/twitter-archive submodule
 ├── www/                           * output directory a.k.a. complied site
 ├── .editorconfig                  * helps define and maintain consistent coding styles between different editors and IDEs
 ├── .eleventy.js                   * main mainfest file
 ├── .eleventyignore                * defines files to ignore during site generation
 ├── .eslintrc.js                   * ecmascript linting configuration file
 ├── .gitignore                     * contains files that are ignored from git
 ├── .nvmrc                         * define which version of Node.js is required
 ├── LICENSE                        * licensing information
 ├── netlify.toml                   * netlify configuration
 ├── package-lock.json              * stores an exact, versioned dependency tree
 ├── package.json                   * contains all the npm scripts for building, running, deploying etc. and contains all the dependencies
 └── README.md                      * Readme file for the repository
```

## Roadmap

~~🚀 Setup [Netlify](https://www.netlify.com/) for deployment~~  
🖍️ [Syntax highlighting](https://www.11ty.dev/docs/plugins/syntaxhighlight/) for code blocks  
💌 Contact form (using [Netlify Forms](https://docs.netlify.com/forms/setup/))  
📝 Integrate with [Netlify CMS](https://www.netlifycms.org/)  
🏃‍♀️ Setup [Speedlify][speedlify] see: https://mxb.dev/  
⚙️  Service worker to cache content for offline access  
📡 [RSS feed](https://www.11ty.dev/docs/plugins/rss/) for blog posts  
🖼 Image optimization with `eleventy-image`  

## Colophon
This site is built using:

- HTML, obviously
- CSS w/ fancy grids and custom variables
- [11ty](https://www.11ty.dev/), Markdown & [Nunjucks][nunjucks].
- [Netlify](https://www.netlify.com/) for deployment
- These fonts:
  - [TT Chocolates](https://typetype.org/fonts/tt-chocolates/), by TypeType.
  - [Dank Mono](https://philpl.gumroad.com/l/dank-mono), patched with [Nerd Fonts](https://www.nerdfonts.com/).
  - [Milkshake Script](https://creativemarket.com/mila.garret/6547399-Milkshake-Modern-Handwritten-Script) for flourish
- Lots of ideas from a lot of cool people

## License

[MIT][license] © [Mina Markham][author]

[11ty]: https://www.11ty.io/
[Netlify]: https://www.netlify.com/
[nunjucks]: https://mozilla.github.io/nunjucks/
[speedlify]: https://www.speedlify.dev/
[data]: https://www.11ty.dev/docs/data/
[layout]: https://www.11ty.dev/docs/layouts/
[copy]: https://www.11ty.dev/docs/copy/
[author]: https://github.com/minamarkham
[license]: LICENSE
