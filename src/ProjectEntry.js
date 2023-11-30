const style = `
    .project-entry {
        margin-bottom: 2vh;
    }

    .project-entry p {
        font-family: 'Noto Sans Georgian', sans-serif;
        font-size: 16px;
        font-weight: 200;
        margin: 0 0 1vh 0;
    }

    .project-entry p a {
        color: darkcyan;
    }
`;

const template = document.createElement("template");
template.innerHTML = `
    <style>${style}</style>
    <div class="project-entry">
        <p><strong></strong> <span></span></p>
        <div class="items"></div>
    </div>
`;
class EducationEntry extends HTMLElement {
    constructor() {
        super();

        this._shadow_root = this.attachShadow({ mode: 'closed' });
        this._shadow_root.appendChild(template.content.cloneNode(true));

        const description = this.getAttribute("description");
        const name = this.getAttribute("name");
        const url = this.getAttribute("url");

        this._shadow_root.querySelector("p > strong").innerHTML = `<a href="${url}" target="_blank">${name}</a>`;
        this._shadow_root.querySelector("p > span").innerHTML = description;

        this._shadow_root.querySelector('.items').innerHTML = this.innerHTML;
    }
}
customElements.define("raq-project-entry", EducationEntry);