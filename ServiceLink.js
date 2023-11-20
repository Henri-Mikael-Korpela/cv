const style = `
    .service-link {
        color: darkcyan;
        font-family: 'Noto Sans Georgian', sans-serif;
        font-size: 12px;
        display: inline-block;
        position:relative;
    }

    .service-link>img {
        aspect-ratio: 1/1;
        width: 48px;
    }

    .service-link>img + span {
        border:1px solid black;
        display:none;
    }
    .service-link:hover>img + span {
        bottom:-20px;
        display:inline-block;
        left:0;
        padding-left:4px;
        padding-right:4px;
        position:absolute;
        white-space:nowrap;
    }
`;

const template = document.createElement("template");
template.innerHTML = `
    <style>${style}</style>
    <a class="service-link">
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