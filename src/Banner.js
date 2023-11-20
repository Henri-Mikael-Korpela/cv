import * as DOM from "./Dom.js";

const nameFontSizeDefault = 42;
const roleFontSizeDefault = 24;
const gridTemplateColumnsDefault = "auto 13vw 2vw 35vw auto";
const gridTemplateRowsDefault = "40% 60%";

const style = `
    #banner {
        background: #323b4c;
        grid-template-columns: ${gridTemplateColumnsDefault};
        height: calc(100vh / 4);
        left:0;
        position:fixed;
        top:0;
        transition:height 0.25s;
        width:100vw;
        z-index:100;
    }

    #banner-name h1,
    #banner-role {
        color: white;
        font-family: 'Noto Sans Georgian', sans-serif;
        margin: 0;
        transition:font-size 0.325s;
    }

    #banner-name h1 {
        font-size: ${nameFontSizeDefault}px;
        font-weight: 500;
    }

    #banner-role {
        font-size: ${roleFontSizeDefault}px;
        font-weight: 200;
    }

    #banner-photo {
        aspect-ratio: 1/1;
        background-image: url('https://media.licdn.com/dms/image/D4D03AQFllWSHMGRY8g/profile-displayphoto-shrink_800_800/0/1695896893863?e=1705536000&v=beta&t=oK3qD4nVcA8bXiEys86wieg_sL_h6PkgjasJQQJYUnQ');
        background-size: cover;
        border: 4px solid white;
        border-radius: 100%;
        transition:height 0.5s;
    }
`;

const template = document.createElement("template");
template.innerHTML = `
    <style>${style}</style>
    <div id="banner" style="display:grid; grid-template-rows:${gridTemplateRowsDefault}">
        <div style="grid-column:2/3;grid-row:2/3;">
            <div id="banner-photo"></div>
        </div>
        <div id="banner-name" style="grid-column:4/5; grid-row:2/3;">
            <h1>Henri Korpela</h1>
            <p id="banner-role">Full-stack-ohjelmistokehittäjä</p>
        </div>
    </div>
`;

class Banner extends HTMLElement {
    constructor() {
        super();

        this._shadow_root = this.attachShadow({ mode: 'closed' });
        this._shadow_root.appendChild(template.content.cloneNode(true));

        const bannerElem = this._shadow_root.getElementById("banner");
        const bannerNameElem = this._shadow_root.querySelector("#banner-name h1");
        const bannerPhotoElem = this._shadow_root.getElementById("banner-photo");
        const bannerRoleElem = this._shadow_root.getElementById("banner-role");

        window.addEventListener("scroll", () => {
            const scrollAmount = window.scrollY;
            if (scrollAmount > 64) {
                const bannerHeight = 64;
                DOM.assignStyle(bannerElem, {
                    gridTemplateColumns: "auto 72px 0 35vw auto",
                    gridTemplateRows: "8px auto",
                    height: `${bannerHeight}px`,
                });

                const nameFontSize = Math.floor(nameFontSizeDefault / 2);
                bannerNameElem.style.fontSize = `${nameFontSize}px`;

                const roleFontSize = Math.floor(roleFontSizeDefault / 2);
                bannerRoleElem.style.fontSize = `${roleFontSize}px`;

                DOM.assignStyle(bannerPhotoElem, {
                    borderWidth: "2px",
                    height: `${bannerHeight - 16}px`,
                });
            }
            else {
                DOM.assignStyle(bannerElem, {
                    gridTemplateColumns: gridTemplateColumnsDefault,
                    gridTemplateRows: gridTemplateRowsDefault,
                    height: `calc(100vh / 4)`,
                });

                bannerNameElem.style.fontSize = `${nameFontSizeDefault}px`;
                bannerRoleElem.style.fontSize = `${roleFontSizeDefault}px`;

                DOM.assignStyle(bannerPhotoElem, {
                    borderWidth: "4px",
                    height: `inherit`,
                });
            }
        });
    }
}
customElements.define("raq-banner", Banner);