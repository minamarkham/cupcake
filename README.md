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

## Project Structure

```
 .
 ├── 11ty/                          * 11ty configuration file
 ├── node_modules/                  * contains dependencies pulled from npm
 ├── src/                           * input directory a.k.a. source files
 │   ├── assets/                    * static assets such as images, icons, fonts
 │   ├── content/                   * where the content resides
 │   ├── data/                      * global data files
 │   └── views/                     * template files including files, extends files, partials, or macros
 │       ├── layouts/               * defined page layouts
 │       └── partials/              * layout partials
 ├── www/                           * oupt directory a.k.a. complied site
 ├── .eleventy.js                   * main mainfest file
 ├── .eleventyignore                * defines files to ignore during site generation
 ├── .gitignore                     * contains files that are ignored from git
 ├── LICENSE                        * licensing information
 ├── package-lock.json              * stores an exact, versioned dependency tree
 ├── package.json                   * contains all the npm scripts for building, running, deploying etc. and contains all the dependencies
 └── README.md                      * Readme file for the repository
```

## Roadmap

🚀 Setup [Netlify](https://www.netlify.com/) for deployment  
🖍️ [Syntax highlighting](https://www.11ty.dev/docs/plugins/syntaxhighlight/) for code blocks  
💌 Contact form (using [Netlify Forms](https://docs.netlify.com/forms/setup/))  
📝 Integrate with [Netlify CMS](https://www.netlifycms.org/)  
⚙️  Service worker to cache content for offline access  
📡 [RSS feed](https://www.11ty.dev/docs/plugins/rss/) for blog posts  

## Colophon
This site is built using:

- HTML, obviously
- CSS w/ fancy grids and custom variables
- [11ty](https://www.11ty.dev/), leveraging Markdown & [Nunjucks][nunjucks].
- These fonts:
  - [TT Chocolates](https://typetype.org/fonts/tt-chocolates/), by TypeType.
  - [Dank Mono](https://philpl.gumroad.com/l/dank-mono), patched with [Nerd Fonts](https://www.nerdfonts.com/).
- Lots of ideas from a lot of cool people

## License

[MIT][license] © [Mina Markham][author]

This is my personal website. I'm keeping its source code open as a learning resource, but this is not a template. You're free to re-use __parts of this codebase__ in your own site, with attribution. Just __don't copy the entire thing__, replace the content and publish it. You know, don't be a dick.

[11ty]: https://www.11ty.io/
[nunjucks]: https://mozilla.github.io/nunjucks/
[author]: https://github.com/minamarkham
[license]: LICENSE
