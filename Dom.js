/**
 * @param {HTMLElement} element 
 * @param {{ [key: string]: string; }} style 
 */
export function assignStyle(element, style) {
    for (const [key, value] of Object.entries(style)) {
        element.style[key] = value;
    }
}