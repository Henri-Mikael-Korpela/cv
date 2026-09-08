const style = `
    .container {
        padding: 2px 0 24px 24px;
        position: relative;
    }

    .container::before {
        background: var(--color-accent);
        border-radius: 100%;
        content: "";
        height: 10px;
        left: -5px;
        position: absolute;
        top: 6px;
        width: 10px;
    }

    .container::after {
        background: color-mix(in srgb, var(--color-heading) 15%, white);
        bottom: 0;
        content: "";
        left: 0;
        position: absolute;
        top: 18px;
        width: 2px;
    }

    .container:last-child::after {
        display: none;
    }

    .header {
        align-items: baseline;
        display: flex;
        flex-wrap: wrap;
        gap: 6px 12px;
        justify-content: space-between;
    }

    h3 {
        color: var(--color-heading);
        font-family: var(--font-family);
        font-size: 17px;
        font-weight: 700;
        margin: 0;
    }

    .employment-type {
        color: var(--color-muted);
        font-family: var(--font-family);
        font-size: 13px;
        font-weight: 400;
        margin: 0;
        text-align: right;
        white-space: nowrap;
    }

    .entry-role {
        color: var(--color-accent-dark);
        font-family: var(--font-family);
        font-size: 14px;
        font-weight: 600;
        margin: 2px 0 0 0;
    }

    .description {
        color: var(--color-text);
        font-family: var(--font-family);
        font-size: 14px;
        font-weight: 400;
        line-height: 1.55;
        margin: 8px 0 0 0;
    }

    .items {
        margin-top: 12px;
    }

    @media print {
        .container {
            padding-bottom: 14px;
        }
    }
`;

const template = document.createElement("template");
template.innerHTML = `
    <style>${style}</style>
    <div class="container">
        <div class="header">
            <h3></h3>
            <p class="employment-type"></p>
        </div>
        <p class="entry-role"></p>
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
