export const createElement = (tag) => document.createElement(tag);
export const createTextNode = (text) => document.createTextNode(text);
export const query = (sel) => document.querySelector(sel);
export const parentNode = (node) => node.parentNode;
export const replaceChild = (parent, newChild, oldChild) => {
    return parent !== null ? parent.replaceChild(newChild, oldChild) : null;
};
export const removeChild = (parent, child) => parent.removeChild(child);
export const insertBefore = (parent, newChild, sibling) => {
    return parent.insertBefore(newChild, sibling);
};
export const nextSibling = (node) => node.nextSibling;
export const setAttribute = (el, attrName, val) => el.setAttribute(attrName, val);
export const removeAttribute = (el, attrName) => el.removeAttribute(attrName);
export const setProp = (node, propName, val) => node[propName] = val;
export const removeProp = (node, propName) => node[propName] = null;
export const setClass = (el, className) => el.classList.add(className);
export const removeClass = (el, className) => el.classList.remove(className);
export const setStyle = (el, name, val) => {
    return el.style[name] = val || '';
};
export const removeStyle = (el, name) => {
    return el.style[name] = '';
};
export const setTextContent = (node, text) => node.textContent = text;
export const addEventListener = (el, eventName, handler, useCapture = false) => {
    el.addEventListener(eventName, handler, useCapture);
};
export const removeEventListener = (el, eventName, handler, useCapture = false) => {
    el.removeEventListener(eventName, handler, useCapture);
};
//# sourceMappingURL=domapi.js.map