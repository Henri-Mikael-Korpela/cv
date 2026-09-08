const style = `
    .container {
        margin: 32px 0 16px 0;
    }

    .container:first-child {
        margin-top: 0;
    }

    h2 {
        align-items: center;
        color: var(--color-heading);
        display: flex;
        font-family: var(--font-family);
        font-size: 15px;
        font-weight: 700;
        gap: 10px;
        letter-spacing: 0.06em;
        margin: 0 0 12px 0;
        text-transform: uppercase;
    }

    h2::before {
        background: var(--color-accent);
        border-radius: 2px;
        content: "";
        display: block;
        flex: none;
        height: 18px;
        width: 4px;
    }

    @media print {
        .container {
            margin: 18px 0 10px 0;
        }
    }
`;

const template = document.createElement("template");
template.innerHTML = `
    <style>${style}</style>
    <div class="container">
        <h2></h2>
    </div>
`;

class Section extends HTMLElement {
    constructor() {
        super();

        this._shadow_root = this.attachShadow({ mode: 'closed' });
        this._shadow_root.appendChild(template.content.cloneNode(true));

        this._shadow_root.querySelector("h2").innerText = this.getAttribute("title");
    }
}
customElements.define("raq-section", Section);
