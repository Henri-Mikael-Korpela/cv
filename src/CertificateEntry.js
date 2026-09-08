const style = `
    .container {
        align-items: baseline;
        border-bottom: 1px solid var(--color-border);
        display: flex;
        flex-wrap: wrap;
        gap: 4px 12px;
        justify-content: space-between;
        padding: 12px 0;
    }

    .container:last-child {
        border-bottom: none;
        padding-bottom: 0;
    }

    .container:first-child {
        padding-top: 0;
    }

    h3 {
        font-family: var(--font-family);
        font-size: 15px;
        font-weight: 700;
        margin: 0;
    }

    h3 a {
        color: var(--color-heading);
        text-decoration: none;
    }

    h3 a:hover {
        color: var(--color-accent-dark);
        text-decoration: underline;
    }

    .meta {
        color: var(--color-muted);
        font-family: var(--font-family);
        font-size: 13px;
        font-weight: 400;
        margin: 0;
        white-space: nowrap;
    }

    .company {
        font-weight: 600;
    }
`;

const template = document.createElement("template");
template.innerHTML = `
    <style>${style}</style>
    <div class="container">
        <h3></h3>
        <p class="meta"><span class="company"></span> &middot; <span class="time"></span></p>
    </div>
`;
class CertificateEntry extends HTMLElement {
    constructor() {
        super();

        this._shadow_root = this.attachShadow({ mode: 'closed' });
        this._shadow_root.appendChild(template.content.cloneNode(true));

        const company = this.getAttribute("company");
        const name = this.getAttribute("name");
        const time = this.getAttribute("time");
        const url = this.getAttribute("url");

        this._shadow_root.querySelector('h3').innerHTML = `<a href="${url}" target="_blank" rel="noopener">${name}</a>`;
        this._shadow_root.querySelector('.company').innerText = company;
        this._shadow_root.querySelector('.time').innerText = time;
    }
}
customElements.define("raq-certificate-entry", CertificateEntry);
