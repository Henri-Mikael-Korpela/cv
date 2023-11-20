const style = `
    p {
        border-radius:8px;
        color:white;
        display:inline-block;
        font-family: 'Noto Sans Georgian', sans-serif;
        font-size: 12px;
        font-weight: 200;
        margin: 0 0 8px 0;
        opacity:0.65;
        padding:4px 8px;
    }
`;

const template = document.createElement("template");
template.innerHTML = `
    <style>${style}</style>
    <p></p>
`;

class Section extends HTMLElement {
    constructor() {
        super();

        this._shadow_root = this.attachShadow({ mode: 'closed' });
        this._shadow_root.appendChild(template.content.cloneNode(true));

        const color = this.getAttribute("color");

        const pElem = this._shadow_root.querySelector("p");
        pElem.style.backgroundColor = color;
        pElem.innerText = this.textContent;
    }
}
customElements.define("raq-item", Section);