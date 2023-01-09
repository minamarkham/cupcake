import CMS from 'netlify-cms-app'
import Post from './templates/post.js';
import Page from './templates/page.js';

CMS.registerPreviewTemplate("posts", Post);
CMS.registerPreviewTemplate("pages", Page);

CMS.registerPreviewStyle("./assets/styles/main.css");
