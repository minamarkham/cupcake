import htm from "https://unpkg.com/htm?module";
import format from "https://unpkg.com/date-fns@2.7.0/esm/format/index.js?module";

const html = htm.bind(h);

// Preview component for a Post
const Post = createClass({
    render() {
        const entry = this.props.entry;

        return html
            `<main>
                <article class="post">
                    <div class="post-header">
                        <small class="tags">
                            <span>Filed under</span>
                            ${
                                entry.getIn(["data", "tags"], []).map(
                                tag =>
                                    html`
                                    <a href="#" class="post-tag" rel="tag">${tag}</a>
                                    `
                                )
                            }
                        </small>
                        <h1>${entry.getIn(["data", "title"], null)}</h1>
                        <h2>${entry.getIn(["data", "subtitle"], null)}</h2>
                        <p>Published on <time>${
                            format(
                            entry.getIn(["data", "date"], new Date()),
                            "dd MMM, yyyy"
                            )
                        }</time></p>
                    </div>
                    ${this.props.widgetFor("body")}
                </article>
            </main>`;
    }
});

export default Post;
