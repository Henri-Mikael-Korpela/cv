import * as DOM from "./Dom.js";

const BANNER_DESKTOP_GRID_TEMPLATE_COLUMNS_DEFAULT = "auto 13vw 2vw 35vw auto";
const BANNER_DESKTOP_GRID_TEMPLATE_ROWS_DEFAULT = "40% 60%";
const BANNER_DESKTOP_NAME_FONT_SIZE_DEFAULT = 42;
const BANNER_DESKTOP_ROLE_FONT_SIZE_DEFAULT = 24;

const BANNER_MOBILE_GRID_TEMPLATE_COLUMNS_DEFAULT = "auto 48px 2vw auto";

const NAME = "Henri Korpela";
const PHOTO_URL = "https://media.licdn.com/dms/image/D4D03AQFllWSHMGRY8g/profile-displayphoto-shrink_800_800/0/1695896893863?e=1705536000&v=beta&t=oK3qD4nVcA8bXiEys86wieg_sL_h6PkgjasJQQJYUnQ";
const ROLE = "Full stack -ohjelmistokehittäjä";

const desktopStyle = `
    #banner-desktop {
        background: #323b4c;
        display:grid;
        grid-template-columns: ${BANNER_DESKTOP_GRID_TEMPLATE_COLUMNS_DEFAULT};
        height: calc(100vh / 4);
        left:0;
        position:fixed;
        top:0;
        transition:height 0.25s;
        width:100vw;
        z-index:100;
    }

    #banner-desktop-name h1,
    #banner-desktop-role {
        color: white;
        font-family: 'Noto Sans Georgian', sans-serif;
        margin: 0;
        transition:font-size 0.325s;
    }

    #banner-desktop-name h1 {
        font-size: ${BANNER_DESKTOP_NAME_FONT_SIZE_DEFAULT}px;
        font-weight: 500;
    }

    #banner-desktop-role {
        font-size: ${BANNER_DESKTOP_ROLE_FONT_SIZE_DEFAULT}px;
        font-weight: 200;
    }

    #banner-desktop-photo {
        aspect-ratio: 1/1;
        background-image: url('${PHOTO_URL}');
        background-size: cover;
        border: 4px solid white;
        border-radius: 100%;
        transition:height 0.5s;
    }
`;
const mobileStyle = `
    #banner-mobile {
        background: #323b4c;
        display:none;
        grid-template-columns: ${BANNER_MOBILE_GRID_TEMPLATE_COLUMNS_DEFAULT};
        height: 64px;
        left:0;
        position:fixed;
        top:0;
        width:100vw;
        z-index:100;
    }

    #banner-mobile-name h1,
    #banner-mobile-role {
        color: white;
        font-family: 'Noto Sans Georgian', sans-serif;
        margin: 0;
    }

    #banner-mobile-name h1 {
        font-size: 21px;
        margin-top:8px;
    }
    #banner-mobile-role {
        font-size: 12px;
    }

    #banner-mobile-photo {
        aspect-ratio: 1/1;
        background-image: url('${PHOTO_URL}');
        background-size: cover;
        border: 3px solid white;
        border-radius: 100%;
        margin-top: 8px;
    }
`;
const printStyle = `
    #banner-print {
        background: #323b4c;
        display:grid;
        grid-template-columns: ${BANNER_DESKTOP_GRID_TEMPLATE_COLUMNS_DEFAULT};
        padding:80px 0 24px 0;
        width:100vw;
    }

    #banner-print-name h1,
    #banner-print-role {
        color: white;
        font-family: 'Noto Sans Georgian', sans-serif;
        margin: 0;
        transition:font-size 0.325s;
    }

    #banner-print-name h1 {
        font-size: ${BANNER_DESKTOP_NAME_FONT_SIZE_DEFAULT}px;
        font-weight: 500;
    }

    #banner-print-role {
        font-size: ${BANNER_DESKTOP_ROLE_FONT_SIZE_DEFAULT}px;
        font-weight: 200;
    }

    #banner-print-photo {
        aspect-ratio: 1/1;
        background-image: url('${PHOTO_URL}');
        background-size: cover;
        border: 4px solid white;
        border-radius: 100%;
        transition:height 0.5s;
    }
`;

