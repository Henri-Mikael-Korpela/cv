const FONT_FAMILY = "'Noto Sans Georgian', sans-serif";

const style = `
    .container {
        grid-template-columns: 48px 1vw auto;
        margin-bottom: 2vw;
    }

    h3 {
        font-family: ${FONT_FAMILY};
        font-size: 18px;
        font-weight: 500;
        margin: 0;
    }

    .employment-type {
        color: #323b4c;
        font-family: ${FONT_FAMILY};
        font-size: 14px;
        font-weight: 200;
        margin: 0;
    }

    .entry-role {
        color: #323b4c;
        font-family: ${FONT_FAMILY};
        font-size: 14px;
        font-weight: 500;
        margin: 0;
    }

    .description {
        font-family: ${FONT_FAMILY};
        font-size: 14px;
        font-weight: 200;
        margin: 1vh 0 0 0;
    }

    .items {
        margin-top: 1vh;
    }
`;

const template = document.createElement("template");
template.innerHTML = `
    <style>${style}</style>
    <div class="container">
        <h3></h3>
        <p class="entry-role"></p>
        <p class="employment-type"></p>
        <p class="description"></p>
        <div class='items'></div>
    </div>
`;
class WorkExperienceEntry extends HTMLElement {
    constructor() {
        super();

        this._shadow_root = this.attachShadow({ mode: 'closed' });
        this._shadow_root.appendChild(template.content.cloneNode(true));

        const company = this.getAttribute("company");
        const companyLogoUrl = this.getAttribute("company-logo-url");
        const description = this.getAttribute("description");
        const duration = this.getAttribute("duration");
        const employmentType = this.getAttribute("employment-type");
        const role = this.getAttribute("role");

        this._shadow_root.querySelector('h3').innerText = company;
        this._shadow_root.querySelector('.description').innerText = description;
        this._shadow_root.querySelector('.employment-type').innerText = duration + ' | ' + employmentType;
        this._shadow_root.querySelector('.entry-role').innerText = role;

        this._shadow_root.querySelector('.items').innerHTML = this.innerHTML;
    }
}
customElements.define("raq-work-experience-entry", WorkExperienceEntry);
