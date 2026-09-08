const style = `
    .service-link {
        align-items: center;
        background: rgba(255, 255, 255, 0.12);
        border-radius: 100%;
        display: inline-flex;
        height: 40px;
        justify-content: center;
        position: relative;
        transition: background 0.2s, transform 0.2s;
        width: 40px;
    }

    .service-link:hover {
        background: rgba(255, 255, 255, 0.24);
        transform: translateY(-2px);
    }

    .service-link > img {
        aspect-ratio: 1 / 1;
        border-radius: 100%;
        width: 20px;
    }

    .service-link > img + span {
        background: #1c2333;
        border-radius: 6px;
        color: white;
        display: none;
        font-family: var(--font-family);
        font-size: 12px;
        padding: 4px 8px;
    }

    .service-link:hover > img + span {
        bottom: -30px;
        display: inline-block;
        left: 50%;
        position: absolute;
        transform: translateX(-50%);
        white-space: nowrap;
    }

    @media print {
        .service-link {
            display: none;
        }
    }
`;

const template = document.createElement("template");
template.innerHTML = `
    <style>${style}</style>
    <a class="service-link" target="_blank" rel="noopener">
        <img/>
        <span></span>
    </a>
`;

class ServiceLink extends HTMLElement {
    constructor() {
        super();

        this._shadow_root = this.attachShadow({ mode: 'closed' });
        this._shadow_root.appendChild(template.content.cloneNode(true));

        const aElem = this._shadow_root.querySelector("a");
        aElem.href = this.getAttribute("href");

        const imgElem = this._shadow_root.querySelector("img");
        imgElem.src = this.getAttribute("image-src");
        imgElem.alt = this.getAttribute("alt");

        const spanElem = this._shadow_root.querySelector("span");
        spanElem.innerText = this.getAttribute("alt");
    }
}
customElements.define("raq-service-link", ServiceLink);
