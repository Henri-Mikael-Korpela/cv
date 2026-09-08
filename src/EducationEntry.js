const style = `
    .container {
        margin-bottom: 20px;
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

    .time {
        color: var(--color-muted);
        font-family: var(--font-family);
        font-size: 13px;
        font-weight: 400;
        margin: 0;
        white-space: nowrap;
    }

    .name {
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
`;

const template = document.createElement("template");
template.innerHTML = `
    <style>${style}</style>
    <div class="container">
        <div class="header">
            <h3></h3>
            <p class="time"></p>
        </div>
        <p class="name"></p>
        <p class="description"></p>
        <div class='items'></div>
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
        const time = this.getAttribute("time");

        this._shadow_root.querySelector('h3').innerText = provider;
        this._shadow_root.querySelector('.description').innerText = description;
        this._shadow_root.querySelector('.name').innerText = name;
        this._shadow_root.querySelector('.time').innerText = time;

        this._shadow_root.querySelector('.items').innerHTML = this.innerHTML;
    }
}
customElements.define("raq-education-entry", EducationEntry);
