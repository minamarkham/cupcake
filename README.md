# 🧁 funfetti [![Netlify Status](https://api.netlify.com/api/v1/badges/8af1abb7-f4a1-46de-b6c7-cda9727b7dd7/deploy-status)](https://app.netlify.com/sites/cupcake-funfetti/deploys)

_Wow, this is an absolutely delicious, I mean really just scrumptious, personal site for the Oakland-based UX engineer Mina Markham._

<p>
  Previous flavors:
  <a href="https://github.com/minamarkham/cupcake/tree/6.0%E2%80%94banana-creme">banana creme</a>,
  <a href="https://github.com/minamarkham/cupcake/tree/5.0%E2%80%94red-velvet" target="_blank">red velvet</a>,
  <a href="https://github.com/minamarkham/cupcake/tree/4.0%E2%80%94lemon" target="_blank">lemon</a>,
  <a href="https://github.com/minamarkham/cupcake/tree/3.0%E2%80%94strawberry" target="_blank">strawberry</a>,
  <a href="https://github.com/minamarkham/cupcake/tree/2.0%E2%80%94chocolate" target="_blank">chocolate</a>,
  and <a href="https://github.com/minamarkham/cupcake/tree/1.0%E2%80%94vanilla" target="_blank">vanilla</a>.
</p>

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

`├──` [`11ty/`](./11ty/) — 11ty configuration files <br/>
`├──` [`src/`](./src/) — input directory a.k.a. source files <br/>
`│   ├──` [`admin/`](./src/admin/) — [Netlify][netlify] CMS <br/>
`│   ├──` [`assets/`](./src/assets/) — static assets such as images, icons, fonts <br/>
`│   │   ├──` [`files/`](./src/assets/files/) — downloaded files <br/>
`│   │   ├──` [`fonts/`](./src/assets/fonts/) — font assets <br/>
`│   │   ├──` [`images/`](./src/assets/images/) — all site images <br/>
`│   │   ├──` [`media/`](./src/assets/media/) — non-image media files <br/>
`│   │   ├──` [`scripts/`](./src/assets/scripts/) — external javascript files are placed here <br/>
`│   │   └──` [`styles/`](./src/assets/styles/) — styles folder <br/>
`│   │       └──` [`main.scss`](./src/assets/styles/main.scss) — the main stylesheet which gets compiled to CSS <br/>
`│   ├──` [`content/`](./src/content/) — where the content resides <br/>
`│   ├──` [`data/`](./src/data/) — global data files <br/>
`│   └──` [`views/`](./src/views/) — template files including files, extends files, partials, or macros <br/>
`│       ├──` [`layouts/`](./src/views/layouts/) — defined page layouts <br/>
`│       └──` [`partials/`](./src/views/partials/) — layout partials <br/>
`├──` [`.browserslistrc`](.browserslistrc) — define target browsers <br/>
`├──` [`.eleventy.js`](.eleventy.js) — main mainfest file <br/>
`├──` [`.eleventyignore`](.eleventyignore) — defines files to ignore during site generation <br/>
`├──` [`.env-sample`](.env-sampl) — example environment variables <br/>
`├──` [`.eslintrc.js`](.eslintrc.js) — ecmascript linting configuration file <br/>
`├──` [`.gitignore`](.gitignore) — contains files that are ignored from git <br/>
`├──` [`.nvmrc`](.nvmrc) — define which version of Node.js is required <br/>
`├──` [`.prettierignore`](.prettierignore) — don't run prettier on these files <br/>
`├──` [`.prettierrc`](.prettierrc) — prettier configuration file <br/>
`├──` [`.stylelintrc`](.stylelintrc) — stylelint configuration file <br/>
`├──` [`LICENSE`](LICENSE) — licensing information <br/>
`├──` [`netlify.toml`](netlify.toml) — [Netlify][netlify] configuration <br/>
`├──` [`package-lock.json`](package-lock.json) — stores an exact, versioned dependency tree <br/>
`├──` [`package.json`](package.json) — npm scripts for building, running, deploying etc. and dependencies <br/>
`└──` [`README.md`](README.md) — this file <br/>

## Roadmap

~~🚀 Setup [Netlify](https://www.netlify.com/) for deployment~~  
~~🖍️ [Syntax highlighting](https://www.11ty.dev/docs/plugins/syntaxhighlight/) for code blocks~~  
~~💌 Contact form (using [Netlify Forms](https://docs.netlify.com/forms/setup/))~~  
📝 Integrate with [Netlify CMS](https://www.netlifycms.org/)  
~~🏃‍♀️ Setup [Speedlify][speedlify]~~  
⚙️  Service worker to cache content for offline access  
~~📡 [RSS feed](https://www.11ty.dev/docs/plugins/rss/) for blog posts~~  
~~🖼 Image optimization with `eleventy-image`~~  

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
