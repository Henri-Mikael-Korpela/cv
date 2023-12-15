const template = document.createElement("template");
template.innerHTML = `<span></span>`;

class YearCount extends HTMLElement {
    constructor() {
        super();

        this._shadow_root = this.attachShadow({ mode: 'closed' });
        this._shadow_root.appendChild(template.content.cloneNode(true));

        const beginTime = parseBeginTime(this.getAttribute("begin-time"));

        const spanElem = this._shadow_root.querySelector("span");

        if (beginTime instanceof Date) {
            const now = new Date();
            const diff = now - beginTime;

            const year = Math.floor(diff / 1000 / 60 / 60 / 24 / 365);

            spanElem.innerText = year;
        }
        else {
            spanElem.innerText = "_";
        }
    }
}
customElements.define("raq-year-count", YearCount);

function parseBeginTime(value) {
    if (typeof value !== "string") {
        return new Error("Invalid begin-time attribute value given", value);
    }

    const [year, month, day] = value.split("-").map((x) => parseInt(x));

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
        return new Error("Invalid begin-time attribute value given", value);
    }

    return new Date(year, month, day);
}