const template = document.createElement("template");
template.innerHTML = `
    <style>${desktopStyle}${mobileStyle}${printStyle}</style>
    <div id="banner-desktop" style="grid-template-rows:${BANNER_DESKTOP_GRID_TEMPLATE_ROWS_DEFAULT}">
        <div style="grid-column:2/3;grid-row:2/3;">
            <div id="banner-desktop-photo"></div>
        </div>
        <div id="banner-desktop-name" style="grid-column:4/5; grid-row:2/3;">
            <h1>${NAME}</h1>
            <p id="banner-desktop-role">${ROLE}</p>
        </div>
    </div>
    <div id="banner-mobile" style="display:grid;">
        <div style="grid-column:2/3;">
            <div id="banner-mobile-photo"></div>
        </div>
        <div id="banner-mobile-name" style="grid-column:4/5;">
            <h1>${NAME}</h1>
            <p id="banner-mobile-role">${ROLE}</p>
        </div>
    </div>
    <div id="banner-print" style="grid-template-rows:${BANNER_DESKTOP_GRID_TEMPLATE_ROWS_DEFAULT}">
        <div style="grid-column:2/3;">
            <div id="banner-print-photo"></div>
        </div>
        <div id="banner-print-name" style="grid-column:4/5;">
            <h1>${NAME}</h1>
            <p id="banner-print-role">${ROLE}</p>
        </div>
    </div>
`;

class Banner extends HTMLElement {
    constructor() {
        super();

        this._shadow_root = this.attachShadow({ mode: 'closed' });
        this._shadow_root.appendChild(template.content.cloneNode(true));

        const bannerDesktopElem = this._shadow_root.getElementById("banner-desktop");
        const bannerDesktopNameElem = this._shadow_root.querySelector("#banner-desktop-name h1");
        const bannerDesktopPhotoElem = this._shadow_root.getElementById("banner-desktop-photo");
        const bannerDesktopRoleElem = this._shadow_root.getElementById("banner-desktop-role");

        const bannerMobileElem = this._shadow_root.getElementById("banner-mobile");

        const bannerPrintElem = this._shadow_root.getElementById("banner-print");

        window.addEventListener("scroll", () => {
            const scrollAmount = window.scrollY;
            if (scrollAmount > 64) {
                const bannerHeight = 64;
                DOM.assignStyle(bannerDesktopElem, {
                    gridTemplateColumns: "auto 72px 0 35vw auto",
                    gridTemplateRows: "8px auto",
                    height: `${bannerHeight}px`,
                });

                const nameFontSize = Math.floor(BANNER_DESKTOP_NAME_FONT_SIZE_DEFAULT / 2);
                bannerDesktopNameElem.style.fontSize = `${nameFontSize}px`;

                const roleFontSize = Math.floor(BANNER_DESKTOP_ROLE_FONT_SIZE_DEFAULT / 2);
                bannerDesktopRoleElem.style.fontSize = `${roleFontSize}px`;

                DOM.assignStyle(bannerDesktopPhotoElem, {
                    borderWidth: "2px",
                    height: `${bannerHeight - 16}px`,
                });
            }
            else {
                DOM.assignStyle(bannerDesktopElem, {
                    gridTemplateColumns: BANNER_DESKTOP_GRID_TEMPLATE_COLUMNS_DEFAULT,
                    gridTemplateRows: BANNER_DESKTOP_GRID_TEMPLATE_ROWS_DEFAULT,
                    height: `calc(100vh / 4)`,
                });

                bannerDesktopNameElem.style.fontSize = `${BANNER_DESKTOP_NAME_FONT_SIZE_DEFAULT}px`;
                bannerDesktopRoleElem.style.fontSize = `${BANNER_DESKTOP_ROLE_FONT_SIZE_DEFAULT}px`;

                DOM.assignStyle(bannerDesktopPhotoElem, {
                    borderWidth: "4px",
                    height: `inherit`,
                });
            }
        });

        function onResize() {
            if (window.innerWidth <= 640) {
                bannerDesktopElem.style.display = "none";
                bannerMobileElem.style.display = "grid";
            }
            else {
                bannerDesktopElem.style.display = "grid";
                bannerMobileElem.style.display = "none";
            }
        }
        window.addEventListener("resize", onResize);
        onResize();

        const print = true;

        if (print) {
            bannerDesktopElem.style.display = "none";
            bannerMobileElem.style.display = "none";
            bannerPrintElem.style.display = "grid";
        }
    }
}
customElements.define("raq-banner", Banner);