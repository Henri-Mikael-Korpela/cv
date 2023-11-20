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

    .time {
        color: #323b4c;
        font-family: 'Noto Sans Georgian', sans-serif;
        font-size: 14px;
        font-weight: 200;
        margin: 0;
    }

    .company {
        color: #323b4c;
        font-family: 'Noto Sans Georgian', sans-serif;
        font-size: 14px;
        font-weight: 500;
        margin: 0;
    }
`;

const template = document.createElement("template");
template.innerHTML = `
    <style>${style}</style>
    <div class="container" style="display:grid">
        <img style="grid-column:1/2;">
        <div style="grid-column:3/4;">
            <h3></h3>
            <p class="company"></p>
            <p class="time"></p>
        </div>
    </div>
`;
class CertificateEntry extends HTMLElement {
    constructor() {
        super();

        this._shadow_root = this.attachShadow({ mode: 'closed' });
        this._shadow_root.appendChild(template.content.cloneNode(true));

        const company = this.getAttribute("company");
        const companyLogoUrl = this.getAttribute("company-logo-url");
        const name = this.getAttribute("name");
        const time = this.getAttribute("time");
        const url = this.getAttribute("url");

        const imgElem = this._shadow_root.querySelector("img");
        imgElem.alt = company;
        imgElem.src = companyLogoUrl;

        this._shadow_root.querySelector('h3').innerHTML = `<a href="${url}" target="_balnk">${name}</a>`;
        this._shadow_root.querySelector('.company').innerText = company;
        this._shadow_root.querySelector('.time').innerText = time;
    }
}
customElements.define("raq-certificate-entry", CertificateEntry);