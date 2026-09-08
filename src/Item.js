const style = `
    p {
        align-items: center;
        background: color-mix(in srgb, var(--tag-color, #323b4c) 12%, white);
        border: 1px solid color-mix(in srgb, var(--tag-color, #323b4c) 30%, white);
        border-radius: 999px;
        color: color-mix(in srgb, var(--tag-color, #323b4c) 75%, black);
        display: inline-flex;
        font-family: var(--font-family);
        font-size: 11.5px;
        font-weight: 600;
        gap: 4px;
        margin: 0 4px 4px 0;
        padding: 2px 8px;
    }

    p > span {
        background: color-mix(in srgb, var(--tag-color, #323b4c) 85%, black);
        border-radius: 999px;
        color: white;
        font-size: 9.5px;
        font-weight: 700;
        padding: 0 5px;
    }

    @media print {
        p {
            background: transparent;
            border: 1px solid color-mix(in srgb, var(--tag-color, #323b4c) 55%, white);
            color: color-mix(in srgb, var(--tag-color, #323b4c) 80%, black);
        }

        p > span {
            background: transparent;
            color: color-mix(in srgb, var(--tag-color, #323b4c) 80%, black);
            padding: 0;
        }
    }
`;

const template = document.createElement("template");
template.innerHTML = `
    <style>${style}</style>
    <p></p>
`;

class Item extends HTMLElement {
    constructor() {
        super();

        this._shadow_root = this.attachShadow({ mode: 'closed' });
        this._shadow_root.appendChild(template.content.cloneNode(true));

        const color = this.getAttribute("color");

        const pElem = this._shadow_root.querySelector("p");
        if (color) {
            pElem.style.setProperty("--tag-color", color);
        }

        const years = this.getAttribute("years");
        if (years) {
            pElem.innerHTML = `${this.textContent} <span>${years}v</span>`;
        }
        else {
            pElem.innerText = this.textContent;
        }
    }
}
customElements.define("raq-item", Item);
