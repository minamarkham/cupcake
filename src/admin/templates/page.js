import htm from "https://unpkg.com/htm?module";

const html = htm.bind(h);

// Preview component for a Page
const Page = createClass({
  render() {
    const entry = this.props.entry;

    return html`
      <div class="header">
        <h1 class="page-title">${entry.getIn(["data", "title"], null)}</h1>
        <p>${entry.getIn(["data", "subtitle"], null)}</p>
      </div>

      <div class="page-content">
      ${this.props.widgetFor("body")}
      </div>

    `;
  }
});

export default Page;
