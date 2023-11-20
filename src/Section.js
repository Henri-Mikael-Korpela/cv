const style = `
    .container {
        margin-top: 2vh;
    }

    h2 {
        font-family: 'Noto Sans Georgian', sans-serif;
        font-size: 24px;
        font-weight: 500;
        margin: 0;
    }

    hr {
        border: 1px solid #323b4c;
        margin-bottom: 2vh;
        opacity:0.25;
    }
`;

const template = document.createElement("template");
template.innerHTML = `
    <style>${style}</style>
    <div class="container">
        <h2></h2>
        <hr/>
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