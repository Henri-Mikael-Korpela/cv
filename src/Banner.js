const NAME = "Henri Korpela";
const ROLE = "Full stack -ohjelmistokehittäjä";
const EMAIL = "henri.mikael.korpela@gmail.com";

const style = `
    :host {
        display: block;
    }

    .banner {
        align-items: center;
        background: linear-gradient(135deg, #1c2333 0%, #323b4c 55%, #3d4a63 100%);
        border-radius: var(--radius-lg, 16px);
        color: white;
        display: flex;
        flex-wrap: wrap;
        gap: 28px;
        padding: 40px;
    }

    .photo {
        aspect-ratio: 1 / 1;
        background-position: center;
        background-size: cover;
        border: 4px solid rgba(255, 255, 255, 0.85);
        border-radius: 100%;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
        flex: none;
        width: clamp(72px, 12vw, 128px);
    }

    .identity {
        flex: 1 1 240px;
        min-width: 0;
    }

    .identity h1 {
        font-family: var(--font-family);
        font-size: clamp(24px, 4vw, 38px);
        font-weight: 700;
        line-height: 1.15;
        margin: 0;
    }

    .role {
        color: rgba(255, 255, 255, 0.78);
        font-family: var(--font-family);
        font-size: clamp(14px, 2vw, 18px);
        font-weight: 400;
        margin: 6px 0 0 0;
    }

    .email {
        color: rgba(255, 255, 255, 0.9);
        font-family: var(--font-family);
        font-size: 14px;
        font-weight: 500;
        margin: 8px 0 0 0;
    }

    .email a {
        color: inherit;
        text-decoration: none;
    }

    .email a:hover {
        text-decoration: underline;
    }

    .links {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 16px;
    }

    ::slotted(*) {
        flex: none;
    }

    @media print {
        .banner {
            background: none;
            border-bottom: 2px solid var(--color-border, #e3e6ee);
            border-radius: 0;
            color: var(--color-heading, #1c2333);
            padding: 0 0 20px 0;
        }

        .photo {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            border-color: var(--color-muted, #6b7385);
            box-shadow: none;
            width: 88px;
        }

        .role {
            color: var(--color-muted, #6b7385);
        }

        .email {
            color: var(--color-text, #3a4152);
        }

        .links {
            display: none;
        }
    }
`;

const template = document.createElement("template");
template.innerHTML = `
    <style>${style}</style>
    <div class="banner">
        <div class="photo"></div>
        <div class="identity">
            <h1>${NAME}</h1>
            <p class="role">${ROLE}</p>
            <p class="email"><a href="mailto:${EMAIL}">${EMAIL}</a></p>
            <div class="links">
                <slot></slot>
            </div>
        </div>
    </div>
`;

class Banner extends HTMLElement {
    constructor() {
        super();

        this._shadow_root = this.attachShadow({ mode: 'closed' });
        this._shadow_root.appendChild(template.content.cloneNode(true));

        const imageSrc = this.getAttribute("image-src");
        this._shadow_root.querySelector(".photo").style.backgroundImage = `url(${imageSrc})`;
    }
}
customElements.define("raq-banner", Banner);
