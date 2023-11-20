const style = `
    .container {
        grid-template-columns: 48px 1vw auto;
        margin-bottom: 2vw;
    }

    img {
        aspect-ratio: 1/1;
        width: 100%;
    }

    h3 {
        font-family: 'Noto Sans Georgian', sans-serif;
        font-size: 18px;
        font-weight: 500;
        margin: 0;
    }

    h3 a {
        color: darkcyan;
    }

    .name {
        color: #323b4c;
        font-family: 'Noto Sans Georgian', sans-serif;
        font-size: 14px;
        font-weight: 500;
        margin: 0;
    }

    .time {
        color: #323b4c;
        font-family: 'Noto Sans Georgian', sans-serif;
        font-size: 14px;
        font-weight: 200;
        margin: 0;
    }

    .description {
        font-family: 'Noto Sans Georgian', sans-serif;
        font-size: 14px;
        font-weight: 200;
        margin: 1vh 0 0 0;
    }
`;

const template = document.createElement("template");
template.innerHTML = `
    <style>${style}</style>
    <div class="container" style="display:grid">
        <img style="grid-column:1/2;">
        <div style="grid-column:3/4;">
            <h3></h3>
            <p class="name"></p>
            <p class="time"></p>
            <p class="description"></p>
        </div>
    </div>
`;
class EducationEntry extends HTMLElement {
    constructor() {
        super();

        this._shadow_root = this.attachShadow({ mode: 'closed' });
        this._shadow_root.appendChild(template.content.cloneNode(true));

        const description = this.getAttribute("description");
        const name = this.getAttribute("name");
        const provider = this.getAttribute("provider");
        const providerLogoUrl = this.getAttribute("provider-logo-url");
        const time = this.getAttribute("time");

        const imgElem = this._shadow_root.querySelector("img");
        imgElem.alt = provider;
        imgElem.src = providerLogoUrl;

        this._shadow_root.querySelector('h3').innerHTML = provider;
        this._shadow_root.querySelector('.description').innerText = description;
        this._shadow_root.querySelector('.name').innerText = name;
        this._shadow_root.querySelector('.time').innerText = time;
    }
}
customElements.define("raq-education-entry", EducationEntry);