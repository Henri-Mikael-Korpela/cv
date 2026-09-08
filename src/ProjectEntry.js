const style = `
    .project-entry {
        margin-bottom: 20px;
    }

    .project-entry:last-child {
        margin-bottom: 0;
    }

    h3 {
        font-family: var(--font-family);
        font-size: 15px;
        font-weight: 700;
        margin: 0 0 4px 0;
    }

    h3 a {
        color: var(--color-heading);
        text-decoration: none;
    }

    h3 a:hover {
        color: var(--color-accent-dark);
        text-decoration: underline;
    }

    .description {
        color: var(--color-text);
        font-family: var(--font-family);
        font-size: 14px;
        font-weight: 400;
        line-height: 1.55;
        margin: 0 0 8px 0;
    }

    .items {
        margin-top: 8px;
    }
`;

const template = document.createElement("template");
template.innerHTML = `
    <style>${style}</style>
    <li class="project-entry">
        <h3></h3>
        <p class="description"></p>
        <div class="items"></div>
    </li>
`;
class ProjectEntry extends HTMLElement {
    constructor() {
        super();

        this._shadow_root = this.attachShadow({ mode: 'closed' });
        this._shadow_root.appendChild(template.content.cloneNode(true));

        const description = this.getAttribute("description");
        const name = this.getAttribute("name");
        const url = this.getAttribute("url");

        this._shadow_root.querySelector("h3").innerHTML = `<a href="${url}" target="_blank" rel="noopener">${name}</a>`;
        this._shadow_root.querySelector(".description").innerText = description;

        this._shadow_root.querySelector('.items').innerHTML = this.innerHTML;
    }
}
customElements.define("raq-project-entry", ProjectEntry);
